
import {C} from "./components.js";
import {VoiceUtils} from './voice_utils.js';


export class SettingsPanel {

  static init() {
    C.speechSpeedSpinBox.readOnly = true;
    C.speechInterlinePause.readOnly = true;
  }

  static setEventHandlers() {

    console.log("setSettingsPanelCallbacks called");

    this.addEnterHandler(C.speechSpeedSpinBox);
    this.addBlurHandler(C.speechSpeedSpinBox, () => SettingsPanel.onSpeechSpeedSet());

    this.addEnterHandler(C.speechInterlinePause);
    this.addBlurHandler(C.speechInterlinePause, () => SettingsPanel.onSpeechInterlinePauseSet());
  }

  static onSpeechSpeedSet() {
    const speechSpeed = C.speechSpeedSpinBox.value;
    console.log("Setting speechSpeed to ", speechSpeed)

    const confirmed = confirm("Setting speech speed to " + speechSpeed);
    if (confirmed) {
      VoiceUtils.setUtteranceRate(parseInt(speechSpeed));
    } else {
      C.speechSpeedSpinBox.value = `${VoiceUtils.utteranceRate}`;
    }
  }

  static onSpeechInterlinePauseSet() {
    const interLinePause = C.speechInterlinePause.value;
    console.log("Setting interLinePause to ", interLinePause);
    const confirmed = confirm("Setting interLinePause to " + interLinePause + " seconds");
    if (confirmed) {
      VoiceUtils.setInterLinePause(parseInt(interLinePause));
    } else {
      C.speechInterlinePause.value = `${VoiceUtils.interLinePause}`;
    }
  }

  static addEnterHandler(element : HTMLInputElement) {
    element.addEventListener('keydown', function(event) {
      if (event.key == 'Enter') {
        event.stopPropagation();
        element.blur();
      }
    })
  }

  static addBlurHandler(element : HTMLInputElement, handler : () => void ) {
    element.addEventListener('blur', function(event) {
      event.stopPropagation();
      handler();
    })
  }

}
