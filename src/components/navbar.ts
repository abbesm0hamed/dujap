import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';

@customElement('app-navbar')
export class Navbar extends LitElement {
  @state()
  private mobileMenuOpen = false;

  static styles = css`
    :host {
      display: block;
      background-color: #fff;
      color: #333;
      padding: 1rem;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .logo {
      font-size: 1.5rem;
      font-weight: bold;
      color: #333;
      text-decoration: none;
    }

    nav {
      display: flex;
      gap: 1rem;
    }

    .nav-link {
      color: #333;
      text-decoration: none;
      transition: color 0.3s ease;
    }

    .nav-link:hover {
      color: #007bff;
    }

    .mobile-menu-button {
      display: none;
      background: none;
      border: none;
      font-size: 1.5rem;
      cursor: pointer;
    }

    @media (max-width: 768px) {
      nav {
        display: ${props => props.mobileMenuOpen ? 'flex' : 'none'};
        flex-direction: column;
        position: absolute;
        top: 60px;
        left: 0;
        right: 0;
        background-color: #fff;
        padding: 1rem;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      }

      .mobile-menu-button {
        display: block;
      }
    }
  `;

  render() {
    return html`
      <header>
        <a href="/" class="logo">Logo</a>
        <button class="mobile-menu-button" @click=${this.toggleMobileMenu}>
          ☰
        </button>
        <nav>
          <a href="/" class="nav-link">Home</a>
          <a href="/about" class="nav-link">About</a>
          <a href="/contact" class="nav-link">Contact</a>
        </nav>
      </header>
    `;
  }

  private toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
    this.requestUpdate();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'app-navbar': Navbar;
  }
}
