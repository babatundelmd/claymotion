import { Component, input } from '@angular/core';
import { AWARD_METADATA, AwardType } from '../models';

@Component({
  selector: 'app-loading-spinner',
  imports: [],
  templateUrl: './loading-spinner.html',
  styleUrl: './loading-spinner.scss',
})
export class LoadingSpinner {
  message = input('Asking the jury');
  awardType = input<AwardType>('Oscars');
  
  accentColor(): string {
    return AWARD_METADATA[this.awardType()].primaryColor;
  }
}
