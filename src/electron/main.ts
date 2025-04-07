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
    const cb_auth="eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6InNwYXJzaGdvZWxrIiwiZmlyc3RuYW1lIjoiU3BhcnNoIiwibGFzdG5hbWUiOiJHb2VsIiwiZ2VuZGVyIjoiTUFMRSIsInBob3RvIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUNnOG9jS3R2SUNXWTRHcHJucFhTWkxpVmY2bi1pdTNablFlTkRrNUJEaFJIQ2pqdlBBWTFmT1c9czk2LWMiLCJlbWFpbCI6InNwYXJzaGdvZWxrQGdtYWlsLmNvbSIsIm1vYmlsZV9udW1iZXIiOiIrOTEtOTMxOTU1MTYwOCIsIndoYXRzYXBwX251bWJlciI6bnVsbCwicm9sZSI6bnVsbCwidmVyaWZpZWRlbWFpbCI6InNwYXJzaGdvZWxrQGdtYWlsLmNvbSIsInZlcmlmaWVkbW9iaWxlIjpudWxsLCJyZWZlcnJhbENvZGUiOiJTUEExSkoiLCJyZWZlcnJlZEJ5IjpudWxsLCJncmFkdWF0aW9uWWVhciI6MjAyNSwiYXBwYXJlbEdvb2RpZXNTaXplIjpudWxsLCJtYXJrZXRpbmdfbWV0YSI6bnVsbCwiY3JlYXRlZEF0IjoiMjAyNS0wMi0xMlQxMDoyMzo1My40MjRaIiwidXBkYXRlZEF0IjoiMjAyNS0wMi0xMlQxMDoyNDozNC44MjFaIiwiZGVsZXRlZEF0IjpudWxsLCJjbGllbnQiOiJ3ZWIiLCJjbGllbnROYW1lIjoibG9jYWxob3N0IiwiY2xpZW50SWQiOiIxMjM0NTY3ODkwIiwidXVpZCI6Ijk5MzMwY2FlLTAzNDAtNDE0Yi1hMTI3LTM0M2FhOTdkNWFiMCIsInNlc3Npb25TdGFydGVkQXQiOiIyMDI1LTA0LTA2VDE5OjM3OjQyLjMzMFoiLCJpYXQiOjE3NDM5NjgyNjIsImV4cCI6MTc0NDA1NDY2Mn0.BNm5xnHi47QSPKzjuF8MCszXXUv6RqJozbcqMHxSiy5UkrGHwce4VSAcmT1Al-eUQUGwflc4ueAgLNTODI4y_v1gxdWPgHo6BJL9wpbExbYI1gdUY36asNBzm5dBtbFUBrw9wDBPyVXx-iSTzQDMEQjsc5Sy7Iygd82PY-HzrVu0833TANrQ2-qWF4PwJiRUHKm7g5-HJR-PvGgEINdqbYISebZrQ1fDtlIZ63cVXPNWSYXTcDvI0q0qjPNpZpM_QwpGAFImjhAdM11XVB_IYKSmZtsBPSKDeJmrORceCkPsJYJZKN3DLY7iv0kfSJdgXIFfPb4ia14vpPRmRRLuRA"
    const contestId="6"
    const contentId="3"
    mainWindow.webContents.on('did-finish-load', () => {
        console.log("Sending deep-link-data event");
        mainWindow.webContents.send("deep-link-data", { cb_auth, contestId, contentId });
    });
    mainWindow.webContents.openDevTools();
    ipcMain.on('close-app', () => {
        app.quit();
    });
}
)