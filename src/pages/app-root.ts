import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { Router } from '@lit-labs/router';

import '../components/navbar';
import '../components/footer';
import './landing-page';
import './all-cars';

@customElement('app-root')
export class AppRoot extends LitElement {
  private router = new Router(this, [
    { path: '/', render: () => html`<landing-page></landing-page>` },
    { path: '/all-cars', render: () => html`<all-cars></all-cars>` },
  ]);

  render() {
    return html`
      <app-navbar id="top"></app-navbar>
      ${this.router.outlet()}
      <app-footer id="contact"></app-footer>
    `;
  }

  static styles = css`
    :host {
      display: block;
      min-height: 100vh;
      color: white;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'app-root': AppRoot;
  }
}
