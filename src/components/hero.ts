import { LitElement, css, html } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('landing-hero')
export class Hero extends LitElement {

  render() {
    return html`
      <section class="hero-section">
        <figure class="hero-figure">
          <img
            src="/images/hero.webp"
            alt="A luxurious car on display"
            class="hero-image"
          />
          <figcaption class="hero-caption">
            <h1>Get Your Desired Car at a Reasonable Price</h1>
            <p>Welcome to our Dubai dealership, where we offer a wide range of high-quality Japanese cars to meet your needs and preferences. Explore our collection to find the perfect vehicle for you.</p>
          </figcaption>
        </figure>
      </section>
    `;
  }

  static styles = css`
    :host {
      display: block;
    }
    .hero-section {
      position: relative;
      width: 100%;
      height: 100vh;
      overflow: hidden;
    }
    .hero-figure {
      margin: 0;
      width: 100%;
      height: 100%;
      position: relative;
    }
    .hero-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .hero-caption {
      position: absolute;
      top: 55%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: white;
      text-align: center;
      border-radius: 8px;
    }
    .hero-caption h1 {
      margin: 0;
      font-size: 3.5rem;
      font-weight: bold;
    }
    .hero-caption p {
      margin: 1rem 0 0;
      font-size: 1.25rem;
    }
    @media (min-width: 1024px){
      .hero-caption {
        padding: 1rem 4.8rem;
      }
    }
    @media (max-width: 1024px) {
      .hero-caption {
        width: 80%;
      }
      .hero-caption h1 {
        font-size: 2.5rem;
      }
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'landing-hero': Hero;
  }
}
