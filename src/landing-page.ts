import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import litLogo from './assets/lit.svg'
import viteLogo from '/vite.svg'
import './components/navbar'
import './components/footer'

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
    <div class="layout">
      <app-navbar></app-navbar>
      <main>
        <a href="https://vitejs.dev" target="_blank">
          <img src=${viteLogo} class="logo" alt="Vite logo" />
        </a>
        <a href="https://lit.dev" target="_blank">
          <img src=${litLogo} class="logo lit" alt="Lit logo" />
        </a>
        <div class="button">
          <button @click=${this._onClick} part="button">
            count is ${this.count}
          </button>
        </div>
        <p class="read-the-docs">${this.docsHint}</p>
        <slot></slot>
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
      display: flex;
      background-color: #333;
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
