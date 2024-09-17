import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('mobile-nav')
export class MobileNav extends LitElement {
  @property({ type: Boolean }) open = false;

  render() {
    return html`
      <div class="overlay ${this.open ? 'open' : ''}" @click=${this._close}></div>
      <nav class="mobile-nav ${this.open ? 'open' : ''}">
        <button class="close-button" @click=${this._close}>×</button>
        <slot></slot>
      </nav>
    `;
  }

  private _close() {
    this.open = false;
    this.dispatchEvent(new CustomEvent('close'));
  }

  static styles = css`
    :host {
      display: contents;
    }
    .overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.6);
      -webkit-backdrop-filter: blur(50px);
      backdrop-filter: blur(10px);
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.3s, visibility 0.3s;
      z-index: 998;
    }
    .overlay.open {
      opacity: 1;
      visibility: visible;
    }
    .mobile-nav {
      position: fixed;
      overflow: clip;
      top: 0;
      left: -300px;
      width: 300px;
      height: 100%;
      background-color: var(--brand-color-2);
      border-right: 1px solid var(--border-color-1);
      transition: left 0.3s;
      z-index: 999;
      padding: 1rem;
      box-sizing: border-box;
    } 
    .mobile-nav.open {
      left: 0;
    }
    .close-button {
      position: absolute;
      top: 10px;
      right: 10px;
      background: none;
      border: none;
      font-size: 1.5rem;
      color: white;
      cursor: pointer;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'mobile-nav': MobileNav;
  }
}
