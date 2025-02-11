"use strict";

class T {
  static TopPanelId = 'top-panel';

  static chooserPanelId = 'chooser-panel';
  static chooseDataDirId = 'choose-data-dir';
  static dataDirPathId = 'data-dir-path';
  static chooseImageFileId = 'choose-image-file';
  static imageFilePathId = 'image-file-path';
  static ocrOutputFilePathId = 'text-file-path';
  static editedTextFileRelPathId = 'edited-text-file-path';

  static ImagePanelId = 'image-panel';
  static ImageDivId = 'image';

  static TextPanelId = 'text-panel';
  static TextContainerId = 'text-container';
  static TextIframeId = 'text-iframe';

  static LineDivClass = 'line-div';
  static HiliteClass = 'hilite';
  static ActiveClass = 'active';

  static IconPanelId = 'icon-panel';
  static PlayButtonId = 'play-button';
  static PauseButtonId = 'pause-button';
  // static EditButtonId = 'edit-button';
  static SaveButtonId = 'save-button';

};

class C /* Components */ {
  static topPanel;

  static chooserPanel;
  static chooseDataDir;
  static dataDirPath;
  static chooseImageFile;
  static imageFilePath;
  static ocrOutputFilePath;
  static editedTextFileRelPath;

  static imagePanel;
  static imageDiv;

  static textPanel;
  static textContainer;
  static textIframe;
  static lineDivs;

  static iconPanel;
  static playButton;
  static pauseButton;
  static editButton;
  static saveButton;

  static assignComponents() {
    C.topPanel = document.getElementById(T.TopPanelId);
  
    C.chooserPanel = document.getElementById(T.chooserPanelId);

    C.chooseDataDir = document.getElementById(T.chooseDataDirId);
    C.dataDirPath = document.getElementById(T.dataDirPathId);

    C.chooseImageFile = document.getElementById(T.chooseImageFileId);
    C.imageFilePath = document.getElementById(T.imageFilePathId);
    C.ocrOutputFilePath = document.getElementById(T.ocrOutputFilePathId);
    C.editedTextFileRelPath = document.getElementById(T.editedTextFileRelPathId);

    C.imagePanel = document.getElementById(T.ImagePanelId);
    C.imageDiv = document.getElementById(T.ImageDivId);
    
    C.textPanel = document.getElementById(T.TextPanelId);
    C.textContainer = document.getElementById(T.TextContainerId);
    C.textIframe = document.getElementById(T.TextIframeId);
    C.lineDivs = []
  
    C.iconPanel = document.getElementById(T.IconPanelId);
    C.playButton = document.getElementById(T.PlayButtonId);
    C.pauseButton = document.getElementById(T.PauseButtonId);
    C.editButton = document.getElementById(T.EditButtonId);
    C.saveButton = document.getElementById(T.SaveButtonId);  
  }
};

class AppState {
  playing = false;
  editing = false;
  lines = [];
  current = -1;

  dataDir = "";
  imageFileRelPath = "";
  ocrOutputFileRelPath = "";
  editedTextFileRelPath = "";
};

const S = new AppState();

async function onDomParse() {
  C.assignComponents();
  VoiceUtils.listVoices();
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

function scrollImageUp() {
  C.imagePanel.scrollTop = 100;
}

function onImageLoadComplete() {
  scrollImageUp();
  console.log("Image size is ", C.imageDiv.width, C.imageDiv.height);
  console.log("Image natural size is ", C.imageDiv.naturalWidth, C.imageDiv.naturalHeight);
}

class StrUtils2 {
  static innerHTMLToTextLines(innerHtml) {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = innerHtml;
    const str = tempDiv.firstChild.childNodes[0].textContent;
    const lines = str.split("\n");
    return lines;
  }
}

function insertLinesintoTextContainer(in_lines) {
  const parent = C.textContainer;
  for(let i = 0; i < in_lines.length; i++) {
    const lineDiv = document.createElement("div");
    lineDiv.className = T.LineDivClass;
    lineDiv.dataset.index = i;
    lineDiv.textContent = in_lines[i];
    lineDiv.onclick = () => { hiliteLine(lineDiv); }
    parent.append(lineDiv);

    C.lineDivs.push(lineDiv);   
  }
}

function scrollOtherBar() {
  const imageScaleDown = C.imageDiv.width / C.imageDiv.naturalWidth;
  C.imagePanel.scrollTop = C.textContainer.scrollTop * imageScaleDown * 0.98 + 75;
  console.log('Scroll event trapped ', C.imagePanel.scrollTop, C.textContainer.scrollTop);
}

function populateOcrOutput(iframe) {
  const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
  const iframeInnerHTML = iframeDocument.body.innerHTML;
  if (!iframeInnerHTML || !iframeInnerHTML.length)
    return;

  const fileLines = StrUtils2.innerHTMLToTextLines(iframeInnerHTML);

  let textLines = cleanUpLines(fileLines);
  // console.log(textLines);
  // console.log("Lines after initial cleanup");

  S.lines = textLines;

  insertLinesintoTextContainer(S.lines);
}

function hiliteLine(element) {
  if (S.current != -1)
    C.lineDivs[S.current].classList.remove("hilite");

  element.classList.add("hilite");
  console.log(element.dataset.index);
  S.current = element.dataset.index;
}

function hiliteLineNum(lineNum) {
  if (lineNum < 0 || lineNum >= S.lines.length) {
    console.log("Invalid line number");
    return;
  }
  const element = C.lineDivs[lineNum];
  hiliteLine(element);
  element.scrollIntoView();
}

function onPlay() {

  function hiliteNextLine() {
    console.log("Hilite next line called");

    if (S.current != -1)
      C.lineDivs[S.current].classList.remove("hilite");

    S.current++;
    console.log("S.current updated to ", S.current);

    if (S.current < S.lines.length) {
      hiliteLineNum(S.current);
    }
  }

  console.log("Play button pressed, with hilite at line ", S.current);
  C.playButton.classList.add(T.ActiveClass);
  C.pauseButton.classList.remove(T.ActiveClass);

  S.current = (S.current != -1) ? S.current : 0;
  const currElem = C.lineDivs[S.current];
  hiliteLine(currElem);
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
}

async function onSelectDataDirClick() {
  console.log('Making select-data-dir-request');
  const dataDir = await ipcRenderer.invoke('select-data-dir-request');
  console.log("Selected ", dataDir);

  S.dataDir = dataDir;
  C.dataDirPath.textContent = dataDir;
}

async function makeSelectImageFilePathRequest() {
  console.log('Making select-image-file-path-request');

  const dataDir = C.dataDirPath.textContent;
  const {imageFileRelPath, ocrOutputFileRelPath, editedTextFileRelPath} 
    = await ipcRenderer.invoke('select-image-file-path-request', dataDir);
  
  console.log("ImageFile is ", imageFileRelPath);
  C.imageFilePath.textContent = imageFileRelPath;
  S.imageFileRelPath = imageFileRelPath;
  
  console.log("OcrOutputFile is ", ocrOutputFileRelPath);
  C.ocrOutputFilePath.textContent = ocrOutputFileRelPath;
  S.ocrOutputFileRelPath = ocrOutputFileRelPath;

  console.log("EditedTextFile is ", editedTextFileRelPath);
  C.editedTextFileRelPath.textContent = editedTextFileRelPath;
  S.editedTextFileRelPath = editedTextFileRelPath;
}

async function onSelectImageFilePath() {
  await makeSelectImageFilePathRequest();
  C.imageDiv.src = `${S.dataDir}/${S.imageFileRelPath}`;
  C.textIframe.src = `${S.dataDir}/${S.ocrOutputFileRelPath}`
}
