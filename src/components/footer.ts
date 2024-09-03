import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('app-footer')
export class Footer extends LitElement {
  static styles = css`
    :host {
      display: block;
      background-color: #333;
      color: white;
      padding: 1rem;
      text-align: center;
      width: 100%;
    }
  `;

  render() {
    return html`
      <footer>
        <p>© 2024 My Website</p>
      </footer>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'app-footer': Footer;
  }
}
