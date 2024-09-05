import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { map } from 'lit/directives/map.js';
import './featured-cars/featured-car-card';

@customElement('featured-cars')
export class FeaturedCars extends LitElement {
  static get properties() {
    return {
      /**
       * The items.
       * @type {Array}
       */
      featured_cars: { type: Array },
    };
  }
  constructor() {
    super();

    this.featured_cars = [
      {
        imageUrl: '/images/services/dealership.jpg',
        title: 'Largest Dealership of Japanese Cars',
        description: 'Discover the most extensive collection of Japanese cars in Dubai. We offer a variety of models to suit all preferences and budgets.',
      },
      {
        imageUrl: '/images/services/car-engine.jpg',
        title: 'Comprehensive Repair Warranty',
        description: 'Enjoy peace of mind with our comprehensive repair warranty, ensuring your car is always in top condition.',
      },
      {
        imageUrl: '/images/services/assurance.webp',
        title: 'Insurance Support',
        description: 'We provide full insurance support, making the process of buying and owning a car seamless and stress-free.',
      }
    ];
  }

  render() {
    return html`
      <section >
        <h1><span>Featured</span><span>Cars</span></h1>
        <div class="services-container">
          ${map(this.featured_cars, (car) => html`
            <featured-car-card
              .title="${car.title}"
              .description="${car.description}"
              .imageUrl="${car.imageUrl}"
              class="card"
            ></featured-car-card>
          `)}
        </div>
      </section>
    `;
  }

  static styles = css`
    :host {
      display: block;
      width: 100%;
      max-width: var(--max-width);
      margin: 0rem auto;
    }
    .services-container {
      display: grid;
      grid-template-columns: repeat(3, minmax(100px, 1fr));
      max-width: var(--max-width);
      margin: 0 auto;
      gap: 2rem;
    } 
    section {
      display: block;
      width: 100%;
      max-width: var(--max-width);
      margin: 0rem auto;
    }
    section h1 {
      display:flex;
      justify-content: start;
      align-items:center;
      font-size: 2rem;
      padding: 4rem 0;
      margin: 0;
      gap: 0.8rem;
    }
    section h1 span:first-child {
      color: var(--text-color-2);
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'featured-cars': FeaturedCars;
  }
}
