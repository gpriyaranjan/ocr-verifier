
export interface IRendererFuncs {
  invoke(channel: string, ...args: any[]): Promise<any>;
}

export interface IpcRenderer {
  ipcRenderer: IRendererFuncs;
}

export async function getIpcRenderer(): Promise<IpcRenderer> {
  const myModule = await require('electron');
  console.log(myModule);
  return myModule as IpcRenderer;
}

