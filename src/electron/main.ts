import {app,shell ,BrowserWindow, ipcMain} from 'electron';
import path from 'path';
import { isDev } from './util.js';
import { getPreloadPath } from './pathResolver.js';
import { electronApp, optimizer, is } from "@electron-toolkit/utils";

let mainWindow: Electron.BrowserWindow | null;
let deepLinkData: { cb_auth: string; contestId: string; contentId: string } | null = null;
let isMainWindowLoaded = false;

function createWindow(): void {
  mainWindow = new BrowserWindow({
    show: false,
    titleBarStyle: 'hidden',
    webPreferences: {
      preload: getPreloadPath(),

    },
  });

  mainWindow.webContents.openDevTools();

  mainWindow.on('ready-to-show', () => {
    mainWindow?.maximize();
    mainWindow?.show();
  });

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);
    return { action: 'deny' };
  });

  mainWindow.webContents.on('did-finish-load', () => {
    isMainWindowLoaded = true;
    if (deepLinkData) {
      console.log('Sending deep-link-data event');
      mainWindow?.webContents.send('deep-link-data', deepLinkData);
    }
  });

  if (isDev()) {
    mainWindow.loadURL('http://localhost:5173');
    let cb_auth =
    'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6InNwYXJzaGdvZWxrIiwiZmlyc3RuYW1lIjoiU3BhcnNoIiwibGFzdG5hbWUiOiJHb2VsIiwiZ2VuZGVyIjoiTUFMRSIsInBob3RvIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUNnOG9jS3R2SUNXWTRHcHJucFhTWkxpVmY2bi1pdTNablFlTkRrNUJEaFJIQ2pqdlBBWTFmT1c9czk2LWMiLCJlbWFpbCI6InNwYXJzaGdvZWxrQGdtYWlsLmNvbSIsIm1vYmlsZV9udW1iZXIiOiIrOTEtOTMxOTU1MTYwOCIsIndoYXRzYXBwX251bWJlciI6bnVsbCwicm9sZSI6bnVsbCwidmVyaWZpZWRlbWFpbCI6InNwYXJzaGdvZWxrQGdtYWlsLmNvbSIsInZlcmlmaWVkbW9iaWxlIjpudWxsLCJyZWZlcnJhbENvZGUiOiJTUEExSkoiLCJyZWZlcnJlZEJ5IjpudWxsLCJncmFkdWF0aW9uWWVhciI6MjAyNSwiYXBwYXJlbEdvb2RpZXNTaXplIjpudWxsLCJtYXJrZXRpbmdfbWV0YSI6bnVsbCwiY3JlYXRlZEF0IjoiMjAyNS0wMi0xMlQxMDoyMzo1My40MjRaIiwidXBkYXRlZEF0IjoiMjAyNS0wMi0xMlQxMDoyNDozNC44MjFaIiwiZGVsZXRlZEF0IjpudWxsLCJjbGllbnQiOiJ3ZWIiLCJjbGllbnROYW1lIjoibG9jYWxob3N0IiwiY2xpZW50SWQiOiIxMjM0NTY3ODkwIiwidXVpZCI6IjE3ZjRiMDIzLWE4YjQtNDY3Yi05NzhlLWEzNDcwZDRlZmVlYSIsInNlc3Npb25TdGFydGVkQXQiOiIyMDI1LTA0LTA4VDEwOjA4OjQwLjM2NFoiLCJpYXQiOjE3NDQxMDY5MjAsImV4cCI6MTc0NDE5MzMyMH0.ubW341wFBwNGVzRM2-xD8__SvNCMzTYbTKWbESCHXV3H-k7JzKb_eYsN4QYlalHyNBxSc7u41nbxzVz8w2Oxwu1TqIgDAgGJXDeSQwsZzSt5TnjpIDuxNr50tigdpwr61P51aMuwvsiw9Jcvv5swsH52c2bM32aSHp-Cx12KFy0KC6iCUDZ3GlAw_16C_iCzNwxuKIH7efut-koJSBolWAaYy7IbAAsYt0YarXOPdEc-DUWju4tqyr-fRfYyjXeVcBjSAMC11XvjG6uTuxyzp072kswnWK69vhQC_S9qLZLGmFCLTzAXs5nLTYEjLhFvXIs0mDuxvGlWjKQg5psvUg';
  let contestId = '6';
  let contentId = '2';
  mainWindow.webContents.on('did-finish-load', () => {
    console.log("Sending deep-link-data event");
    mainWindow?.webContents.send("deep-link-data", { cb_auth, contestId, contentId });
});
  } else {
    mainWindow.loadFile(path.join(app.getAppPath() + '/dist-react/index.html'));
  }
}

function handleDeepLink(url: string) {
  console.log('Received deep link:', url);
//  let url='electron-app://contest?cb_auth=test&one_auth=test&contestId=6&contentId=1'
  const params = new URLSearchParams(new URL(url).search);
  let cb_auth = params.get("cb_auth") || "test"
  let contestId = params.get("contestId") || "test"
  let contentId = params.get("contentId") || "test"
  console.log('CB Auth:', cb_auth);
  console.log('Contest ID:', contestId);
  console.log('Content ID:', contentId);

  deepLinkData = { cb_auth, contestId, contentId };

  if (isMainWindowLoaded) {
    mainWindow?.webContents.send('deep-link-data', deepLinkData);
  }
}

app.setAsDefaultProtocolClient("electron-app");

app.on("open-url", (event, url) => {
  event.preventDefault();
  handleDeepLink(url);
});

app.whenReady().then(() => {
  electronApp.setAppUserModelId("com.electron");

  app.on("browser-window-created", (_, window) => {
    optimizer.watchWindowShortcuts(window);
  });

  ipcMain.on('close-app', () => {
    app.quit();
  });

  createWindow();

  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });

  // if (process.argv.length > 1) {
  //   handleDeepLink(process.argv[1]);
  // }
  const deepLinkArg = process.argv.find(arg => arg.startsWith("electron-app://"));
  if (deepLinkArg) {
    handleDeepLink(deepLinkArg);
  }


});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
