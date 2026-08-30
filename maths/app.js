(function () {
  "use strict";

  var COUNT_OBJECTS = [
    { emoji: "🍎", singular: "apple", plural: "apples" },
    { emoji: "🦆", singular: "duck", plural: "ducks" },
    { emoji: "🚗", singular: "car", plural: "cars" },
    { emoji: "⭐", singular: "star", plural: "stars" },
    { emoji: "🐟", singular: "fish", plural: "fish" },
    { emoji: "🧸", singular: "teddy bear", plural: "teddy bears" },
    { emoji: "🍓", singular: "strawberry", plural: "strawberries" },
    { emoji: "⚽", singular: "ball", plural: "balls" }
  ];
  var SHAPES = ["circle", "square", "triangle"];
  var ANSWER_COLORS = ["#ff806f", "#ffc928", "#58adf6"];
  var NUMBER_WORDS = ["zero", "one", "two", "three", "four", "five"];
  var STORE_KEY = "count-and-play-settings-v1";
  var PROGRESS_KEY = "count-and-play-progress-v1";

  var settings = readJSON(STORE_KEY, { level: "first", sound: true, autoHint: false });
  var progress = readJSON(PROGRESS_KEY, { totalActivities: 0 });
  var currentQuestion = null;
  var recentSignatures = [];
  var lastActivityType = "";
  var starCount = 0;
  var solved = false;
  var answerLocked = false;
  var retryTimer = 0;
  var hintTimer = 0;
  var audioContext = null;
  var preferredVoice = null;
  var activeUtterance = null;
  var speechRequestId = 0;
  var speechStartTimer = 0;
  var speechFinishTimer = 0;
  var holdTimer = 0;

  var starsEl = document.getElementById("stars");
  var activityBadge = document.getElementById("activityBadge");
  var questionText = document.getElementById("questionText");
  var activityStage = document.getElementById("activityStage");
  var answerArea = document.getElementById("answerArea");
  var listenButton = document.getElementById("listenButton");
  var nextButton = document.getElementById("nextButton");
  var hintButton = document.getElementById("hintButton");
  var statusMessage = document.getElementById("statusMessage");
  var gameCard = document.getElementById("gameCard");
  var celebration = document.getElementById("celebration");
  var levelPill = document.getElementById("levelPill").querySelector("span");
  var settingsDialog = document.getElementById("settingsDialog");
  var settingsForm = document.getElementById("settingsForm");
  var parentButton = document.getElementById("parentButton");

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
    for (var index = copy.length - 1; index > 0; index -= 1) {
      var swapWith = Math.floor(Math.random() * (index + 1));
      var temporary = copy[index];
      copy[index] = copy[swapWith];
      copy[swapWith] = temporary;
    }
    return copy;
  }

  function randomItem(list) {
    return list[Math.floor(Math.random() * list.length)];
  }

  function randomNumber(minimum, maximum) {
    return minimum + Math.floor(Math.random() * (maximum - minimum + 1));
  }

  function maxCount() {
    return settings.level === "first" ? 3 : 5;
  }

  function availableTypes() {
    if (settings.level === "first") return ["count", "number"];
    if (settings.level === "growing") return ["count", "number", "shape", "size"];
    return ["count", "number", "shape", "size", "more"];
  }

  function chooseActivityType() {
    var choices = availableTypes().filter(function (type) { return type !== lastActivityType; });
    var type = randomItem(choices.length ? choices : availableTypes());
    lastActivityType = type;
    return type;
  }

  function numberChoices(answer, maximum) {
    var others = [];
    for (var number = 1; number <= maximum; number += 1) {
      if (number !== answer) others.push(number);
    }
    return shuffle([answer].concat(shuffle(others).slice(0, 2)));
  }

  function createQuestion() {
    var question = null;
    for (var attempt = 0; attempt < 12; attempt += 1) {
      var type = chooseActivityType();
      if (type === "count") question = createCountQuestion();
      else if (type === "number") question = createNumberQuestion();
      else if (type === "shape") question = createShapeQuestion();
      else if (type === "size") question = createSizeQuestion();
      else question = createMoreQuestion();
      if (recentSignatures.indexOf(question.signature) === -1) break;
    }
    recentSignatures.push(question.signature);
    if (recentSignatures.length > 5) recentSignatures.shift();
    return question;
  }

  function createCountQuestion() {
    var count = randomNumber(1, maxCount());
    var object = randomItem(COUNT_OBJECTS);
    var objectName = count === 1 ? object.singular : object.plural;
    return {
      type: "count",
      badge: "Count with me",
      title: "How many?",
      prompt: "How many " + object.plural + "? Tap each one, then choose the number.",
      answer: String(count),
      count: count,
      object: object,
      objectName: objectName,
      choices: numberChoices(count, maxCount()),
      success: "That’s " + NUMBER_WORDS[count] + "!",
      signature: "count-" + count + "-" + object.singular
    };
  }

  function createNumberQuestion() {
    var number = randomNumber(1, maxCount());
    var object = randomItem(COUNT_OBJECTS);
    return {
      type: "number",
      badge: "Numbers and groups",
      title: "Find " + number,
      prompt: "Can you find the group with " + NUMBER_WORDS[number] + " " + (number === 1 ? object.singular : object.plural) + "?",
      answer: String(number),
      count: number,
      object: object,
      choices: numberChoices(number, maxCount()),
      success: NUMBER_WORDS[number].charAt(0).toUpperCase() + NUMBER_WORDS[number].slice(1) + " " + (number === 1 ? object.singular : object.plural) + "!",
      signature: "number-" + number + "-" + object.singular
    };
  }

  function createShapeQuestion() {
    var shape = randomItem(SHAPES);
    return {
      type: "shape",
      badge: "Shape finder",
      title: "Find the " + shape,
      prompt: "Which one is the " + shape + "?",
      answer: shape,
      choices: shuffle(SHAPES),
      success: "That is the " + shape + "!",
      signature: "shape-" + shape
    };
  }

  function createSizeQuestion() {
    var object = randomItem(COUNT_OBJECTS);
    var target = Math.random() < .5 ? "big" : "small";
    return {
      type: "size",
      badge: "Big and small",
      title: "Find the " + target + " one",
      prompt: "Tap the " + target + " " + object.singular + ".",
      answer: target,
      object: object,
      choices: shuffle(["small", "big"]),
      success: "Yes, that one is " + target + "!",
      signature: "size-" + target + "-" + object.singular
    };
  }

  function createMoreQuestion() {
    var left = randomNumber(1, 5);
    var right = randomNumber(1, 5);
    while (right === left) right = randomNumber(1, 5);
    var target = Math.random() < .5 ? "more" : "fewer";
    var correctSide = target === "more"
      ? (left > right ? "left" : "right")
      : (left < right ? "left" : "right");
    var object = randomItem(COUNT_OBJECTS);
    return {
      type: "more",
      badge: "More or fewer",
      title: "Which side has " + target + "?",
      prompt: "Which side has " + target + " " + object.plural + "?",
      answer: correctSide,
      object: object,
      left: left,
      right: right,
      choices: ["left", "right"],
      success: "Yes, this side has " + target + "!",
      signature: "more-" + target + "-" + left + "-" + right + "-" + object.singular
    };
  }

  function newQuestion() {
    window.clearTimeout(retryTimer);
    window.clearTimeout(hintTimer);
    celebration.classList.remove("on");
    currentQuestion = createQuestion();
    solved = false;
    answerLocked = false;
    activityBadge.textContent = currentQuestion.badge;
    questionText.textContent = currentQuestion.title;
    nextButton.hidden = true;
    nextButton.textContent = "Next";
    hintButton.disabled = false;
    setStatus(currentQuestion.type === "count" ? "Tap each picture, then choose" : "Tap an answer", false);
    renderStars();
    renderActivity();
    updateLevelPill();
  }

  function renderActivity() {
    activityStage.innerHTML = "";
    answerArea.innerHTML = "";
    if (currentQuestion.type === "count") renderCountActivity();
    else if (currentQuestion.type === "number") renderNumberActivity();
    else if (currentQuestion.type === "shape") renderShapeActivity();
    else if (currentQuestion.type === "size") renderSizeActivity();
    else renderMoreActivity();
  }

  function renderCountActivity() {
    var grid = document.createElement("div");
    grid.className = "object-grid";
    grid.setAttribute("aria-label", currentQuestion.count + " " + currentQuestion.objectName);
    for (var index = 0; index < currentQuestion.count; index += 1) {
      var objectButton = document.createElement("button");
      objectButton.type = "button";
      objectButton.className = "count-object";
      objectButton.textContent = currentQuestion.object.emoji;
      objectButton.setAttribute("aria-label", "Count this " + currentQuestion.object.singular);
      objectButton.addEventListener("click", countObject);
      grid.appendChild(objectButton);
    }
    activityStage.appendChild(grid);

    currentQuestion.choices.forEach(function (choice, index) {
      answerArea.appendChild(createNumberButton(choice, index));
    });
  }

  function countObject(event) {
    var button = event.currentTarget;
    if (button.classList.contains("counted") || solved) return;
    var counted = activityStage.querySelectorAll(".count-object.counted").length + 1;
    button.classList.add("counted");
    button.dataset.count = String(counted);
    button.setAttribute("aria-label", "Counted as " + counted);
    playPop(counted - 1);
    speak(NUMBER_WORDS[counted], false);
    if (counted === currentQuestion.count) setStatus("Now choose the number", false);
    else setStatus(counted + " counted", false);
  }

  function renderNumberActivity() {
    var number = document.createElement("div");
    number.className = "big-number";
    number.textContent = currentQuestion.count;
    number.setAttribute("aria-label", "Number " + currentQuestion.count);
    activityStage.appendChild(number);

    currentQuestion.choices.forEach(function (choice, index) {
      var button = createAnswerButton(String(choice), "quantity-answer", index, String(choice) + " " + (choice === 1 ? currentQuestion.object.singular : currentQuestion.object.plural));
      addMiniObjects(button, choice, currentQuestion.object.emoji);
      answerArea.appendChild(button);
    });
  }

  function renderShapeActivity() {
    var demo = document.createElement("div");
    demo.className = "shape-demo";
    demo.innerHTML = '<div class="shape-sparkles" aria-hidden="true">● ■ ▲</div><span>Listen, look, and choose</span>';
    activityStage.appendChild(demo);

    currentQuestion.choices.forEach(function (shape, index) {
      var button = createAnswerButton(shape, "shape-answer", index, shape);
      var symbol = document.createElement("span");
      symbol.className = "shape-symbol " + shape;
      symbol.setAttribute("aria-hidden", "true");
      var label = document.createElement("span");
      label.className = "shape-name";
      label.textContent = shape;
      button.appendChild(symbol);
      button.appendChild(label);
      answerArea.appendChild(button);
    });
  }

  function renderSizeActivity() {
    var demo = document.createElement("div");
    demo.className = "size-demo";
    demo.setAttribute("aria-hidden", "true");
    demo.innerHTML = "<span>•</span><span>•</span>";
    activityStage.appendChild(demo);

    currentQuestion.choices.forEach(function (size, index) {
      var button = createAnswerButton(size, "size-answer " + size + "-object", index, size + " " + currentQuestion.object.singular);
      button.textContent = currentQuestion.object.emoji;
      answerArea.appendChild(button);
    });
  }

  function renderMoreActivity() {
    var demo = document.createElement("div");
    demo.className = "shape-demo";
    demo.innerHTML = '<div class="shape-sparkles" aria-hidden="true">↔</div><span>Look at both sides</span>';
    activityStage.appendChild(demo);

    currentQuestion.choices.forEach(function (side, index) {
      var count = side === "left" ? currentQuestion.left : currentQuestion.right;
      var button = createAnswerButton(side, "group-answer", index, count + " " + currentQuestion.object.plural);
      addMiniObjects(button, count, currentQuestion.object.emoji);
      answerArea.appendChild(button);
    });
  }

  function createNumberButton(number, colorIndex) {
    var button = createAnswerButton(String(number), "number-answer", colorIndex, "Number " + number);
    button.textContent = number;
    return button;
  }

  function createAnswerButton(value, extraClass, colorIndex, label) {
    var button = document.createElement("button");
    button.type = "button";
    button.className = "answer-button " + extraClass;
    button.dataset.value = String(value);
    button.style.setProperty("--answer-color", ANSWER_COLORS[colorIndex % ANSWER_COLORS.length]);
    button.setAttribute("aria-label", label);
    button.addEventListener("click", chooseAnswer);
    return button;
  }

  function addMiniObjects(button, count, emoji) {
    for (var index = 0; index < count; index += 1) {
      var object = document.createElement("span");
      object.className = "mini-object";
      object.textContent = emoji;
      object.setAttribute("aria-hidden", "true");
      button.appendChild(object);
    }
  }

  function chooseAnswer(event) {
    if (solved || answerLocked) return;
    var button = event.currentTarget;
    if (button.dataset.value === currentQuestion.answer) celebrateCorrect(button);
    else gentleRetry(button);
  }

  function celebrateCorrect(button) {
    solved = true;
    answerLocked = true;
    starCount += 1;
    progress.totalActivities = Number(progress.totalActivities || 0) + 1;
    saveJSON(PROGRESS_KEY, progress);
    answerArea.querySelectorAll(".answer-button").forEach(function (answerButton) {
      answerButton.disabled = true;
      if (answerButton !== button) answerButton.classList.add("dimmed");
    });
    button.classList.add("correct-answer");
    setStatus("Wonderful thinking!", true);
    nextButton.hidden = false;
    nextButton.textContent = starCount >= 5 ? "Play again" : "Next";
    hintButton.disabled = true;
    renderStars();
    playSuccess();
    speak("Great job! " + currentQuestion.success, false);
    showCelebration(currentQuestion.success);
  }

  function gentleRetry(button) {
    answerLocked = true;
    button.classList.add("dimmed");
    setStatus("Good try! Let’s look again.", false);
    gameCard.classList.remove("try-again");
    void gameCard.offsetWidth;
    gameCard.classList.add("try-again");
    playTryAgain();
    speak("Good try. Let's look again.", false);
    retryTimer = window.setTimeout(function () {
      answerLocked = false;
      button.classList.remove("dimmed");
      gameCard.classList.remove("try-again");
      if (settings.autoHint) showHint();
    }, 760);
  }

  function showHint() {
    if (solved || answerLocked) return;
    window.clearTimeout(hintTimer);
    var answer = answerArea.querySelector('[data-value="' + currentQuestion.answer + '"]');
    if (answer) {
      answer.classList.remove("hint-answer");
      void answer.offsetWidth;
      answer.classList.add("hint-answer");
    }

    var help = currentQuestion.prompt;
    if (currentQuestion.type === "count") {
      var sequence = [];
      for (var number = 1; number <= currentQuestion.count; number += 1) sequence.push(NUMBER_WORDS[number]);
      help = "Let's count. " + sequence.join(", ") + ". There are " + NUMBER_WORDS[currentQuestion.count] + ".";
    } else if (currentQuestion.type === "shape") {
      help = currentQuestion.answer === "circle"
        ? "The circle is round."
        : currentQuestion.answer === "square"
          ? "The square has four equal sides."
          : "The triangle has three sides.";
    }
    setStatus("Here’s a little hint", false);
    speak(help, true);
    hintTimer = window.setTimeout(function () {
      if (answer) answer.classList.remove("hint-answer");
    }, 3000);
  }

  function renderStars() {
    starsEl.innerHTML = "";
    for (var index = 0; index < 5; index += 1) {
      var star = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      star.setAttribute("viewBox", "0 0 24 24");
      star.setAttribute("aria-hidden", "true");
      star.classList.add("star");
      if (index < starCount) star.classList.add("filled");
      star.innerHTML = '<path fill="currentColor" d="m12 1.8 3.15 6.39 7.05 1.02-5.1 4.97 1.2 7.02L12 17.89 5.7 21.2l1.2-7.02-5.1-4.97 7.05-1.02L12 1.8Z"/>';
      starsEl.appendChild(star);
    }
    starsEl.setAttribute("aria-label", starCount + " of 5 stars");
  }

  function showCelebration(detail) {
    celebration.innerHTML = '<div class="yay-card">You did it!<small>' + detail + "</small></div>";
    celebration.classList.add("on");
    var colors = ["#ff806f", "#ffc928", "#58adf6", "#43bd68", "#746ade"];
    for (var index = 0; index < 30; index += 1) {
      var piece = document.createElement("span");
      piece.className = "confetti";
      piece.style.left = Math.round(Math.random() * 100) + "%";
      piece.style.background = colors[index % colors.length];
      piece.style.animationDelay = Math.random() * .35 + "s";
      piece.style.setProperty("--fall-x", Math.round(Math.random() * 180 - 90) + "px");
      celebration.appendChild(piece);
    }
    window.setTimeout(function () { celebration.classList.remove("on"); }, 1750);
  }

  function setStatus(text, success) {
    statusMessage.textContent = text;
    statusMessage.classList.toggle("success", !!success);
  }

  function updateLevelPill() {
    if (settings.level === "growing") levelPill.textContent = "Growing Minds • 1 to 5";
    else if (settings.level === "mix") levelPill.textContent = "Mix & Play • Numbers + shapes";
    else levelPill.textContent = "First Numbers • 1 to 3";
  }

  function getAudioContext() {
    if (!settings.sound) return null;
    var AudioConstructor = window.AudioContext || window.webkitAudioContext;
    if (!AudioConstructor) return null;
    if (!audioContext) audioContext = new AudioConstructor();
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
      utterance.rate = .76;
      utterance.pitch = 1.06;
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
          window.setTimeout(function () { startSpeech(text, requestId, false, reportProblem); }, 100);
        } else {
          finishSpeech(requestId);
          if (reportProblem) setStatus("Voice didn’t start. Tap the speaker again.", false);
        }
      }, 1500);
      speechFinishTimer = window.setTimeout(function () { finishSpeech(requestId); }, 10000);
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
      window.setTimeout(function () { startSpeech(text, requestId, true, !!reportProblem); }, 80);
    } else {
      startSpeech(text, requestId, true, !!reportProblem);
    }
  }

  function openSettings() {
    parentButton.classList.remove("holding");
    settingsForm.querySelector('input[name="level"][value="' + settings.level + '"]').checked = true;
    document.getElementById("soundSetting").checked = !!settings.sound;
    document.getElementById("hintSetting").checked = !!settings.autoHint;
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
    settings.level = chosen ? chosen.value : "first";
    settings.sound = document.getElementById("soundSetting").checked;
    settings.autoHint = document.getElementById("hintSetting").checked;
    if (!settings.sound) stopSpeaking();
    else if (!soundWasEnabled) refreshPreferredVoice();
    saveJSON(STORE_KEY, settings);
    settingsDialog.close();
    starCount = 0;
    recentSignatures = [];
    lastActivityType = "";
    newQuestion();
  });

  listenButton.addEventListener("click", function () { speak(currentQuestion.prompt, true); });
  hintButton.addEventListener("click", showHint);
  nextButton.addEventListener("click", function () {
    if (starCount >= 5) starCount = 0;
    newQuestion();
  });
  document.addEventListener("visibilitychange", function () { if (document.hidden) stopSpeaking(); });
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
        // The activities remain usable when service workers are unavailable.
      });
    });
  }

  newQuestion();
}());
