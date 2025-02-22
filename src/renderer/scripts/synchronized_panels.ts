import {C} from './components.js';
import {S} from './app_state.js';

import {VoiceUtils} from './voice_utils.js';
import {SettingsPanel} from "./settings_panel.js";
import {GifPanel} from './gif_panel.js';
import {TextPanel} from './text_panel.js';
import { MagnifyingGlass } from './magnifying_glass.js';
import { ChooserPanel } from './chooser_panel.js';

declare var tippy: any;

function activateToolTips() {
  tippy('[data-tooltip]', {
    content: (element : HTMLElement) => element.getAttribute('data-tooltip'),
    theme: 'light',
  });  
}

async function onBodyLoad() {
  C.assignComponents();

  GifPanel.setEventHandlers();
  MagnifyingGlass.setContext();
  MagnifyingGlass.setEventHandlers();

  ChooserPanel.setEventHandlers();
  
  VoiceUtils.listVoices();

  TextPanel.setEventHandlers();
  SettingsPanel.setEventHandlers();
}

window.addEventListener('load', onBodyLoad);

function onDomParse() {
  C.assignComponents();
  activateToolTips();

  // Call onDomParse when the DOM is fully loaded inside the module
  window.addEventListener('DOMContentLoaded', () => {
    onDomParse();
  });
}

export function scrollOtherBar() {
  /*
  const imageScaleDown = C.imageDiv.width / C.imageDiv.naturalWidth;
  C.imagePanel.scrollTop = C.textContainer.scrollTop * imageScaleDown * 0.98 + 75;
  */
  GifPanel.scrollToOffset(C.textContainer.scrollTop);
  console.log('Scroll event triggered ', C.imagePanel.scrollTop, C.textContainer.scrollTop);
}

export async function onSelectImageFilePath() {

  const imageFilePath = `${S.dataDir}/${S.imageFileRelPath}`;
  GifPanel.loadImage(imageFilePath);

  const loadFilePath = `${S.dataDir}/${S.ocrOutputFileRelPath}`;
  console.log("Loading text from ", loadFilePath)
  TextPanel.loadFile(loadFilePath);
}
