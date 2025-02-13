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

  static setEventHandlers() {

    console.log("setSettingsPanelCallbacks called");

    C.speechSpeedSpinBox.addEventListener('keydown', function(event) {
      if (event.key == 'Enter') {
        event.stopPropagation();
        C.speechSpeedSpinBox.blur();
      }
    })
  
    C.speechSpeedSpinBox.addEventListener('blur', function(event) {
      SettingsPanel.onSpeechSpeedSet();
    })

    C.speechInterlinePause.addEventListener('keydown', function(event) {
      if (event.key == 'Enter') {
        event.stopPropagation();
        C.speechInterlinePause.blur();
      }
      event.preventDefault();
    })
      
    C.speechInterlinePause.addEventListener('blur', function(event) {
      SettingsPanel.onSpeechInterlinePauseSet();
    })
  }
}