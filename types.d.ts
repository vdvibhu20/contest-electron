interface Window {
    electron: {
      onDeepLinkData: (callback: (data: { cb_auth?: string; contestId?:string ;contentId?:string}) => void) => void
     closeApp: () => void,
     getData: () => void,
     
    }
  }

  declare module 'vite-plugin-eslint' {
    // Add your type definitions here
    const eslintPlugin: (options?: any) => any;
    export default eslintPlugin;
  }