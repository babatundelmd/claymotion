import { Component, computed, input, signal } from '@angular/core';
import { AwardType, AWARD_METADATA } from '../models';
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-award-card',
  imports: [UpperCasePipe],
  templateUrl: './award-card.html',
  styleUrl: './award-card.scss',
})
export class AwardCard {
  title = input.required<string>();
  creative = input.required<string>();
  year = input.required<number>();
  awardType = input.required<AwardType>();
  src = input.required<string>();
  transform = signal('rotateX(0deg) rotateY(0deg) scale(1)');
  sheenPosition = signal({ x: 50, y: 0 });
  imageLoaded = signal(false);
  awardMeta = computed(() => AWARD_METADATA[this.awardType()]);
  
  creativeLabel = computed(() => {
    const type = this.awardType();
    if (type === 'Tonys') return 'Created by';
    if (type === 'Emmys') return 'Showrunner';
    return 'Directed by';
  });

  tilt(e: MouseEvent) {
    const card = e.currentTarget as HTMLElement;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left;
    const y = e.clientY - box.top;
    
    const centerX = box.width / 2;
    const centerY = box.height / 2;
    
    const rotateX = -(y - centerY) / 20;
    const rotateY = (x - centerX) / 20;
    
    this.transform.set(`rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`);
    this.sheenPosition.set({ 
      x: (x / box.width) * 100, 
      y: (y / box.height) * 100 
    });
  }

  tiltTouch(e: TouchEvent) {
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      const card = e.currentTarget as HTMLElement;
      
      const fakeEvent = {
        currentTarget: card,
        clientX: touch.clientX,
        clientY: touch.clientY
      } as unknown as MouseEvent;
      
      this.tilt(fakeEvent);
    }
  }

  reset() {
    this.transform.set('rotateX(0deg) rotateY(0deg) scale(1)');
    this.sheenPosition.set({ x: 50, y: 0 });
  }

  onImageLoad() {
    this.imageLoaded.set(true);
  }

  onImageError() {
    this.imageLoaded.set(false);
  }
}
