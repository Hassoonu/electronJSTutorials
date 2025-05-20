// this file controls the look of the content and how ur gonna view the content

console.log('Im working baby');

const electron = require("electron"); // "requires necessary modules for this application" from node_modules package
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require("path"); // built-in modules
const url = require("url");

let win; // reference to window

function createWindow(){
    win = new BrowserWindow(); // creates instance of Browser Window
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'), // loads our index.html in the current directory
        protocol: "file",
        slashes: true
    }));

    win.webContents.openDevTools(); //useful for debugging

    win.on('closed', () => {
        win = null;
    }); // emitted whne user closes
}

app.on('ready', createWindow); // once app finishes initialization, calls the createWindow function.

// if on mac:

/* the below code makes it so that if all browser windows are closed, we explicitly quit the app.
app.on('window-all-closed', () => {
    if(process.platform != 'darwin'){
        app.quit()
    }
})
*/

/* If there are no windows open and u click on dock icon, this re-creates the window function.
app.on('activate', () => {
    if(win == null){
        createWindow()
    }
})
*/