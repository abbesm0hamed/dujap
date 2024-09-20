import 'urlpattern-polyfill';
import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { Router } from '@lit-labs/router';
import './landing-page';
import './all-cars';

@customElement('app-root')
export class AppRoot extends LitElement {
  @state()
  currentPath = '/';

  private router = new Router(this, [
    { path: '/', render: () => html`<landing-page></landing-page>` },
    { path: '/all-cars', render: () => html`<all-cars></all-cars>` },
  ]);

  constructor() {
    super();
    if (typeof window !== 'undefined') {
      this.currentPath = window.location.pathname;
    }
  }

  connectedCallback() {
    super.connectedCallback();
    if (typeof window !== 'undefined') {
      window.addEventListener('popstate', this.handlePopState);
      this.router.goto(this.currentPath);
    }
  }

  disconnectedCallback() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('popstate', this.handlePopState);
    }
    super.disconnectedCallback();
  }

  private handlePopState = () => {
    this.currentPath = window.location.pathname;
    this.router.goto(this.currentPath);
  }

  render() {
    return html`
      <main>
        ${this.router.outlet()}
      </main>
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
