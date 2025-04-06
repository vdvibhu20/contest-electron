import {app, BrowserWindow, ipcMain} from 'electron';
import path from 'path';
import { isDev } from './util.js';
import { getPreloadPath } from './pathResolver.js';

app.on('ready', () => {
    const mainWindow = new BrowserWindow({
           show:false,
    titleBarStyle: 'hidden',
        webPreferences:{
            preload:getPreloadPath(),
        }
    })
    mainWindow.maximize();
    mainWindow.show();
    if(isDev()){
        mainWindow.loadURL('http://localhost:5173');
    }else{
        mainWindow.loadFile(path.join(app.getAppPath()+'/dist-react/index.html'))
    }
    const cb_auth="Test"
    const contestId="Test"
    const contentId="Test"
    mainWindow.webContents.on('did-finish-load', () => {
        const cb_auth = "cb";
        const contestId = "6";
        const contentId = "2";
        console.log("Sending deep-link-data event");
        mainWindow.webContents.send("deep-link-data", { cb_auth, contestId, contentId });
    });
    mainWindow.webContents.openDevTools();
    ipcMain.on('close-app', () => {
        app.quit();
    });
}
)