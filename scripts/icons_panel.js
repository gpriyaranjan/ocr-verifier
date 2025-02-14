class IconsPanel {

  static onPlay() {

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

  static onPause() {

    C.playButton.classList.remove(T.ActiveClass);
    C.pauseButton.classList.add(T.ActiveClass);

    VoiceUtils.stopSpeaking();
  }


  static async onSave() {

    const cur_lines = []
    for(let i = 0; i < C.lineDivs.length; i++) {
      const lineDiv = C.lineDivs[i];
      cur_lines.push(lineDiv.textContent);
    }
    const contents = cur_lines.join("\n")

    console.log('Making save-file-request');  
    const saved = await ipcRenderer.invoke('save-file-request', 
      S.dataDir, S.editedTextFileRelPath, contents);

  
    S.ocrOutputFileRelPath = S.editedTextFileRelPath;
    C.ocrOutputFilePath.textContent = S.ocrOutputFileRelPath;
  }

}