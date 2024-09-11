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
      border: 1px solid rgba(255,255,255, 0.2);
      overflow: hidden;
background: rgb(33,38,42);
background: linear-gradient(180deg, rgba(33,38,42,1) 0%, rgba(18,20,23,1) 35%, rgba(11,13,15,1) 100%);
    }
    article:hover {
      box-shadow: 0 0 30px -10px rgb(115 105 105 / 40%);
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
    article h2 {
      padding: 0 1rem ;
    }

    img {
      object-fit: cover;
      width: 100%;
      height: 300px;
      margin-bottom: 1rem;
      border-bottom:1px solid rgba(255,255,255, 0.2);
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'service-card': ServiceCard;
  }
}
