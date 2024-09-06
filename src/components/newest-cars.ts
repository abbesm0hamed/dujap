import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import './newest-cars/newest-cars-carousel'

@customElement('newest-cars')
export class NewestCars extends LitElement {
  render() {
    return html`
      <section id="new-cars">
        <h1><span>Newest</span><span>cars</span></h1>
        <newest-cars-carousel></newest-cars-carousel>
      </section>
    `
  }

  static styles = css`
    :host {
      display: block;
      background-color: var(--brand-color-2);
      border-top: 1px solid var(--light-color-op);
      border-bottom: 1px solid var(--light-color-op);
      width: 100%;
    }

    section {
      display: block;
      margin: 4rem auto;
      max-width: var(--max-width);
      padding: 0 1rem 0 1rem; 
    }

    h1 {
      display: flex;
      justify-content: start;
      align-items: center;
      font-size: 2rem;
      padding: 0 0 4rem 0;
      margin: 0 0;
      gap: 0.8rem;
    }

    h1 span:first-child {
      color: var(--text-color-1);
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
  `
}

declare global {
  interface HTMLElementTagNameMap {
    'newest-cars': NewestCars;
  }
}
