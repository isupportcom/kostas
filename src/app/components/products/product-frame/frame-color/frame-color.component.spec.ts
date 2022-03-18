import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrameColorComponent } from './frame-color.component';

describe('FrameColorComponent', () => {
  let component: FrameColorComponent;
  let fixture: ComponentFixture<FrameColorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrameColorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FrameColorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
