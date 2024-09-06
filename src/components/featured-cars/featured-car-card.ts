import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement('featured-car-card')
export class FeaturedCarCard extends LitElement {
  @property({ type: String })
  title = 'Title';
  @property({ type: String })
  brand = 'Brand';
  @property({ type: String })
  model = 'Model';
  @property({ type: String })
  price = 'AED';
  @property({ type: String })
  gear = 'Automatic';
  @property({ type: String })
  imageUrl = '/images/car-eye.jpg';
  @property({ type: String })
  description = 'Description';

  render() {
    return html`
      <figure>
        <figcaption>
          <h2>${this.brand}</h2>
          <p>${this.description}</p>
          <p>Price: ${this.price}</p>
        </figcaption>
        <article>
          <p>Model: ${this.model}</p>
          <p>Gear: ${this.gear}</p>
          <img
            src=${this.imageUrl[0].signedUrl}
            alt="car"
          />
        </article>
      </figure>
    `;
  }

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
      grid-template-rows: 0.2fr 0.2fr auto;
      gap: 1rem;
      border-radius: var(--border-radius);
      border: 1px solid var(--text-color-2);
      overflow: hidden;
      padding: 1.5rem;
      box-shadow: var(--text-color-2)
    }

    article h2,
    article p {
      display: flex;
      justify-content: start;
      align-items: start;
      text-align: center;
      margin: 0;
    }

    img {
      object-fit: cover;
      width: 100%;
      height: 450px;
      margin: 0;
      border-bottom-left-radius: var(--border-radius);
      border-bottom-right-radius: var(--border-radius);
    }
    
    figure {
      margin: 0;
      padding: 0;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'featured-car-card': FeaturedCarCard;
  }
}
