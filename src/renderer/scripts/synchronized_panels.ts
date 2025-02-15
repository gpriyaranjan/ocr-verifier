declare var tippy: any;

function activateToolTips() {
  tippy('[data-tooltip]', {
    content: (element : HTMLElement) => element.getAttribute('data-tooltip'),
    theme: 'light',
  });  
}

async function onBodyLoad() {
  VoiceUtils.listVoices();
  TextPanel.setEventHandlers();
  SettingsPanel.setEventHandlers();
}

function onDomParse() {
  C.assignComponents();
  activateToolTips();
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
