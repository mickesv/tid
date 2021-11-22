'use strict'

const electron = require('electron');
const path = require('path');

let mainWindow;

function closeMainWindow() {
    mainWindow = null;
}

function createMainWindow() {
    mainWindow = new electron.BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            //contextIsolation: true,
            devTools: true,
            preload: path.join(__dirname, 'gui','preload.js'),
        }});

    mainWindow.webContents.openDevTools();
    mainWindow.loadFile(path.join(__dirname, 'gui', 'index.html'));
    mainWindow.on('closed', closeMainWindow);
    return mainWindow;
}



function closeAll() {
    electron.app.quit();   
}

electron.app.whenReady().then(() => {
    createMainWindow()    
    electron.app.on('window-all-closed', () => { electron.app.quit(); });
    electron.app.on('activate',  () => { if (mainWindow === null) createMainWindow(); });
    electron.app.on('quit', () => { closeAll(); });
});

function logGui(msg) {
    console.log(msg);
}
electron.ipcMain.on('log', (evt, msg) => logGui(msg));
