"use strict";

const {BrowserWindow, dialog} = require('electron');

function showMessage(message) {
  dialog.showMessageBox(BrowserWindow.getFocusedWindow(), 
    {message : message} )
}

class FileChooserUtils {

  static async selectDirectory() {
    console.log("Opening directory");
    const mainWindow = BrowserWindow.getFocusedWindow(); // Get the focused window
    const result = await dialog.showOpenDialog(mainWindow, {
      properties: ['openDirectory']
    });
  
    if (!result.canceled) {
      const selectedDirectory = result.filePaths[0];
      return selectedDirectory;
    } else {
      return null;
    }
  }

  static async selectFile(suggestedPath) {
    console.log("Opening file");
    const mainWindow = BrowserWindow.getFocusedWindow(); // Get the focused window
    const result = await dialog.showOpenDialog(mainWindow, {
      properties: ['openFile'],
      defaultPath: suggestedPath
    });
  
    if (!result.canceled) {
      const selectedFile = result.filePaths[0];
      return selectedFile;
    } else {
      return null;
    }
  }
}

const fs = require('fs/promises');
const path = require('path');

class FileUtils {

  static async hasChildDirs(parentDir, subDirs) {

    const entries = await fs.readdir(parentDir, { withFileTypes: true });
    let missingDirs = [];
    for (const subDir of subDirs) {
      // const subDirPath = path.join(parentDir, subDir);
      const subDirExists = entries.some( 
        entry => entry.name === subDir && entry.isDirectory());

      if (!subDirExists)
        missingDirs.push(subDir)
    }
    return missingDirs;
  }

  static ImagesDir = '1-images';
  static OcrOutputDir = '2-ocr-output';
  static EditedOutputDir = '4-edited';

  static AllRequiredDirs = [ this.ImagesDir, this.OcrOutputDir, this.EditedOutputDir];

  static getMissingDirs(dataDir) {
    const missingDirs = this.hasChildDirs(dataDir, this.AllRequiredDirs);
    return missingDirs;
  }

  static async isFileInDir(dirPath, fileName) {
    try {
      const filePath = `${dirPath}/${fileName}`;
      const result = await fs.access(filePath);
      return true;
    } catch(ex) {
      return false;
    }
  }

  static getImageName(imageFilePath) {
    const baseName = path.basename(imageFilePath);
    const ext = path.extname(baseName);
    const imageName = baseName.slice(0, baseName.length - ext.length);
    return imageName;
  }

  static async saveFile(filePath, fileContents) {
    await fs.writeFile(filePath, fileContents);
  }
}

exports.selectDataDir = async function () {
  
  const selectedDir = await FileChooserUtils.selectDirectory();
  if (!selectedDir) {
    showMessage('Directory not selected');
    return null;
  }

  const missingDirs = await FileUtils.getMissingDirs(selectedDir);
  if (missingDirs.length > 0) {
    showMessage(`${selectedDir} Missing sub-dirs ${missingDirs} `)
    return null;
  }
  return selectedDir;
}

exports.selectImageFilePath = async function (dataDir) {

  const imagesDir = path.join(dataDir, FileUtils.ImagesDir);
  const imageFilePath = await FileChooserUtils.selectFile(imagesDir);
  if (!imageFilePath) {
    showMessage("Image File not selected");
    return null;
  }

  const imageFileRelPath = path.relative(dataDir, imageFilePath);

  const imageName = FileUtils.getImageName(imageFilePath);

  const ocrOutputFileName = `${imageName}.txt`
  let   ocrOutputFileRelPath = path.join(FileUtils.OcrOutputDir, ocrOutputFileName);
  const ocrOutputDir = path.join(dataDir, FileUtils.OcrOutputDir);
  const ocrOutputFildFound = await FileUtils.isFileInDir(ocrOutputDir, ocrOutputFileName)
  if (!ocrOutputFildFound) {
    showMessage("No OCR Output file found " + ocrOutputFileRelPath);
    return null;
  }

  const editedTextFileName = `${imageName}_mod.txt`
  const editedTextFileRelPath = path.join(FileUtils.EditedOutputDir, editedTextFileName);
  const editedTextFileDir = path.join(dataDir, FileUtils.EditedOutputDir);
  const editedTextFileFound = await FileUtils.isFileInDir(editedTextFileDir, editedTextFileName);
  if (editedTextFileFound) {
    ocrOutputFileRelPath = editedTextFileRelPath;
  }

  return {
    'imageFileRelPath' : imageFileRelPath,
    'ocrOutputFileRelPath' : ocrOutputFileRelPath,
    'editedTextFileRelPath' : editedTextFileRelPath
  }
}

exports.saveFile = async function (dataDir, editedTextFileRelPath, fileContents) {
  const filePath = path.join(dataDir, editedTextFileRelPath);
  try {
    console.log("Saving file ", filePath, fileContents);
    await FileUtils.saveFile(filePath, fileContents);
    showMessage("Saved successfully " + filePath);
    return true;
  } catch(ex) {
    showMessage("Error saving file " + filePath + "\n" + ex);
    return false;
  }
}