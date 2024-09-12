import { css, html, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { map } from 'lit/directives/map.js';
import './featured-cars/featured-car-card';
import { createQuery, fetchData } from "../utils/fetcher";
import { CarDetails } from "../types/car";

@customElement('featured-cars')
export class FeaturedCars extends LitElement {
  @state() private cars: CarDetails[] = [];
  @state() private isLoading = true;
  @state() private error: Error | null = null;
  private unsubscribe: (() => void) | null = null;

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  connectedCallback() {
    super.connectedCallback();
    const query = createQuery(
      ['cars'],
      () => fetchData<CarDetails[]>('/cars'),
      { staleTime: 60000 } // 1 minute
    );
    this.unsubscribe = query.subscribe(() => {
      const result = query.getCurrentResult();
      this.isLoading = result.isLoading;
      this.error = result.error as Error | null;
      if (result.data) {
        this.cars = result.data;
      }
      this.requestUpdate();
    });
  }

  constructor() {
    super();
    this.cars = [];
  }

  renderSkeleton() {
    return html`
      <section>
        <h1><skeleton-loader width="200px" height="2rem"></skeleton-loader></h1>
        <div class="services-container">
          ${[1, 2, 3, 4, 5, 6].map(() => html`
            <div class="card">
              <skeleton-loader shape="rect" height="200px"></skeleton-loader>
              <skeleton-loader width="80%" height="1.5rem" style="margin-top: 1rem;"></skeleton-loader>
              <skeleton-loader width="60%" height="1rem" style="margin-top: 0.5rem;"></skeleton-loader>
            </div>
          `)}
        </div>
      </section>
    `;
  }

  render() {
    if (this.isLoading) {
      return html`<section class="loading">Loading...</section>`;
    }
    if (this.error) {
      return html`<section>Error: ${this.error.message}</section>`;
    }
    const displayedCars = this.cars.slice(0, 6);

    return html`
      <section>
        <h1><span>Featured</span><span>cars</span></h1>
        <div class="services-container">
          ${map(displayedCars, (car) => html`
            <featured-car-card
              .car="${car}"
              class="card"
            ></featured-car-card>
          `)}
        </div>
        <div class="show-more-container">
          <button @click=${this.navigateToAllCars} class="show-more-button">Show More</button>
        </div>
      </section>
    `;
  }

  private navigateToAllCars() {
    window.history.pushState(null, '', '/all-cars');
    window.dispatchEvent(new PopStateEvent('popstate'));
  }

  static styles = css`
    :host {
      display: block;
      width: 100%;
      max-width: 100%;
      margin: 0rem auto;
      border-top: 1px solid var(--light-color-op);
      box-shadow: 0 -30px 20px -5px rgba(39, 57, 80, 0.1); 
    }
    .loading {
      display: block;
      width: 100%;
      color: var(--text-color-1);
      font-size: 1.2rem;
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
    .show-more-container {
      display: flex;
      justify-content: center;
      margin-top: 2rem;
    }
    .show-more-button {
      padding: 0.5rem 1rem;
      font-size: 1rem;
      background-color: var(--brand-color-8);
      color: white;
      border: 1px solid var(--border-color-1);
      border-radius: var(--border-radius);
      cursor: pointer;
      transition: background-color 0.3s ease;
    }
    .show-more-button:hover {
      background-color: var(--brand-color-7);
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'featured-cars': FeaturedCars;
  }
}
