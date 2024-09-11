import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { map } from 'lit/directives/map.js';
import './services/service-card';

@customElement('brand-services')
export class Services extends LitElement {
  static get properties() {
    return {
      /**
       * The items.
       * @type {Array}
       */
      car_services: { type: Array },
    };
  }

  constructor() {
    super();
    this.car_services = [
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
      <section id="services">
        ${map(this.car_services, (car) => html`
          <service-card
            .title="${car.title}"
            .description="${car.description}"
            .imageUrl="${car.imageUrl}"
            class="card"
          ></service-card>
        `)}
      </section>
    `;
  }

  static styles = css`
    :host {
      display: block;
      width: 100%;
      max-width: 100%;
      margin: 0 auto;
      background: rgb(20,27,36);
      background: linear-gradient(0deg, rgba(20,27,36,1) 0%, rgba(13,15,18,1) 35%, rgba(0,0,0,1) 100%);
      border-bottom: 1px solid var(--light-color-op);
      box-shadow: 0 30px 20px -5px rgba(39, 57, 80, 0.1); 
      z-index: 1;
      position: relative;
    }

    section {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, auto));
      gap: 2rem;
      max-width: var(--max-width);
      margin: 0 auto;
      padding: 2rem 1rem 8rem 1rem; 
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
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'brand-services': Services;
  }
}
