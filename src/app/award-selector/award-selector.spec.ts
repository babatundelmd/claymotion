import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AwardSelector } from './award-selector';

describe('AwardSelector', () => {
  let component: AwardSelector;
  let fixture: ComponentFixture<AwardSelector>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AwardSelector]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AwardSelector);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
