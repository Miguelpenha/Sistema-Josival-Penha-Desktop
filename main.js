const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')

function createWindow () {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    },
    icon: path.resolve(__dirname, 'icon.ico')
  })
  
  mainWindow.loadURL('https://sistema.josivalpenha.com')

  ipcMain.on('logout', () => mainWindow.webContents.session.clearStorageData())
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () =>  BrowserWindow.getAllWindows().length === 0 && createWindow())
})

app.on('window-all-closed', () => process.platform !== 'darwin' && app.quit())