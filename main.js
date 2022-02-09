const { app, BrowserWindow, ipcMain, nativeImage, session } = require('electron')
const path = require('path')
const production = true

async function createWindow () {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      devTools: true
    },
    icon: nativeImage.createFromPath(path.resolve(__dirname, 'icons', 'icon.png'))
  })
  
  const cookieDesktop = await session.defaultSession.cookies.get({name: 'auth.desktop'})
  const cookieAdmin = await session.defaultSession.cookies.get({name: 'auth.token.administrativo'})
  const cookieProf = await session.defaultSession.cookies.get({name: 'auth.token.professoras'})

  const baseURL = production ? 'https://sistema.josivalpenha.com' : 'http://localhost:3001'

  mainWindow.loadURL(`${baseURL}/${cookieDesktop && cookieAdmin && 'desktop/administrativo' || cookieDesktop && cookieProf && 'desktop/professoras'}`)
  
  ipcMain.on('logout', async () => await session.defaultSession.clearStorageData())
}

app.whenReady().then(() => {
  createWindow().then()

  app.on('activate', () =>  BrowserWindow.getAllWindows().length === 0 && createWindow())
})

app.on('window-all-closed', () => process.platform !== 'darwin' && app.quit())