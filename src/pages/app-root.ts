import 'urlpattern-polyfill';
import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { Router } from '@lit-labs/router';

import '../components/navbar';
import '../components/footer';
import './landing-page';
import './all-cars';

@customElement('app-root')
export class AppRoot extends LitElement {
  @state()
  private currentPath = '/';

  private router = new Router(this, [
    { path: '/', render: () => html`<landing-page></landing-page>` },
    { path: '/all-cars', render: () => html`<all-cars></all-cars>` },
  ]);

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('navigate', this.handleNavigation);
  }

  disconnectedCallback() {
    this.removeEventListener('navigate', this.handleNavigation);
    super.disconnectedCallback();
  }

  private handleNavigation = (event: CustomEvent) => {
    const path = event.detail.path;
    this.currentPath = path;

    if (path.includes('#')) {
      const [basePath, sectionId] = path.split('#');
      if (basePath === '/' || basePath === '') {
        this.scrollToSection(sectionId);
      } else {
        window.history.pushState(null, '', path);
        this.router.goto(basePath);
        // After navigation, try to scroll to the section
        setTimeout(() => this.scrollToSection(sectionId), 100);
      }
    } else {
      window.history.pushState(null, '', path);
      this.router.goto(path);
    }
  }

  private scrollToSection(sectionId: string) {
    const section = this.shadowRoot?.querySelector(`landing-page`)?.shadowRoot?.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    } else {
      console.error(`Section with ID ${sectionId} not found!`);
    }
  }

  render() {
    return html`
      ${this.router.outlet()}
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
