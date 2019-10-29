import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorRangeComponent } from './color-range.component';

describe('ColorRangeComponent', () => {
  let component: ColorRangeComponent;
  let fixture: ComponentFixture<ColorRangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColorRangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorRangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
