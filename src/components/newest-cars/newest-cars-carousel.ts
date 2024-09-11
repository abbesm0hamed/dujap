import { css, html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { Task } from '@lit/task';
import { fetchData } from '../../utils/fetcher';
import { CarDetails } from '../../types/car';

@customElement('newest-cars-carousel')
export class NewestCarsCarousel extends LitElement {
  @state() private displayedCars: CarDetails[] = [];
  @state() private currentSlide = 0;
  @state() private dialogVisible = false;
  @state() private selectedCar: CarDetails | null = null;

  private carsTask = new Task(
    this,
    async () => {
      const cars = await fetchData<CarDetails[]>('/cars');
      if (Array.isArray(cars) && cars.length > 0) {
        this.selectRandomCars(cars);
      } else {
        console.warn('No cars data received or data is not an array');
        this.displayedCars = [];
      }
      return cars;
    }
  );

  connectedCallback() {
    super.connectedCallback();
    this.carsTask.run();
  }

  selectRandomCars(cars: CarDetails[]) {
    const shuffled = [...cars].sort(() => 0.5 - Math.random());
    this.displayedCars = shuffled.slice(0, 3);
    this.requestUpdate();
  }

  render() {
    return html`
    ${this.carsTask.render({
      pending: () => html`<section>Loading...</section>`,
      complete: () => this.renderCarousel(),
      error: (error) => html`<section>Error: ${error.message}</section>`
    })}
  `;
  }

  renderCarousel() {
    if (!Array.isArray(this.displayedCars) || this.displayedCars.length === 0) {
      return html`<section>No cars available to display.</section>`;
    }
    return html`
    <div
      class="carousel"
      style="transform: translateX(-${this.currentSlide * 100}%);"
    >
      ${this.displayedCars.map((car) => {
      const imageUrl = car.imageUrl?.[0]?.signedUrl || '/images/random.jpeg';
      return html`
          <figure
            class="carousel-item"
            @click="${() => this.showDialog(car)}"
          >
            <img
              src="${imageUrl}" 
              alt="${car.model}"
            />
            <figcaption>
              <div>
                <h2>${car.brand} | ${car.model} | ${car.color}</h2>
                <p>${car.description}</p>
                <span class="price">
                  <span>Price:</span> 
                  <h3>${car.price}</h3>
                </span>
              </div>

              <div>
                <p>${car.km}</p>
                <p><span>Engine:</span> ${car.engine}</p>
                <p><span>Features:</span> ${car.features}</p>
                <p><span>Assurance:</span> ${car.assurance}</p>
                <p><span>Extras:</span> ${car.extras}</p>
              </div>
            </figcaption>
          </figure>
        `;
    })}
    </div>

    ${this.renderDialog()}

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

  renderDialog() {
    if (!this.dialogVisible || !this.selectedCar) return '';
    return html`
      <div class="dialog">
        <div class="dialog-content">
          <img src=${this.selectedCar.imageUrl?.[0]?.signedUrl || ''} alt="${this.selectedCar.model}" />
          <h2>${this.selectedCar.brand} ${this.selectedCar.model}</h2>
          <p>${this.selectedCar.description}</p>
          <button @click="${this.closeDialog}">Close</button>
        </div>
      </div>
    `;
  }

  showDialog(car: CarDetails) {
    this.selectedCar = car;
    this.dialogVisible = true;
  }

  closeDialog() {
    this.dialogVisible = false;
  }

  prevSlide() {
    this.currentSlide = (this.currentSlide === 0) ? this.displayedCars.length - 1 : this.currentSlide - 1;
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide === this.displayedCars.length - 1) ? 0 : this.currentSlide + 1;
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
    }

    .carousel-item {
      min-width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 0;
      box-sizing: border-box;
    }

    .carousel-item img {
      width: calc(100% - 2px);
      height: 450px;
      max-height: 400px;
      object-fit: cover;
      border-radius: var(--border-radius);
      border: 1px solid var(--brand-color-1);
    }

    figcaption {
      width: 100%;
      height: 100%;
      padding: 1rem 0;
      text-align: start;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    
    figcaption h2 {
      margin: 0;
      font-size: 1.5rem;
      color: var(--text-color);
    }

    figcaption p {
      margin-top: 0.5rem;
      font-size: 1rem;
      color: var(--text-color);
    }

    figcaption div p span {
      color: var(--brand-color-3);
    }

    figcaption div:nth-child(2) {
      border-top: 1px solid var(--brand-color-1);
      padding-top: 0.5rem;
    }

    .price {
      display: flex;
      flex-direction: row;
      gap: 0.8rem;
      align-items: center;
    }
    .price > span {
      color: var(--brand-color-3)
    }
    .price h3 {
      padding: 0;
      margin: 0;
    }

    .dialog {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background-color: rgba(0, 0, 0, 0.8);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 100;
    }

    .dialog-content {
      background-color: var(--brand-color-2);
      border: 1px solid var(--brand-color-1);
      padding: 1rem;
      border-radius: var(--border-radius);
      max-width: 90%;
      width: 500px;
      text-align: center;
      box-sizing: border-box;
    }

    .dialog-content img {
      width: 100%;
      height: auto;
      max-height: 300px;
      object-fit: cover;
      border-radius: var(--border-radius);
    }

    .dialog-content h2 {
      margin-top: 1rem;
      color: var(--brand-color-5);
    }

    .dialog-content button {
      margin-top: 1rem;
      padding: 0.5rem 1rem;
      background-color: var(--brand-color-5);
      border: none;
      color: white;
      border-radius: 5px;
      cursor: pointer;
    }

    .dialog-content button:hover {
      background-color: var(--brand-color-2);
    }

    .nav-arrows {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 4rem;
    }

    .nav-arrows button {
      display: flex;
      justify-content: center;
      align-items: center;
      border: none;
      background-color: var(--dark-bg);
      padding: 0.5rem 0.5rem;
      margin: 0 0.5rem;
      border: 1px solid var(--light-color-op);
      border-radius: 5px;
      cursor: pointer;
      font-size: 1.2rem;
    }

    .nav-arrows button:hover {
      background-color: var(--brand-color-5);
    }

    @media (min-width: 768px) {
      .carousel-item {
        flex-direction: row;
        align-items: flex-start;
      }

      .carousel-item img {
        width: 50%;
        max-height: 500px;
      }

      figcaption {
        width: 50%;
        padding: 0 2rem;
      }
    }

    @media (min-width: 1024px) {
      .carousel-item img {
        max-height: 600px;
      }
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'newest-cars-carousel': NewestCarsCarousel;
  }
}
