// import { app, BrowserWindow, ipcMain, dialog, screen } from 'electron'

import {selectImageFilePath, saveFile, readFile} from './file_utils.js';

import * as path from 'path';
import { fileURLToPath } from 'url';

import {getIpcMain} from "./ipc_main.js";
const { app, BrowserWindow, ipcMain, dialog, screen } = await getIpcMain();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let screenWidth : number, screenHeight : number;

function calcScreenDim() {
  const primaryDisplay = screen.getPrimaryDisplay();
  screenWidth = primaryDisplay.bounds.width;
  screenHeight = primaryDisplay.bounds.height;
}

function createWindow () {
  calcScreenDim();

  const win = new BrowserWindow({
    width: screenWidth*0.9,
    height: screenHeight*0.9,
    webPreferences: {
      // preload: path.join(__dirname, 'preload.js'), // For security (explained later)
      nodeIntegration: true, // For security (explained later)
      contextIsolation: false, // For security (explained later)
    }
  });

  win.loadFile(path.join(__dirname,"../../src/renderer/synchronized_panels.html"));

  win.webContents.openDevTools();
}

function showMessage(message : string) {
  dialog.showMessageBox(BrowserWindow.getFocusedWindow()!, 
    {message : message} )
}

app.whenReady().then( () => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow(); // Recreate window on macOS
  });

  ipcMain.handle('select-image-file-path-request', async (event: any) => {
    try {
      const result = await selectImageFilePath();
      return result;
    } catch(ex : unknown) {
      showMessage("Exception received " /* + ex.stack */);
    }
  });
  
  ipcMain.handle('save-file-request', async (event: any, dataDir: string, fileRelPath: string, fileContents: string) => {
    try {
      return await saveFile(dataDir, fileRelPath, fileContents);
    } catch(ex : unknown) {
      showMessage("Exception received " /* + ex.stack */ );
    }
  })

  ipcMain.handle('read-file-request', async(event: any, filePath: string) => {
    try {
      return await readFile(filePath);
    } catch(ex : unknown) {
      showMessage("Exception received " /* + ex.stack */);    
    }
  })
});


