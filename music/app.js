(function () {
  "use strict";

  var MAJOR = [261.63, 293.66, 329.63, 349.23, 392.00, 440.00, 493.88, 523.25];
  var MAJOR_NAMES = ["C", "D", "E", "F", "G", "A", "B", "C"];
  var MAJOR_SUNG = ["doh", "ray", "me", "fah", "soh", "lah", "tea", "doh"];
  var PENTA = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33, 659.25];
  var PENTA_NAMES = ["C", "D", "E", "G", "A", "C", "D", "E"];
  var KEY_COLORS = ["#ff806f", "#ff9f43", "#ffc928", "#43bd68", "#2bb3a3", "#58adf6", "#746ade", "#ef7bb4"];

  var VOICES = {
    xylophone: { partials: [[1, .9, "sine"], [3.01, .22, "sine"]], attack: .004, decay: .85 },
    piano: { partials: [[1, .95, "triangle"], [2, .38, "sine"]], attack: .006, decay: 1.5, filter: 4200, level: 1.7 },
    bell: { partials: [[1, .7, "sine"], [2.76, .35, "sine"], [5.4, .14, "sine"]], attack: .005, decay: 2.3 },
    flute: { partials: [[1, .8, "sine"], [2, .12, "sine"]], attack: .08, decay: 1, vibrato: 5 },
    guitar: { partials: [[1, .7, "sawtooth"]], attack: .005, decay: 1.1, filter: 2600, sweep: true },
    horn: { partials: [[1, .5, "sawtooth"], [2, .18, "square"]], attack: .05, decay: .9, filter: 1500 },
    violin: { partials: [[1, .55, "sawtooth"], [3, .1, "sine"]], attack: .12, decay: 1.3, filter: 2200, vibrato: 6 },
    music_box: { partials: [[1, .6, "sine"], [4.1, .16, "sine"], [8.2, .06, "sine"]], attack: .003, decay: 1.8 }
  };

  var INSTRUMENTS = [
    { id: "piano", name: "Piano", emoji: "🎹", voice: "piano", color: "#58adf6", motif: [1, 3, 5, 8] },
    { id: "guitar", name: "Guitar", emoji: "🎸", voice: "guitar", color: "#ff9f43", motif: [5, 4, 3, 1] },
    { id: "flute", name: "Flute", emoji: "🪈", voice: "flute", color: "#2bb3a3", motif: [5, 6, 8] },
    { id: "trumpet", name: "Trumpet", emoji: "🎺", voice: "horn", color: "#ffc928", motif: [1, 5, 5, 8] },
    { id: "violin", name: "Violin", emoji: "🎻", voice: "violin", color: "#ef7bb4", motif: [3, 5, 6, 5] },
    { id: "bells", name: "Bells", emoji: "🔔", voice: "bell", color: "#746ade", motif: [8, 6, 5, 3] },
    { id: "xylophone", name: "Xylophone", emoji: "🎼", voice: "xylophone", color: "#43bd68", motif: [1, 2, 3, 4, 5] },
    { id: "musicbox", name: "Music box", emoji: "🎁", voice: "music_box", color: "#ff806f", motif: [5, 3, 1, 3, 5] }
  ];

  var PERCUSSION = [
    { id: "tom", name: "Tom tom", emoji: "🪘", drum: "tom", color: "#ff9f43" },
    { id: "clap", name: "Clap", emoji: "👏", drum: "clap", color: "#ffc928" },
    { id: "shaker", name: "Shaker", emoji: "🎉", drum: "shaker", color: "#2bb3a3" },
    { id: "bell", name: "Jingle", emoji: "🔔", drum: "tambourine", color: "#746ade" }
  ];

  var SONGS = [
    { id: "twinkle", name: "Twinkle Twinkle", emoji: "⭐",
      notes: [1, 1, 5, 5, 6, 6, 5, 4, 4, 3, 3, 2, 2, 1],
      words: ["Twin", "kle", "twin", "kle", "lit", "tle", "star", "how", "I", "won", "der", "what", "you", "are"] },
    { id: "mary", name: "Mary's Lamb", emoji: "🐑",
      notes: [3, 2, 1, 2, 3, 3, 3, 2, 2, 2, 3, 5, 5],
      words: ["Ma", "ry", "had", "a", "lit", "tle", "lamb", "lit", "tle", "lamb", "lit", "tle", "lamb"] },
    { id: "row", name: "Row Your Boat", emoji: "🚣",
      notes: [1, 1, 1, 2, 3, 3, 2, 3, 4, 5],
      words: ["Row", "row", "row", "your", "boat", "gent", "ly", "down", "the", "stream"] },
    { id: "hotcross", name: "Hot Cross Buns", emoji: "🥐",
      notes: [3, 2, 1, 3, 2, 1, 1, 1, 1, 1, 2, 2, 2, 2, 3, 2, 1],
      words: ["Hot", "cross", "buns", "hot", "cross", "buns", "one", "a", "pen", "ny", "two", "a", "pen", "ny", "hot", "cross", "buns"] },
    { id: "abc", name: "ABC Song", emoji: "🔤",
      notes: [1, 1, 5, 5, 6, 6, 5, 4, 4, 3, 3, 2, 2, 1],
      words: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N"] },
    { id: "oldmac", name: "Old MacDonald", emoji: "🐮",
      notes: [1, 1, 1, 5, 6, 6, 5, 3, 3, 2, 2, 1],
      words: ["Old", "Mac", "Do", "nald", "had", "a", "farm", "E", "I", "E", "I", "O"] },
    { id: "birthday", name: "Happy Birthday", emoji: "🎂",
      notes: [5, 5, 6, 5, 8, 7, 5, 5, 6, 5, 8, 7],
      words: ["Hap", "py", "birth", "day", "to", "you", "hap", "py", "birth", "day", "to", "you"] },
    { id: "bridge", name: "London Bridge", emoji: "🌉",
      notes: [5, 6, 5, 4, 3, 4, 5, 2, 3, 4, 3, 4, 5],
      words: ["Lon", "don", "Bridge", "is", "fall", "ing", "down", "fall", "ing", "down", "fall", "ing", "down"] }
  ];

  var TEMPOS = { slow: 72, medium: 100, fast: 132 };
  var MODE_INFO = {
    keys: { badge: "Music keys", title: "Tap a colour", hint: "Every tap makes music. There are no wrong notes." },
    beats: { badge: "Drum time", title: "Tap the drum", hint: "Tap the big drum. Turn on the beat and play along." },
    sounds: { badge: "Sound explorer", title: "Which sound?", hint: "Tap an instrument to hear how it sings." },
    songs: { badge: "Sing along", title: "Play the song", hint: "Tap the glowing key and sing the word." },
    copy: { badge: "Copy me", title: "Listen, then copy", hint: "Listen to the little tune, then tap the same keys." }
  };

  var STORE_KEY = "sing-and-play-settings-v1";
  var PROGRESS_KEY = "sing-and-play-progress-v1";

  var settings = readJSON(STORE_KEY, {
    scale: "penta",
    voice: "xylophone",
    tempo: "medium",
    sound: true,
    speech: true,
    letters: true
  });
  var progress = readJSON(PROGRESS_KEY, { notesPlayed: 0, songsFinished: 0, echoRounds: 0 });

  var mode = "keys";
  var starCount = 0;
  var freePlayTaps = 0;
  var recording = [];
  var recordStart = 0;
  var lastKeyTapAt = 0;
  var scheduledTimers = [];
  var beatTimer = 0;
  var beatStep = 0;
  var beatOn = false;
  var currentSong = SONGS[0];
  var songPosition = 0;
  var busy = false;
  var echoSequence = [];
  var echoPosition = 0;
  var echoLength = 2;
  var audioContext = null;
  var masterGain = null;
  var noiseBufferCache = null;
  var preferredVoice = null;
  var speechRequestId = 0;
  var speechStartTimer = 0;
  var speechFinishTimer = 0;
  var holdTimer = 0;

  var starsEl = document.getElementById("stars");
  var activityBadge = document.getElementById("activityBadge");
  var questionText = document.getElementById("questionText");
  var stage = document.getElementById("stage");
  var actionRow = document.getElementById("actionRow");
  var statusMessage = document.getElementById("statusMessage");
  var listenButton = document.getElementById("listenButton");
  var celebration = document.getElementById("celebration");
  var modeBar = document.getElementById("modeBar");
  var settingsDialog = document.getElementById("settingsDialog");
  var settingsForm = document.getElementById("settingsForm");
  var parentButton = document.getElementById("parentButton");
  var parentStats = document.createElement("p");

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

  function randomItem(list) {
    return list[Math.floor(Math.random() * list.length)];
  }

  function later(callback, delay) {
    var id = window.setTimeout(callback, delay);
    scheduledTimers.push(id);
    return id;
  }

  function clearScheduled() {
    scheduledTimers.forEach(window.clearTimeout);
    scheduledTimers = [];
  }

  // Notes are scheduled as timers rather than on the audio clock so a child can
  // always interrupt a demonstration by tapping something else.
  function stopPlayback() {
    clearScheduled();
    busy = false;
  }

  /* ---------------- audio ---------------- */

  function getAudioContext() {
    if (!settings.sound) return null;
    var AudioConstructor = window.AudioContext || window.webkitAudioContext;
    if (!AudioConstructor) return null;
    if (!audioContext) {
      audioContext = new AudioConstructor();
      masterGain = audioContext.createGain();
      masterGain.gain.value = .55;
      // A limiter after the mix keeps overlapping notes from clipping harshly.
      if (typeof audioContext.createDynamicsCompressor === "function") {
        var limiter = audioContext.createDynamicsCompressor();
        limiter.threshold.value = -8;
        limiter.knee.value = 6;
        limiter.ratio.value = 12;
        limiter.attack.value = .003;
        limiter.release.value = .25;
        masterGain.connect(limiter);
        limiter.connect(audioContext.destination);
      } else {
        masterGain.connect(audioContext.destination);
      }
    }
    if (audioContext.state === "suspended") audioContext.resume();
    return audioContext;
  }

  function audioNow() {
    var context = getAudioContext();
    return context ? context.currentTime : 0;
  }

  function noiseBuffer(context) {
    if (noiseBufferCache) return noiseBufferCache;
    var length = Math.floor(context.sampleRate * 1.2);
    var buffer = context.createBuffer(1, length, context.sampleRate);
    var data = buffer.getChannelData(0);
    for (var index = 0; index < length; index += 1) data[index] = Math.random() * 2 - 1;
    noiseBufferCache = buffer;
    return buffer;
  }

  function playVoice(frequency, voiceName, when, volume) {
    var context = getAudioContext();
    if (!context) return;
    var spec = VOICES[voiceName] || VOICES.xylophone;
    var start = when || context.currentTime;
    var duration = spec.decay;
    var output = context.createGain();
    output.gain.value = (volume == null ? .5 : volume) * (spec.level || 1);
    output.connect(masterGain);

    var destination = output;
    if (spec.filter) {
      var filter = context.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(spec.filter, start);
      if (spec.sweep) filter.frequency.exponentialRampToValueAtTime(Math.max(240, spec.filter * .12), start + duration);
      filter.connect(output);
      destination = filter;
    }

    var vibrato = null;
    if (spec.vibrato) {
      vibrato = context.createOscillator();
      var vibratoGain = context.createGain();
      vibrato.frequency.setValueAtTime(spec.vibrato, start);
      vibratoGain.gain.setValueAtTime(frequency * .006, start);
      vibrato.connect(vibratoGain);
      vibrato.start(start);
      vibrato.stop(start + duration + .05);
      vibrato.gainNode = vibratoGain;
    }

    spec.partials.forEach(function (partial) {
      var oscillator = context.createOscillator();
      var gain = context.createGain();
      oscillator.type = partial[2];
      oscillator.frequency.setValueAtTime(frequency * partial[0], start);
      if (vibrato) vibrato.gainNode.connect(oscillator.frequency);
      gain.gain.setValueAtTime(.0001, start);
      gain.gain.exponentialRampToValueAtTime(Math.max(.002, partial[1]), start + spec.attack);
      gain.gain.exponentialRampToValueAtTime(.0001, start + duration);
      oscillator.connect(gain);
      gain.connect(destination);
      oscillator.start(start);
      oscillator.stop(start + duration + .05);
    });
  }

  function playDrum(kind, when, volume) {
    var context = getAudioContext();
    if (!context) return;
    var start = when || context.currentTime;
    var level = volume == null ? .8 : volume;

    if (kind === "kick" || kind === "tom") {
      var oscillator = context.createOscillator();
      var gain = context.createGain();
      var top = kind === "kick" ? 150 : 260;
      var bottom = kind === "kick" ? 46 : 110;
      var length = kind === "kick" ? .42 : .38;
      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(top, start);
      oscillator.frequency.exponentialRampToValueAtTime(bottom, start + length * .55);
      gain.gain.setValueAtTime(.0001, start);
      gain.gain.exponentialRampToValueAtTime(level, start + .01);
      gain.gain.exponentialRampToValueAtTime(.0001, start + length);
      oscillator.connect(gain);
      gain.connect(masterGain);
      oscillator.start(start);
      oscillator.stop(start + length + .05);
      return;
    }

    var source = context.createBufferSource();
    var filter = context.createBiquadFilter();
    var noiseGain = context.createGain();
    var noiseLength = .2;
    source.buffer = noiseBuffer(context);

    if (kind === "shaker") {
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(6200, start);
      noiseLength = .09;
    } else if (kind === "tambourine") {
      filter.type = "highpass";
      filter.frequency.setValueAtTime(4200, start);
      noiseLength = .45;
      playVoice(1046.5, "bell", start, .18);
    } else {
      filter.type = "highpass";
      filter.frequency.setValueAtTime(1300, start);
      noiseLength = kind === "clap" ? .16 : .22;
    }

    noiseGain.gain.setValueAtTime(.0001, start);
    noiseGain.gain.exponentialRampToValueAtTime(level * .5, start + .008);
    noiseGain.gain.exponentialRampToValueAtTime(.0001, start + noiseLength);
    source.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(masterGain);
    source.start(start);
    source.stop(start + noiseLength + .05);
  }

  /* ---------------- speech ---------------- */

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
    listenButton.classList.remove("speaking");
  }

  function stopSpeaking() {
    speechRequestId += 1;
    clearSpeechTimers();
    listenButton.classList.remove("speaking");
    if ("speechSynthesis" in window) {
      try { window.speechSynthesis.cancel(); } catch (error) {}
    }
  }

  function startSpeech(text, requestId, canRetry, reportProblem) {
    if (requestId !== speechRequestId || !settings.sound || !settings.speech) return;
    var synthesis = window.speechSynthesis;
    var started = false;
    try {
      var utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = .8;
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
    if (!settings.sound || !settings.speech) {
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
    listenButton.classList.remove("speaking");
    if (needsReset) {
      try { synthesis.cancel(); } catch (error) {}
      window.setTimeout(function () { startSpeech(text, requestId, true, !!reportProblem); }, 80);
    } else {
      startSpeech(text, requestId, true, !!reportProblem);
    }
  }

  /* ---------------- shared UI ---------------- */

  function setStatus(text, success) {
    statusMessage.textContent = text;
    statusMessage.classList.toggle("success", !!success);
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

  function addStar(message) {
    starCount += 1;
    renderStars();
    if (starCount >= 5) {
      starCount = 0;
      renderStars();
      showCelebration("Five stars!");
      speak("Five stars! You are a musician.", false);
    } else if (message) {
      showCelebration(message);
    }
  }

  function showCelebration(detail) {
    celebration.innerHTML = '<div class="yay-card">Bravo!<small>' + detail + "</small></div>";
    celebration.classList.add("on");
    var colors = ["#ff806f", "#ffc928", "#58adf6", "#43bd68", "#746ade"];
    for (var index = 0; index < 26; index += 1) {
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

  function floatNote(element) {
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    var box = element.getBoundingClientRect();
    var note = document.createElement("span");
    note.className = "note-burst";
    note.textContent = randomItem(["🎵", "🎶", "♪", "♫", "✨"]);
    note.style.left = Math.round(box.left + box.width / 2 - 15) + "px";
    note.style.top = Math.round(box.top + box.height / 4) + "px";
    document.body.appendChild(note);
    window.setTimeout(function () { note.remove(); }, 1300);
  }

  function pressFeedback(element, className, duration) {
    element.classList.add(className || "pressed");
    window.setTimeout(function () { element.classList.remove(className || "pressed"); }, duration || 180);
  }

  function countNote(awardStars) {
    progress.notesPlayed = Number(progress.notesPlayed || 0) + 1;
    saveJSON(PROGRESS_KEY, progress);
    if (!awardStars) return;
    freePlayTaps += 1;
    if (freePlayTaps % 12 === 0) addStar("Keep playing!");
  }

  function makeButton(label, emoji, extraClass) {
    var button = document.createElement("button");
    button.type = "button";
    button.className = "play-button" + (extraClass ? " " + extraClass : "");
    if (emoji) {
      var icon = document.createElement("span");
      icon.className = "button-emoji";
      icon.setAttribute("aria-hidden", "true");
      icon.textContent = emoji;
      button.appendChild(icon);
    }
    var text = document.createElement("span");
    text.textContent = label;
    button.appendChild(text);
    return button;
  }

  /* ---------------- keyboard ---------------- */

  function scaleNotes() {
    return settings.scale === "major" ? MAJOR : PENTA;
  }

  function scaleNames() {
    return settings.scale === "major" ? MAJOR_NAMES : PENTA_NAMES;
  }

  function buildKeyboard(notes, names, onTap) {
    var keyboard = document.createElement("div");
    keyboard.className = "keyboard";
    keyboard.setAttribute("role", "group");
    keyboard.setAttribute("aria-label", "Music keys");
    notes.forEach(function (frequency, index) {
      var key = document.createElement("button");
      key.type = "button";
      key.className = "key";
      key.dataset.index = String(index);
      key.style.setProperty("--key-color", KEY_COLORS[index % KEY_COLORS.length]);
      key.setAttribute("aria-label", "Note " + names[index]);
      if (settings.letters) key.textContent = names[index];
      key.addEventListener("click", function () { onTap(index, key); });
      keyboard.appendChild(key);
    });
    return keyboard;
  }

  function keyAt(index) {
    return stage.querySelector('.key[data-index="' + index + '"]');
  }

  function flashKey(index, duration) {
    var key = keyAt(index);
    if (!key) return;
    key.classList.add("pressed");
    window.setTimeout(function () { key.classList.remove("pressed"); }, duration || 220);
  }

  /* ---------------- mode: keys ---------------- */

  function renderKeys() {
    var notes = scaleNotes();
    var names = scaleNames();
    stage.appendChild(buildKeyboard(notes, names, function (index, key) {
      playVoice(notes[index], settings.voice, 0, .5);
      pressFeedback(key, "pressed", 160);
      floatNote(key);
      countNote(true);
      var tappedAt = Date.now();
      if (recording.length === 0) recordStart = tappedAt;
      if (recording.length < 40) recording.push({ index: index, at: tappedAt - recordStart });
      // Only name the note for an unhurried tap—fast play should sound like music, not a talking clock.
      if (settings.scale === "major" && tappedAt - lastKeyTapAt > 1100) speakSoftly(MAJOR_SUNG[index]);
      lastKeyTapAt = tappedAt;
      updateKeysActions();
      setStatus(recording.length === 1 ? "Your song has 1 note" : "Your song has " + recording.length + " notes", false);
    }));

    var playback = makeButton("Play my song", "▶️", "secondary");
    playback.id = "playbackButton";
    playback.addEventListener("click", playRecording);
    var clear = makeButton("Start again", "🧹", "quiet");
    clear.id = "clearButton";
    clear.addEventListener("click", function () {
      recording = [];
      updateKeysActions();
      setStatus("Ready for a brand new song", false);
    });
    actionRow.appendChild(playback);
    actionRow.appendChild(clear);
    updateKeysActions();
  }

  function updateKeysActions() {
    var playback = document.getElementById("playbackButton");
    var clear = document.getElementById("clearButton");
    if (playback) playback.disabled = busy || recording.length === 0;
    if (clear) clear.disabled = busy || recording.length === 0;
  }

  function playRecording() {
    if (busy || !recording.length) return;
    var notes = scaleNotes();
    busy = true;
    updateKeysActions();
    setStatus("Listen to your song", true);
    recording.forEach(function (event) {
      later(function () {
        playVoice(notes[event.index], settings.voice, 0, .5);
        flashKey(event.index, 200);
      }, event.at);
    });
    var total = recording[recording.length - 1].at + 700;
    later(function () {
      busy = false;
      updateKeysActions();
      setStatus("That was your song!", true);
    }, total);
  }

  function speakSoftly(text) {
    if (!settings.speech) return;
    speak(text, false);
  }

  /* ---------------- mode: beats ---------------- */

  function renderBeats() {
    var wrap = document.createElement("div");
    wrap.className = "drum-stage";

    var pad = document.createElement("button");
    pad.type = "button";
    pad.className = "drum-pad";
    pad.id = "drumPad";
    pad.textContent = "🥁";
    pad.setAttribute("aria-label", "Big drum");
    pad.addEventListener("click", function () {
      playDrum("kick", 0, .9);
      pressFeedback(pad, "pressed", 130);
      floatNote(pad);
      countNote(true);
      setStatus("Boom!", false);
    });
    wrap.appendChild(pad);

    var row = document.createElement("div");
    row.className = "perc-row";
    PERCUSSION.forEach(function (item) {
      var button = document.createElement("button");
      button.type = "button";
      button.className = "perc-pad";
      button.style.setProperty("--tile-color", item.color);
      button.setAttribute("aria-label", item.name);
      button.innerHTML = '<span class="tile-emoji" aria-hidden="true">' + item.emoji + '</span><span class="tile-name">' + item.name + "</span>";
      button.addEventListener("click", function () {
        playDrum(item.drum, 0, .85);
        pressFeedback(button, "pressed", 140);
        floatNote(button);
        countNote(true);
        setStatus(item.name + "!", false);
      });
      row.appendChild(button);
    });
    wrap.appendChild(row);

    var dots = document.createElement("div");
    dots.className = "beat-dots";
    dots.id = "beatDots";
    dots.setAttribute("aria-hidden", "true");
    for (var index = 0; index < 4; index += 1) dots.appendChild(document.createElement("span"));
    wrap.appendChild(dots);
    stage.appendChild(wrap);

    var beatButton = makeButton(beatOn ? "Stop the beat" : "Start the beat", "🎵", beatOn ? "is-on" : "");
    beatButton.id = "beatButton";
    beatButton.addEventListener("click", function () {
      if (beatOn) stopBeat();
      else startBeat();
    });
    actionRow.appendChild(beatButton);
    if (beatOn) startBeat();
  }

  function startBeat() {
    stopBeat();
    if (!getAudioContext()) {
      setStatus("Turn sound on to hear the beat.", false);
      return;
    }
    beatOn = true;
    beatStep = 0;
    updateBeatButton();
    setStatus("Play along with the beat!", true);
    beatTick();
    beatTimer = window.setInterval(beatTick, 60000 / TEMPOS[settings.tempo]);
  }

  function stopBeat() {
    window.clearInterval(beatTimer);
    beatTimer = 0;
    beatOn = false;
    updateBeatButton();
    var dots = document.getElementById("beatDots");
    if (dots) dots.querySelectorAll("span").forEach(function (dot) { dot.classList.remove("on"); });
  }

  function updateBeatButton() {
    var button = document.getElementById("beatButton");
    if (!button) return;
    button.classList.toggle("is-on", beatOn);
    button.lastChild.textContent = beatOn ? "Stop the beat" : "Start the beat";
  }

  function beatTick() {
    var step = beatStep % 4;
    if (step === 0 || step === 2) playDrum("kick", 0, .75);
    if (step === 1 || step === 3) playDrum("clap", 0, .55);
    playDrum("shaker", 0, step === 0 ? .5 : .3);

    var dots = document.getElementById("beatDots");
    if (dots) {
      dots.querySelectorAll("span").forEach(function (dot, index) {
        dot.classList.toggle("on", index === step);
      });
    }
    var pad = document.getElementById("drumPad");
    if (pad) {
      pad.classList.remove("beat");
      void pad.offsetWidth;
      pad.classList.add("beat");
    }
    beatStep += 1;
  }

  /* ---------------- mode: sounds ---------------- */

  function renderSounds() {
    var grid = document.createElement("div");
    grid.className = "instrument-grid";
    INSTRUMENTS.forEach(function (instrument) {
      var tile = document.createElement("button");
      tile.type = "button";
      tile.className = "instrument-tile";
      tile.style.setProperty("--tile-color", instrument.color);
      tile.setAttribute("aria-label", instrument.name);
      tile.innerHTML = '<span class="tile-emoji" aria-hidden="true">' + instrument.emoji + '</span><span class="tile-name">' + instrument.name + "</span>";
      tile.addEventListener("click", function () { playInstrument(instrument, tile); });
      grid.appendChild(tile);
    });
    stage.appendChild(grid);

    var surprise = makeButton("Surprise sound", "🎲", "secondary");
    surprise.addEventListener("click", function () {
      var instrument = randomItem(INSTRUMENTS);
      var tile = grid.children[INSTRUMENTS.indexOf(instrument)];
      playInstrument(instrument, tile);
    });
    actionRow.appendChild(surprise);
  }

  function playInstrument(instrument, tile) {
    var start = audioNow() + .04;
    instrument.motif.forEach(function (degree, index) {
      playVoice(MAJOR[degree - 1], instrument.voice, start + index * .22, .5);
    });
    if (tile) {
      pressFeedback(tile, "pressed", 170);
      floatNote(tile);
    }
    countNote(true);
    setStatus("That is a " + instrument.name.toLowerCase(), false);
    speakSoftly(instrument.name);
  }

  /* ---------------- mode: songs ---------------- */

  function renderSongs() {
    var chips = document.createElement("div");
    chips.className = "chip-row";
    SONGS.forEach(function (song) {
      var chip = document.createElement("button");
      chip.type = "button";
      chip.className = "song-chip" + (song.id === currentSong.id ? " is-current" : "");
      chip.setAttribute("aria-pressed", song.id === currentSong.id ? "true" : "false");
      chip.innerHTML = '<span class="chip-emoji" aria-hidden="true">' + song.emoji + "</span><span>" + song.name + "</span>";
      chip.addEventListener("click", function () {
        stopPlayback();
        currentSong = song;
        songPosition = 0;
        renderMode();
        speakSoftly(song.name);
      });
      chips.appendChild(chip);
    });
    stage.appendChild(chips);

    var lyric = document.createElement("div");
    lyric.className = "lyric-line";
    lyric.id = "lyricLine";
    stage.appendChild(lyric);

    stage.appendChild(buildKeyboard(MAJOR, MAJOR_NAMES, function (index, key) {
      if (busy) return;
      playVoice(MAJOR[index], settings.voice, 0, .5);
      pressFeedback(key, "pressed", 150);
      floatNote(key);
      if (index === currentSong.notes[songPosition] - 1) {
        songPosition += 1;
        countNote(false);
        if (songPosition >= currentSong.notes.length) finishSong();
        else {
          setStatus("Lovely! Keep going.", true);
          updateSongView();
        }
      } else {
        setStatus("Nice sound! The glowing key is next.", false);
      }
    }));

    var dots = document.createElement("div");
    dots.className = "song-progress";
    dots.id = "songProgress";
    dots.setAttribute("aria-hidden", "true");
    stage.appendChild(dots);

    var hear = makeButton("Hear it", "👂", "secondary");
    hear.addEventListener("click", function () {
      stopPlayback();
      playSong();
    });
    var restart = makeButton("Start again", "↺", "quiet");
    restart.addEventListener("click", function () {
      stopPlayback();
      songPosition = 0;
      updateSongView();
      setStatus("Back to the beginning", false);
    });
    actionRow.appendChild(hear);
    actionRow.appendChild(restart);

    questionText.textContent = currentSong.name;
    updateSongView();
  }

  function updateSongView() {
    var lyric = document.getElementById("lyricLine");
    var dots = document.getElementById("songProgress");
    if (lyric) {
      lyric.innerHTML = "";
      var word = document.createElement("span");
      word.className = "lyric-word";
      word.textContent = currentSong.words[songPosition] || "🎉";
      lyric.appendChild(word);
      if (currentSong.words[songPosition + 1]) {
        var next = document.createElement("span");
        next.className = "lyric-next";
        next.textContent = currentSong.words[songPosition + 1];
        lyric.appendChild(next);
      }
    }
    if (dots) {
      dots.innerHTML = "";
      currentSong.notes.forEach(function (note, index) {
        var dot = document.createElement("span");
        if (index < songPosition) dot.className = "done";
        else if (index === songPosition) dot.className = "now";
        dots.appendChild(dot);
      });
    }
    stage.querySelectorAll(".key").forEach(function (key) {
      key.classList.remove("next-note");
    });
    if (!busy && songPosition < currentSong.notes.length) {
      var target = keyAt(currentSong.notes[songPosition] - 1);
      if (target) target.classList.add("next-note");
    }
  }

  function playSong() {
    if (busy) return;
    busy = true;
    songPosition = 0;
    updateSongView();
    setStatus("Listen to the song", true);
    var gap = 460;
    currentSong.notes.forEach(function (degree, index) {
      later(function () {
        playVoice(MAJOR[degree - 1], settings.voice, 0, .5);
        flashKey(degree - 1, 260);
        songPosition = index;
        updateSongView();
      }, index * gap);
    });
    later(function () {
      busy = false;
      songPosition = 0;
      updateSongView();
      setStatus("Now it is your turn", false);
    }, currentSong.notes.length * gap + 500);
  }

  function finishSong() {
    busy = true;
    progress.songsFinished = Number(progress.songsFinished || 0) + 1;
    saveJSON(PROGRESS_KEY, progress);
    setStatus("You played the whole song!", true);
    addStar("You played " + currentSong.name + "!");
    speak("You played the whole song. Wonderful!", false);
    var start = audioNow() + .05;
    [1, 3, 5, 8].forEach(function (degree, index) {
      playVoice(MAJOR[degree - 1], "music_box", start + index * .12, .5);
    });
    later(function () {
      busy = false;
      songPosition = 0;
      updateSongView();
      setStatus("Play it again, or pick a new song", false);
    }, 1900);
  }

  /* ---------------- mode: copy me ---------------- */

  function renderCopy() {
    stage.appendChild(buildKeyboard(PENTA, PENTA_NAMES, function (index, key) {
      if (busy) return;
      playVoice(PENTA[index], settings.voice, 0, .5);
      pressFeedback(key, "pressed", 150);
      floatNote(key);
      if (!echoSequence.length) {
        setStatus("Tap listen to hear a tune first", false);
        return;
      }
      if (index === echoSequence[echoPosition]) {
        echoPosition += 1;
        countNote(false);
        if (echoPosition >= echoSequence.length) finishEcho();
        else setStatus("Yes! Keep copying.", true);
      } else {
        setStatus("Good try! Listen once more.", false);
        later(playEcho, 700);
      }
    }));

    var hear = makeButton("Play the tune", "👂", "secondary");
    hear.addEventListener("click", function () {
      stopPlayback();
      playEcho();
    });
    var fresh = makeButton("New tune", "🎲", "quiet");
    fresh.addEventListener("click", function () {
      stopPlayback();
      newEcho();
      playEcho();
    });
    actionRow.appendChild(hear);
    actionRow.appendChild(fresh);

    if (!echoSequence.length) newEcho();
    setStatus("Tap listen, then copy the tune", false);
  }

  function newEcho() {
    echoSequence = [];
    echoPosition = 0;
    for (var index = 0; index < echoLength; index += 1) {
      echoSequence.push(Math.floor(Math.random() * PENTA.length));
    }
  }

  function playEcho() {
    if (busy || !echoSequence.length) return;
    busy = true;
    echoPosition = 0;
    setStatus("Listen…", true);
    var gap = 550;
    echoSequence.forEach(function (index, position) {
      later(function () {
        playVoice(PENTA[index], settings.voice, 0, .5);
        flashKey(index, 320);
      }, position * gap);
    });
    later(function () {
      busy = false;
      setStatus("Your turn — copy the tune", false);
    }, echoSequence.length * gap + 400);
  }

  function finishEcho() {
    busy = true;
    progress.echoRounds = Number(progress.echoRounds || 0) + 1;
    saveJSON(PROGRESS_KEY, progress);
    setStatus("You copied it perfectly!", true);
    addStar("Great listening!");
    speak("You copied it. Great listening!", false);
    if (echoLength < 5) echoLength += 1;
    later(function () {
      busy = false;
      newEcho();
      playEcho();
    }, 1900);
  }

  /* ---------------- mode switching ---------------- */

  function renderMode() {
    clearScheduled();
    stopSpeaking();
    busy = false;
    stage.innerHTML = "";
    actionRow.innerHTML = "";
    var info = MODE_INFO[mode];
    activityBadge.textContent = info.badge;
    questionText.textContent = info.title;
    setStatus(info.hint, false);

    if (mode === "keys") renderKeys();
    else if (mode === "beats") renderBeats();
    else if (mode === "sounds") renderSounds();
    else if (mode === "songs") renderSongs();
    else renderCopy();
  }

  function setMode(name) {
    if (mode === name) return;
    if (mode === "beats") stopBeat();
    mode = name;
    modeBar.querySelectorAll(".mode-button").forEach(function (button) {
      var isCurrent = button.dataset.mode === name;
      button.classList.toggle("is-current", isCurrent);
      button.setAttribute("aria-pressed", isCurrent ? "true" : "false");
    });
    renderMode();
  }

  /* ---------------- settings ---------------- */

  function openSettings() {
    parentButton.classList.remove("holding");
    settingsForm.querySelector('input[name="scale"][value="' + settings.scale + '"]').checked = true;
    settingsForm.querySelector('input[name="voice"][value="' + settings.voice + '"]').checked = true;
    settingsForm.querySelector('input[name="tempo"][value="' + settings.tempo + '"]').checked = true;
    document.getElementById("soundSetting").checked = !!settings.sound;
    document.getElementById("voiceSetting").checked = !!settings.speech;
    document.getElementById("lettersSetting").checked = !!settings.letters;
    parentStats.textContent = "On this device: " + (progress.notesPlayed || 0) + " notes played, "
      + (progress.songsFinished || 0) + " songs finished, "
      + (progress.echoRounds || 0) + " tunes copied.";
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
    var wasPlayingBeat = beatOn;
    stopBeat();
    settings.scale = settingsForm.querySelector('input[name="scale"]:checked').value;
    settings.voice = settingsForm.querySelector('input[name="voice"]:checked').value;
    settings.tempo = settingsForm.querySelector('input[name="tempo"]:checked').value;
    settings.sound = document.getElementById("soundSetting").checked;
    settings.speech = document.getElementById("voiceSetting").checked;
    settings.letters = document.getElementById("lettersSetting").checked;
    if (!settings.sound || !settings.speech) stopSpeaking();
    else refreshPreferredVoice();
    saveJSON(STORE_KEY, settings);
    settingsDialog.close();
    recording = [];
    beatOn = wasPlayingBeat && mode === "beats" && settings.sound;
    renderMode();
  });

  modeBar.addEventListener("click", function (event) {
    var button = event.target.closest(".mode-button");
    if (button) setMode(button.dataset.mode);
  });

  listenButton.addEventListener("click", function () {
    if (mode === "songs") speak("Let's play " + currentSong.name + ". " + MODE_INFO.songs.hint, true);
    else speak(MODE_INFO[mode].hint, true);
  });

  document.addEventListener("visibilitychange", function () {
    if (!document.hidden) return;
    stopSpeaking();
    stopBeat();
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
        // Play continues normally when service workers are unavailable.
      });
    });
  }

  parentStats.className = "parent-note";
  settingsForm.insertBefore(parentStats, settingsForm.querySelector(".save-settings"));
  renderStars();
  renderMode();
}());
