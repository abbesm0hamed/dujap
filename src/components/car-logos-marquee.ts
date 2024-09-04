import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('car-logo-marquee')
export class CarLogoMarquee extends LitElement {
  render() {
    return html`
      <div class="marquee-container">
        <div class="marquee">
          ${this.renderLogos()}
          ${this.renderLogos()}
        </div>
      </div>
    `;
  }

  renderLogos() {
    return html`
      <img src="/icons/cars-logos/toyota.png" alt="Toyota" class="logo" />
      <img src="/icons/cars-logos/honda.png" alt="Honda" class="logo" />
      <img src="/icons/cars-logos/mazda.png" alt="Nissan" class="logo" />
      <img src="/icons/cars-logos/suzuki.png" alt="Mazda" class="logo" />
      <img src="/icons/cars-logos/isuzu.png" alt="Mazda" class="logo" />
      <img src="/icons/cars-logos/nissan.png" alt="Subaru" class="logo" />
      <img src="/icons/cars-logos/kia.webp" alt="Suzuki" class="logo" />
      <img src="/icons/cars-logos/lexus.png" alt="Suzuki" class="logo" />
      <img src="/icons/cars-logos/mitsubishi.png" alt="Suzuki" class="logo" />
    `;
  }

  static styles = css`
    :host {
      display: block;
      width: 100%;
      overflow: hidden;
      padding: 12rem 0;
      margin: 0 auto;
      max-width: var(--max-width);
    }

    .marquee-container {
      display: flex;
      align-items: center;
      overflow: hidden;
      width: 100%;
      height: 100%;
    }

    .marquee {
      display: flex;
      align-items: center;
      white-space: nowrap;
      animation: scroll 10s linear infinite;
    }

    @keyframes scroll {
      0% {
        transform: translateX(0);
      }
      100% {
        transform: translateX(-50%);
      }
    }

    .logo {
      height: 50px;
      margin: 0 1rem;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'car-logo-marquee': CarLogoMarquee;
  }
}
