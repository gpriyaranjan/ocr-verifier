import {C} from './components.js';
import {S} from './app_state.js';

import {getIpcRenderer} from "./ipc_renderer.js";
const {ipcRenderer} = await getIpcRenderer();

import {TopPanel} from './top_panel.js';

export class ChooserPanel {


  static setEventHandlers() {
    C.chooseImageFile.addEventListener('click', this.onSelectImageFileClick);
  }

  static inIpcCall = true;

  static async onSelectImageFileClick() {

    if (this.inIpcCall) {
      console.log("ChooserPanel::onSelectImageFileClick - Already on another call");
      return;
    }

    console.log('Making select-image-file-path-request');
    this.inIpcCall = true;
    // console.log("OcrOutputFilePath is ", C.ocrOutputFilePath);
  
    const response  = await ipcRenderer.invoke('select-image-file-path-request');
    console.log("Response is ", response);
    this.inIpcCall = false;
    ChooserPanel.populateFilePathFields(response);
    TopPanel.onSelectImageFilePath();
  }

  static populateFilePathFields(response : {
    dataDir : string,
    imageFileRelPath: string;
    ocrOutputFileRelPath: string;
    editedTextFileRelPath: string;
  }) {

    const {dataDir, imageFileRelPath, ocrOutputFileRelPath, editedTextFileRelPath} = response;
    console.log("ImageFile is ", imageFileRelPath);

    if (dataDir == null)
      return;

    S.dataDir = dataDir;
    
    C.dataDirPath.textContent = dataDir;
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
