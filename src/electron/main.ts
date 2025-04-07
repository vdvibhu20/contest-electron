import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import { isDev } from './util.js';
import { getPreloadPath } from './pathResolver.js';

let mainWindow: BrowserWindow | null = null;
let deeplinkUrl: string | null = null;

// Register protocol early
const protocol = 'electron-app';
if (!app.isDefaultProtocolClient(protocol)) {
  app.setAsDefaultProtocolClient(protocol);
}

const createWindow = () => {
  mainWindow = new BrowserWindow({
    show: false,
    titleBarStyle: 'hidden',
    webPreferences: {
      preload: getPreloadPath(),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  if (isDev()) {
    mainWindow.loadURL('http://localhost:5173');
  } else {
    mainWindow.loadFile(path.join(app.getAppPath(), 'dist-react/index.html'));
  }

  mainWindow.once('ready-to-show', () => {
    mainWindow?.maximize();
    mainWindow?.show();
  });

  mainWindow.webContents.on('did-finish-load', () => {
    if (deeplinkUrl) {
      const parsed = new URL(deeplinkUrl);
      const cb_auth = parsed.searchParams.get("cb_auth") || "";
      const contestId = parsed.searchParams.get("contestId") || "";
      const contentId = parsed.searchParams.get("contentId") || "";

      console.log("Sending deep-link-data event:", { cb_auth, contestId, contentId });
      mainWindow?.webContents.send("deep-link-data", { cb_auth, contestId, contentId });
      deeplinkUrl = null; // clear after sending
    }
  });

  ipcMain.on('close-app', () => {
    app.quit();
  });
};

// Handle initial deep link if opened via URL
if (!app.requestSingleInstanceLock()) {
  app.quit();
} else {
  app.on('second-instance', (_event, argv) => {
    // Windows: deep link comes as arg
    const urlArg = argv.find(arg => arg.startsWith(`${protocol}://`));
    if (urlArg && mainWindow) {
      deeplinkUrl = urlArg;
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.focus();
    }
  });

  app.whenReady().then(() => {
    const urlArg = process.argv.find(arg => arg.startsWith(`${protocol}://`));
    if (urlArg) {
      deeplinkUrl = urlArg;
    }
    createWindow();
  });

  app.on('open-url', (event, url) => {
    // macOS
    event.preventDefault();
    deeplinkUrl = url;
    if (mainWindow) {
      mainWindow.webContents.send("deep-link-data", parseDeepLink(url));
    }
  });

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
  });

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
}

// Helper
function parseDeepLink(url: string) {
  const parsed = new URL(url);
  return {
    cb_auth: parsed.searchParams.get("cb_auth") || "",
    contestId: parsed.searchParams.get("contestId") || "",
    contentId: parsed.searchParams.get("contentId") || ""
  };
}
