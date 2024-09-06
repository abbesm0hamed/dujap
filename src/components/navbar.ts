import { LitElement, css, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '@material/web/button/filled-button.js';
import './mobilenav.ts';

@customElement('app-navbar')
export class Navbar extends LitElement {
  @state()
  private mobileMenuOpen = false;

  render() {
    return html`
      <header>
        <a href="/" class="logo">Jar</a>
        <button
          class="mobile-menu-button"
          @click=${this.toggleMobileMenu}
          ?hidden=${!this.isMobile}
        >
          <img
            src="/icons/hamburger.svg"
            alt='menu'
            width="32"
            height="32"
          />
        </button>
        <nav class="desktop-nav" ?hidden=${this.isMobile}>
          ${this.renderNavLinks()}
        </nav>
      </header>
      <aside>
        <mobile-nav
          .open=${this.mobileMenuOpen}
          @close=${this.closeMobileMenu}
        >
          ${this.renderNavLinks()}
        </mobile-nav>
      </aside>
    `;
  }

  private renderNavLinks() {
    return html`
      <ul>
        <li>
          <a href="#hero" class="nav-link">Home</a>
        </li>
        <li>
          <a href="#service" class="nav-link">Service</a>
        </li>
        <li>
          <a href="#featured-cars" class="nav-link">Features Cars</a>
        </li>
        <li> 
          <a href="#new-cars" class="nav-link">New Cars</a>
        </li>
        <li>
          <a href="#brands" class="nav-link">Brands</a>
        </li>
        <li class="contact-button">
          <a href="#contact" class="nav-link">Contact</a>
        </li>
      </ul>
    `;
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
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(70px);
      padding: 1rem 0;
    }
    
    header {
      display: block;
      margin: 0 auto;
      max-width: var(--max-width, 1250px) !important;
      padding: 0 1rem 0 1rem; 
      display: flex;
      justify-content: space-between;
      align-items: center;
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
    ul {
      display: flex;
      list-style: none;
      padding: 0;
      margin: 0;
      align-items: center;
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
    .logo {
      font-size: 1.5rem;
      font-weight: bold;
      color: var(--brand-color-4);
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
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'app-navbar': Navbar;
  }
}
