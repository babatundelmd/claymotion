import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NomineesList } from './nominees-list';

describe('NomineesList', () => {
  let component: NomineesList;
  let fixture: ComponentFixture<NomineesList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NomineesList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NomineesList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
