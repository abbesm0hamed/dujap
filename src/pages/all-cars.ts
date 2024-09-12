import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import '../components/featured-cars/featured-car-card';
import { createQuery, fetchData } from "../utils/fetcher";
import { CarDetails } from "../types/car";
import { sharedStyles } from '../styles/shared-styles.ts';

@customElement('all-cars')
export class AllCars extends LitElement {
  @state() private cars: CarDetails[] = [];
  @state() private filteredCars: CarDetails[] = [];
  @state() private isLoading = true;
  @state() private error: Error | null = null;
  @state() private filters = {
    model: '',
    brand: '',
    minPrice: '',
    maxPrice: '',
    color: ''
  };

  @property({ type: Number }) refreshInterval = 60000; // 1 minute by default

  private query: ReturnType<typeof createQuery> | null = null;
  private refreshTimer: number | null = null;

  connectedCallback() {
    super.connectedCallback();
    this.fetchCars();
    this.startRefreshTimer();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.unsubscribeFromQuery();
    this.stopRefreshTimer();
  }

  updated(changedProperties: Map<string, any>) {
    if (changedProperties.has('filters')) {
      this.applyFilters();
    }
    if (changedProperties.has('refreshInterval')) {
      this.restartRefreshTimer();
    }
  }

  private fetchCars() {
    this.unsubscribeFromQuery();
    this.isLoading = true;
    this.error = null;

    this.query = createQuery(
      ['cars'],
      () => fetchData<CarDetails[]>('/cars'),
      { staleTime: 0 } // Always fetch fresh data
    );

    this.query.subscribe((result) => {
      this.isLoading = result.isLoading;
      this.error = result.error as Error | null;
      if (result.data) {
        this.cars = result.data;
        this.applyFilters();
      }
      this.requestUpdate();
    });
  }

  private unsubscribeFromQuery() {
    if (this.query) {
      this.query.unsubscribe();
      this.query = null;
    }
  }

  private startRefreshTimer() {
    this.refreshTimer = window.setInterval(() => {
      this.fetchCars();
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
          <a href="/" class="logo">DuJap Cars</a>
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
          ${this.isLoading ? html`<div class="loading">Loading...</div>` :
        this.error ? html`<div class="error">Error: ${this.error.message}</div>` :
          this.filteredCars.map(car => html`
              <featured-car-card .car="${car}"></featured-car-card>
            `)
      }
        </div>
        ${this.filteredCars.length === 0 && !this.isLoading ? html`<p class="no-results">No cars match the current filters.</p>` : ''}
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
      background: rgb(20,27,36);
      background: linear-gradient(180deg, rgba(20,27,36,1) 0%, rgba(13,15,18,1) 35%, rgba(0,0,0,1) 100%);
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
      background: rgb(20,27,36);
      background: linear-gradient(180deg, rgba(20,27,36,1) 0%, rgba(13,15,18,1) 35%, rgba(0,0,0,1) 100%);
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
    }
    nav {
      display: block;
      margin: 0 auto;
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(70px);
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
      border: 1px solid var(--border-color-1);
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
