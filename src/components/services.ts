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
      <section class="services-container">
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
      max-width: var(--max-width);
      margin: 0rem auto;
    }
    section {
      padding: 0rem;
    }
    .services-container {
      display: grid;
      grid-template-columns: repeat(3, minmax(100px, 1fr));
      max-width: var(--max-width);
      margin: 0 auto;
      padding: 6rem 0 16rem 0;
      gap: 2rem;
    } 
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'brand-services': Services;
  }
}
