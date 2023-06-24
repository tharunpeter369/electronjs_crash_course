const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  setTitle: (callback) => ipcRenderer.send('send-title', callback)
})



window.addEventListener("DOMContentLoaded", () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector);
    if (element) element.innerText = text;
  };

  for (const dependency of ["chrome", "node", "electron"]) {
    console.log(process.versions[dependency]);
    replaceText(`${dependency}-version`, process.versions[dependency]);
  }
});
