class TextPanel {

  static cleanUpLines(in_lines: string[]) {

    let out_lines = []
    for(let i = 0; i < in_lines.length; i++) {
      const in_line = in_lines[i];
  
      if (/^\s*$/.test(in_line))
        continue;
  
      if (in_line.startsWith("===")) 
        continue;
  
      if (in_line.startsWith("Page"))
        continue;
  
      out_lines.push(in_line)
    }
    return out_lines;
  }

  // static lineDivHtmlTemplate = (i: number, textContent: string) => 
  //     `<div class="line-div" index="${i}">${textContent}</div>`;

  static insertLinesintoTextContainer(in_lines : string[]) {
    const parent = C.textContainer;
    for(let i = 0; i < in_lines.length; i++) {
      console.log("Creating text content ", i, in_lines[i]);
      const lineDiv = document.createElement("div");
      // lineDiv.outerHTML = this.lineDivHtmlTemplate(i, in_lines[i]);
      lineDiv.className = T.LineDivClass;
      lineDiv.dataset.index = `${i}`;
      lineDiv.textContent = in_lines[i];
      lineDiv.onclick = () => { TextPanel.hiliteLine(lineDiv); scrollOtherBar(); VoiceUtils.stopSpeaking(); }
      parent.append(lineDiv);
  
      C.lineDivs.push(lineDiv);   
    }
  }

  static populateTextPanel(fileContents : string) {

    let textLines = fileContents.split("\n");
        textLines = TextPanel.cleanUpLines(textLines);
    // console.log(textLines);
    // console.log("Lines after initial cleanup");
  
    S.lines = textLines;
    S.current = 0;
  
    this.insertLinesintoTextContainer(S.lines);
    this.hiliteLineNum(S.current);
  }

  static hiliteLine(element : HTMLElement) {
    if (S.current != -1)
      C.lineDivs[S.current].classList.remove("hilite");
  
    element.classList.add("hilite");
    console.log(element.dataset.index);
    S.current = parseInt(element.dataset.index!);
  }
  
  static hiliteLineNum(lineNum : number) {
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

  static async loadFile(filePath : string) {
    TextPanel.clearTextPanel();
    const fileContents = await ipcRenderer.invoke('read-file-request', filePath);
    console.log("File contents are ", fileContents);
    TextPanel.clearTextPanel();
    TextPanel.populateTextPanel(fileContents);
  }
}
