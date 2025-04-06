interface Window {
    electron: {
      onDeepLinkData: (callback: (data: { cb_auth?: string; contestId?:string ;contentId?:string}) => void) => void
     closeApp: () => void,
     getData: () => void,
     
    }
  }