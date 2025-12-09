import { Component, computed, inject, resource, signal } from '@angular/core';
import { AwardCard } from './award-card/award-card';
import { AwardSelector } from './award-selector/award-selector';
import { YearSlider } from './year-slider/year-slider';
import { ErrorState } from './error-state/error-state';
import { LoadingSpinner } from './loading-spinner/loading-spinner';
import { AWARD_METADATA, AwardType } from './models';
import { NomineesList } from './nominees-list/nominees-list';
import { AwardsService } from './awards';

@Component({
  selector: 'app-root',
  imports: [
    AwardCard,
    AwardSelector,
    YearSlider,
    NomineesList,
    LoadingSpinner,
    ErrorState],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('claymotion-chronicle');
  private service = inject(AwardsService);

  readonly AWARD_METADATA = AWARD_METADATA;
  readonly awardTypes: AwardType[] = ['Oscars', 'Emmys', 'Golden Globes', 'Critics Choice', 'BAFTA', 'Tonys'];
  readonly currentYear = new Date().getFullYear();

  selectedYear = signal(2024);
  selectedAward = signal<AwardType>('Oscars');

  eraHue = computed(() => {
    const year = this.selectedYear();
    if (year < 1950) return 35;
    if (year < 1970) return 45;
    if (year < 1980) return 25;
    if (year < 1990) return 280;
    if (year < 2000) return 180;
    if (year < 2010) return 210;
    if (year < 2020) return 260;
    return 45;
  });

  awardColors = computed(() => ({
    primary: AWARD_METADATA[this.selectedAward()].primaryColor,
    secondary: AWARD_METADATA[this.selectedAward()].secondaryColor
  }));

  currentAwardIcon = computed(() => AWARD_METADATA[this.selectedAward()].icon);

  loadingMessage = computed(() => {
    const messages = [
      'Asking the jury',
      'Opening the envelope',
      'Consulting the archives',
      'Gathering the nominees',
      'Polishing the statuette'
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  });

  awardsResource = resource({
    params: () => ({
      year: this.selectedYear(),
      type: this.selectedAward()
    }),
    loader: ({ params }) => this.service.fetchAwardData(params.year, params.type)
  });

  onYearChange(year: number) {
    this.selectedYear.set(year);
  }

  onAwardChange(type: AwardType) {
    this.selectedAward.set(type);
  }

  getErrorMessage(error: unknown): string {
    if (error instanceof Error) {
      return error.message;
    }
    return 'We couldn\'t retrieve the award data. The Academy archives might be temporarily unavailable.';
  }
}
