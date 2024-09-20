import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { Task } from '@lit/task';
import '../components/featured-cars/featured-car-card';
import { sharedStyles } from '../styles/shared-styles.ts';
import { fetchData } from '../utils/fetcher.ts';
import { CarDetails } from '../types/car.js';
import '../components/logo.ts';
import { getBaseUrl } from '../utils/index.utils.ts';
import { carStore } from '../stores/car-store.ts';

@customElement('all-cars')
export class AllCars extends LitElement {
  @state() private cars: CarDetails[] = [];
  @state() private filteredCars: CarDetails[] = [];
  @state() private filters = {
    model: '',
    brand: '',
    minPrice: '',
    maxPrice: '',
    color: ''
  };

  @property({ type: Number }) refreshInterval = 60000; // 1 minute by default

  private refreshTimer: number | null = null;

  private carsTask = new Task(
    this,
    async () => {
      const cars = await carStore.getCars();
      this.cars = cars;
      this.applyFilters();
      return this.filteredCars;
    }
  );

  connectedCallback() {
    super.connectedCallback();
    this.handleUpdate();
    carStore.addEventListener('update', this.handleUpdate);
    this.startRefreshTimer();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    carStore.removeEventListener('update', this.handleUpdate);
    this.stopRefreshTimer();
  }

  private handleUpdate = () => {
    this.carsTask.run();
  }

  private startRefreshTimer() {
    this.refreshTimer = window.setInterval(() => {
      carStore.refreshCars();
    }, this.refreshInterval);
  }

  private stopRefreshTimer() {
    if (this.refreshTimer !== null) {
      window.clearInterval(this.refreshTimer);
      this.refreshTimer = null;
    }
  }

  private restartRefreshTimer() {
    this.stopRefreshTimer();
    this.startRefreshTimer();
  }

  private applyFilters() {
    this.filteredCars = this.cars.filter(car => {
      const modelMatch = car.model.toLowerCase().includes(this.filters.model.toLowerCase());
      const brandMatch = car.brand.toLowerCase().includes(this.filters.brand.toLowerCase());
      const colorMatch = car.color.toLowerCase().includes(this.filters.color.toLowerCase());
      const priceMatch = (
        (!this.filters.minPrice || Number(car.price) >= parseFloat(this.filters.minPrice)) &&
        (!this.filters.maxPrice || Number(car.price) <= parseFloat(this.filters.maxPrice))
      );
      return modelMatch && brandMatch && colorMatch && priceMatch;
    });
    this.requestUpdate();
  }

  private handleFilterChange(e: Event) {
    const target = e.target as HTMLInputElement;
    const name = target.name as keyof typeof this.filters;
    const value = target.value;

    this.filters = {
      ...this.filters,
      [name]: value
    };
  }

  render() {
    return html`
      <header>
        <nav>
          <a
            href="/"
            class="logo-link"
          >
            <app-logo></app-logo>
          </a>
        </nav>
      </header>
      <section>
        <h1>All Cars</h1>
        <div class="filters">
          <input name="model" placeholder="Model" @input=${this.handleFilterChange}>
          <input name="brand" placeholder="Brand" @input=${this.handleFilterChange}>
          <input name="minPrice" type="number" placeholder="Min Price" @input=${this.handleFilterChange}>
          <input name="maxPrice" type="number" placeholder="Max Price" @input=${this.handleFilterChange}>
          <input name="color" placeholder="Color" @input=${this.handleFilterChange}>
        </div>
        <div class="cars-container">
          ${this.carsTask.render({
      pending: () => html`<div class="loading">Loading...</div>`,
      complete: () => this.filteredCars.map(car => html` <featured-car-card .car="${car}"></featured-car-card> `),
      error: (error) => html`<div class="error">Error: ${error.message}</div>`
    })}
        </div>
        ${this.filteredCars.length === 0 && !this.carsTask.status === 'complete' ? html`<p class="no-results">No cars match the current filters.</p>` : ''}
      </section>
      <app-footer id="contact" class="footer"></app-footer>
    `;
  }

  static styles = [sharedStyles, css`
    :host {
      display: block;
      margin: 0 auto;
      width: 100%;
      max-width: 100%;
      min-height: 100vh;
      background: rgb(25,35,70);
      background: linear-gradient(180deg, rgba(25,35,70,1) 0%, rgba(12,17,34,1) 50%, rgba(0,0,0,1) 100%);
    }
    .loading {
      display: block;
      margin: 0 auto;
      width: 100%;
      padding: 8rem 0;
      max-width: 100%;
      min-height: 80vh;
      color: var(--text-color-1);
      font-size: 1.2rem;
      max-width: var(--max-width);
    }

    .logo {
      font-size: 1.5rem;
      font-weight: bold;
      color: var(--brand-color-4);
    }
    header {
      display: block;
      position: fixed;
      width: 100%;
      max-width: 100%;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1000;
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      box-shadow: 0 4px 6px rgba(150, 151, 156, 0.1); 
      border-bottom: 1px solid var(--border-color-1);
    }
    header::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-image: url('/patterns/light-alum.png');
      background-color: rgba(150, 151, 156, 0.6);
      opacity: 0.7; 
      z-index: -1;
    }
    nav {
      display: block;
      margin: 0 auto;
      max-width: var(--max-width, 1250px) !important;
      padding: 1rem 1rem; 
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    header a {
      text-decoration: none;
      display: flex;
      height: 100%;
      align-items: center;
      justify-content: center;
    }

    section {
      display: block;
      margin: 0 auto;
      max-width: var(--max-width);
      padding: 6rem 1rem; 
    }
    @media (min-width: 768px) {
      section, .loading, nav { 
        padding-left: 2rem;
        padding-right: 2rem;
      }
    }
    @media (min-width: 1024px) {
      section, .loading, nav { 
        padding-left: 3rem;
        padding-right: 3rem;
      }
    }
    @media (min-width: 1280px) {
      section, .loading, nav { 
        padding-left: 4rem;
        padding-right: 4rem;
      }
    }
    .cars-container {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1rem;
    }
    .filters {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      margin-bottom: 2rem;
    }
    .filters input {
      padding: 0.5rem;
      border: 1px solid rgb(255, 255, 255, 0.4);
      border-radius: var(--border-radius);
      background-color: var(--background-color-2);
      color: var(--text-color-1);
    }
    .footer {
      border-top: 1px solid var(--light-color-op)
    }

    .loading, .error {
      grid-column: 1 / -1;
      text-align: center;
      padding: 2rem;
      font-size: 1.2rem;
    }
    .error {
      color: #ff6b6b;
    }
  `];
}

declare global {
  interface HTMLElementTagNameMap {
    'all-cars': AllCars;
  }
}
