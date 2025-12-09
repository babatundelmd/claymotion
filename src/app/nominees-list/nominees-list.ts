import { Component, computed, input, signal } from '@angular/core';
import { Nominee, AwardType, AWARD_METADATA } from '../models';

@Component({
  selector: 'app-nominees-list',
  imports: [],
  templateUrl: './nominees-list.html',
  styleUrl: './nominees-list.scss',
})
export class NomineesList {
  nominees = input.required<Nominee[]>();
  awardType = input.required<AwardType>();
  year = input.required<number>();

  isOpen = signal(false);

  accentColor = computed(() => AWARD_METADATA[this.awardType()].primaryColor);
  awardIcon = computed(() => AWARD_METADATA[this.awardType()].icon);

  toggleOpen() {
    this.isOpen.update(v => !v);
  }
}
