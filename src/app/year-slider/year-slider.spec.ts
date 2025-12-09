import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YearSlider } from './year-slider';

describe('YearSlider', () => {
  let component: YearSlider;
  let fixture: ComponentFixture<YearSlider>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YearSlider]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YearSlider);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
