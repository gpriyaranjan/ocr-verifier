
class VoiceUtils {

  static allVoices = [];
  static preferedVoice = null;

  static interLinePause = 3;
  static utteranceRate = 0.33;

  static setUtteranceRate(utteranceRate) {
    this.utteranceRate = utteranceRate;
  }

  static setInterLinePause(interLinePause) {
    this.interLinePause = interLinePause;
  }

  static listVoices() {
    const fetchVoices = () => {
      const voices = window.speechSynthesis.getVoices(); // Get the voices
      voices.forEach(voice => console.log(voice));

      VoiceUtils.allVoices.push(...voices);

      if (window.speechSynthesis.pending)
        setTimeout(fetchVoices, 1000);
      else {
        const voices = VoiceUtils.allVoices.filter(voice => (voice.lang == 'en-IN')).sort();
        if (voices.length > 0)
          VoiceUtils.preferedVoice = voices[0]; 
      }
    }
    fetchVoices();
    window.speechSynthesis.onvoiceschanged = fetchVoices;
  }

  static expandPuctuations(text) {
    const punctuationMap = {
      ".": " period ",
      ",": " comma ",
      "!": " exclamation point ",
      "?": " question mark ",
      ":": " colon ",
      ";": " semicolon ",
      "-": " hyphen ", // Or "dash" depending on context
      "(": " open parenthesis ",
      ")": " close parenthesis ",
      "[": " open bracket ",
      "]": " close bracket ",
      "{": " open brace ",
      "}": " close brace ",
      "'": " apostrophe ", // Or handle contextually (possessive vs. quotation)
      "\"": " quotation mark ", // Or handle as double quotes
      "`": " backtick ",
      "@": " at symbol ",
      "#": " number sign ", // Or "hash" or "pound"
      "$": " dollar sign ",
      "%": " percent sign ",
      "^": " caret ",
      "&": " ampersand ",
      "*": " asterisk ",
      "+": " plus sign ",
      "=": " equals sign ",
      "/": " slash ",
      "\\": " backslash ",
      "|": " vertical bar ",
      "<": " less than ",
      ">": " greater than ",
    };
  
    if (!text) return text;
    let newText = ''
    for(let i = 0; i < text.length; i++) {
      let char = text[i];
      if (punctuationMap[char]) 
        char = " " + punctuationMap[char] + char + " "
      newText = newText + char;
    }
    return newText;
  }
  
  static speakAsIs(phrase) {
    console.log("New utterance generated ", phrase);

    const utterance = new SpeechSynthesisUtterance(phrase);

    utterance.rate = this.utteranceRate;
    if (VoiceUtils.preferedVoice)
      utterance.voice = VoiceUtils.preferedVoice;
    console.log("Using voice ", VoiceUtils.preferedVoice);

    window.speechSynthesis.speak(utterance);
    return utterance;
  }

  static speakPhrase(phrase) {
    const expandedPhrase = VoiceUtils.expandPuctuations(phrase);
    const utterance = VoiceUtils.speakAsIs(expandedPhrase);
    return utterance;
  }

  static speakPhrasesFrom(phrases, lineNum, onNextPhrase) {
    console.log("Speak phrases from ", lineNum);
    if (lineNum >= phrases.length) return;

    const phrase = phrases[lineNum];
    const utterance = VoiceUtils.speakPhrase(phrase);
    utterance.onend = () => {
      setTimeout( () => {
        onNextPhrase();
        VoiceUtils.speakPhrasesFrom(phrases, Number(lineNum)+1, onNextPhrase);
      }, this.interLinePause*1000);
    }
  }

  static speakPhrases(phrases, onNextPhrase) {
    VoiceUtils.speakPhrasesFrom(phrases, 0, onNextPhrase);
  }

  static stopSpeaking() {
    window.speechSynthesis.cancel();
  }
}
