import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import '../featured-cars/featured-car-card';
import { createQuery, fetchData } from "../../utils/fetcher";
import { CarDetails } from "../../types/car";

@customElement('all-cars')
export class AllCars extends LitElement {
  private cars: CarDetails[] = [];
  private isLoading = true;
  private error: Error | null = null;
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

  render() {
    if (this.isLoading) {
      return html`<div>Loading...</div>`;
    }
    if (this.error) {
      return html`<div>Error: ${this.error.message}</div>`;
    }
    return html`
      <section>
        <h1>All Cars</h1>
        <div class="cars-container">
          ${this.cars.map(car => html`
            <featured-car-card .car="${car}"></featured-car-card>
          `)}
        </div>
      </section>
    `;
  }

  static styles = css`
    :host {
      display: block;
      padding: 1rem;
    }
    .cars-container {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1rem;
    }
  `;
}
