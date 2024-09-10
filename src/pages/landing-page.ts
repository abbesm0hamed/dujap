import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import '../components/navbar'
import '../components/footer'
import '../components/hero'
import '../components/services'
import '../components/newest-cars'
import '../components/featured-cars'
import '../components/car-logos-marquee'

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('landing-page')
export class LandingPage extends LitElement {
  /**
   * Copy for the read the docs hint.
   */
  @property()
  docsHint = 'Click on the Vite and Lit logos to learn more'

  /**
   * The number of times the button has been clicked.
   */
  @property({ type: Number })
  count = 0

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('navigate-to-section', this.handleNavigation);
  }

  disconnectedCallback() {
    this.removeEventListener('navigate-to-section', this.handleNavigation);
    super.disconnectedCallback();
  }

  private handleNavigation(event: CustomEvent) {
    const sectionId = event.detail.sectionId;
    const section = this.shadowRoot?.getElementById(sectionId) || document.getElementById(sectionId);

    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    } else {
      console.error(`Section with ID ${sectionId} not found!`);
    }
  }
  render() {
    return html`
      <app-navbar id="top"></app-navbar>
      <div class="layout">
        <main>
          <landing-hero></landing-hero>
          <brand-services id="services"></brand-services>
          <newest-cars id="new-cars"></newest-cars>
          <featured-cars id="featured-cars"></featured-cars>
          <car-logo-marquee
            id="brands"
          ></car-logo-marquee>
        </main>
        <app-footer id="contact"></app-footer>
      </div>
    `
  }

  static styles = css`
    :host {
      color: white;
      width: 100%;
      max-width: 100vw;
      margin: auto;
    }
    .layout {
      min-height: 100vh;
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      scroll-behavior: smooth;
    }
    .button {
      background-color: orange;
    }
  `;

}

declare global {
  interface HTMLElementTagNameMap {
    'landing-page': LandingPage
  }
}
