const { app, BrowserWindow, ipcMain, dialog, screen } = require('electron');
const path = require('path');

let screenWidth, screenHeight;

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

  win.loadFile("synchronized_panels.html");

  // win.webContents.openDevTools();
}

function showMessage(message) {
  dialog.showMessageBox(BrowserWindow.getFocusedWindow(), 
    {message : message} )
}

const {selectDataDir, selectImageFilePath, saveFile, readFile} = require('./file_utils')

app.whenReady().then( () => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow(); // Recreate window on macOS
  });

  ipcMain.handle('select-data-dir-request', async (event) => {
    try {
      return await selectDataDir();
    } catch(ex) {
      showMessage("Exception received " + ex.stack);
    }
  });

  ipcMain.handle('select-image-file-path-request', async (event, suggestedPath) => {
    try {
      const result = await selectImageFilePath(suggestedPath);
      return result;
    } catch(ex) {
      showMessage("Exception received " + ex.stack);
    }
  });
  
  ipcMain.handle('save-file-request', async (event, dataDir, fileRelPath, fileContents) => {
    try {
      return await saveFile(dataDir, fileRelPath, fileContents);
    } catch(ex) {
      showMessage("Exception received " + ex.stack);
    }
  })

  ipcMain.handle('read-file-request', async(event, filePath) => {
    try {
      return await readFile(filePath);
    } catch(ex) {
      showMessage("Exception received " + ex.stack);    
    }
  })
});


