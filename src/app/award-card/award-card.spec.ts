import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AwardCard } from './award-card';

describe('AwardCard', () => {
  let component: AwardCard;
  let fixture: ComponentFixture<AwardCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AwardCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AwardCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
