// const { contextBridge, ipcRenderer } = require("electron");

// contextBridge.exposeInMainWorld("electronAPI", {
//   // setTitle: (title) => ipcRenderer.send("set-title", title),
//   sendImage: (data) => ipcRenderer.send("set-imag", data),
// });

const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  sendImage: (data) => ipcRenderer.send("get-image", data),
});