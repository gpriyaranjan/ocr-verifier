"use strict";

function activateToolTips() {
  tippy('[data-tooltip]', {
    content: (element) => element.getAttribute('data-tooltip'),
    theme: 'light',
  });  
}

async function onBodyLoad() {
  VoiceUtils.listVoices();
  // ChooserPanel.setEventHandlers();
  SettingsPanel.setEventHandlers();
}

function onDomParse() {
  C.assignComponents();
  activateToolTips();
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

function scrollOtherBar() {
  /*
  const imageScaleDown = C.imageDiv.width / C.imageDiv.naturalWidth;
  C.imagePanel.scrollTop = C.textContainer.scrollTop * imageScaleDown * 0.98 + 75;
  */
  GifPanel.scrollToOffset(C.textContainer.scrollTop);
  console.log('Scroll event triggered ', C.imagePanel.scrollTop, C.textContainer.scrollTop);
}

const { ipcRenderer } = require('electron');

async function onSelectImageFilePath() {

  const imageFilePath = `${S.dataDir}/${S.imageFileRelPath}`;
  GifPanel.loadImage(imageFilePath);

  const loadFilePath = `${S.dataDir}/${S.ocrOutputFileRelPath}`;
  console.log("Loading text from ", loadFilePath)
  TextPanel.loadFile(loadFilePath);
}
