import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement('featured-car-card')
export class FeaturedCarCard extends LitElement {
  @property({ type: String })
  title = 'Title';

  @property({ type: String })
  description = 'Description';

  @property({ type: String })
  imageUrl = '/images/car-eye.jpg';

  static styles = css`
    :host {
      display: block;
      width: 100%;
      overflow: hidden;
      padding: 0.7rem 0;
      margin: 0 auto;
      max-width: var(--max-width);
    }

    article {
      display: grid;
      height: 100%;
      grid-template-rows: auto 0.6fr 1fr;
      gap: 1rem;
      border-radius: var(--border-radius);
      border: 1px solid var(--brand-color-6);
      overflow: hidden;
    }

    article h2,
    article p {
      display: flex;
      justify-content: center;
      align-items: start;
      text-align: center;
      margin: 0;
    }

    article p {
      padding: 2rem 0.7rem ;
    }

    img {
      object-fit: cover;
      width: 100%;
      height: 300px;
      margin-bottom: 1rem;
      border-bottom: 1px solid var(--brand-color-6)
    }
  `;

  render() {
    return html`
      <article>
        <img
          src=${this.imageUrl}
          alt="car"
        />
        <h2>${this.title}</h2>
        <p>${this.description}</p>
      </article>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'featured-car-card': FeaturedCarCard;
  }
}
