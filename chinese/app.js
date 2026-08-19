(() => {
  "use strict";

  const phrases = window.HUXI_PHRASES || [];
  const categories = window.HUXI_CATEGORIES || [];
  const procedures = window.HUXI_PROCEDURES || [];
  const categoryById = new Map(categories.map((category) => [category.id, category]));
  const procedureById = new Map(procedures.map((procedure) => [procedure.id, procedure]));
  const phraseById = new Map(phrases.map((phrase) => [phrase.id, phrase]));
  const STORAGE_KEY = "huxi-respiratory-mandarin-v1";
  const DAILY_SIZE = 8;

  const els = {
    app: document.getElementById("app"),
    views: [...document.querySelectorAll(".view")],
    navItems: [...document.querySelectorAll(".nav-item")],
    homeSearch: document.getElementById("homeSearch"),
    phraseSearch: document.getElementById("phraseSearch"),
    categoryFilters: document.getElementById("categoryFilters"),
    phraseList: document.getElementById("phraseList"),
    phraseResultCount: document.getElementById("phraseResultCount"),
    featuredScenarios: document.getElementById("featuredScenarios"),
    featuredProcedures: document.getElementById("featuredProcedures"),
    scenarioList: document.getElementById("scenarioList"),
    scenarioProcedures: document.getElementById("scenarioProcedures"),
    dailyPhraseCard: document.getElementById("dailyPhraseCard"),
    practiceProgress: document.getElementById("practiceProgress"),
    progressBar: document.getElementById("progressBar"),
    continueButton: document.getElementById("continueButton"),
    allScenariosButton: document.getElementById("allScenariosButton"),
    headerSavedButton: document.getElementById("headerSavedButton"),
    savedList: document.getElementById("savedList"),
    savedEmpty: document.getElementById("savedEmpty"),
    browsePhrasesButton: document.getElementById("browsePhrasesButton"),
    sheet: document.getElementById("practiceSheet"),
    sheetBackdrop: document.getElementById("sheetBackdrop"),
    sheetTitle: document.getElementById("practiceSheetTitle"),
    sheetKicker: document.getElementById("practiceSheetKicker"),
    practiceCard: document.getElementById("practiceCard"),
    closeSheetButton: document.getElementById("closeSheetButton"),
    toast: document.getElementById("toast")
  };

  let state = loadState();
  let activeFilter = "all";
  let activePractice = null;
  let lastFocusedElement = null;
  let toastTimer = null;
  let recorder = null;
  let recorderStream = null;
  let recorderChunks = [];
  let recordingButton = null;
  let currentRecordingUrl = null;

  function todayKey() {
    return new Intl.DateTimeFormat("en-CA", {
      timeZone: "Asia/Singapore",
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    }).format(new Date());
  }

  function defaultState() {
    return {
      saved: [],
      schedule: {},
      daily: { date: "", queue: [], completed: [] }
    };
  }

  function loadState() {
    try {
      const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY));
      const base = defaultState();
      if (!parsed || typeof parsed !== "object") return base;
      return {
        saved: Array.isArray(parsed.saved) ? parsed.saved.filter((id) => phraseById.has(id)) : [],
        schedule: parsed.schedule && typeof parsed.schedule === "object" ? parsed.schedule : {},
        daily: parsed.daily && typeof parsed.daily === "object" ? parsed.daily : base.daily
      };
    } catch (_) {
      return defaultState();
    }
  }

  function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  function hashString(value) {
    let hash = 2166136261;
    for (let index = 0; index < value.length; index += 1) {
      hash ^= value.charCodeAt(index);
      hash = Math.imul(hash, 16777619);
    }
    return hash >>> 0;
  }

  function seededShuffle(items, seedText) {
    let seed = hashString(seedText) || 1;
    const shuffled = [...items];
    const random = () => {
      seed ^= seed << 13;
      seed ^= seed >>> 17;
      seed ^= seed << 5;
      return (seed >>> 0) / 4294967296;
    };
    for (let index = shuffled.length - 1; index > 0; index -= 1) {
      const swapWith = Math.floor(random() * (index + 1));
      [shuffled[index], shuffled[swapWith]] = [shuffled[swapWith], shuffled[index]];
    }
    return shuffled;
  }

  function ensureDailyQueue() {
    const date = todayKey();
    const queueIsValid = state.daily.date === date &&
      Array.isArray(state.daily.queue) &&
      state.daily.queue.length > 0 &&
      state.daily.queue.every((id) => phraseById.has(id));

    if (queueIsValid) {
      state.daily.completed = Array.isArray(state.daily.completed)
        ? state.daily.completed.filter((id) => state.daily.queue.includes(id))
        : [];
      return;
    }

    const due = phrases.filter((phrase) => {
      const item = state.schedule[phrase.id];
      return !item || !item.due || item.due <= date;
    });
    const remaining = phrases.filter((phrase) => !due.includes(phrase));
    const ordered = [
      ...seededShuffle(due, `${date}-due`),
      ...seededShuffle(remaining, `${date}-later`)
    ];

    state.daily = {
      date,
      queue: ordered.slice(0, Math.min(DAILY_SIZE, ordered.length)).map((phrase) => phrase.id),
      completed: []
    };
    saveState();
  }

  function addDays(dateString, days) {
    const date = new Date(`${dateString}T12:00:00+08:00`);
    date.setUTCDate(date.getUTCDate() + days);
    return date.toISOString().slice(0, 10);
  }

  function ratePhrase(id, rating) {
    const previous = state.schedule[id] || { interval: 0, reviews: 0 };
    let interval;
    if (rating === "again") interval = 0;
    else if (rating === "easy") interval = previous.interval ? Math.max(4, Math.round(previous.interval * 2.7)) : 4;
    else interval = previous.interval ? Math.max(1, Math.round(previous.interval * 2.1)) : 1;

    state.schedule[id] = {
      interval,
      reviews: (previous.reviews || 0) + 1,
      lastRating: rating,
      lastReviewed: todayKey(),
      due: addDays(todayKey(), interval)
    };
    saveState();
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function normalize(value) {
    return String(value)
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim();
  }

  function categoryName(id) {
    return categoryById.get(id)?.name || "Clinical phrase";
  }

  function procedureName(id) {
    return procedureById.get(id)?.name || "Procedure";
  }

  function phraseLabel(phrase) {
    if (phrase.procedure) {
      return [procedureName(phrase.procedure), phrase.stage].filter(Boolean).join(" · ");
    }
    return categoryName(phrase.category);
  }

  function riskLabel(risk) {
    if (risk === "red") return "Interpreter advised";
    if (risk === "amber") return "Check understanding";
    if (risk === "consent") return "Consent discussion";
    return "Routine history";
  }

  function phraseCardMarkup(phrase, { showRatings = false } = {}) {
    const isSaved = state.saved.includes(phrase.id);
    const responses = phrase.responses?.length
      ? `<div class="response-panel">
          <p class="response-heading">Patient may say</p>
          ${phrase.responses.map((response) => `
            <div class="response-item">
              <p class="response-pinyin">${escapeHtml(response.pinyin)}</p>
              <p class="response-english">${escapeHtml(response.english)}</p>
            </div>`).join("")}
        </div>`
      : "";
    const note = phrase.note
      ? `<div class="safety-note ${phrase.risk === "red" ? "red" : ""}"><span aria-hidden="true">${phrase.risk === "red" ? "!" : "i"}</span><span>${escapeHtml(phrase.note)}</span></div>`
      : "";
    const ratings = showRatings
      ? `<div class="rating-row" aria-label="Rate this phrase">
          <button class="rating-button again" type="button" data-rating="again" data-phrase-id="${phrase.id}">Again</button>
          <button class="rating-button" type="button" data-rating="good" data-phrase-id="${phrase.id}">Good</button>
          <button class="rating-button" type="button" data-rating="easy" data-phrase-id="${phrase.id}">Easy</button>
        </div>`
      : "";

    return `
      <article class="phrase-card" data-card-id="${phrase.id}">
        <div class="phrase-card-main">
          <div class="phrase-card-top">
            <div>
              <p class="phrase-label">${escapeHtml(phraseLabel(phrase))}</p>
              <span class="risk ${phrase.risk}">${riskLabel(phrase.risk)}</span>
            </div>
            <button class="save-button ${isSaved ? "saved" : ""}" type="button" data-save-id="${phrase.id}" aria-label="${isSaved ? "Remove from" : "Add to"} saved phrases" aria-pressed="${isSaved}">${isSaved ? "♥" : "♡"}</button>
          </div>
          <p class="pinyin" lang="zh-Latn">${escapeHtml(phrase.pinyin)}</p>
          <p class="translation">${escapeHtml(phrase.english)}</p>
          ${note}
          <div class="audio-row" aria-label="Pronunciation controls">
            <button class="audio-button" type="button" data-speak-id="${phrase.id}" data-speed="normal"><span class="control-icon" aria-hidden="true">◖</span> Hear</button>
            <button class="audio-button" type="button" data-speak-id="${phrase.id}" data-speed="slow"><span class="control-icon" aria-hidden="true">◷</span> Slow</button>
            <button class="audio-button record-button" type="button" data-record-id="${phrase.id}"><span class="control-icon" aria-hidden="true">●</span> <span class="record-label">Record</span></button>
          </div>
          <div class="recording-slot"></div>
        </div>
        ${responses}
      </article>
      ${ratings}`;
  }

  function listItemMarkup(phrase) {
    return `
      <button class="phrase-list-item" type="button" data-open-phrase="${phrase.id}">
        <span>
          <span class="list-pinyin" lang="zh-Latn">${escapeHtml(phrase.pinyin)}</span>
          <span class="list-english">${escapeHtml(phrase.english)}</span>
          <span class="list-category">${escapeHtml(phraseLabel(phrase))}</span>
        </span>
        <span class="list-chevron" aria-hidden="true">›</span>
      </button>`;
  }

  function renderHome() {
    ensureDailyQueue();
    const completed = state.daily.completed.length;
    const total = state.daily.queue.length;
    els.practiceProgress.textContent = `${completed} of ${total} phrases`;
    els.progressBar.style.width = `${total ? (completed / total) * 100 : 0}%`;
    els.continueButton.textContent = completed === 0 ? "Start" : completed >= total ? "Review" : "Continue";

    const featuredIds = ["breathlessness", "cough", "asthma", "investigation"];
    els.featuredScenarios.innerHTML = featuredIds.map((id) => {
      const category = categoryById.get(id);
      const count = phrases.filter((phrase) => phrase.category === id).length;
      return `<button class="scenario-tile" type="button" data-scenario="${id}">
        <span class="scenario-symbol" aria-hidden="true">${category.symbol}</span>
        <span class="scenario-name">${escapeHtml(category.shortName)}</span>
        <span class="scenario-count">${count} phrases</span>
      </button>`;
    }).join("");

    renderProcedureCards(els.featuredProcedures);

    const index = hashString(todayKey()) % phrases.length;
    els.dailyPhraseCard.innerHTML = phraseCardMarkup(phrases[index]);
  }

  function renderFilters() {
    const filterItems = [{ id: "all", shortName: "All" }, ...categories];
    els.categoryFilters.innerHTML = filterItems.map((category) => `
      <button class="filter-chip ${activeFilter === category.id ? "active" : ""}" type="button" data-filter="${category.id}" aria-pressed="${activeFilter === category.id}">
        ${escapeHtml(category.shortName)}
      </button>`).join("");
  }

  function renderPhrases() {
    const query = normalize(els.phraseSearch.value);
    const matches = phrases.filter((phrase) => {
      if (activeFilter !== "all" && phrase.category !== activeFilter) return false;
      if (!query) return true;
      const haystack = normalize(`${phrase.pinyin} ${phrase.english} ${phraseLabel(phrase)}`);
      return haystack.includes(query);
    });
    els.phraseResultCount.textContent = `${matches.length} phrase${matches.length === 1 ? "" : "s"}`;
    els.phraseList.innerHTML = matches.length
      ? matches.map(listItemMarkup).join("")
      : `<div class="empty-state"><span class="empty-icon" aria-hidden="true">⌕</span><h2>No matching phrases</h2><p>Try a shorter English or pinyin search.</p></div>`;
    renderFilters();
  }

  function renderScenarios() {
    els.scenarioList.innerHTML = categories.filter((category) => category.id !== "procedure").map((category) => {
      const count = phrases.filter((phrase) => phrase.category === category.id).length;
      return `<button class="scenario-row" type="button" data-scenario="${category.id}">
        <span class="scenario-row-symbol" aria-hidden="true">${category.symbol}</span>
        <span><h2>${escapeHtml(category.name)}</h2><p>${escapeHtml(category.description)} · ${count} phrases</p></span>
        <span class="scenario-row-arrow" aria-hidden="true">›</span>
      </button>`;
    }).join("");
    renderProcedureCards(els.scenarioProcedures);
  }

  function renderProcedureCards(target) {
    if (!target) return;
    target.innerHTML = procedures.map((procedure) => {
      const count = phrases.filter((phrase) => phrase.procedure === procedure.id).length;
      return `<button class="procedure-card" type="button" data-procedure="${procedure.id}">
        <span class="procedure-symbol" aria-hidden="true">${procedure.symbol}</span>
        <span>
          <h3>${escapeHtml(procedure.name)}</h3>
          <p>${escapeHtml(procedure.description)}</p>
          <span class="procedure-card-meta">${count} consent phrases</span>
        </span>
        <span class="procedure-arrow" aria-hidden="true">›</span>
      </button>`;
    }).join("");
  }

  function renderSaved() {
    const savedPhrases = state.saved.map((id) => phraseById.get(id)).filter(Boolean);
    els.savedList.innerHTML = savedPhrases.map(listItemMarkup).join("");
    els.savedEmpty.hidden = savedPhrases.length > 0;
    els.savedList.hidden = savedPhrases.length === 0;
    els.headerSavedButton.querySelector("span").textContent = savedPhrases.length ? "♥" : "♡";
  }

  function renderAll() {
    renderHome();
    renderPhrases();
    renderScenarios();
    renderSaved();
  }

  function setView(name) {
    const target = document.getElementById(`${name}View`);
    if (!target) return;
    els.views.forEach((view) => {
      const active = view === target;
      view.hidden = !active;
      view.classList.toggle("active", active);
    });
    els.navItems.forEach((button) => {
      const active = button.dataset.view === name;
      button.classList.toggle("active", active);
      if (active) button.setAttribute("aria-current", "page");
      else button.removeAttribute("aria-current");
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
    els.app.focus({ preventScroll: true });
    if (name === "phrases") renderPhrases();
    if (name === "saved") renderSaved();
  }

  function openPractice(queue, { mode, title, startIndex = 0 } = {}) {
    const validQueue = queue.filter((id) => phraseById.has(id));
    if (!validQueue.length) return;
    lastFocusedElement = document.activeElement;
    activePractice = { queue: validQueue, index: Math.min(startIndex, validQueue.length - 1), mode, title };
    els.sheet.hidden = false;
    els.sheetBackdrop.hidden = false;
    document.body.classList.add("sheet-open");
    renderPractice();
    window.setTimeout(() => els.closeSheetButton.focus(), 0);
  }

  function openDailyPractice() {
    ensureDailyQueue();
    const firstIncomplete = state.daily.queue.findIndex((id) => !state.daily.completed.includes(id));
    openPractice(state.daily.queue, {
      mode: "daily",
      title: "Today’s practice",
      startIndex: firstIncomplete < 0 ? 0 : firstIncomplete
    });
  }

  function openScenario(categoryId) {
    const category = categoryById.get(categoryId);
    const queue = phrases.filter((phrase) => phrase.category === categoryId).map((phrase) => phrase.id);
    openPractice(queue, { mode: "scenario", title: category?.name || "Scenario" });
  }

  function openProcedure(procedureId) {
    const procedure = procedureById.get(procedureId);
    const queue = phrases.filter((phrase) => phrase.procedure === procedureId).map((phrase) => phrase.id);
    openPractice(queue, { mode: "procedure", title: procedure?.name || "Procedure consent" });
  }

  function openSinglePhrase(id) {
    openPractice([id], { mode: "single", title: "Quick reference" });
  }

  function renderPractice() {
    if (!activePractice) return;
    const id = activePractice.queue[activePractice.index];
    const phrase = phraseById.get(id);
    els.sheetKicker.textContent = activePractice.title;
    els.sheetTitle.textContent = activePractice.queue.length > 1
      ? `Phrase ${activePractice.index + 1} of ${activePractice.queue.length}`
      : "Phrase";
    els.practiceCard.innerHTML = phraseCardMarkup(phrase, { showRatings: true });
  }

  function closePractice() {
    stopSpeech();
    stopRecording(true);
    els.sheet.hidden = true;
    els.sheetBackdrop.hidden = true;
    document.body.classList.remove("sheet-open");
    activePractice = null;
    renderAll();
    if (lastFocusedElement?.focus) lastFocusedElement.focus();
  }

  function handleRating(id, rating) {
    ratePhrase(id, rating);
    if (!activePractice) return;

    if (activePractice.mode === "daily" && !state.daily.completed.includes(id)) {
      state.daily.completed.push(id);
      saveState();
    }

    if (activePractice.index < activePractice.queue.length - 1) {
      activePractice.index += 1;
      renderPractice();
      els.sheet.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const message = activePractice.mode === "daily"
      ? "Today’s practice complete. Nicely done."
      : activePractice.mode === "procedure"
        ? "Consent pathway complete."
        : activePractice.mode === "scenario"
          ? "Scenario complete."
        : "Review saved.";
    closePractice();
    showToast(message);
  }

  function toggleSaved(id) {
    if (state.saved.includes(id)) {
      state.saved = state.saved.filter((savedId) => savedId !== id);
      showToast("Removed from saved phrases.");
    } else {
      state.saved.unshift(id);
      showToast("Saved on this device.");
    }
    saveState();
    renderAll();
    if (activePractice) renderPractice();
  }

  function preferredVoice() {
    const voices = window.speechSynthesis?.getVoices?.() || [];
    return voices.find((voice) => voice.lang.toLowerCase() === "zh-sg") ||
      voices.find((voice) => voice.lang.toLowerCase().startsWith("zh-cn")) ||
      voices.find((voice) => voice.lang.toLowerCase().startsWith("zh"));
  }

  function speakPhrase(id, speed) {
    const phrase = phraseById.get(id);
    if (!phrase || !("speechSynthesis" in window)) {
      showToast("Speech playback is not available in this browser.");
      return;
    }
    stopSpeech();
    const utterance = new SpeechSynthesisUtterance(phrase.spoken);
    const voice = preferredVoice();
    if (voice) utterance.voice = voice;
    utterance.lang = voice?.lang || "zh-SG";
    utterance.rate = speed === "slow" ? 0.58 : 0.82;
    utterance.pitch = 1;
    window.speechSynthesis.speak(utterance);
  }

  function stopSpeech() {
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
  }

  async function toggleRecording(button) {
    if (recorder?.state === "recording") {
      if (button === recordingButton) stopRecording(false);
      else showToast("Stop the current recording first.");
      return;
    }

    if (!navigator.mediaDevices?.getUserMedia || !("MediaRecorder" in window)) {
      showToast("Recording is not available in this browser.");
      return;
    }

    try {
      recorderStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      recorderChunks = [];
      recorder = new MediaRecorder(recorderStream);
      recordingButton = button;
      recorder.addEventListener("dataavailable", (event) => {
        if (event.data.size) recorderChunks.push(event.data);
      });
      recorder.addEventListener("stop", () => finishRecording(button));
      recorder.start();
      button.classList.add("recording");
      button.querySelector(".record-label").textContent = "Stop";
      showToast("Recording started. Tap Stop when you finish.");
    } catch (_) {
      showToast("Microphone permission was not granted.");
      cleanupRecorder();
    }
  }

  function stopRecording(discard) {
    if (!recorder || recorder.state !== "recording") {
      cleanupRecorder();
      return;
    }
    recorder._discard = discard;
    recorder.stop();
  }

  function finishRecording(button) {
    const discard = recorder?._discard;
    if (!discard && recorderChunks.length) {
      if (currentRecordingUrl) URL.revokeObjectURL(currentRecordingUrl);
      const blob = new Blob(recorderChunks, { type: recorder.mimeType || "audio/webm" });
      currentRecordingUrl = URL.createObjectURL(blob);
      const card = button.closest(".phrase-card");
      const slot = card?.querySelector(".recording-slot");
      if (slot) {
        slot.innerHTML = `<div class="recording-playback"><span class="sr-only">Your recording</span><audio controls src="${currentRecordingUrl}"></audio></div>`;
      }
      showToast("Recording ready for playback. It stays on this device.");
    }
    cleanupRecorder();
  }

  function cleanupRecorder() {
    recorderStream?.getTracks().forEach((track) => track.stop());
    if (recordingButton) {
      recordingButton.classList.remove("recording");
      const label = recordingButton.querySelector(".record-label");
      if (label) label.textContent = "Record";
    }
    recorder = null;
    recorderStream = null;
    recorderChunks = [];
    recordingButton = null;
  }

  function showToast(message) {
    window.clearTimeout(toastTimer);
    els.toast.textContent = message;
    els.toast.classList.add("show");
    toastTimer = window.setTimeout(() => els.toast.classList.remove("show"), 2600);
  }

  function handleAction(event) {
    const saveButton = event.target.closest("[data-save-id]");
    if (saveButton) return toggleSaved(saveButton.dataset.saveId);

    const speakButton = event.target.closest("[data-speak-id]");
    if (speakButton) return speakPhrase(speakButton.dataset.speakId, speakButton.dataset.speed);

    const recordButton = event.target.closest("[data-record-id]");
    if (recordButton) return toggleRecording(recordButton);

    const ratingButton = event.target.closest("[data-rating]");
    if (ratingButton) return handleRating(ratingButton.dataset.phraseId, ratingButton.dataset.rating);

    const phraseButton = event.target.closest("[data-open-phrase]");
    if (phraseButton) return openSinglePhrase(phraseButton.dataset.openPhrase);

    const scenarioButton = event.target.closest("[data-scenario]");
    if (scenarioButton) return openScenario(scenarioButton.dataset.scenario);

    const procedureButton = event.target.closest("[data-procedure]");
    if (procedureButton) return openProcedure(procedureButton.dataset.procedure);

    const filterButton = event.target.closest("[data-filter]");
    if (filterButton) {
      activeFilter = filterButton.dataset.filter;
      renderPhrases();
    }
  }

  els.navItems.forEach((button) => button.addEventListener("click", () => setView(button.dataset.view)));
  document.addEventListener("click", handleAction);
  els.continueButton.addEventListener("click", openDailyPractice);
  els.allScenariosButton.addEventListener("click", () => setView("scenarios"));
  els.headerSavedButton.addEventListener("click", () => setView("saved"));
  els.browsePhrasesButton.addEventListener("click", () => setView("phrases"));
  els.closeSheetButton.addEventListener("click", closePractice);
  els.sheetBackdrop.addEventListener("click", closePractice);
  els.phraseSearch.addEventListener("input", renderPhrases);
  els.homeSearch.addEventListener("input", () => {
    if (!els.homeSearch.value.trim()) return;
    els.phraseSearch.value = els.homeSearch.value;
    setView("phrases");
    els.phraseSearch.focus();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !els.sheet.hidden) closePractice();
  });

  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => navigator.serviceWorker.register("sw.js").catch(() => {}));
  }

  ensureDailyQueue();
  renderAll();
})();
