import {app,shell ,BrowserWindow, ipcMain,globalShortcut,dialog} from 'electron';
import path from 'path';
import { isDev } from './util.js';
import { getPreloadPath } from './pathResolver.js';
import { electronApp, optimizer, is } from "@electron-toolkit/utils";
let tabChangeCount=0;
console.log()
let mainWindow: Electron.BrowserWindow | null;
let deepLinkData: { cb_auth: string; contestId: string; contentId: string } | null = null;
let isMainWindowLoaded = false;
let isAppReady = false;
let isKioskMode = false;
function createWindow(): void {
  mainWindow = new BrowserWindow({
    show: false,
    titleBarStyle: 'hidden',
    fullscreen:true,
    kiosk:true,
    
    // frame: false,
    focusable:true,
    webPreferences: {
      preload: getPreloadPath(),
      // devTools: true,

    },
  });

  // mainWindow.webContents.openDevTools();

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
    let cb_auth='eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6InNwYXJzaGdvZWxrIiwiZmlyc3RuYW1lIjoiU3BhcnNoIiwibGFzdG5hbWUiOiJHb2VsIiwiZ2VuZGVyIjoiTUFMRSIsInBob3RvIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUNnOG9jS3R2SUNXWTRHcHJucFhTWkxpVmY2bi1pdTNablFlTkRrNUJEaFJIQ2pqdlBBWTFmT1c9czk2LWMiLCJlbWFpbCI6InNwYXJzaGdvZWxrQGdtYWlsLmNvbSIsIm1vYmlsZV9udW1iZXIiOiIrOTEtOTMxOTU1MTYwOCIsIndoYXRzYXBwX251bWJlciI6bnVsbCwicm9sZSI6bnVsbCwidmVyaWZpZWRlbWFpbCI6InNwYXJzaGdvZWxrQGdtYWlsLmNvbSIsInZlcmlmaWVkbW9iaWxlIjpudWxsLCJyZWZlcnJhbENvZGUiOiJTUEExSkoiLCJyZWZlcnJlZEJ5IjpudWxsLCJncmFkdWF0aW9uWWVhciI6MjAyNSwiYXBwYXJlbEdvb2RpZXNTaXplIjpudWxsLCJtYXJrZXRpbmdfbWV0YSI6bnVsbCwiY3JlYXRlZEF0IjoiMjAyNS0wMi0xMlQxMDoyMzo1My40MjRaIiwidXBkYXRlZEF0IjoiMjAyNS0wMi0xMlQxMDoyNDozNC44MjFaIiwiZGVsZXRlZEF0IjpudWxsLCJjbGllbnQiOiJ3ZWIiLCJjbGllbnROYW1lIjoibG9jYWxob3N0IiwiY2xpZW50SWQiOiIxMjM0NTY3ODkwIiwidXVpZCI6IjI0YzcxMjY5LTI3YWEtNGM2OC1iMWYwLWY1NzJkYzc1YWVkYiIsInNlc3Npb25TdGFydGVkQXQiOiIyMDI1LTA0LTE3VDA3OjMxOjM2Ljc3OFoiLCJpYXQiOjE3NDQ4NzUwOTYsImV4cCI6MTc0NDk2MTQ5Nn0.BI8Z8LjOrg5GBxyAZ1Aox1Jb2VtZSOYMdEaQPKqzdNQj1KSfvzYI5kIyz7NALHYKqzcrJN4IT-3xnAA5B5PVenMCVmStPwZxG2tyl7c07sITgMFIPGnEfUMkS6xRqOROTylQNJOC_8LgnKCrGSnLwp9q5MWM7tK7uhH7wctruEN94JA6LM31ZHhoY6-CrOFsP14jlKIx3Z2hoS_ufWpmyBuJoo75ZeHblYTN6b0-I9MBH-yA-Yi9XYs93HkJv6kQQg9cTF1DJglR-9QcodfDKttR8qhuXWmF1H8vep4RJlJyvYCvwT_wq4rDnDC9hWG7kc2FG5E6v3edm6bhZ4o6gw'
  let contestId = '11';
  let contentId = '3';
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
  let cb_auth = params.get("cb_auth") || ""
  let contestId = params.get("contestId") || ""
  let contentId = params.get("contentId") || ""
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

const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
  app.quit(); // Another instance is running, quit this one
} else {
  app.on('second-instance', () => {
    // Someone tried to open a second instance, focus the first one
    if (mainWindow) {
      if (mainWindow?.isMinimized()) mainWindow.restore();
      mainWindow.focus();
    }
  });


  app.whenReady().then(() => {
    electronApp.setAppUserModelId("com.electron");
  
    app.on("browser-window-created", (_, window) => {
      optimizer.watchWindowShortcuts(window);
    });
  
    ipcMain.on('close-app', () => {
      
      app.quit();
    });
    ipcMain.on('enable-kiosk', () => {
      isKioskMode = true;
      mainWindow?.setKiosk(true);
    });
    
    ipcMain.on('disable-kiosk', () => {
      isKioskMode = false;
      mainWindow?.setKiosk(false);
    });
    isAppReady = true;
    createWindow();
    mainWindow?.setKiosk(true);

    // mainWindow?.webContents.on('devtools-opened', () => {
    //   console.log("DevTools were forcibly opened — closing...");
    //   mainWindow?.webContents.closeDevTools();
    // });
    
    //test
    mainWindow?.on('focus', () => {

      console.log('Window is focused');
      mainWindow?.setAlwaysOnTop(true);
    });
    
    mainWindow?.on('blur', () => {
      tabChangeCount++;
      console.log(`tab changed ${tabChangeCount}`);
      console.log('Window lost focus');
      mainWindow?.setAlwaysOnTop(true);
    });
    
    if (mainWindow)
      mainWindow.on('blur', async () => {
        // if (!isAppReady || !isKioskMode) return;
        if (!isAppReady) return;
        if(mainWindow)
        await dialog.showMessageBox(mainWindow, {
          type: 'warning',
          buttons: ['OK'],
          title: 'Warning',
          message: 'Youve changed your tab during contest! Contest Submitted Automatically',
          noLink: true,
        });
    
        app.quit()
      });
    
    
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
}

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
