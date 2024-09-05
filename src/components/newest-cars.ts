import { css, CSSResultGroup, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import './newest-cars/newest-cars-carousel'

@customElement('newest-cars')
export class NewestCars extends LitElement {
  render() {
    return html`
      <section>
        <h1>Newest Cars</h1>
        <newest-cars-carousel></newest-cars-carousel>
      </section>
    `
  }

  static styles = css`
    :host{
      display: block;
      background-color: var(--brand-color-2);
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
      justify-content: center;
      align-items:center;
      color: var(--light-color);
      font-size: 2rem;
      padding: 2rem 0;
    }
  `
}

declare global {
  interface HTMLElementTagNameMap {
    'newest-cars': NewestCars;
  }
}
