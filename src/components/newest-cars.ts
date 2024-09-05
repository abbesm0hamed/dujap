import { css, CSSResultGroup, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import './newest-cars/newest-cars-carousel'

@customElement('newest-cars')
export class NewestCars extends LitElement {
  render() {
    return html`
      <section>
        <h1><span>Newest</span><span>Cars</span></h1>
        <newest-cars-carousel></newest-cars-carousel>
      </section>
    `
  }

  static styles = css`
    :host{
      display: block;
      background-color: var(--brand-color-2);
      border-top: 1px solid var(--light-color-op);
      border-bottom: 1px solid var(--light-color-op);
      width: 100%;
    }
    section {
      display: block;
      width: 100%;
      max-width: var(--max-width);
      margin: 0rem auto;
      padding: 1rem 0 4rem 0;
    }
    section h1 {
      display:flex;
      justify-content: start;
      align-items:center;
      font-size: 2rem;
      padding: 4rem 0;
      gap: 0.8rem;
    }
    section h1 span:first-child {
      color: var(--text-color-1);
    }
  `
}

declare global {
  interface HTMLElementTagNameMap {
    'newest-cars': NewestCars;
  }
}
