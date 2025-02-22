import {onSelectImageFilePath} from './synchronized_panels.js';

import {C} from './components.js';
import {S} from './app_state.js';

import {ipcRenderer} from 'electron';

class ChooserPanel {

  static async onSelectDataDirClick() {
    console.log('Making select-data-dir-request');
    const dataDir = await ipcRenderer.invoke('select-data-dir-request');
    console.log("Selected ", dataDir);

    if (!dataDir || !dataDir.length)
      return;
    
    S.dataDir = dataDir;
    C.dataDirPath.textContent = dataDir;
    this.clearFilePaths();
  }

  static clearFilePaths() {
    C.imageFilePath.textContent = "";
    C.ocrOutputFilePath.textContent = "";
    C.editedTextFileRelPath.textContent = "";
  }

  static async onSelectImageFileClick() {
    console.log('Making select-image-file-path-request');
    // console.log("OcrOutputFilePath is ", C.ocrOutputFilePath);
  
    const dataDir = C.dataDirPath.textContent;
    const response  = await ipcRenderer.invoke('select-image-file-path-request', dataDir);
    this.populateFilePathFields(response);
    onSelectImageFilePath();
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
