import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('car-logo-marquee')
export class CarLogoMarquee extends LitElement {
  render() {
    return html`
      <section>
        <div class="marquee-container">
          <div class="marquee">
            ${this.renderLogos()}
          </div>
          <div class="marquee" aria-hidden="true">
            ${this.renderLogos()}
          </div>
        </div>
      </section>
    `;
  }

  renderLogos() {
    return html`
      <img src="/icons/cars-logos/toyota.png" alt="Toyota" />
      <img src="/icons/cars-logos/honda.png" alt="Honda" />
      <img src="/icons/cars-logos/mazda.png" alt="Mazda" />
      <img src="/icons/cars-logos/isuzu.png" alt="Isuzu" />
      <img src="/icons/cars-logos/nissan.png" alt="Nissan" />
      <img src="/icons/cars-logos/lexus.png" alt="Lexus" />
      <img src="/icons/cars-logos/scion.png" alt="scion" />
      <img src="/icons/cars-logos/acura.png" alt="acura" />
      <img src="/icons/cars-logos/mitsubishi.png" alt="Mitsubishi" />
    `;
  }

  static styles = css`
    :host {
      display: block;
      background: rgb(20,27,36);
      background: linear-gradient(180deg, rgba(20,27,36,1) 0%, rgba(13,15,18,1) 35%, rgba(0,0,0,1) 100%);
      padding: 2rem 0 6rem 0
    }

    section {
      display: block;
      width: 100%;
      overflow: hidden;
      padding: 1rem 0;
      border: 1px solid var(--border-color-1);
      background-color: var(--brand-color-7);
      box-shadow: 0 0 80px rgb(43 91 62 / 30%);

      --size: 5rem;
      --gap: calc(var(--size) / 7);
      --duration: 30s;
      --scroll-start: 0;
      --scroll-end: calc(-100% - var(--gap));
    }

    @media (min-width: 768px) {
      section{
        margin: 8rem 0;
      }
    }
    @media (min-width: 1024px) {
      section{
        margin: 10rem 0;
      }
    }

    .marquee-container {
      display: flex;
      overflow: hidden;
      user-select: none;
      gap: var(--gap);
    }

    .marquee {
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: space-around;
      gap: var(--gap);
      min-width: 100%;
      animation: scroll-x var(--duration) linear infinite;
    }

    .marquee img {
      display: grid;
      place-items: center;
      width: var(--size);
      height: 4rem;
      fill: var(--color-text);
      background: var(--color-bg-accent);
      aspect-ratio: 16/9;
      padding: calc(var(--size) / 10);
      border-radius: 0.5rem;
    }

    @keyframes scroll-x {
      from {
        transform: translateX(var(--scroll-start));
      }
      to {
        transform: translateX(var(--scroll-end));
      }
    }

  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'car-logo-marquee': CarLogoMarquee;
  }
}
