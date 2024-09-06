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
      cars: { type: Array },
    };
  }

  constructor() {
    super();
    this.cars = [];
  }

  async connectedCallback() {
    super.connectedCallback();
    await this.fetchCarData();
  }

  async fetchCarData() {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/cars`, {
        method: 'GET',
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      this.cars = data;
    } catch (error) {
      console.error('Error fetching car data:', error);
    }
  }

  render() {
    return html`
      <section>
        <h1><span>Featured</span><span>cars</span></h1>
        <div class="services-container">
          ${map(this.cars, (car) => html`
            <featured-car-card
              .brand="${car.brand}"
              .model="${car.model}"
              .description="${car.description}"
              .assurance="${car.assurance}"
              .km="${car.km}"
              .features="${car.features}"
              .extras="${car.extras}"
              .color="${car.color}"
              .engine="${car.engine}"
              .imageUrl="${car.imageUrl}"
              .price="${car.price}"
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
      max-width: 100%;
      margin: 0rem auto;
    }
    section {
      display: block;
      margin: 4rem auto;
      max-width: var(--max-width);
      padding: 0 1rem 0 1rem; 
    }
    @media (min-width: 768px) {
      section {
        padding-left: 2rem;
        padding-right: 2rem;
      }
    }
    @media (min-width: 1024px) {
      section {
        padding-left: 3rem;
        padding-right: 3rem;
      }
    }
    @media (min-width: 1280px) {
      section {
        padding-left: 4rem;
        padding-right: 4rem;
      }
    }
    section h1 {
      display:flex;
      justify-content: start;
      align-items:center;
      font-size: 2rem;
      padding: 0 0 2rem 0;
      margin: 0;
      gap: 0.8rem;
    }
    section h1 span:first-child {
      color: var(--text-color-2);
    }
    .services-container {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      max-width: var(--max-width);
      margin: 0 auto;
      gap: 2rem;
    } 
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'featured-cars': FeaturedCars;
  }
}
