import { LitElement, css, html } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('app-logo')
export class Logo extends LitElement {
  render() {
    return html`
      <div class="logo-container">
        <img src="logo.png" alt="DuJap Cars logo" width="48" height="48" />
        <span class="logo-text">DuJap Cars</span>
      </div>
    `;
  }

  static styles = css`
    .logo-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: end;
    }
    .logo-container img {
      width: 48px;
      height: 48px;
      object-fit: contain;
    }
    .logo-text {
      font-family: Noto Sans; serif;
      font-size: 0.9rem;
      font-weight: 600;
      color: var(--brand-color-2);
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'app-logo': Logo;
  }
}
