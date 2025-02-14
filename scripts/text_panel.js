class TextPanel {

  static insertLinesintoTextContainer(in_lines) {
    const parent = C.textContainer;
    for(let i = 0; i < in_lines.length; i++) {
      const lineDiv = document.createElement("div");
      lineDiv.className = T.LineDivClass;
      lineDiv.dataset.index = i;
      lineDiv.textContent = in_lines[i];
      lineDiv.onclick = () => { TextPanel.hiliteLine(lineDiv); scrollOtherBar(); VoiceUtils.stopSpeaking(); }
      parent.append(lineDiv);
  
      C.lineDivs.push(lineDiv);   
    }
  }

  static populateTextPanel(fileContents) {

    let textLines = fileContents.split("\n");
        textLines = cleanUpLines(textLines);
    // console.log(textLines);
    // console.log("Lines after initial cleanup");
  
    S.lines = textLines;
    S.current = 0;
  
    this.insertLinesintoTextContainer(S.lines);
    this.hiliteLineNum(S.current);
  }

  static hiliteLine(element) {
    if (S.current != -1)
      C.lineDivs[S.current].classList.remove("hilite");
  
    element.classList.add("hilite");
    console.log(element.dataset.index);
    S.current = element.dataset.index;
  }
  
  static hiliteLineNum(lineNum) {
    if (lineNum < 0 || lineNum >= S.lines.length) {
      console.log("Invalid line number");
      return;
    }
    const element = C.lineDivs[lineNum];
    this.hiliteLine(element);
    element.scrollIntoView();
  }

  static clearTextPanel() {
    S.lines = []
    S.current = -1

    C.textContainer.innerHTML = '';
    C.lineDivs = []
  }

  static async loadFile(filePath) {
    TextPanel.clearTextPanel();
    const fileContents = await ipcRenderer.invoke('read-file-request', filePath);
    console.log("File contents are ", fileContents);
    TextPanel.clearTextPanel();
    TextPanel.populateTextPanel(fileContents);
  }
}
