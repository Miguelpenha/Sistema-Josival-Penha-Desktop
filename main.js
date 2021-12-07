const { app, BrowserWindow, ipcMain, nativeImage } = require('electron')
const path = require('path')

function createWindow () {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    },
    icon: nativeImage.createFromPath(path.resolve(__dirname, 'icons', 'icon.png'))
  })
  
  mainWindow.loadURL('https://sistema.josivalpenha.com')

  ipcMain.on('logout', () => mainWindow.webContents.session.clearStorageData())
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () =>  BrowserWindow.getAllWindows().length === 0 && createWindow())
})

app.on('window-all-closed', () => process.platform !== 'darwin' && app.quit())