const { app, BrowserWindow, Menu, Shell, ipcMain } = require("electron");
const path = require("path");

let win; // Declare the window variable outside the createWindow function

const menuItems = [
  {
    label: "Menu",
    submenu: [
      {
        label: "About",
      },
    ],
  },
  {
    label: "File",
    submenu: [
      {
        label: "Edit",
      },
      {
        type: "separator",
      },
      {
        label: "New Window",
        click: async function () {
          const win2 = new BrowserWindow({
            height: 300,
            width: 400,
            show: false,
            // backgroundColor: '#2e2c29',
          });
          //   win2.loadFile('index2.html');
          win2.loadFile("camera.html");
          win2.once("ready-to-show", () => win2.show());
        },
      },
      {
        label: "Open Camera",
        click: async function () {
          const win3 = new BrowserWindow({
            height: 500,
            width: 800,
            show: false,
            // backgroundColor: '#2e2c29',
            movable: true,
            webPreferences: {
              preload: path.join(__dirname, "cameraPreload.js"),
            },
          });
          win3.webContents.openDevTools();
          win3.loadFile("camera.html");
          win3.once("ready-to-show", () => win3.show());
        },
      },
      {
        type: "separator",
      },
      {
        label: "Learn More",
        click: async () => {
          await shell.openExternal("https://electronjs.org");
        },
      },
      {
        type: "separator",
      },
      {
        label: "Exit",
        click: () => app.quit(),
      },
    ],
  },
  {
    label: "Window",
    submenu: [
      {
        role: "Close",
      },
      {
        role: "Minimize",
      },
    ],
  },
];

const menu = Menu.buildFromTemplate(menuItems);
Menu.setApplicationMenu(menu);

const createWindow = () => {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.webContents.openDevTools();
  win.loadFile("index.html");

  win.on("closed", () => {
    // Dereference the window object when the window is closed
    win = null;
  });
};

app.on("window-all-closed", () => {
  // On Linux, do nothing when all windows are closed
  if (process.platform !== "darwin") {
    // Optionally, you can perform additional cleanup tasks here
  }
});

app.whenReady().then(() => {
  ipcMain.on("get-image", (event, data) => {
    console.log(data,"yoi🫠");
    win.webContents.send('send-image',data)
  });
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});
