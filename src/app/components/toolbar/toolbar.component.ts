import { Component, OnInit } from '@angular/core';
import { ColorPickerService } from '../../providers/color-picker/color-picker.service';
import { ElectronService } from '../../providers/electron.service';
import { BrowserWindow } from 'electron';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  picking: boolean;

  constructor(private colorPickerService: ColorPickerService, private electronService: ElectronService) { }

  ngOnInit() {
    this.colorPickerService.picking.subscribe((status: boolean) => {
      this.picking = status;
    });
  }

  start() {
    this.colorPickerService.start();
  }

  copyColor() {
    const currentColor: string = this.colorPickerService.color.value;
    this.electronService.clipboard.writeText(currentColor);
  }

  minimizeWindow() {
    const win: BrowserWindow = this.electronService.remote.getCurrentWindow();
    win.minimize();
  }

  maximizeWindow() {
    const win: BrowserWindow = this.electronService.remote.getCurrentWindow();
    if (win.isMaximized()) {
      win.unmaximize();
      return;
    }
    win.maximize();
  }

  closeWindow() {
    const win: BrowserWindow = this.electronService.remote.getCurrentWindow();
    win.close();
  }
}
