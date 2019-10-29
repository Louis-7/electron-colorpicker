import { Injectable, NgZone } from '@angular/core';
import { ElectronService } from '../electron.service';
import { BehaviorSubject } from 'rxjs';
import { BrowserWindowConstructorOptions, Display, BrowserWindow } from 'electron';
import * as robotjs from 'robotjs';
import * as _ from 'lodash';

@Injectable()
export class ColorPickerService {
  private robotjs: typeof robotjs;
  private pickerWindow: BrowserWindow;
  public color: BehaviorSubject<string> = new BehaviorSubject('#FFFFFF');
  public picking: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private _ngZone: NgZone, private electronService: ElectronService) {
    if (this.electronService.isElectron()) {
      this.robotjs = window.require('robotjs');
    }
  }

  getMousePosition(): { x: number, y: number } {
    return this.robotjs.getMousePos();
  }

  getPixelColor(): string {
    let { x, y } = this.getMousePosition();
    return this.robotjs.getPixelColor(x, y);
  }

  start(callback?: (color: string) => any) {
    this.picking.next(true);
    this.openColorPickerWindow();
    // Listen to mousemove event
    const throttleMove = _.throttle((event) => {
      this._ngZone.run(() => {
        this.setColor(this.getPixelColor());
      });
    }, 100);
    this.electronService.iohook.on('mousemove', throttleMove);
    this.electronService.iohook.on('mouseclick', (e) => {
      this._ngZone.run(() => {
        const pickedColor: string = this.getPixelColor();
        this.stop();
        this.setColor(pickedColor);
        if (callback != null) callback(this.color.value);
      });
    });
    this.electronService.iohook.start(true);
  }

  stop() {
    this.electronService.iohook.stop();
    this.pickerWindow.close();
    this.picking.next(false);
  }

  setColor(color: string): void {
    if (color.indexOf('#') !== 0) {
      color = `#${color}`;
    }
    if (color.length > 7) return;
    color = _.toUpper(color);
    this.color.next(color);
  }

  /**
   * https://awik.io/determine-color-bright-dark-using-javascript/
   *
   * @param {string} color
   * @returns {('light' | 'dark')}
   * @memberof ColorPickerService
   */
  lightOrDark(color: string): 'light' | 'dark' {
    // Variables for red, green, blue values
    let r, g, b, hsp;

    // Check the format of the color, HEX or RGB?
    if (color.match(/^rgb/)) {
      // If HEX --> store the red, green, blue values in separate variables
      let regColor = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);
      r = regColor[1];
      g = regColor[2];
      b = regColor[3];
    }
    else {
      // If RGB --> Convert it to HEX: http://gist.github.com/983661
      let regColor = +('0x' + color.slice(1).replace(color.length < 5 && /./g, '$&$&'));
      r = regColor >> 16;
      g = regColor >> 8 & 255;
      b = regColor & 255;
    }
    // HSP (Highly Sensitive Poo) equation from http://alienryderflex.com/hsp.html
    hsp = Math.sqrt(
      0.299 * (r * r) +
      0.587 * (g * g) +
      0.114 * (b * b)
    );
    // Using the HSP value, determine whether the color is light or dark
    if (hsp > 127.5) {
      return 'light';
    }
    else {
      return 'dark';
    }
  }

  /**
   * Need open a new invisible window to cover all screen
   * so robotjs can capture the pixel color under the cursor
   *
   */
  openColorPickerWindow() {
    const pickerModalOptions: BrowserWindowConstructorOptions = {
      x: this.screenSizeCalculator().x,
      y: this.screenSizeCalculator().y,
      height: this.screenSizeCalculator().height,
      width: this.screenSizeCalculator().width,
      minWidth: this.screenSizeCalculator().width,
      // parent: this.currentWindow,
      modal: false,
      frame: false,
      fullscreen: true,
      show: false,
      useContentSize: true,
      alwaysOnTop: true,
      enableLargerThanScreen: true,
      transparent: true,
    };
    this.pickerWindow = new this.electronService.remote.BrowserWindow(pickerModalOptions);
    this.pickerWindow.setPosition(this.screenSizeCalculator().x, this.screenSizeCalculator().y);
    this.pickerWindow.setSize(this.screenSizeCalculator().width, this.screenSizeCalculator().height);
    this.pickerWindow.show();
  }

  private screenSizeCalculator(): { height: number, width: number, x: number, y: number } {
    const electronScreen = this.electronService.remote.screen;
    const displays: Display[] = electronScreen.getAllDisplays();
    let result = { height: 0, width: 0, x: 0, y: 0 };
    for (let display of displays) {
      result.width += display.bounds.width;
      result.height = display.bounds.height > result.height ? display.bounds.height : result.height;
      result.x = display.bounds.x < result.x ? display.bounds.x : result.x;
      result.y = display.bounds.y < result.y ? display.bounds.y : result.y;
    }
    return result;
  }
}
