import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement('service-card')
export class ServiceCard extends LitElement {
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
      padding: 6rem 0 4rem 0;
      margin: 0 auto;
      max-width: var(--max-width);
    }

    article {
      display: grid;
      height: 100%;
      grid-template-rows: auto 0.6fr 1fr;
      gap: 1rem;
      border-radius: var(--border-radius);
      border: 1px solid #fff;
      overflow: hidden;
    }

    article h1,
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
      height: 350px;
    }
  `;

  render() {
    return html`
      <article>
        <img
          src=${this.imageUrl}
          alt="car"
        />
        <h1>${this.title}</h1>
        <p>${this.description}</p>
      </article>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'service-card': ServiceCard;
  }
}
