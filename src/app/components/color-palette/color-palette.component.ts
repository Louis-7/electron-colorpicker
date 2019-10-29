import { Component, OnInit, Input } from '@angular/core';
import { ColorPickerService } from '../../providers/color-picker/color-picker.service';

@Component({
  selector: 'app-color-palette',
  templateUrl: './color-palette.component.html',
  styleUrls: ['./color-palette.component.scss']
})
export class ColorPaletteComponent implements OnInit {

  @Input() colorName: string;

  constructor(private colorPickerService: ColorPickerService) { }

  ngOnInit() {
    this.colorName = this.colorPickerService.color.value;
  }

  syncColor() {
    this.colorPickerService.setColor(this.colorName);
  }
}
