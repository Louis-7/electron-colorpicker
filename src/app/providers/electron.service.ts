import { Injectable } from '@angular/core';

// If you import a module but never use any of the imported values other than as TypeScript types,
// the resulting javascript file will look as if you never imported the module at all.
import { ipcRenderer, webFrame, remote, clipboard } from 'electron';
import * as childProcess from 'child_process';
import * as fs from 'fs';
import * as iohook from 'iohook';

@Injectable()
export class ElectronService {

  ipcRenderer: typeof ipcRenderer;
  webFrame: typeof webFrame;
  remote: typeof remote;
  clipboard: typeof clipboard;
  childProcess: typeof childProcess;
  fs: typeof fs;
  iohook: typeof iohook;

  constructor() {
    // Conditional imports
    if (this.isElectron()) {
      this.ipcRenderer = window.require('electron').ipcRenderer;
      this.webFrame = window.require('electron').webFrame;
      this.remote = window.require('electron').remote;
      this.clipboard = window.require('electron').clipboard;

      this.childProcess = window.require('child_process');
      this.fs = window.require('fs');
      this.iohook = window.require('iohook');
    }
  }

  isElectron = () => {
    return window && window.process && window.process.type;
  }

}
