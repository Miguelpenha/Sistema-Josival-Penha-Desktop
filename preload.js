const { contextBridge, shell } = require('electron')

window.addEventListener('DOMContentLoaded', () => {
  contextBridge.exposeInMainWorld('desktop', {
    openURL: url => {
      shell.openExternal(url)
    }
  })
})

