import { css, html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { map } from 'lit/directives/map.js';
import { CarDetails } from '../../types/car';

@customElement('newest-cars-carousel')
export class NewestCarsCarousel extends LitElement {
  static get properties() {
    return {
      /**
       * The items.
       * @type {Array}
       */
      cars: { type: Array },
    };
  }
  @state()
  currentSlide = 0;

  @state()
  dialogVisible = false;

  @state()
  selectedCar = { imageUrl: '', title: '', description: '' };


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
      this.cars = data as CarDetails;
      this.selectRandomCars();
    } catch (error) {
      console.error('Error fetching car data:', error);
    }
  }

  selectRandomCars() {
    const shuffled = [...this.cars].sort(() => 0.5 - Math.random());
    this.displayedCars = shuffled.slice(0, 3);
  }

  render() {
    return html`
      <div
        class="carousel"
        style="transform: translateX(-${this.currentSlide * 100}%);"
      >
        ${map(this.displayedCars, (car) => html`
          <figure
            class="carousel-item"
            @cli ck="${() => this.showDialog(car)}" // intended typo to disactivate the dialog
          >
            <img
              src=${car.imageUrl[0].signedUrl}
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
        `)}
      </div>

      ${this.dialogVisible ? html`
        <div class="dialog">
          <div class="dialog-content">
            <img src=${this.selectedCar.imageUrl} alt="${this.selectedCar.title}" />
            <h2>${this.selectedCar.title}</h2>
            <p>${this.selectedCar.description}</p>
            <button @click="${this.closeDialog}">Close</button>
          </div>
        </div>
      ` : ''}

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

  showDialog(car: { imageUrl: string; title: string; description: string }) {
    this.selectedCar = car;
    this.dialogVisible = true;
  }

  closeDialog() {
    this.dialogVisible = false;
  }

  prevSlide() {
    this.currentSlide = (this.currentSlide === 0) ? this.cars.length - 1 : this.currentSlide - 1;
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide === this.cars.length - 1) ? 0 : this.currentSlide + 1;
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
