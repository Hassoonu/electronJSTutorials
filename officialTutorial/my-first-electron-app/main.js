const { app, BrowserWindow, ipcMain } = require('electron/main')
const path = require('node:path')
// app = controls your application's event lifecycle.
// BrowserWindow = creates and manages app windows.
/*
 * Naming Conventions:
 * PascalCase modules are instantiable class constructors (e.g. BrowserWindow, Tray, Notification) 
 * camelCase modules are not instantiable (e.g. app, ipcRenderer, webContents).
 */

const createWindow = () => {
    const win = new BrowserWindow({
        width:800, 
        height:600,
        webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
    // The __dirname string points to the path of the currently executing script (in this case, your project's root folder)
    // The path.join API joins multiple path segments together, creating a combined path string that works across all platforms.
    })

    win.loadFile('index.html')

    win.webContents.openDevTools();
}

app.whenReady().then(() => {
    ipcMain.handle('ping', () =>'pong')
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
            // this specific function is due to macs, since after closign they remain open.
            // if user wants to re-open, then this allows the application to start another window
            // if user re-clicks program to activate.
    })
}) // app listens for when application is ready to emit windows, then calls createWindow() when app is ready
// typically returns after the app is initialized.

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin'){
        app.quit()
    }
})