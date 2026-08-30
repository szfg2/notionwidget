  (function () {
    "use strict";

    var WORDS = [
      { word: "CAT", emoji: "🐱", label: "Cat", length: 3 },
      { word: "DOG", emoji: "🐶", label: "Dog", length: 3 },
      { word: "SUN", emoji: "☀️", label: "Sun", length: 3 },
      { word: "BUS", emoji: "🚌", label: "Bus", length: 3 },
      { word: "PIG", emoji: "🐷", label: "Pig", length: 3 },
      { word: "CUP", emoji: "🥤", label: "Cup", length: 3 },
      { word: "HAT", emoji: "🎩", label: "Hat", length: 3 },
      { word: "BEE", emoji: "🐝", label: "Bee", length: 3 },
      { word: "FOX", emoji: "🦊", label: "Fox", length: 3 },
      { word: "CAR", emoji: "🚗", label: "Car", length: 3 },
      { word: "BED", emoji: "🛏️", label: "Bed", length: 3 },
      { word: "MAP", emoji: "🗺️", label: "Map", length: 3 },
      { word: "FISH", emoji: "🐟", label: "Fish", length: 4 },
      { word: "DUCK", emoji: "🦆", label: "Duck", length: 4 },
      { word: "LION", emoji: "🦁", label: "Lion", length: 4 },
      { word: "BEAR", emoji: "🐻", label: "Bear", length: 4 },
      { word: "MOON", emoji: "🌙", label: "Moon", length: 4 },
      { word: "STAR", emoji: "⭐", label: "Star", length: 4 },
      { word: "CAKE", emoji: "🎂", label: "Cake", length: 4 },
      { word: "BOAT", emoji: "⛵", label: "Boat", length: 4 },
      { word: "BOOK", emoji: "📕", label: "Book", length: 4 },
      { word: "FROG", emoji: "🐸", label: "Frog", length: 4 },
      { word: "MILK", emoji: "🥛", label: "Milk", length: 4 },
      { word: "TREE", emoji: "🌳", label: "Tree", length: 4 }
    ];

    var TILE_COLORS = ["#ff806f", "#ffc928", "#58adf6", "#76d7a1"];
    var STORE_KEY = "spell-and-play-settings-v1";
    var PROGRESS_KEY = "spell-and-play-progress-v1";
    var settings = readJSON(STORE_KEY, { level: "3", guides: false, sound: true });
    var progress = readJSON(PROGRESS_KEY, { totalWords: 0 });
    var current = null;
    var recentWords = [];
    var placed = [];
    var tiles = [];
    var starCount = 0;
    var solved = false;
    var hintActive = false;
    var hintTimer = 0;
    var audioContext = null;
    var dragState = null;
    var preferredVoice = null;
    var activeUtterance = null;
    var speechRequestId = 0;
    var speechStartTimer = 0;
    var speechFinishTimer = 0;

    var starsEl = document.getElementById("stars");
    var pictureEl = document.getElementById("wordPicture");
    var slotsEl = document.getElementById("letterSlots");
    var bankEl = document.getElementById("letterBank");
    var listenButton = document.getElementById("listenButton");
    var checkButton = document.getElementById("checkButton");
    var hintButton = document.getElementById("hintButton");
    var statusMessage = document.getElementById("statusMessage");
    var gameCard = document.getElementById("gameCard");
    var celebration = document.getElementById("celebration");
    var celebrationWord = document.getElementById("celebrationWord");
    var levelPill = document.getElementById("levelPill").querySelector("span");
    var settingsDialog = document.getElementById("settingsDialog");
    var settingsForm = document.getElementById("settingsForm");
    var parentButton = document.getElementById("parentButton");
    var holdTimer = 0;

    function readJSON(key, fallback) {
      try {
        var value = JSON.parse(localStorage.getItem(key));
        return value && typeof value === "object" ? Object.assign({}, fallback, value) : fallback;
      } catch (error) {
        return fallback;
      }
    }

    function saveJSON(key, value) {
      try { localStorage.setItem(key, JSON.stringify(value)); } catch (error) {}
    }

    function shuffle(list) {
      var copy = list.slice();
      for (var i = copy.length - 1; i > 0; i -= 1) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = copy[i];
        copy[i] = copy[j];
        copy[j] = temp;
      }
      return copy;
    }

    function pickWord() {
      var allowed = WORDS.filter(function (entry) {
        return settings.level === "mix" || String(entry.length) === settings.level;
      });
      var fresh = allowed.filter(function (entry) { return recentWords.indexOf(entry.word) === -1; });
      var pool = fresh.length ? fresh : allowed;
      return pool[Math.floor(Math.random() * pool.length)];
    }

    function makeTiles(word) {
      return shuffle(word.split("").map(function (letter, index) {
        return { id: "tile-" + Date.now() + "-" + index, letter: letter, used: false, color: TILE_COLORS[index % TILE_COLORS.length] };
      }));
    }

    function newRound() {
      window.clearTimeout(hintTimer);
      current = pickWord();
      recentWords.push(current.word);
      if (recentWords.length > 4) recentWords.shift();
      placed = new Array(current.word.length).fill(null);
      tiles = makeTiles(current.word);
      solved = false;
      hintActive = false;
      celebration.classList.remove("on");
      celebration.innerHTML = '<div class="yay-card">You did it!<small id="celebrationWord">' + current.word + "</small></div>";
      celebrationWord = celebration.querySelector("small");
      pictureEl.textContent = current.emoji;
      pictureEl.setAttribute("aria-label", current.label);
      checkButton.textContent = "Check";
      checkButton.disabled = true;
      hintButton.disabled = false;
      setStatus("Tap the letters in order", false);
      updateLevelPill();
      render();
    }

    function render() {
      renderStars();
      renderSlots();
      renderTiles();
      checkButton.disabled = !solved && placed.some(function (item) { return !item; });
    }

    function renderStars() {
      starsEl.innerHTML = "";
      for (var i = 0; i < 5; i += 1) {
        var star = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        star.setAttribute("viewBox", "0 0 24 24");
        star.setAttribute("aria-hidden", "true");
        star.classList.add("star");
        if (i < starCount) star.classList.add("filled");
        star.innerHTML = '<path fill="currentColor" d="m12 1.8 3.15 6.39 7.05 1.02-5.1 4.97 1.2 7.02L12 17.89 5.7 21.2l1.2-7.02-5.1-4.97 7.05-1.02L12 1.8Z"/>';
        starsEl.appendChild(star);
      }
      starsEl.setAttribute("aria-label", starCount + " of 5 stars");
    }

    function renderSlots() {
      slotsEl.innerHTML = "";
      placed.forEach(function (item, index) {
        var slot = document.createElement("button");
        slot.type = "button";
        slot.className = "letter-slot" + (item ? " filled" : "");
        slot.dataset.index = String(index);
        slot.setAttribute("aria-label", item ? "Letter " + item.letter + ". Tap to return it." : "Empty letter box " + (index + 1));
        if ((settings.guides || hintActive) && !item) slot.dataset.hint = current.word.charAt(index);
        if (item) slot.textContent = item.letter;
        slot.addEventListener("click", function () { returnTile(index); });
        slotsEl.appendChild(slot);
      });
    }

    function renderTiles() {
      bankEl.innerHTML = "";
      tiles.forEach(function (item) {
        var tile = document.createElement("button");
        tile.type = "button";
        tile.className = "letter-tile" + (item.used ? " used" : "");
        tile.style.setProperty("--tile-color", item.color);
        tile.textContent = item.letter;
        tile.dataset.tileId = item.id;
        tile.setAttribute("aria-label", "Letter " + item.letter);
        tile.setAttribute("aria-pressed", item.used ? "true" : "false");
        tile.disabled = item.used || solved;
        tile.addEventListener("click", function () {
          if (tile.dataset.ignoreClick === "true") {
            tile.dataset.ignoreClick = "false";
            return;
          }
          placeTile(item.id);
        });
        enablePointerDrag(tile, item);
        bankEl.appendChild(tile);
      });
    }

    function firstEmptySlot() {
      return placed.findIndex(function (item) { return !item; });
    }

    function placeTile(tileId, requestedIndex) {
      if (solved) return;
      var tile = tiles.find(function (item) { return item.id === tileId; });
      var slotIndex = typeof requestedIndex === "number" ? requestedIndex : firstEmptySlot();
      if (!tile || tile.used || slotIndex < 0 || placed[slotIndex]) return;
      tile.used = true;
      placed[slotIndex] = tile;
      playPop(slotIndex);
      render();
      if (firstEmptySlot() === -1) setStatus("Ready to check!", false);
    }

    function returnTile(index) {
      if (solved || !placed[index]) return;
      placed[index].used = false;
      placed[index] = null;
      setStatus("Tap the letters in order", false);
      render();
    }

    function resetLetters() {
      placed.forEach(function (item) { if (item) item.used = false; });
      placed = new Array(current.word.length).fill(null);
      render();
    }

    function answer() {
      return placed.map(function (item) { return item ? item.letter : ""; }).join("");
    }

    function checkAnswer() {
      if (solved) {
        if (starCount >= 5) starCount = 0;
        newRound();
        return;
      }
      if (answer() === current.word) celebrateCorrect();
      else gentleRetry();
    }

    function celebrateCorrect() {
      solved = true;
      starCount += 1;
      progress.totalWords = Number(progress.totalWords || 0) + 1;
      saveJSON(PROGRESS_KEY, progress);
      setStatus("Wonderful spelling!", true);
      checkButton.textContent = starCount >= 5 ? "Play again" : "Next word";
      checkButton.disabled = false;
      hintButton.disabled = true;
      renderStars();
      playSuccess();
      speak("Great job! " + current.label + ".");
      showCelebration();
      renderTiles();
    }

    function gentleRetry() {
      setStatus("Almost! Let’s listen and try again.", false);
      gameCard.classList.remove("try-again");
      void gameCard.offsetWidth;
      gameCard.classList.add("try-again");
      playTryAgain();
      speak("Almost. Let's listen again. " + current.label + ".");
      window.setTimeout(function () {
        gameCard.classList.remove("try-again");
        resetLetters();
        showHint();
      }, 720);
    }

    function showHint() {
      if (solved) return;
      window.clearTimeout(hintTimer);
      hintActive = true;
      renderSlots();
      var wantedIndex = firstEmptySlot();
      if (wantedIndex < 0) wantedIndex = 0;
      var wanted = current.word.charAt(wantedIndex);
      var tileEl = Array.prototype.find.call(bankEl.querySelectorAll(".letter-tile"), function (el) {
        var tile = tiles.find(function (item) { return item.id === el.dataset.tileId; });
        return tile && !tile.used && tile.letter === wanted;
      });
      if (tileEl) {
        tileEl.classList.remove("hint-tile");
        void tileEl.offsetWidth;
        tileEl.classList.add("hint-tile");
      }
      speak("Look for " + wanted + ".");
      hintTimer = window.setTimeout(function () {
        hintActive = false;
        renderSlots();
      }, 3000);
    }

    function setStatus(text, success) {
      statusMessage.textContent = text;
      statusMessage.classList.toggle("success", !!success);
    }

    function updateLevelPill() {
      if (settings.level === "4") levelPill.textContent = "Growing Speller • 4 letters";
      else if (settings.level === "mix") levelPill.textContent = "Mix It Up • 3–4 letters";
      else levelPill.textContent = "Little Learner • 3 letters";
    }

    function showCelebration() {
      celebration.classList.add("on");
      var colors = ["#ff806f", "#ffc928", "#58adf6", "#43bd68", "#8e74e8"];
      for (var i = 0; i < 30; i += 1) {
        var piece = document.createElement("span");
        piece.className = "confetti";
        piece.style.left = Math.round(Math.random() * 100) + "%";
        piece.style.background = colors[i % colors.length];
        piece.style.animationDelay = Math.random() * .35 + "s";
        piece.style.setProperty("--fall-x", Math.round(Math.random() * 180 - 90) + "px");
        celebration.appendChild(piece);
      }
      window.setTimeout(function () { celebration.classList.remove("on"); }, 1750);
    }

    function getAudioContext() {
      if (!settings.sound) return null;
      var AudioCtor = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtor) return null;
      if (!audioContext) audioContext = new AudioCtor();
      if (audioContext.state === "suspended") audioContext.resume();
      return audioContext;
    }

    function tone(frequency, duration, delay, volume) {
      var context = getAudioContext();
      if (!context) return;
      var oscillator = context.createOscillator();
      var gain = context.createGain();
      var start = context.currentTime + (delay || 0);
      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(frequency, start);
      gain.gain.setValueAtTime(.0001, start);
      gain.gain.exponentialRampToValueAtTime(volume || .12, start + .015);
      gain.gain.exponentialRampToValueAtTime(.0001, start + duration);
      oscillator.connect(gain);
      gain.connect(context.destination);
      oscillator.start(start);
      oscillator.stop(start + duration + .03);
    }

    function playPop(index) { tone(330 + index * 65, .16, 0, .09); }
    function playTryAgain() { tone(300, .18, 0, .08); tone(260, .2, .16, .07); }
    function playSuccess() { tone(523, .32, 0, .11); tone(659, .34, .11, .11); tone(784, .48, .22, .12); }

    function refreshPreferredVoice() {
      if (!("speechSynthesis" in window)) return null;
      var voices = window.speechSynthesis.getVoices();
      preferredVoice = voices.find(function (voice) {
        return /^en(-|_)/i.test(voice.lang) && /female|samantha|ava|zira/i.test(voice.name);
      }) || voices.find(function (voice) {
        return /^en(-|_)/i.test(voice.lang);
      }) || null;
      return preferredVoice;
    }

    function clearSpeechTimers() {
      window.clearTimeout(speechStartTimer);
      window.clearTimeout(speechFinishTimer);
    }

    function finishSpeech(requestId) {
      if (requestId !== speechRequestId) return;
      clearSpeechTimers();
      activeUtterance = null;
      listenButton.classList.remove("speaking");
    }

    function stopSpeaking() {
      speechRequestId += 1;
      clearSpeechTimers();
      activeUtterance = null;
      listenButton.classList.remove("speaking");
      if ("speechSynthesis" in window) {
        try { window.speechSynthesis.cancel(); } catch (error) {}
      }
    }

    function startSpeech(text, requestId, canRetry, reportProblem) {
      if (requestId !== speechRequestId || !settings.sound) return;
      var synthesis = window.speechSynthesis;
      var started = false;

      try {
        var utterance = new SpeechSynthesisUtterance(text);
        activeUtterance = utterance;
        utterance.rate = .78;
        utterance.pitch = 1.08;
        utterance.volume = 1;
        if (preferredVoice || refreshPreferredVoice()) utterance.voice = preferredVoice;

        utterance.onstart = function () {
          if (requestId !== speechRequestId) return;
          started = true;
          window.clearTimeout(speechStartTimer);
          listenButton.classList.add("speaking");
        };
        utterance.onend = function () { finishSpeech(requestId); };
        utterance.onerror = function () {
          if (requestId !== speechRequestId) return;
          finishSpeech(requestId);
          if (reportProblem) setStatus("Voice paused. Tap the speaker to try again.", false);
        };

        synthesis.resume();
        synthesis.speak(utterance);

        speechStartTimer = window.setTimeout(function () {
          if (started || requestId !== speechRequestId) return;
          utterance.onstart = null;
          utterance.onend = null;
          utterance.onerror = null;
          try { synthesis.cancel(); } catch (error) {}
          clearSpeechTimers();
          activeUtterance = null;

          if (canRetry) {
            window.setTimeout(function () {
              startSpeech(text, requestId, false, reportProblem);
            }, 100);
          } else {
            finishSpeech(requestId);
            if (reportProblem) setStatus("Voice didn’t start. Tap the speaker again.", false);
          }
        }, 1500);

        speechFinishTimer = window.setTimeout(function () {
          finishSpeech(requestId);
        }, 10000);
      } catch (error) {
        finishSpeech(requestId);
        if (reportProblem) setStatus("Voice isn’t available right now. Tap to retry.", false);
      }
    }

    function speak(text, reportProblem) {
      if (!settings.sound) {
        if (reportProblem) setStatus("Voice is off. Hold the family button to turn it on.", false);
        return;
      }
      if (!("speechSynthesis" in window) || !("SpeechSynthesisUtterance" in window)) {
        if (reportProblem) setStatus("Voice isn’t supported on this device.", false);
        return;
      }

      var synthesis = window.speechSynthesis;
      var needsReset = synthesis.speaking || synthesis.pending || synthesis.paused;
      speechRequestId += 1;
      var requestId = speechRequestId;
      clearSpeechTimers();
      activeUtterance = null;
      listenButton.classList.remove("speaking");

      if (needsReset) {
        try { synthesis.cancel(); } catch (error) {}
        window.setTimeout(function () {
          startSpeech(text, requestId, true, !!reportProblem);
        }, 80);
      } else {
        startSpeech(text, requestId, true, !!reportProblem);
      }
    }

    function speakWord() {
      playPop(1);
      speak("Can you spell " + current.label + "? " + current.label + ".", true);
    }

    function enablePointerDrag(element, item) {
      element.addEventListener("pointerdown", function (event) {
        if (event.button !== 0 || item.used || solved) return;
        dragState = { id: item.id, pointerId: event.pointerId, startX: event.clientX, startY: event.clientY, dragging: false, origin: element, ghost: null };
        try { element.setPointerCapture(event.pointerId); } catch (error) {}
      });

      element.addEventListener("pointermove", function (event) {
        if (!dragState || dragState.pointerId !== event.pointerId) return;
        var distance = Math.hypot(event.clientX - dragState.startX, event.clientY - dragState.startY);
        if (!dragState.dragging && distance > 9) {
          dragState.dragging = true;
          element.classList.add("drag-origin");
          var ghost = document.createElement("div");
          ghost.className = "drag-ghost";
          ghost.textContent = item.letter;
          ghost.style.background = item.color;
          document.body.appendChild(ghost);
          dragState.ghost = ghost;
        }
        if (dragState.dragging) {
          event.preventDefault();
          dragState.ghost.style.left = event.clientX + "px";
          dragState.ghost.style.top = event.clientY + "px";
          markDropTarget(event.clientX, event.clientY);
        }
      });

      element.addEventListener("pointerup", finishDrag);
      element.addEventListener("pointercancel", cancelDrag);
    }

    function markDropTarget(x, y) {
      slotsEl.querySelectorAll(".letter-slot").forEach(function (slot) { slot.classList.remove("drop-ready"); });
      var target = document.elementFromPoint(x, y);
      var slot = target && target.closest ? target.closest(".letter-slot") : null;
      if (slot && !placed[Number(slot.dataset.index)]) slot.classList.add("drop-ready");
    }

    function finishDrag(event) {
      if (!dragState || dragState.pointerId !== event.pointerId) return;
      var state = dragState;
      var wasDragging = state.dragging;
      var target = wasDragging ? document.elementFromPoint(event.clientX, event.clientY) : null;
      var slot = target && target.closest ? target.closest(".letter-slot") : null;
      cleanupDrag();
      if (wasDragging) {
        state.origin.dataset.ignoreClick = "true";
        if (slot) placeTile(state.id, Number(slot.dataset.index));
      }
    }

    function cancelDrag() { if (dragState) cleanupDrag(); }

    function cleanupDrag() {
      if (!dragState) return;
      dragState.origin.classList.remove("drag-origin");
      if (dragState.ghost) dragState.ghost.remove();
      slotsEl.querySelectorAll(".letter-slot").forEach(function (slot) { slot.classList.remove("drop-ready"); });
      dragState = null;
    }

    function openSettings() {
      parentButton.classList.remove("holding");
      settingsForm.querySelector('input[name="level"][value="' + settings.level + '"]').checked = true;
      document.getElementById("guideSetting").checked = !!settings.guides;
      document.getElementById("soundSetting").checked = !!settings.sound;
      if (typeof settingsDialog.showModal === "function") settingsDialog.showModal();
      else settingsDialog.setAttribute("open", "");
    }

    function beginParentHold(event) {
      if (event.pointerType === "mouse" && event.button !== 0) return;
      window.clearTimeout(holdTimer);
      parentButton.classList.add("holding");
      holdTimer = window.setTimeout(openSettings, 1200);
    }

    function cancelParentHold() {
      window.clearTimeout(holdTimer);
      parentButton.classList.remove("holding");
    }

    parentButton.addEventListener("pointerdown", beginParentHold);
    parentButton.addEventListener("pointerup", cancelParentHold);
    parentButton.addEventListener("pointerleave", cancelParentHold);
    parentButton.addEventListener("pointercancel", cancelParentHold);
    parentButton.addEventListener("keydown", function (event) {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openSettings();
      }
    });

    document.getElementById("closeSettings").addEventListener("click", function () { settingsDialog.close(); });
    settingsForm.addEventListener("submit", function (event) {
      event.preventDefault();
      var chosen = settingsForm.querySelector('input[name="level"]:checked');
      var soundWasEnabled = settings.sound;
      settings.level = chosen ? chosen.value : "3";
      settings.guides = document.getElementById("guideSetting").checked;
      settings.sound = document.getElementById("soundSetting").checked;
      if (!settings.sound) stopSpeaking();
      else if (!soundWasEnabled) refreshPreferredVoice();
      saveJSON(STORE_KEY, settings);
      settingsDialog.close();
      starCount = 0;
      newRound();
    });

    listenButton.addEventListener("click", speakWord);
    hintButton.addEventListener("click", showHint);
    checkButton.addEventListener("click", checkAnswer);
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) stopSpeaking();
    });
    window.addEventListener("pageshow", function () {
      if (!("speechSynthesis" in window)) return;
      try { window.speechSynthesis.resume(); } catch (error) {}
      refreshPreferredVoice();
    });

    if ("speechSynthesis" in window) {
      refreshPreferredVoice();
      if (typeof window.speechSynthesis.addEventListener === "function") {
        window.speechSynthesis.addEventListener("voiceschanged", refreshPreferredVoice);
      } else {
        window.speechSynthesis.onvoiceschanged = refreshPreferredVoice;
      }
    }

    if ("serviceWorker" in navigator) {
      var reloadingForUpdate = false;
      navigator.serviceWorker.addEventListener("controllerchange", function () {
        if (reloadingForUpdate) return;
        reloadingForUpdate = true;
        window.location.reload();
      });
      window.addEventListener("load", function () {
        navigator.serviceWorker.register("./sw.js").catch(function () {
          // The game remains fully usable when service workers are unavailable.
        });
      });
    }

    newRound();
  }());
