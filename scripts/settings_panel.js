class SettingsPanel {

  static onSpeechSpeedSet() {
    const speechSpeed = C.speechSpeedSpinBox.value;
    console.log("Setting speechSpeed to ", speechSpeed)

    const confirmed = confirm("Setting speech speed to " + speechSpeed);
    if (confirmed) {
      VoiceUtils.setUtteranceRate(speechSpeed);
    } else {
      C.speechSpeedSpinBox.value = VoiceUtils.utteranceRate;
    }
  }

  static onSpeechInterlinePauseSet() {
    const interLinePause = C.speechInterlinePause.value;
    console.log("Setting interLinePause to ", interLinePause);
    const confirmed = confirm("Setting interLinePause to " + interLinePause + " seconds");
    if (confirmed) {
      VoiceUtils.setInterLinePause(interLinePause);
    } else {
      C.speechInterlinePause.value = VoiceUtils.interLinePause;
    }
  }

  static onGifOffsetSet() {
    const gifOffset = C.gifOffsetSpinBox.textContent;
    console.log("Setting the gifOffset ", gifOffset);
    GifPanel.gifOffset = gifOffset;
    GifPanel.scrollToCurrent();
  }

  static addEnterHandler(element) {
    element.addEventListener('keydown', function(event) {
      if (event.key == 'Enter') {
        event.stopPropagation();
        element.blur();
      }
    })
  }

  static addBlurHandler(element, handler) {
    element.addEventListener('blur', function(event) {
      handler();
    })
  }

  static setEventHandlers() {

    console.log("setSettingsPanelCallbacks called");

    this.addEnterHandler(C.speechSpeedSpinBox);
    this.addBlurHandler(C.speechSpeedSpinBox, () => SettingsPanel.onSpeechSpeedSet());

    this.addEnterHandler(C.speechInterlinePause);
    this.addBlurHandler(C.speechInterlinePause, () => SettingsPanel.onSpeechInterlinePauseSet());
    
  }
}