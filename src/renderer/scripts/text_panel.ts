import { C, T } from './components.js';
import { S } from './app_state.js';

import { VoiceUtils } from './voice_utils.js';
import { scrollOtherBar } from "./synchronized_panels.js";

import {getIpcRenderer} from "./ipc_renderer.js";
const {ipcRenderer} = await getIpcRenderer();

export class TextPanel {

  static setEventHandlers() {
    C.textContainer.addEventListener('input', TextPanel.syncText);
    C.textContainer.addEventListener('scroll', scrollOtherBar);
  }

  static syncText(event : Event) {
    if (event.target instanceof HTMLInputElement) {
      const index : number = parseInt(event.target.dataset.index!);
      const textContent : string = event.target.value;
      // console.log("Index ", index, " Content ", textContent);
      S.lines[index] = textContent;
    }
  }

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

  static lineDivHtmlTemplate = (i: number, textContent: string) => 
      `<input type="text" class="line-div" contenteditable="true" data-index="${i}" value="${textContent}"></input>
       <div class="line-state">${i+1}</div>`;

  static onLineClick(lineDiv: HTMLInputElement) {
    TextPanel.hiliteLine(lineDiv);
    TextPanel.scrollToLine(Number(lineDiv.dataset.index));
    scrollOtherBar();
    VoiceUtils.stopSpeaking();
  }

  static insertLinesintoTextContainer(in_lines : string[]) {
    const parent = C.textContainer;
    for(let i = 0; i < in_lines.length; i++) {

      console.log("Creating text content ", i, in_lines[i]);

      const lineContainer = document.createElement("div");
      lineContainer.innerHTML = this.lineDivHtmlTemplate(i, in_lines[i]);
      lineContainer.className = T.LineContainerClass;

      const lineDiv : HTMLInputElement = lineContainer.getElementsByClassName(T.LineDivClass)[0] as HTMLInputElement ;
      lineDiv.onclick = () => { TextPanel.onLineClick(lineDiv); }
      parent.append(lineContainer);
  
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
      console.trace()
      return;
    }
    const element = C.lineDivs[lineNum];
    this.hiliteLine(element);
    element.scrollIntoView();
  }

  static scrollToLine(lineNum : number) {
    C.textContainer.scrollTop = 50*lineNum;
    console.log("Scrolling to position ", C.textContainer.scrollTop);
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
