import { Component, input, output } from '@angular/core';
import { AwardType, AWARD_METADATA } from '../models';

@Component({
  selector: 'app-award-selector',
  imports: [],
  templateUrl: './award-selector.html',
  styleUrl: './award-selector.scss',
})
export class AwardSelector {
  awardTypes = input.required<AwardType[]>();
  selectedAward = input.required<AwardType>();
  
  awardChange = output<AwardType>();
  
  selectAward(type: AwardType) {
    this.awardChange.emit(type);
  }
  
  getAwardColor(type: AwardType): string {
    return AWARD_METADATA[type].primaryColor;
  }
  
  getAwardIcon(type: AwardType): string {
    return AWARD_METADATA[type].icon;
  }
}
