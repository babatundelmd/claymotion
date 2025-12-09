import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-error-state',
  imports: [],
  templateUrl: './error-state.html',
  styleUrl: './error-state.scss',
})
export class ErrorState {
  title = input('Apologies, the envelope was lost');
  message = input('We couldn\'t retrieve the award data. The Academy archives might be temporarily unavailable.');
  
  retry = output<void>();
}
