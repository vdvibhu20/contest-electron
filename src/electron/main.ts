import {app,shell ,BrowserWindow, ipcMain,globalShortcut,dialog} from 'electron';
import path from 'path';
import { isDev } from './util.js';
import { getPreloadPath } from './pathResolver.js';
import { electronApp, optimizer, is } from "@electron-toolkit/utils";
import localShortcut from 'electron-localshortcut';
import { platform } from 'os';
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
    let cb_auth=''
  let contestId = '';
  let contentId = '';
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
    });
    
    mainWindow?.on('blur', () => {
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
          message: 'Don\'t try to change tabs when you are attending a contest!',
          noLink: true,
        });
    
        mainWindow?.setAlwaysOnTop(true);
        mainWindow?.focus();
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
