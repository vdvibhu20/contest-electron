const electron = require('electron');

electron.contextBridge.exposeInMainWorld('electron', {
    getData:()=>console.log('getData'),
    closeApp: () => electron.ipcRenderer.send('close-app') ,
    onDeepLinkData: (callback: (data:  { cb_auth?: string; contestId?:string,contentId?:string }) => void) => {
        electron.ipcRenderer.on('deep-link-data', (_:any, data: { cb_auth?: string; contestId?:string,contentId?:string }) => callback(data))
      },
} satisfies Window['electron']);