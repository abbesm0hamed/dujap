import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
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

  private unsubscribe: (() => void) | null = null;

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
        this.applyFilters();
      }
      this.requestUpdate();
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.unsubscribe) {
      this.unsubscribe();
    }
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

    this.applyFilters();
  }
  render() {
    if (this.isLoading) {
      return html`<div class="loading">Loading...</div>`;
    }
    if (this.error) {
      return html`<div>Error: ${this.error.message}</div>`;
    }
    return html`
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
          ${this.filteredCars.map(car => html`
            <featured-car-card .car="${car}"></featured-car-card>
          `)}
        </div>
        ${this.filteredCars.length === 0 ? html`<p class="no-results">No cars match the current filters.</p>` : ''}
      </section>
      </section>
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

    section {
      display: block;
      margin: 0 auto;
      max-width: var(--max-width);
      padding: 6rem 1rem; 
    }
    @media (min-width: 768px) {
      section, .loading { 
        padding-left: 2rem;
        padding-right: 2rem;
      }
    }
    @media (min-width: 1024px) {
      section, .loading { 
        padding-left: 3rem;
        padding-right: 3rem;
      }
    }
    @media (min-width: 1280px) {
      section, .loading { 
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
  `];
}
