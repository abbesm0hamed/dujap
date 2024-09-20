import 'urlpattern-polyfill';
import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { Router } from '@lit-labs/router';
import '../components/navbar';
import '../components/footer';
import './landing-page.ts';
import './all-cars.ts';
import './not-found.ts';

@customElement('app-root')
export class AppRoot extends LitElement {
  @state()
  private currentPath = '/';

  private router = new Router(this, [
    { path: '/', render: () => html`<landing-page></landing-page>` },
    { path: '/all-cars', render: () => html`<all-cars></all-cars>` },
    { path: '(.*)', render: () => html`<not-found></not-found>` },
  ]);

  constructor() {
    super();
    if (typeof window !== 'undefined') {
      this.currentPath = window.location.pathname;
    }
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('navigate', this.handleNavigation);
    if (typeof window !== 'undefined') {
      window.addEventListener('popstate', this.handlePopState);
      this.router.goto(this.currentPath);
    }
  }

  disconnectedCallback() {
    this.removeEventListener('navigate', this.handleNavigation);
    if (typeof window !== 'undefined') {
      window.removeEventListener('popstate', this.handlePopState);
    }
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

  private handlePopState = () => {
    this.currentPath = window.location.pathname;
    this.router.goto(this.currentPath);
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
      <main>
        <navbar-component></navbar-component>
        ${this.router.outlet()}
        <footer-component></footer-component>
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

declare global {
  interface HTMLElementTagNameMap {
    'app-root': AppRoot;
  }
}
