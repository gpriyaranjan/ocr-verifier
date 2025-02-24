import { C, T } from "./components.js";
import { S } from "./app_state.js";

import {getIpcRenderer} from "./ipc_renderer.js";
const {ipcRenderer} = await getIpcRenderer();

import {TextPanel} from "./text_panel.js";
import {VoiceUtils} from './voice_utils.js';

export class IconsPanel {

  static init() {
    C.playButton.disabled = true;
    C.pauseButton.disabled = true;
    C.saveButton.disabled = true;
    C.searchButton.disabled = true;
  }

  static setEventHandlers() {
    C.playButton.addEventListener('click', this.onPlay);
    C.pauseButton.addEventListener('click', this.onPause);
    C.saveButton.addEventListener('click', this.onSave);
    C.searchButton.addEventListener('click', this.onSearch);
  }

  static enable() {
    C.playButton.disabled = false;
    C.pauseButton.disabled = false;
    C.saveButton.disabled = false;
    C.searchButton.disabled = false;
  }

  static async onPlay() {

    function hiliteNextLine() {
      console.log("Hilite next line called");

      if (S.current != -1)
        C.lineDivs[S.current].classList.remove("hilite");

      S.current++;
      console.log("S.current updated to ", S.current);

      if (S.current < S.lines.length) {
        TextPanel.hiliteLineNum(S.current);
        // GifPanel.scrollToLineNum(S.current);
      }
    }

    console.log("Play button pressed, with hilite at line ", S.current);
    C.playButton.classList.add(T.ActiveClass);
    C.pauseButton.classList.remove(T.ActiveClass);

    S.current = (S.current != -1) ? S.current : 0;
    TextPanel.hiliteLineNum(S.current);
    // GifPanel.scrollToLineNum(S.current);
  
    VoiceUtils.speakPhrasesFrom(S.lines, S.current, hiliteNextLine);
  }

  static async onPause() {

    C.playButton.classList.remove(T.ActiveClass);
    C.pauseButton.classList.add(T.ActiveClass);

    VoiceUtils.stopSpeaking();
  }

  static async onSave() {

    const cur_lines = []
    for(let i = 0; i < C.lineDivs.length; i++) {
      cur_lines.push(S.lines[i]);
    }
    const contents = cur_lines.join("\n")

    console.log('Making save-file-request');
    const saved = await ipcRenderer.invoke('save-file-request', 
      S.dataDir, S.editedTextFileRelPath, contents);

  
    S.ocrOutputFileRelPath = S.editedTextFileRelPath;
    C.ocrOutputFilePath.textContent = S.ocrOutputFileRelPath;
  }

  static async onSearch() {
    console.log("Searching for ")
  } 
}
