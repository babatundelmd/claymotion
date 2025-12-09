# 🎬 Claymotion Chronicle

> **A stunning Angular 20+ showcase application that transforms entertainment award history into an interactive, visually immersive experience powered by Google Gemini AI.**

![Angular](https://img.shields.io/badge/Angular-20.1.0-dd0031?style=for-the-badge&logo=angular)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6?style=for-the-badge&logo=typescript)
![Gemini AI](https://img.shields.io/badge/Gemini-AI%20Powered-4285f4?style=for-the-badge&logo=google)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

---

## 📖 Description

**Claymotion Chronicle** is a modern Angular application that serves as a comprehensive "Hall of Fame" for major entertainment awards including the Oscars, Emmys, Golden Globes, BAFTA, Critics Choice, and Tony Awards. The app leverages Google's Gemini AI to dynamically fetch accurate award data and generate vivid scene descriptions, with the vision of creating unique "Nana Banana" style 3D figurine artwork for each winner.

The application demonstrates cutting-edge Angular 20+ features including **Signals**, **Resource API**, **Standalone Components**, **New Control Flow Syntax**, and modern reactive patterns—all wrapped in a visually stunning, award-show-inspired UI with 3D parallax effects, era-based theming, and smooth animations.

---

## ✨ Features

### Core Functionality
- 🏆 **Multi-Award Support** - Browse winners from Oscars, Emmys, Golden Globes, BAFTA, Critics Choice, and Tony Awards
- 📅 **Historical Timeline** - Navigate through award history from 1929 to present
- 🤖 **AI-Powered Data** - Real-time award information fetched via Google Gemini AI
- 🎨 **Dynamic Theming** - Era-based color schemes that shift as you travel through time
- 📱 **Fully Responsive** - Optimized for desktop, tablet, and mobile devices

### Visual Experience
- 🃏 **3D Parallax Cards** - Interactive winner cards with mouse/touch tilt effects
- ✨ **Holographic Effects** - Shimmering backgrounds and floating particles
- 🎭 **Award-Specific Styling** - Unique color schemes for each award ceremony
- 🌟 **Smooth Animations** - CSS and Signal-driven animations throughout

---

## 🏗️ Architecture & Angular Features

### Angular 20+ Features Demonstrated

#### 1. **Signals (Reactive Primitives)**

Signals are Angular's new reactive primitive for managing state. They provide fine-grained reactivity without the complexity of RxJS for simple state management.

```typescript
// Writable signals for component state
selectedYear = signal(2024);
selectedAward = signal<AwardType>('Oscars');

// Reading signal values in templates
{{ selectedYear() }}

// Updating signals
selectedYear.set(2025);
selectedYear.update(year => year + 1);
```

**Files:** `app.component.ts`, `award-card.component.ts`, `year-slider.component.ts`

#### 2. **Computed Signals**

Derived state that automatically updates when dependencies change.

```typescript
eraHue = computed(() => {
  const year = this.selectedYear();
  if (year < 1950) return 35;  // Sepia/warm
  if (year < 1970) return 45;  // Golden
  if (year < 1990) return 280; // Neon purple
  return 45; // Modern gold
});


awardColors = computed(() => ({
  primary: AWARD_METADATA[this.selectedAward()].primaryColor,
  secondary: AWARD_METADATA[this.selectedAward()].secondaryColor
}));
```

**Files:** `app.component.ts`, `year-slider.component.ts`, `award-card.component.ts`

#### 3. **Resource API (Async Data Loading)**

The Resource API provides a declarative way to handle async data fetching with built-in loading and error states.

```typescript
import { resource } from '@angular/core';

awardsResource = resource({
  params: () => ({
    year: this.selectedYear(),
    type: this.selectedAward()
  }),

  loader: ({ params }) => this.service.fetchAwardData(params.year, params.type)
});

@if (awardsResource.isLoading()) {
  <app-loading-spinner />
}

@if (awardsResource.error(); as err) {
  <app-error-state (retry)="awardsResource.reload()" />
}

@if (awardsResource.hasValue()) {
  <div>{{ awardsResource.value().winner.title }}</div>
}
```

**Files:** `app.component.ts`

#### 4. **Signal Inputs**

Modern input API using signals for reactive component inputs.

```typescript
import { input } from '@angular/core';

title = input.required<string>();
year = input.required<number>();
awardType = input.required<AwardType>();

message = input('Default message');

<h1>{{ title() }}</h1>
<span>{{ year() }}</span>
```

**Files:** `award-card.component.ts`, `nominees-list.component.ts`, `year-slider.component.ts`

#### 5. **Signal Outputs**

Modern output API for component events.

```typescript
import { output } from '@angular/core';

yearChange = output<number>();
awardChange = output<AwardType>();

this.yearChange.emit(2024);
<app-year-slider 
  [year]="selectedYear()" 
  (yearChange)="onYearChange($event)" />
```

**Files:** `year-slider.component.ts`, `award-selector.component.ts`, `error-state.component.ts`

#### 6. **New Control Flow Syntax (@if, @for, @let)**

Angular's new built-in control flow replaces *ngIf and *ngFor with better performance and readability.

```typescript

@if (isLoading()) {
  <app-loading-spinner />
} @else if (error()) {
  <app-error-state />
} @else {
  <div class="content">...</div>
}

// Iteration with @for (requires track)
@for (type of awardTypes; track type) {
  <button [class.active]="selectedAward() === type">
    {{ type }}
  </button>
}

// Local variables with @let
@if (awardsResource.hasValue()) {
  @let data = awardsResource.value();
  <h1>{{ data.winner.title }}</h1>
}
```

**Files:** All component templates

#### 7. **Standalone Components**

All components are standalone—no NgModules required.

```typescript
@Component({
  selector: 'app-award-card',
  standalone: true,
  imports: [CommonModule], // Import dependencies directly
  template: `...`,
  styles: [`...`]
})
export class AwardCardComponent {
  // Component logic
}
```

**Files:** All components

#### 8. **Dependency Injection with inject()**

Modern DI using the `inject()` function instead of constructor injection.

```typescript
import { inject } from '@angular/core';

export class AppComponent {
  // Functional injection
  private service = inject(GeminiAwardsService);
  
  // vs traditional constructor injection
  // constructor(private service: GeminiAwardsService) {}
}
```

**Files:** `app.component.ts`

#### 9. **Effect (Side Effects)**

Run side effects when signals change.

```typescript
import { effect } from '@angular/core';

constructor() {
  // Runs whenever isChanging() signal updates
  effect(() => {
    if (this.isChanging()) {
      setTimeout(() => this.isChanging.set(false), 150);
    }
  });
}
```

**Files:** `year-slider.component.ts`

---

### Project Structure

```
src/
├── app/
│   ├── models.ts                    # TypeScript interfaces & types
│   ├── awards.service.ts            # Gemini AI integration service
│   ├── app.component.ts             # Root component with Resource API
│   ├── app.config.ts                # Application configuration
│   ├── award-card.component.ts      # 3D parallax winner card
│   ├── award-selector.component.ts  # Award type navigation
│   ├── year-slider.component.ts     # Timeline navigation
│   ├── nominees-list.component.ts   # Collapsible nominees envelope
│   ├── loading-spinner.component.ts # Loading state UI
│   └── error-state.component.ts     # Error handling UI
├── environments/
│   ├── environment.ts               # Development config
│   └── environment.prod.ts          # Production config
├── main.ts                          # Bootstrap file
├── index.html
└── styles.css                       # Global styles
```

---

## 🎨 Design System

### Color Palette

Each award ceremony has its own distinct color scheme:

| Award | Primary Color | Secondary Color | Icon |
|-------|--------------|-----------------|------|
| Oscars | `#d4af37` (Gold) | `#1a1a2e` | 🏆 |
| Emmys | `#e0aa3e` (Bronze) | `#16213e` | 📺 |
| Golden Globes | `#ffd700` (Bright Gold) | `#0f0f23` | 🌐 |
| Critics Choice | `#00d4ff` (Cyan) | `#1a1a2e` | ⭐ |
| BAFTA | `#e85d04` (Orange) | `#1d1d1d` | 🎭 |
| Tonys | `#c0c0c0` (Silver) | `#2d132c` | 🎪 |

### Era-Based Theming

The background hue shifts based on the selected year:

| Era | Years | Hue | Visual Style |
|-----|-------|-----|--------------|
| Golden Age | < 1950 | 35° | Sepia/Warm |
| New Hollywood | 1950-1969 | 45° | Golden |
| Blockbuster Era | 1970-1979 | 25° | Orange |
| High Concept | 1980-1989 | 280° | Neon Purple |
| Indie Renaissance | 1990-1999 | 180° | Teal |
| Digital Transition | 2000-2009 | 210° | Blue |
| Streaming Wars | 2010-2019 | 260° | Violet |
| Modern Era | 2020+ | 45° | Gold |

### Typography

- **Display Font:** Playfair Display (serif) - For titles and headings
- **Body Font:** Outfit (sans-serif) - For UI elements and body text
- **Monospace:** Space Mono - For year displays and technical elements

---

## 🛠️ Technical Implementation

### Service Layer Pattern

The `GeminiAwardsService` encapsulates all AI interactions:

```typescript
@Injectable({ providedIn: 'root' })
export class GeminiAwardsService {
  private ai = new GoogleGenAI({ apiKey: environment.GEMINI_API_KEY });
  private cache = new Map<string, AwardData>();

  async fetchAwardData(year: number, type: AwardType): Promise<AwardData> {
    const cacheKey = `${type}-${year}`;
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)!;
    }

    const meta = AWARD_METADATA[type];
    const prompt = `...`;

    const response = await this.ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: prompt,
      config: { temperature: 0.3 }
    });

    const data = JSON.parse(response?.text || '');
    this.cache.set(cacheKey, data);
    
    return data;
  }
}
```

### State Management with Signals

The app uses a simple but effective state management pattern:

```typescript
selectedYear = signal(2024);
selectedAward = signal<AwardType>('Oscars');
eraHue = computed(() => /* derives from selectedYear */);
awardColors = computed(() => /* derives from selectedAward */);

awardsResource = resource({
  params: () => ({ year: this.selectedYear(), type: this.selectedAward() }),
  loader: ({ params }) => this.service.fetchAwardData(params.year, params.type)
});
```

### 3D Card Effect Implementation

The parallax tilt effect uses mouse position calculations:

```typescript
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
}
```

CSS enables the 3D effect:

```css
.scene { 
  perspective: 1500px; 
}

.card {
  transform-style: preserve-3d;
  transition: transform 0.15s cubic-bezier(0.03, 0.98, 0.52, 0.99);
}

.info-layer {
  transform: translateZ(70px); /* Pops forward */
}
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm 9.x or higher
- Angular CLI 20.x (`npm install -g @angular/cli`)
- Google Gemini API Key ([Get one here](https://makersuite.google.com/app/apikey))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/claymotion-chronicle.git
   cd claymotion-chronicle
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   
   Create `src/environments/environment.ts`:
   ```typescript
   export const environment = {
     production: false,
     GEMINI_API_KEY: 'your-gemini-api-key-here'
   };
   ```

4. **Start development server**
   ```bash
   ng serve
   ```

5. **Open browser**
   Navigate to `http://localhost:4200`

### Build for Production

```bash
ng build --configuration production
```

Output will be in the `dist/` folder.

---

## 📦 Dependencies

### Core Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `@angular/core` | ^20.1.0 | Angular framework |
| `@angular/common` | ^20.1.0 | Common utilities |
| `@angular/platform-browser` | ^20.1.0 | Browser platform |
| `@google/genai` | ^latest | Google Gemini AI SDK |
| `rxjs` | ^7.8.0 | Reactive extensions |
| `zone.js` | ^0.14.0 | Change detection |

### Dev Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `@angular/cli` | ^20.1.0 | CLI tools |
| `@angular/compiler-cli` | ^20.1.0 | AOT compiler |
| `typescript` | ~5.4.0 | TypeScript compiler |

---

## 🧪 Best Practices Demonstrated

### 1. **Signal-First State Management**
- Use signals for all component state
- Prefer `computed()` for derived state
- Use `effect()` sparingly for side effects

### 2. **Standalone Components**
- No NgModules needed
- Direct imports in component decorator
- Better tree-shaking and lazy loading

### 3. **Type Safety**
- Strict TypeScript configuration
- Explicit types for all data models
- Generic typing for Resource API

### 4. **Performance Optimization**
- Signal-based fine-grained reactivity
- Built-in caching in service layer
- CSS animations over JavaScript where possible
- Lazy image loading

### 5. **Accessibility**
- ARIA labels on interactive elements
- Keyboard navigation support
- Semantic HTML structure
- Color contrast compliance

### 6. **Responsive Design**
- Mobile-first CSS approach
- CSS Grid and Flexbox layouts
- Touch event support for mobile

### 7. **Error Handling**
- Graceful degradation with fallbacks
- User-friendly error messages
- Retry mechanisms

### 8. **Code Organization**
- Feature-based file structure
- Single responsibility components
- Centralized type definitions
- Environment-based configuration

---

## 🔮 Future Enhancements

- [ ] **AI Image Generation** - Integrate Imagen 3 or Pollinations.ai for "Nana Banana" figurine artwork
- [ ] **Additional Awards** - SAG Awards, Grammys, MTV Awards
- [ ] **Comparison View** - Side-by-side winner comparisons across years
- [ ] **Favorites System** - Save and track favorite winners
- [ ] **Share Feature** - Social media sharing with generated cards
- [ ] **Offline Support** - PWA capabilities with service workers
- [ ] **Voice Navigation** - "Show me the 1994 Oscar winner"
- [ ] **AR Mode** - View 3D figurines in augmented reality

---

## 🤝 Contributing

Contributions are welcome! Please read our contributing guidelines before submitting PRs.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Angular Team** - For the incredible framework and Signals API
- **Google AI** - For Gemini API access
- **The Academy** - For decades of award show history
- **Design Inspiration** - Award show broadcasts and collectible figurine aesthetics

---

<div align="center">

**Built with ❤️ using Angular 20+ and Google Gemini AI**

[Report Bug](https://github.com/yourusername/claymotion-chronicle/issues) · [Request Feature](https://github.com/yourusername/claymotion-chronicle/issues)

</div>