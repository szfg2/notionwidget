(function () {
  "use strict";

  var COUNT_OBJECTS = [
    { emoji: "🍎", singular: "apple", plural: "apples" },
    { emoji: "🦆", singular: "duck", plural: "ducks" },
    { emoji: "🚗", singular: "car", plural: "cars" },
    { emoji: "⭐", singular: "star", plural: "stars" },
    { emoji: "🧸", singular: "teddy bear", plural: "teddy bears" },
    { emoji: "🍓", singular: "strawberry", plural: "strawberries" },
    { emoji: "⚽", singular: "ball", plural: "balls" },
    { emoji: "🍌", singular: "banana", plural: "bananas" },
    { emoji: "🐞", singular: "ladybird", plural: "ladybirds" }
  ];
  var LEAVERS = [
    { emoji: "🐦", singular: "bird", plural: "birds", one: "flies away", many: "fly away" },
    { emoji: "🦋", singular: "butterfly", plural: "butterflies", one: "flies away", many: "fly away" },
    { emoji: "🎈", singular: "balloon", plural: "balloons", one: "floats away", many: "float away" },
    { emoji: "🐸", singular: "frog", plural: "frogs", one: "hops away", many: "hop away" },
    { emoji: "🐟", singular: "fish", plural: "fish", one: "swims away", many: "swim away" },
    { emoji: "🐝", singular: "bee", plural: "bees", one: "buzzes away", many: "buzz away" },
    { emoji: "🐰", singular: "bunny", plural: "bunnies", one: "hops away", many: "hop away" }
  ];
  var ANSWER_COLORS = ["#ff806f", "#ffc928", "#58adf6"];
  var CARRIAGE_COLORS = ["#58adf6", "#ffc928", "#ff806f", "#43bd68", "#a49cf0"];
  var NUMBER_WORDS = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];
  var DICE_PIPS = { 1: [4], 2: [0, 8], 3: [0, 4, 8], 4: [0, 2, 6, 8], 5: [0, 2, 4, 6, 8], 6: [0, 2, 3, 5, 6, 8] };
  var LEVELS = {
    little: { max: 3, types: ["add", "make", "look", "next"], pill: "Little Steps • up to 3" },
    growing: { max: 5, types: ["add", "take", "make", "look", "next"], pill: "Growing Minds • up to 5" },
    big: { max: 10, types: ["add", "take", "make", "look", "next"], pill: "Big Kid • up to 10" }
  };
  var STORE_KEY = "add-and-play-settings-v1";
  var PROGRESS_KEY = "add-and-play-progress-v1";

  var settings = readJSON(STORE_KEY, { level: "little", sound: true, readAloud: true, autoHint: false });
  if (!LEVELS[settings.level]) settings.level = "little";
  var progress = readJSON(PROGRESS_KEY, { totalActivities: 0 });
  var currentQuestion = null;
  var recentSignatures = [];
  var lastActivityType = "";
  var starCount = 0;
  var solved = false;
  var answerLocked = false;
  var retryTimer = 0;
  var hintTimer = 0;
  var storyTimer = 0;
  var makeTimer = 0;
  var audioContext = null;
  var preferredVoice = null;
  var activeUtterance = null;
  var speechRequestId = 0;
  var speechStartTimer = 0;
  var speechFinishTimer = 0;
  var holdTimer = 0;
  var makePile = null;
  var makeBasket = null;
  var makeCount = null;

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

  function level() { return LEVELS[settings.level]; }
  function maxNumber() { return level().max; }
  function word(number) { return NUMBER_WORDS[number]; }
  function capitalise(text) { return text.charAt(0).toUpperCase() + text.slice(1); }
  function named(object, count) { return count === 1 ? object.singular : object.plural; }

  function chooseActivityType() {
    var types = level().types;
    var choices = types.filter(function (type) { return type !== lastActivityType; });
    var type = randomItem(choices.length ? choices : types);
    lastActivityType = type;
    return type;
  }

  // Three ascending choices close to the answer, so the wrong ones are worth thinking about.
  function numberChoices(answer, maximum) {
    var others = [];
    for (var number = 1; number <= maximum; number += 1) {
      if (number !== answer) others.push(number);
    }
    others = shuffle(others).sort(function (a, b) { return Math.abs(a - answer) - Math.abs(b - answer); });
    return [answer].concat(shuffle(others.slice(0, 3)).slice(0, 2)).sort(function (a, b) { return a - b; });
  }

  function createQuestion() {
    var question = null;
    for (var attempt = 0; attempt < 12; attempt += 1) {
      var type = chooseActivityType();
      if (type === "add") question = createAddQuestion();
      else if (type === "take") question = createTakeQuestion();
      else if (type === "make") question = createMakeQuestion();
      else if (type === "look") question = createLookQuestion();
      else question = createNextQuestion();
      if (recentSignatures.indexOf(question.signature) === -1) break;
    }
    recentSignatures.push(question.signature);
    if (recentSignatures.length > 6) recentSignatures.shift();
    return question;
  }

  function createAddQuestion() {
    var total = randomNumber(2, maxNumber());
    var first = randomNumber(1, total - 1);
    var second = total - first;
    var object = randomItem(COUNT_OBJECTS);
    return {
      type: "add",
      badge: "Put together",
      title: "How many altogether?",
      prompt: capitalise(word(first)) + " " + named(object, first) + " and " + word(second) + " more. How many altogether?",
      answer: String(total),
      first: first,
      second: second,
      countTarget: total,
      object: object,
      symbol: "+",
      choices: numberChoices(total, maxNumber()),
      success: first + " + " + second + " = " + total,
      spokenSuccess: word(first) + " and " + word(second) + " make " + word(total) + "!",
      signature: "add-" + first + "-" + second
    };
  }

  function createTakeQuestion() {
    var start = randomNumber(2, maxNumber());
    var away = randomNumber(1, Math.min(start - 1, settings.level === "growing" ? 2 : start - 1));
    var left = start - away;
    var object = randomItem(LEAVERS);
    return {
      type: "take",
      badge: "Take away",
      title: "How many are left?",
      prompt: "There are " + word(start) + " " + named(object, start) + ". " + capitalise(word(away)) + " " + (away === 1 ? object.one : object.many) + ". How many are left?",
      answer: String(left),
      first: start,
      second: away,
      countTarget: left,
      object: object,
      symbol: "−",
      choices: numberChoices(left, maxNumber()),
      success: start + " − " + away + " = " + left,
      spokenSuccess: word(start) + " take away " + word(away) + " leaves " + word(left) + "!",
      signature: "take-" + start + "-" + away
    };
  }

  function createMakeQuestion() {
    var target = randomNumber(1, maxNumber());
    var object = randomItem(COUNT_OBJECTS);
    return {
      type: "make",
      badge: "Count out",
      title: "Put " + target + " in the basket",
      prompt: "Put " + word(target) + " " + named(object, target) + " in the basket." + (settings.level === "little" ? "" : " Then tap done."),
      answer: "done",
      target: target,
      pileSize: Math.min(target + randomNumber(2, 3), settings.level === "big" ? 12 : 6),
      object: object,
      success: capitalise(word(target)) + " " + named(object, target) + "!",
      signature: "make-" + target
    };
  }

  function createLookQuestion() {
    var number = randomNumber(1, maxNumber());
    var style = settings.level === "little" || (number <= 6 && Math.random() < .5) ? "dice" : "frame";
    if (number > 6) style = "frame";
    return {
      type: "look",
      badge: "Quick look",
      title: "How many dots?",
      prompt: style === "dice" ? "Look at the dice. How many dots?" : "Look at the frame. How many counters?",
      answer: String(number),
      count: number,
      style: style,
      choices: numberChoices(number, maxNumber()),
      success: "That’s " + word(number) + "!",
      signature: "look-" + style + "-" + number
    };
  }

  function createNextQuestion() {
    var length = settings.level === "little" ? randomNumber(2, 3) : settings.level === "growing" ? randomNumber(3, 4) : 4;
    var start = settings.level === "little" ? 1 : randomNumber(1, maxNumber() - length + 1);
    var missing = settings.level === "big" ? randomNumber(1, length - 1) : length - 1;
    var sequence = [];
    for (var index = 0; index < length; index += 1) sequence.push(start + index);
    var answer = sequence[missing];
    var isLast = missing === length - 1;
    return {
      type: "next",
      badge: "Number train",
      title: isLast ? "What comes next?" : "Which number is missing?",
      prompt: isLast
        ? sequence.slice(0, -1).map(word).join(", ") + ". What comes next?"
        : "Which number is missing from the train?",
      answer: String(answer),
      sequence: sequence,
      missing: missing,
      choices: numberChoices(answer, maxNumber()),
      success: capitalise(word(answer)) + (isLast ? " comes next!" : " goes there!"),
      signature: "next-" + start + "-" + length + "-" + missing
    };
  }

  function newQuestion(speakPrompt) {
    window.clearTimeout(retryTimer);
    window.clearTimeout(hintTimer);
    window.clearTimeout(storyTimer);
    window.clearTimeout(makeTimer);
    celebration.classList.remove("on");
    currentQuestion = createQuestion();
    solved = false;
    answerLocked = false;
    activityBadge.textContent = currentQuestion.badge;
    questionText.textContent = currentQuestion.title;
    nextButton.hidden = true;
    nextButton.textContent = "Next";
    hintButton.disabled = false;
    setStatus(startingStatus(), false);
    renderStars();
    renderActivity();
    updateLevelPill();
    if (speakPrompt && settings.readAloud) speak(currentQuestion.prompt, false);
  }

  function startingStatus() {
    if (currentQuestion.type === "add") return "Tap each one to count them all";
    if (currentQuestion.type === "take") return "Watch… then count the ones left";
    if (currentQuestion.type === "make") return "Tap to put them in the basket";
    return "Tap an answer";
  }

  function renderActivity() {
    activityStage.innerHTML = "";
    answerArea.innerHTML = "";
    if (currentQuestion.type === "add") renderAddActivity();
    else if (currentQuestion.type === "take") renderTakeActivity();
    else if (currentQuestion.type === "make") renderMakeActivity();
    else if (currentQuestion.type === "look") renderLookActivity();
    else renderNextActivity();
  }

  function createObjectButton(emoji, label) {
    var button = document.createElement("button");
    button.type = "button";
    button.className = "count-object";
    button.textContent = emoji;
    button.setAttribute("aria-label", label);
    return button;
  }

  function createTray(count, object, extraClass, crowded) {
    var tray = document.createElement("div");
    tray.className = "tray small-objects " + (extraClass || "") + (crowded ? " crowded" : "");
    for (var index = 0; index < count; index += 1) {
      var slot = document.createElement("span");
      slot.className = "slot";
      var button = createObjectButton(object.emoji, "Count this " + object.singular);
      button.addEventListener("click", countObject);
      slot.appendChild(button);
      tray.appendChild(slot);
    }
    return tray;
  }

  function createEquation() {
    var equation = document.createElement("div");
    equation.className = "equation";
    equation.setAttribute("aria-label", currentQuestion.first + " " + (currentQuestion.type === "add" ? "plus" : "take away") + " " + currentQuestion.second + " equals what?");
    equation.innerHTML = "<span>" + currentQuestion.first + "</span><span class=\"eq-op\">" + currentQuestion.symbol + "</span><span>" + currentQuestion.second + "</span><span class=\"eq-op\">=</span><span class=\"blank\" id=\"equationBlank\">?</span>";
    return equation;
  }

  function renderAddActivity() {
    var board = document.createElement("div");
    board.className = "sum-board";
    var row = document.createElement("div");
    row.className = "sum-row";
    // Both groups share one object size so a big group never looks like "bigger" objects.
    var crowded = Math.max(currentQuestion.first, currentQuestion.second) > 4;
    row.appendChild(createTray(currentQuestion.first, currentQuestion.object, "", crowded));
    var plus = document.createElement("span");
    plus.className = "op";
    plus.textContent = "+";
    plus.setAttribute("aria-hidden", "true");
    row.appendChild(plus);
    row.appendChild(createTray(currentQuestion.second, currentQuestion.object, "second-tray", crowded));
    board.appendChild(row);
    board.appendChild(createEquation());
    activityStage.appendChild(board);
    addNumberButtons();
  }

  function renderTakeActivity() {
    var board = document.createElement("div");
    board.className = "sum-board";
    var tray = createTray(currentQuestion.first, currentQuestion.object, "take-tray", currentQuestion.first > 6);
    var slots = tray.querySelectorAll(".slot");
    for (var index = currentQuestion.first - currentQuestion.second; index < slots.length; index += 1) {
      slots[index].classList.add("leaving");
      slots[index].firstChild.disabled = true;
    }
    board.appendChild(tray);
    var replay = document.createElement("button");
    replay.type = "button";
    replay.className = "replay-button";
    replay.innerHTML = "<span aria-hidden=\"true\">↺</span> Watch again";
    replay.addEventListener("click", function () { playTakeStory(true); });
    board.appendChild(replay);
    board.appendChild(createEquation());
    activityStage.appendChild(board);
    addNumberButtons();
    playTakeStory(false);
  }

  function playTakeStory(replaying) {
    if (solved) return;
    window.clearTimeout(storyTimer);
    activityStage.querySelectorAll(".count-object.counted").forEach(resetCounted);
    activityStage.querySelectorAll(".slot.leaving").forEach(function (slot) {
      slot.classList.remove("gone");
      void slot.offsetWidth;
    });
    if (replaying) speak(currentQuestion.prompt, false);
    storyTimer = window.setTimeout(function () {
      activityStage.querySelectorAll(".slot.leaving").forEach(function (slot) { slot.classList.add("gone"); });
      playWhoosh();
    }, replaying ? 2200 : 1300);
  }

  function resetCounted(button) {
    button.classList.remove("counted");
    delete button.dataset.count;
  }

  function countObject(event) {
    var button = event.currentTarget;
    if (button.classList.contains("counted") || button.disabled || solved) return;
    var counted = activityStage.querySelectorAll(".count-object.counted").length + 1;
    button.classList.add("counted");
    button.dataset.count = String(counted);
    playPop(counted - 1);
    speak(word(counted), false);
    if (counted === currentQuestion.countTarget) setStatus("Now choose the number", false);
    else setStatus(counted + " counted", false);
  }

  function renderMakeActivity() {
    var board = document.createElement("div");
    board.className = "make-board small-objects" + (currentQuestion.pileSize > 6 ? " crowded" : "");
    makePile = document.createElement("div");
    makePile.className = "pile";
    for (var index = 0; index < currentQuestion.pileSize; index += 1) {
      var button = createObjectButton(currentQuestion.object.emoji, "Move this " + currentQuestion.object.singular);
      button.addEventListener("click", moveMakeObject);
      makePile.appendChild(button);
    }
    var basket = document.createElement("div");
    basket.className = "basket";
    basket.innerHTML = "<div class=\"basket-head\"><span class=\"basket-target\" aria-label=\"Put " + currentQuestion.target + "\">" + currentQuestion.target + "</span><span aria-hidden=\"true\">🧺</span><span class=\"basket-count\">0</span></div>";
    makeBasket = document.createElement("div");
    makeBasket.className = "basket-items";
    basket.appendChild(makeBasket);
    makeCount = basket.querySelector(".basket-count");
    board.appendChild(makePile);
    board.appendChild(basket);
    activityStage.appendChild(board);

    if (settings.level !== "little") {
      var done = createAnswerButton("done", "done-answer", 0, "Done");
      done.style.setProperty("--answer-color", "#43bd68");
      done.innerHTML = "<span aria-hidden=\"true\">✓</span><span>Done</span>";
      answerArea.appendChild(done);
    }
  }

  function moveMakeObject(event) {
    if (solved || answerLocked) return;
    var button = event.currentTarget;
    var intoBasket = button.parentNode === makePile;
    (intoBasket ? makeBasket : makePile).appendChild(button);
    resetCounted(button);
    var inBasket = makeBasket.querySelectorAll(".count-object");
    inBasket.forEach(function (item, index) {
      item.classList.add("counted");
      item.dataset.count = String(index + 1);
    });
    makeCount.textContent = inBasket.length;
    playPop(inBasket.length);
    speak(word(inBasket.length), false);
    setStatus(inBasket.length + " in the basket", false);
    if (settings.level === "little" && inBasket.length === currentQuestion.target) {
      makeTimer = window.setTimeout(function () { if (!solved && basketCount() === currentQuestion.target) celebrateCorrect(null); }, 450);
    }
  }

  function basketCount() {
    return makeBasket ? makeBasket.querySelectorAll(".count-object").length : 0;
  }

  function renderLookActivity() {
    var holder;
    if (currentQuestion.style === "dice") {
      holder = document.createElement("div");
      holder.className = "dice";
      var pips = DICE_PIPS[currentQuestion.count];
      for (var cell = 0; cell < 9; cell += 1) {
        var spot = document.createElement("span");
        if (pips.indexOf(cell) !== -1) spot.className = "pip";
        holder.appendChild(spot);
      }
    } else {
      holder = document.createElement("div");
      var size = maxNumber() > 5 ? 10 : 5;
      holder.className = "ten-frame" + (size === 5 ? " five" : "");
      for (var box = 0; box < size; box += 1) {
        var square = document.createElement("span");
        square.className = "frame-cell";
        if (box < currentQuestion.count) {
          var counter = document.createElement("span");
          counter.className = "counter";
          square.appendChild(counter);
        }
        holder.appendChild(square);
      }
    }
    holder.setAttribute("role", "img");
    holder.setAttribute("aria-label", currentQuestion.count + " dots");
    activityStage.appendChild(holder);
    addNumberButtons();
  }

  function renderNextActivity() {
    var train = document.createElement("div");
    train.className = "train";
    train.setAttribute("aria-label", currentQuestion.sequence.map(function (number, index) {
      return index === currentQuestion.missing ? "missing" : number;
    }).join(", "));
    var engine = document.createElement("span");
    engine.className = "engine";
    engine.textContent = "🚂";
    engine.setAttribute("aria-hidden", "true");
    train.appendChild(engine);
    currentQuestion.sequence.forEach(function (number, index) {
      var carriage = document.createElement("span");
      carriage.className = "carriage";
      carriage.style.setProperty("--carriage-color", CARRIAGE_COLORS[index % CARRIAGE_COLORS.length]);
      if (index === currentQuestion.missing) {
        carriage.classList.add("missing");
        carriage.id = "missingCarriage";
        carriage.textContent = "?";
      } else {
        carriage.textContent = number;
      }
      train.appendChild(carriage);
    });
    activityStage.appendChild(train);
    addNumberButtons();
  }

  function addNumberButtons() {
    currentQuestion.choices.forEach(function (choice, index) {
      var button = createAnswerButton(String(choice), "number-answer", index, "Number " + choice);
      button.textContent = choice;
      answerArea.appendChild(button);
    });
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

  function chooseAnswer(event) {
    if (solved || answerLocked) return;
    var button = event.currentTarget;
    if (currentQuestion.type === "make") {
      if (basketCount() === currentQuestion.target) celebrateCorrect(button);
      else basketRetry();
    } else if (button.dataset.value === currentQuestion.answer) {
      celebrateCorrect(button);
    } else {
      gentleRetry(button);
    }
  }

  function revealAnswer() {
    var blank = document.getElementById("equationBlank");
    if (blank) {
      blank.textContent = currentQuestion.answer;
      blank.classList.add("filled");
    }
    var carriage = document.getElementById("missingCarriage");
    if (carriage) {
      carriage.textContent = currentQuestion.answer;
      carriage.classList.remove("missing");
      carriage.classList.add("filled");
    }
    if (currentQuestion.type === "add") activityStage.querySelector(".sum-row").classList.add("joined");
  }

  function celebrateCorrect(button) {
    solved = true;
    answerLocked = true;
    window.clearTimeout(storyTimer);
    starCount += 1;
    progress.totalActivities = Number(progress.totalActivities || 0) + 1;
    saveJSON(PROGRESS_KEY, progress);
    answerArea.querySelectorAll(".answer-button").forEach(function (answerButton) {
      answerButton.disabled = true;
      if (answerButton !== button) answerButton.classList.add("dimmed");
    });
    if (button) button.classList.add("correct-answer");
    revealAnswer();
    setStatus("Wonderful thinking!", true);
    nextButton.hidden = false;
    nextButton.textContent = starCount >= 5 ? "Play again" : "Next";
    hintButton.disabled = true;
    renderStars();
    playSuccess();
    speak("Great job! " + (currentQuestion.spokenSuccess || currentQuestion.success), false);
    showCelebration(currentQuestion.success);
  }

  function wiggleCard() {
    gameCard.classList.remove("try-again");
    void gameCard.offsetWidth;
    gameCard.classList.add("try-again");
    playTryAgain();
  }

  function gentleRetry(button) {
    answerLocked = true;
    button.classList.add("dimmed");
    setStatus("Good try! Let’s look again.", false);
    wiggleCard();
    speak("Good try. Let's look again.", false);
    retryTimer = window.setTimeout(function () {
      answerLocked = false;
      button.classList.remove("dimmed");
      gameCard.classList.remove("try-again");
      if (settings.autoHint) showHint();
    }, 760);
  }

  function basketRetry() {
    answerLocked = true;
    var have = basketCount();
    var need = currentQuestion.target;
    var advice = have < need ? "Put in " + (need - have === 1 ? "one more" : "some more") : "Take " + (have - need === 1 ? "one" : "some") + " out";
    setStatus(have + " in the basket. We need " + need + ".", false);
    wiggleCard();
    speak("Good try. We have " + word(have) + ". We need " + word(need) + ". " + advice + ".", false);
    retryTimer = window.setTimeout(function () {
      answerLocked = false;
      gameCard.classList.remove("try-again");
    }, 760);
  }

  function countAlong(upTo) {
    var sequence = [];
    for (var number = 1; number <= upTo; number += 1) sequence.push(word(number));
    return sequence.join(", ");
  }

  function pulseInOrder(elements) {
    elements.forEach(function (element, index) {
      element.classList.remove("count-pulse");
      void element.offsetWidth;
      element.style.animationDelay = (.5 + index * .62) + "s";
      element.classList.add("count-pulse");
    });
  }

  function showHint() {
    if (solved || answerLocked) return;
    window.clearTimeout(hintTimer);
    var answer = answerArea.querySelector('[data-value="' + currentQuestion.answer + '"]');
    if (currentQuestion.type === "make" && basketCount() !== currentQuestion.target) answer = null;
    if (answer) {
      answer.classList.remove("hint-answer");
      void answer.offsetWidth;
      answer.classList.add("hint-answer");
    }

    var help = currentQuestion.prompt;
    var target = Number(currentQuestion.answer);
    if (currentQuestion.type === "add") {
      pulseInOrder(Array.prototype.slice.call(activityStage.querySelectorAll(".count-object")));
      help = "Let's count them all. " + countAlong(target) + ". " + capitalise(word(target)) + " altogether.";
    } else if (currentQuestion.type === "take") {
      pulseInOrder(Array.prototype.slice.call(activityStage.querySelectorAll(".slot:not(.leaving) .count-object")));
      help = "Let's count the ones left. " + countAlong(target) + ". " + capitalise(word(target)) + " are left.";
    } else if (currentQuestion.type === "look") {
      pulseInOrder(Array.prototype.slice.call(activityStage.querySelectorAll(".pip, .counter")));
      help = "Let's count. " + countAlong(target) + ". There are " + word(target) + ".";
    } else if (currentQuestion.type === "next") {
      pulseInOrder(Array.prototype.slice.call(activityStage.querySelectorAll(".carriage")).slice(0, currentQuestion.missing + 1));
      help = "Let's count along the train. " + currentQuestion.sequence.slice(0, currentQuestion.missing).map(word).join(", ") + ", and then…";
    } else if (currentQuestion.type === "make") {
      var have = basketCount();
      help = "We need " + word(currentQuestion.target) + ". There " + (have === 1 ? "is " : "are ") + word(have) + " in the basket." + (have === currentQuestion.target ? " That's right! Tap done." : "");
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
    levelPill.textContent = level().pill;
  }

  function getAudioContext() {
    if (!settings.sound) return null;
    var AudioConstructor = window.AudioContext || window.webkitAudioContext;
    if (!AudioConstructor) return null;
    if (!audioContext) audioContext = new AudioConstructor();
    if (audioContext.state === "suspended") audioContext.resume();
    return audioContext;
  }

  function tone(frequency, duration, delay, volume, endFrequency) {
    var context = getAudioContext();
    if (!context) return;
    var oscillator = context.createOscillator();
    var gain = context.createGain();
    var start = context.currentTime + (delay || 0);
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(frequency, start);
    if (endFrequency) oscillator.frequency.exponentialRampToValueAtTime(endFrequency, start + duration);
    gain.gain.setValueAtTime(.0001, start);
    gain.gain.exponentialRampToValueAtTime(volume || .12, start + .015);
    gain.gain.exponentialRampToValueAtTime(.0001, start + duration);
    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start(start);
    oscillator.stop(start + duration + .03);
  }

  function playPop(index) { tone(330 + Math.min(index, 10) * 45, .16, 0, .09); }
  function playWhoosh() { tone(420, .55, 0, .08, 1200); }
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

  function resumeSpeechEngine() {
    if (!("speechSynthesis" in window)) return;
    var synthesis = window.speechSynthesis;
    try { synthesis.resume(); } catch (error) {}
    refreshPreferredVoice();
    if (!synthesis.speaking && !synthesis.pending) {
      clearSpeechTimers();
      activeUtterance = null;
      listenButton.classList.remove("speaking");
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
      var voice = refreshPreferredVoice();
      if (voice) utterance.voice = voice;
      utterance.onstart = function () {
        if (requestId !== speechRequestId) return;
        started = true;
        window.clearTimeout(speechStartTimer);
        listenButton.classList.add("speaking");
      };
      utterance.onend = function () { finishSpeech(requestId); };
      utterance.onerror = function (event) {
        if (requestId !== speechRequestId) return;
        finishSpeech(requestId);
        var benign = event && (event.error === "interrupted" || event.error === "canceled");
        if (reportProblem && !benign) setStatus("Voice stopped. Tap the speaker to try again.", false);
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
      speechFinishTimer = window.setTimeout(function () { finishSpeech(requestId); }, 12000);
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
    document.getElementById("readSetting").checked = !!settings.readAloud;
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
    settings.level = chosen && LEVELS[chosen.value] ? chosen.value : "little";
    settings.sound = document.getElementById("soundSetting").checked;
    settings.readAloud = document.getElementById("readSetting").checked;
    settings.autoHint = document.getElementById("hintSetting").checked;
    if (!settings.sound) stopSpeaking();
    else if (!soundWasEnabled) refreshPreferredVoice();
    saveJSON(STORE_KEY, settings);
    settingsDialog.close();
    starCount = 0;
    recentSignatures = [];
    lastActivityType = "";
    newQuestion(true);
  });

  listenButton.addEventListener("click", function () {
    if (currentQuestion.type === "take" && !solved) playTakeStory(true);
    else speak(currentQuestion.prompt, true);
  });
  hintButton.addEventListener("click", showHint);
  nextButton.addEventListener("click", function () {
    if (starCount >= 5) starCount = 0;
    newQuestion(true);
  });
  document.addEventListener("visibilitychange", function () {
    // Never cancel() on hide - cancelling as we background wedges the speech queue.
    if (document.hidden) clearSpeechTimers();
    else resumeSpeechEngine();
  });
  window.addEventListener("pageshow", resumeSpeechEngine);

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

  newQuestion(false);
}());
