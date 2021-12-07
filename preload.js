const { contextBridge, shell, ipcRenderer } = require('electron')

window.addEventListener('DOMContentLoaded', () => {
  contextBridge.exposeInMainWorld('desktop', {
    openURL: url => {
      shell.openExternal(url)
    },
    logout: () => {
      ipcRenderer.send('logout')
    }
  })
})