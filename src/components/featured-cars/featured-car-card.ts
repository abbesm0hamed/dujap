import { css, html, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { CarDetails } from "../../types/car";
import { sharedStyles } from "../../styles/shared-styles";

@customElement('featured-car-card')
export class FeaturedCarCard extends LitElement {
  @property({ type: Object })
  car: CarDetails = {
    engine: 'Engine',
    assurance: 'Assurance',
    brand: 'Brand',
    model: 'Model',
    price: 'AED',
    features: 'Automatic',
    extras: 'Extras',
    imageUrl: [{ signedUrl: '/images/car-eye.jpg' }],
    description: 'Description',
    color: 'white',
  };

  @state()
  dialogVisible = false;

  render() {
    return html`
      <figure
        @click="${this.toggleDialog}"
      >
        <figcaption
          class="featured-card-gradient-bg"
        >
          <div class="title-container">
            <h2>${this.car.brand} | ${this.car.model} | ${this.car.color}</h2>
          </div>
          <div class="price-container">
            <span>Price:</span> 
            <h3>${this.car.price} AED</h3>
          </div>
        </figcaption>
        <article class="featured-card-gradient-bg">
          <div class="content">
            <p>${this.car.description}</p>
            <p><span>kilometerage:</span> ${this.car.km}</p>
          </div>
          <div class="image-container">
            <img
              src=${this.car?.imageUrl?.[0]?.signedUrl}
              alt="car"
            />
          </div>
        </article>
      </figure>

      ${this.dialogVisible ? html`
        <div class="dialog-overlay" @click="${this.toggleDialog}">
          <div class="dialog-content" @click="${(e: Event) => e.stopPropagation()}">
            <h2>${this.car.brand} | ${this.car.model} | ${this.car.color}</h2>
            <p>${this.car.description}</p>
            <br/>
            <p><span>Engine:</span> ${this.car.engine}</p>
            <p><span>Features:</span> ${this.car.features}</p>
            <p><span>Assurance:</span> ${this.car.assurance}</p>
            <p><span>Extras:</span> ${this.car.extras}</p>
            <button @click="${this.toggleDialog}">Close</button>
          </div>
        </div>
      ` : ''}
    `;
  }

  toggleDialog() {
    this.dialogVisible = !this.dialogVisible;
  }

  static styles = [
    sharedStyles,
    css`
    :host {
      display: block;
      width: 100%;
      overflow: hidden;
      padding: 0.7rem 0;
      margin: 0 auto;
      max-width: var(--max-width);
    }

    figure {
      display: flex;
      flex-direction: column;
      height: 100%;
      margin: 0;
      padding: 0;
      cursor: pointer;
      transition: transform 0.3s ease;
      overflow: hidden;
    }

    figcaption {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 1rem;
      border-top-left-radius: var(--border-radius);
      border-top-right-radius: var(--border-radius);
      border: 1px solid var(--border-color-1);
      border-bottom: none;
      height: 120px;
    }

    .title-container {
      height: 60px; /* Set a fixed height for the title */
      overflow: hidden;
    }

    .title-container h2 {
      margin: 0;
      font-size: 1.2rem;
      line-height: 1.2;
    }

    .price-container {
      display: flex;
      align-items: center;
      gap: 0.8rem;
    }

    .price-container span {
      color: var(--brand-color-3);
    }

    .price-container h3 {
      margin: 0;
      font-size: 1.5rem;
    }

    article {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      border-bottom-left-radius: var(--border-radius);
      border-bottom-right-radius: var(--border-radius);
      border: 1px solid var(--border-color-1);
      overflow: hidden;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      transition: box-shadow 0.3s ease;
    }

    .content {
      padding: 1.5rem;
      flex-grow: 1;
      height: 80px; /* Set a fixed height for the content */
      overflow: hidden;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .image-container {
      height: 450px;
      overflow: hidden;
    }

    figure:hover article {
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
    }

    article p {
      margin: 0;
      line-height: 1.4;
    }

    img {
      object-fit: cover;
      width: 100%;
      height: 100%;
      margin: 0;
    }

    .dialog-content p span {
      color: var(--brand-color-3);
    }

    .price {
      display: flex;
      flex-direction: row;
      gap: 0.8rem;
      align-items: center;
      padding-bottom: 0.7rem;
    }
    .price > span {
      color: var(--brand-color-3)
    }
    .price h3 {
      padding: 0;
      margin: 0;
    }

    .dialog-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
      opacity: 0;
      animation: fadeIn 0.3s ease forwards;
    }

    .dialog-content {
      background-color: var(--brand-color-2);
      border-radius: var(--border-radius);
      border: 1px solid var(--brand-color-1);
      padding: 2rem;
      margin: 0 1rem;
      max-width: 90%;
      width: 500px;
      max-height: 90vh;
      overflow-y: auto;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      transform: scale(0.9);
      opacity: 0;
      animation: zoomIn 0.3s ease forwards;
    }

    @media (min-width: 768px) {
      .dialog-content {
        padding-left: 2rem;
        padding-right: 2rem;
      }
    }

    @media (min-width: 1024px) {
      .dialog-content {
        padding-left: 3rem;
        padding-right: 3rem;
      }
    }

    @media (min-width: 1280px) {
      .dialog-content {
        padding-left: 4rem;
        padding-right: 4rem;
      }
    }

    .dialog-content img {
      width: 100%;
      height: auto;
      max-height: 300px;
      object-fit: cover;
      border-radius: var(--border-radius);
      margin-bottom: 1rem;
    }

    .dialog-content button {
      margin-top: 1rem;
      padding: 0.5rem 1rem;
      background-color: var(--dark-bg);
      border: none;
      color: white;
      border-radius: 5px;
      cursor: pointer;
      border: 1px solid var(--light-color-op);
    }

    .dialog-content button:hover {
      background-color: var(--brand-color-5);
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @keyframes zoomIn {
      from { 
        transform: scale(0.9);
        opacity: 0;
      }
      to { 
        transform: scale(1);
        opacity: 1;
      }
    }
  `];
}

declare global {
  interface HTMLElementTagNameMap {
    'featured-car-card': FeaturedCarCard;
  }
}
