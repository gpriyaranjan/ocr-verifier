"use strict";

/*
function activateToolTips() {
  tippy('[data-tooltip]', {
    content: (element) => element.getAttribute('data-tooltip'),
    placement: (instance) => { // Placement as a function
        return instance.reference.getAttribute('data-tippy-placement') || 'top'; // Default to 'top'
    },
    theme: 'light',
  });  
}
*/

async function onBodyLoad() {
  VoiceUtils.listVoices();
  SettingsPanel.setEventHandlers();
}


function onDomParse() {
  C.assignComponents();
}

function cleanUpLines(in_lines) {

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

function onImageLoadComplete() {
  GifPanel.scrollToLineNum(0);
}

class TextPanel {

  static insertLinesintoTextContainer(in_lines) {
    const parent = C.textContainer;
    for(let i = 0; i < in_lines.length; i++) {
      const lineDiv = document.createElement("div");
      lineDiv.className = T.LineDivClass;
      lineDiv.dataset.index = i;
      lineDiv.textContent = in_lines[i];
      lineDiv.onclick = () => { TextPanel.hiliteLine(lineDiv); }
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
    C.lineDivs = []
  }
}

function scrollOtherBar() {
  const imageScaleDown = C.imageDiv.width / C.imageDiv.naturalWidth;
  C.imagePanel.scrollTop = C.textContainer.scrollTop * imageScaleDown * 0.98 + 75;
  console.log('Scroll event triggered ', C.imagePanel.scrollTop, C.textContainer.scrollTop);
}

function onPlay() {

  function hiliteNextLine() {
    console.log("Hilite next line called");

    if (S.current != -1)
      C.lineDivs[S.current].classList.remove("hilite");

    S.current++;
    console.log("S.current updated to ", S.current);

    if (S.current < S.lines.length) {
      TextPanel.hiliteLineNum(S.current);
      GifPanel.scrollToLineNum(S.current);
    }
  }

  console.log("Play button pressed, with hilite at line ", S.current);
  C.playButton.classList.add(T.ActiveClass);
  C.pauseButton.classList.remove(T.ActiveClass);

  S.current = (S.current != -1) ? S.current : 0;
  TextPanel.hiliteLineNum(S.current);
  GifPanel.scrollToLineNum(S.current);
  
  VoiceUtils.speakPhrasesFrom(S.lines, S.current, hiliteNextLine);
}

function onPause() {

  C.playButton.classList.remove(T.ActiveClass);
  C.pauseButton.classList.add(T.ActiveClass);

  VoiceUtils.stopSpeaking();
}

const { ipcRenderer } = require('electron');

async function onSave() {
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

async function onSelectDataDirClick() {
  console.log('Making select-data-dir-request');
  const dataDir = await ipcRenderer.invoke('select-data-dir-request');
  console.log("Selected ", dataDir);

  S.dataDir = dataDir;
  C.dataDirPath.textContent = dataDir;

  C.imageFilePath.textContent = "";
  C.ocrOutputFilePath.textContent = "";
  C.editedTextFileRelPath.textContent = "";
}

async function makeSelectImageFilePathRequest() {
  console.log('Making select-image-file-path-request');
  // console.log("OcrOutputFilePath is ", C.ocrOutputFilePath);

  const dataDir = C.dataDirPath.textContent;
  const {imageFileRelPath, ocrOutputFileRelPath, editedTextFileRelPath} 
    = await ipcRenderer.invoke('select-image-file-path-request', dataDir);
  
  console.log("ImageFile is ", imageFileRelPath);
  C.imageFilePath.textContent = imageFileRelPath;
  S.imageFileRelPath = imageFileRelPath;
  
  console.log("OcrOutputFile is ", ocrOutputFileRelPath, C.ocrOutputFilePath);
  C.ocrOutputFilePath.textContent = ocrOutputFileRelPath;
  S.ocrOutputFileRelPath = ocrOutputFileRelPath;

  console.log("EditedTextFile is ", editedTextFileRelPath);
  C.editedTextFileRelPath.textContent = editedTextFileRelPath;
  S.editedTextFileRelPath = editedTextFileRelPath;
}

async function loadFileFromFilePath(filePath) {
  const fileContents = await ipcRenderer.invoke('read-file-request', filePath);
  console.log("File contents are ", fileContents);
  TextPanel.clearTextPanel();
  TextPanel.populateTextPanel(fileContents);
}

async function onSelectImageFilePath() {
  await makeSelectImageFilePathRequest();

  const imageFilePath = `${S.dataDir}/${S.imageFileRelPath}`;
  console.log("Fetching image file ", imageFilePath)
  C.imageDiv.src = imageFilePath;

  const loadFilePath = `${S.dataDir}/${S.ocrOutputFileRelPath}`;
  console.log("Loading text from ", loadFilePath)
  loadFileFromFilePath(loadFilePath);
}

