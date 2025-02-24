import {C} from './components.js';
import {S} from './app_state.js';

import {getIpcRenderer} from "./ipc_renderer.js";
const {ipcRenderer} = await getIpcRenderer();

import {TopPanel} from './top_panel.js';

export class ChooserPanel {

  static init() {
    C.chooseImageFile.disabled = true;
  }

  static setEventHandlers() {
    C.chooseDataDir.addEventListener('click', this.onSelectDataDirClick);
    C.chooseImageFile.addEventListener('click', this.onSelectImageFileClick);
  }

  static inIpcCall = true;

  static async onSelectDataDirClick() {

    if (this.inIpcCall) {
      console.log("ChooserPanel::onSelectDataDirClick - Already on another call");
      return;
    }

    console.log('Making select-data-dir-request');
    this.inIpcCall = true;

    const dataDir = await ipcRenderer.invoke('select-data-dir-request');
    this.inIpcCall = false;

    console.log("Selected ", dataDir);

    if (!dataDir || !dataDir.length)
      return;
    
    S.dataDir = dataDir;
    C.dataDirPath.textContent = dataDir;
    ChooserPanel.clearFilePaths();
    C.chooseImageFile.focus();
    C.chooseImageFile.disabled = false;
  }

  static clearFilePaths() {
    C.imageFilePath.textContent = "";
    C.ocrOutputFilePath.textContent = "";
    C.editedTextFileRelPath.textContent = "";
  }

  static async onSelectImageFileClick() {

    if (this.inIpcCall) {
      console.log("ChooserPanel::onSelectImageFileClick - Already on another call");
      return;
    }

    console.log('Making select-image-file-path-request');
    this.inIpcCall = true;
    // console.log("OcrOutputFilePath is ", C.ocrOutputFilePath);
  
    const dataDir = C.dataDirPath.textContent;
    const response  = await ipcRenderer.invoke('select-image-file-path-request', dataDir);
    this.inIpcCall = false;
    ChooserPanel.populateFilePathFields(response);
    TopPanel.onSelectImageFilePath();
  }

  static populateFilePathFields(response : {
    imageFileRelPath: string;
    ocrOutputFileRelPath: string;
    editedTextFileRelPath: string;
  }) {

    const {imageFileRelPath, ocrOutputFileRelPath, editedTextFileRelPath} = response;
    console.log("ImageFile is ", imageFileRelPath);

    if (imageFileRelPath == null)
      return;

    C.imageFilePath.textContent = imageFileRelPath;
    S.imageFileRelPath = imageFileRelPath;
    
    console.log("OcrOutputFile is ", ocrOutputFileRelPath, C.ocrOutputFilePath);
    C.ocrOutputFilePath.textContent = ocrOutputFileRelPath;
    S.ocrOutputFileRelPath = ocrOutputFileRelPath;
  
    console.log("EditedTextFile is ", editedTextFileRelPath);
    C.editedTextFileRelPath.textContent = editedTextFileRelPath;
    S.editedTextFileRelPath = editedTextFileRelPath;

  }
}
