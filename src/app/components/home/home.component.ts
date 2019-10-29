import { Component, OnInit, AfterViewInit, NgZone } from '@angular/core';
import { ColorPickerService } from '../../providers/color-picker/color-picker.service';
import { ElectronService } from '../../providers/electron.service';
import { BrowserWindow } from 'electron';
import * as _ from 'lodash';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
  colorDisplay: string;
  currentWindow: BrowserWindow;
  constructor(private _ngZone: NgZone, private electronService: ElectronService, private colorPickerService: ColorPickerService) {
  }

  ngOnInit() {
    // initialize color
    this.colorPickerService.color.subscribe((color: string) => {
      this._ngZone.run(() => {
        this.colorDisplay = color;
      });
    });
  }

  ngAfterViewInit() {
    this.currentWindow = this.electronService.remote.getCurrentWindow();
  }
}
