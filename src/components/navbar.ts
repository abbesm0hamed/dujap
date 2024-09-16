import { LitElement, css, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '@material/web/button/filled-button.js';
import './mobilenav.ts';
import './logo.ts';

@customElement('app-navbar')
export class Navbar extends LitElement {
  @state()
  private mobileMenuOpen = false;

  render() {
    return html`
      <header>
        <a href="/" class="logo-link">
          <app-logo></app-logo>
        </a>
        <button
          class="mobile-menu-button"
          @click=${this.toggleMobileMenu}
          ?hidden=${!this.isMobile && !this.mobileMenuOpen}
        >
          <img
            src="/icons/hamburger.svg"
            alt='menu'
            width="32"
            height="32"
          />
        </button>
        <nav
          class="desktop-nav"
          ?hidden=${this.isMobile && this.mobileMenuOpen}
        >
          <ul>
            ${this.renderNavLinks()}
          </ul>
        </nav>
      </header>
      <aside ?hidden=${!this.isMobile && !this.mobileMenuOpen}>
        <mobile-nav
          .open=${this.mobileMenuOpen && this.isMobile}
          @close=${this.closeMobileMenu}
        >
          <ul>
            ${this.renderNavLinks()}
          </ul>
        </mobile-nav>
      </aside>
    `;
  }

  private renderNavLinks() {
    return html`
      <li>
        <a @click=${() => this.navigateTo('/#hero')} class="nav-link">Home</a>
      </li>
      <li>
        <a @click=${() => this.navigateTo('/#services')} class="nav-link">Services</a>
      </li>
      <li>
        <a @click=${() => this.navigateTo('/#new-cars')} class="nav-link">New Cars</a>
      </li>
      <li>
        <a @click=${() => this.navigateTo('/#featured-cars')} class="nav-link">Featured Cars</a>
      </li>
      <li>
        <a @click=${() => this.navigateTo('/#brands')} class="nav-link">Brands</a>
      </li>
      <li class="contact-button">
        <a @click=${() => this.navigateTo('/#contact')} class="nav-link">Contact</a>
      </li>
    `;
  }

  private navigateTo(path: string) {
    this.dispatchEvent(new CustomEvent('navigate', {
      detail: { path },
      bubbles: true,
      composed: true
    }));
    this.closeMobileMenu();
  }

  private toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  private closeMobileMenu() {
    this.mobileMenuOpen = false;
  }

  private get isMobile() {
    return window.innerWidth <= 1024;
  }

  static styles = css`
    :host {
      display: block;
      position: fixed;
      width: 100%;
      max-width: 100%;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1000;
      background-color: rgba(150, 151, 156, 0.6);
      box-shadow: 0 4px 6px rgba(150, 151, 156, 0.1);
      border-bottom: 1px solid var(--border-color-1);
    }
    
    header {
      display: flex;
      margin: 0 auto;
      max-width: var(--max-width, 1250px) !important;
      padding: 0.5rem 1rem;
      justify-content: space-between;
      align-items: center;
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
    }

    @media (min-width: 768px) {
      header {
        padding-left: 2rem;
        padding-right: 2rem;
      }
    }
    @media (min-width: 1024px) {
      header {
        padding-left: 3rem;
        padding-right: 3rem;
      }
    }
    @media (min-width: 1280px) {
      header {
        padding-left: 4rem;
        padding-right: 4rem;
      }
    }
    nav ul {
      display: flex;
      list-style: none;
      padding: 0;
      margin: 0;
      align-items: center;
    }
    aside ul {
      display: flex;
      flex-direction: column;
      list-style: none;
      padding: 0;
      margin: 0;
      align-items: start;
      justify-content: start;
      gap: 1rem;
      padding: 2rem 0;
    }
    li {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
    }
    li:hover {
      color: var(--light-color);
    }
    a {
      text-decoration: none;
      display: flex;
      height: 100%;
      align-items: center;
      justify-content: center;
    }
    li a:hover {
      color: var(--light-color)
    }
    .contact-button {
      border: 1px solid var(--light-color);
      border-radius: var(--border-radius);
      background-color: transparent;
      transition: all 0.3s ease;
      flex-grow: 1;
      max-width: var(--max-width);
    }
    .contact-button a {
      padding: 0.3rem 0.4rem;
      white-space: nowrap;
    }
    .contact-button:hover {
      cursor: pointer;
      background-color: var(--light-color);
    }
    .contact-button:hover a {
      color: var(--brand-color-5);
    }
    .mobile-menu-button {
      font-size: 1.5rem;
      background: none;
      border: none;
      display: none;
      padding: 0;
      margin: 0;
    }
    .mobile-menu-button:hover {
      cursor: pointer;
    }
    .desktop-nav {
      display: flex;
      flex-grow: 1;
      justify-content: flex-end;
    }
    .nav-link {
      color: white;
      text-decoration: none;
      margin: 0 1rem;
    }
    .nav-link:hover {
      cursor: pointer;
    }
    @media (max-width: 1024px) {
      .mobile-menu-button {
        display: block;
      }
      .desktop-nav {
        display: none;
      }
    }
    .mobile-links {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      padding: 2rem 0rem;
      font-size: 1.4rem;
    }
    
    aside {
      position: absolute;
      top: 100%;
      left: 0;
      width: 100%;
      background-color: var(--brand-color-5);
      overflow: hidden;
      max-height: 0;
      transition: max-height 0.3s ease-out;
    }

    aside mobile-nav[open] {
      max-height: 100vh;
      transition: max-height 0.3s ease-in;
    }

    @media (min-width: 1025px) {
      aside {
        display: none;
      }
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'app-navbar': Navbar;
  }
}
