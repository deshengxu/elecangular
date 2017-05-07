const electron = require('electron');
//const server = require("./server");
// Module to control application life.
const app = electron.app;

const Menu = electron.Menu;
let menuTemplate = require('./menuTemplate');

// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;

require('electron-reload')(__dirname);

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow, menu, dockMenu;

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 600})

  // and load the index.html of the app.
  mainWindow.loadURL(`file://${__dirname}/index.html`)
  //mainWindow.loadURL('file://' + __dirname + '/index.html');
  //mainWindow.loadURL('http://localhost:3333/');

  
  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    toggleFileTasks(false);
    toggleNewWindowTask(true);

    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  });

  if (!menu) setMenu();
  if (!dockMenu) setDock();

  toggleFileTasks(true);
  toggleNewWindowTask(false);
}



let toggleFileTasks = isEnabled => {
  // The 'File' menu should only be available if there is an open window
  menu.items
    .find(item => item.label === 'File')
    .submenu.items
    .forEach(subItem => subItem.enabled = isEnabled);
}

let toggleNewWindowTask = isEnabled => {
  // The 'New Window' task in the main menu and dock menu
  // should only be available if there are no open windows
  let newWindowMenu = menu.items
    .find(item => item.label === 'Window')
    .submenu.items
    .find(subItem => subItem.label === 'New');

  if (process.platform === 'darwin') {
    let dockWindowMenu = dockMenu.items
    .find(item => item.label === 'New Window');
    dockWindowMenu.enabled = isEnabled;
  }
  

  newWindowMenu.enabled = isEnabled;
  
}

let setMenu = () => {
  // Set custom click handlers for menu tasks
  let fileMenu = menuTemplate
    .find(item => item.label === 'File');

  fileMenu.submenu
    .find(item => item.label === 'Open')
    .click = () => mainWindow.webContents.send('open-file')

  fileMenu.submenu
    .find(item => item.label === 'Save As...')
    .click = () => mainWindow.webContents.send('save-file')

  menuTemplate
    .find(item => item.label === 'Window')
    .submenu
    .find(subItem => subItem.label === 'New')
    .click = () => createWindow()

  menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);
}

let setDock = () => {
  // Create a 'New Window' task in the dock menu (OSX only)
  if (process.platform === 'darwin') {
    dockMenu = Menu.buildFromTemplate([
    { label: 'New Window', click: createWindow }
    ]);
    app.dock.setMenu(dockMenu);
  }
  
}



// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
