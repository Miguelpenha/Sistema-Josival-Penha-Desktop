require('dotenv').config()
const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')

function createWindow () {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true
    }
  })
  
  mainWindow.loadURL(process.env.URL)

  ipcMain.on('logout', (event, arg) => mainWindow.webContents.session.clearStorageData())
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () =>  BrowserWindow.getAllWindows().length === 0 && createWindow())
})

app.on('window-all-closed', () => process.platform !== 'darwin' && app.quit())