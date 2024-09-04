import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import litLogo from './assets/lit.svg'
import viteLogo from '/vite.svg'
import './components/navbar'
import './components/footer'
import './components/hero'
import './components/car-logos-marquee'
import './components/services'

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

  render() {
    return html`
    <app-navbar></app-navbar>
    <div class="layout">
      <main>
        <landing-hero></landing-hero>
        <brand-services></brand-services>
        <car-logo-marquee></car-logo-marquee>
      </main>
      <app-footer></app-footer>
    </div>
    `
  }

  private _onClick() {
    this.count++
  }

  static styles = css`
    :host {
      color: white;
      width: 100%;
      margin: auto;
    }
    .layout {
      min-height: 100vh;
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
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
