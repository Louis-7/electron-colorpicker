import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from 'events';

@Component({
  selector: 'app-color-range',
  templateUrl: './color-range.component.html',
  styleUrls: ['./color-range.component.scss']
})
export class ColorRangeComponent implements OnInit {

  @Output() update: EventEmitter = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

}
