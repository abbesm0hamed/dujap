import { css, html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { map } from 'lit/directives/map.js';

@customElement('newest-cars-carousel')
export class NewestCarsCarousel extends LitElement {
  @property({ type: Array })
  cars = [
    {
      imageUrl: '/images/random.jpeg',
      title: 'Car 1',
    },
    {
      imageUrl: '/images/services/car-engine.jpg',
      title: 'Car 2',
    },
    {
      imageUrl: '/images/services/dealership.jpg',
      title: 'Car 3',
    },
    {
      imageUrl: '/images/random.jpeg',
      title: 'Car 4',
    },
  ];

  @state()
  currentSlide = 0;

  render() {
    return html`
      <div
        class="carousel"
        style="transform: translateX(-${this.currentSlide * 100}%);"
      >
        ${map(this.cars, (car) => html`
          <figure class="carousel-item">
            <img
              src=${car.imageUrl}
              alt="${car.title}"
            />
            <figcaption>${car.title}</figcaption>
          </figure>
        `)}
      </div>
      <div class="nav-arrows">
        <button @click="${this.prevSlide}">
          <img src='/icons/chevron-left.svg' alt="left" />
        </button>
        <button @click="${this.nextSlide}">
          <img src='/icons/chevron-right.svg' alt="right" />
        </button>
      </div>
    `;
  }

  prevSlide() {
    this.currentSlide = (this.currentSlide === 0) ? this.cars.length - 1 : this.currentSlide - 1;
  }
  nextSlide() {
    this.currentSlide = (this.currentSlide === this.cars.length - 1) ? 0 : this.currentSlide + 1;
  }

  static styles = css`
    :host {
      display: block;
      width: 100%;
      overflow: hidden;
    }

    .carousel {
      width: 100%;
      display: flex;
      transition: transform 0.5s ease-in-out;
      will-change: transform;
      padding: 0;
      margin: 0;
    }

    .carousel-item {
      min-width: 100%;
      max-width: var(--max-width); 
      display: flex; 
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 0;
      margin: 0;
    }

    .carousel img {
      width: 100%;
      height: 550px; 
      object-fit: cover;
      border-radius: var(--border-radius);
    }

    figcaption {
      text-align: center;
      margin-top: 1rem;
      color: var(--text-color);
      padding: 2rem 0;
    }

    .nav-arrows {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 1rem;
    }

    .nav-arrows button {
      border: none;
      background-color: var(--brand-color-5);
      padding: 0.5rem 1rem;
      margin: 0 0.5rem;
      border-radius: 5px;
      cursor: pointer;
      font-size: 1.2rem;
    }

    .nav-arrows button:hover {
      background-color: var(--brand-color-2);
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'newest-cars-carousel': NewestCarsCarousel;
  }
}
