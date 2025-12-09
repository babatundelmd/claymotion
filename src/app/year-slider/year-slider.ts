import { Component, computed, effect, input, output, signal } from '@angular/core';

@Component({
  selector: 'app-year-slider',
  imports: [],
  templateUrl: './year-slider.html',
  styleUrl: './year-slider.scss',
})
export class YearSlider {
  year = input.required<number>();
  minYear = input(1929); // First Oscars
  maxYear = input(2024);

  yearChange = output<number>();

  isChanging = signal(false);

  progressPercent = computed(() => {
    const range = this.maxYear() - this.minYear();
    return ((this.year() - this.minYear()) / range) * 100;
  });

  eraHue = computed(() => {
    const year = this.year();
    // Map years to hue values for distinct era colors
    if (year < 1950) return 35;  // Sepia/warm
    if (year < 1970) return 45;  // Golden
    if (year < 1980) return 25;  // Orange
    if (year < 1990) return 280; // Neon purple
    if (year < 2000) return 180; // Teal
    if (year < 2010) return 210; // Blue
    if (year < 2020) return 260; // Violet
    return 45; // Modern gold
  });

  eraName = computed(() => {
    const year = this.year();
    if (year < 1950) return 'Golden Age of Hollywood';
    if (year < 1970) return 'New Hollywood Era';
    if (year < 1980) return 'Blockbuster Revolution';
    if (year < 1990) return 'High Concept Decade';
    if (year < 2000) return 'Independent Renaissance';
    if (year < 2010) return 'Digital Transition';
    if (year < 2020) return 'Streaming Wars Begin';
    return 'Modern Era';
  });

  decadeMarkers = computed(() => {
    const markers: number[] = [];
    const start = Math.ceil(this.minYear() / 10) * 10;
    for (let year = start; year <= this.maxYear(); year += 10) {
      markers.push(year);
    }
    return markers;
  });

  quickJumpDecades = computed(() => [1980, 1990, 2000, 2010, 2020]);

  constructor() {
    effect(() => {
      if (this.isChanging()) {
        setTimeout(() => this.isChanging.set(false), 150);
      }
    });
  }

  incrementYear() {
    if (this.year() < this.maxYear()) {
      this.isChanging.set(true);
      this.yearChange.emit(this.year() + 1);
    }
  }

  decrementYear() {
    if (this.year() > this.minYear()) {
      this.isChanging.set(true);
      this.yearChange.emit(this.year() - 1);
    }
  }

  jumpToDecade(decade: number) {
    this.isChanging.set(true);
    this.yearChange.emit(decade);
  }

  isInDecade(decade: number): boolean {
    return this.year() >= decade && this.year() < decade + 10;
  }

  getMarkerPosition(decade: number): number {
    const range = this.maxYear() - this.minYear();
    return ((decade - this.minYear()) / range) * 100;
  }
}
