import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('app-footer')
export class AppFooter extends LitElement {
  render() {
    return html`
      <footer class="contact">
        <section class="container">
          <img
            class="footer-bg"
            src="/images/footer-bg.png"
            alt="footer-bg"
          />
          <div class="footer-top">
            <div class="footer-widget">
              <h2 class="footer-logo">
                <a href="/">Japanese Cars in Dubai</a>
              </h2>
              <p>
                We are at your service with our featured selection of Japanese cars here in Dubai.
              </p>
              <address class="footer-contact">
                <p>rouine.abderrahmen@gmail.com</p>
                <p>+971 55 325 7193</p>
              </address>
            </div>
            <div class="footer-widget">
              <h2>About</h2>
              <ul>
                <li><a href="#">About us</a></li>
                <li><a href="#">Career</a></li>
                <li><a href="#">Terms of service</a></li>
                <li><a href="#">Privacy policy</a></li>
              </ul>
            </div>
            <div class="footer-widget">
              <h2>Top brands</h2>
              <div class="brands-grid">
                <ul>
                  <li><a href="#">Toyota</a></li>
                  <li><a href="#">Honda</a></li>
                  <li><a href="#">Nissan</a></li>
                  <li><a href="#">Mazda</a></li>
                  <li><a href="#">Subaru</a></li>
                  <li><a href="#">Suzuki</a></li>
                </ul>
                <ul>
                  <li><a href="#">Mitsubishi</a></li>
                  <li><a href="#">Lexus</a></li>
                  <li><a href="#">Infiniti</a></li>
                  <li><a href="#">Acura</a></li>
                  <li><a href="#">Isuzu</a></li>
                  <li><a href="#">Daihatsu</a></li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <div class="footer-copyright">
          <p>
            © 2024 <a target="_blank" href="https://www.holmena.com/">developed by HOLMENA</a>.
          </p>
          <address class="footer-social">
            <a
              target="_blank"
              href="https://instagram.com/DuJapCars"
            ><img src="/icons/socials/instagram.svg" alt="instagram" width="20" /></a>
            <a
              target="_blank"
              href="https://www.facebook.com/share/HqWpLRkZXjcv3GGh/?mibextid=qi2Omg"
            ><img src="/icons/socials/facebook.svg" alt="facebook" width="20" /></a>
            <a
              target="_blank"
              href="https://tiktok.com/@dujap.cars"
            ><img src="/icons/socials/tiktok.svg" alt="tiktok" width="20" /></a>
          </address>
        </div>
        <a
          id="scroll-Top"
          href="#hero"
          @click=${() => this.navigateTo('/#hero')}
        >
          <img
            src="/icons/chevron-top.svg"
            id="scroll-top"
            data-toggle="tooltip"
            data-placement="top"
            title="Back to Top"
          />
        </a>
      </footer>
    `;
  }

  private navigateTo(path: string) {
    this.dispatchEvent(new CustomEvent('navigate', {
      detail: { path },
      bubbles: true,
      composed: true
    }));
  }

  static styles = css`
    :host {
      display: block;
      position: relative;
      background-color: black;
      z-index: 999;
    }

    .contact {
      position: relative;
      background-color: transparent;
      z-index: 1;
      padding: 0 1rem 0 1rem; 
    }

    .footer-bg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      z-index: -1;
      opacity: 0.4; 
      animation: fadeOpacity 6s infinite ease-in-out;
    }
    @keyframes fadeOpacity {
      0% {
        opacity: 0.4;
      }
      50% {
        opacity: 0;
      }
      100% {
        opacity: 0.4;
      }
    }

    .container {
      width: 100%;
      max-width: var(--max-width);
      margin: 0 auto;
      position: relative;
      z-index: 1;
    }

    .footer-top {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 30px;
      padding: 40px 0;
    }
    
    .footer-contact {
      padding: 1rem 0;
    }

    .footer-widget h2 {
      margin: 0 0 1.5rem 0;
      font-size: 18px;
    }

    .footer-logo a {
      font-size: 1.3rem;
      font-weight: bold;
      color: var(--text-color-2);
      text-decoration: none;
    }

    ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    ul li {
      margin-bottom: 10px;
    }

    ul li a {
      color: #666;
      text-decoration: none;
    }

    div p a {
      color: #C8F7FC;
      text-decoration: none;
    }

    .brands-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
    }

    .footer-copyright {
      display: flex;
      justify-content: space-between;
      align-items: center;
      max-width: var(--max-width);
      margin: 0 auto;
      border-top: 0.5px solid var(--light-color-op);
    }
    @media (max-width: 768px) {
      .footer-copyright {
        padding-bottom: 0.5rem;
      }
    }

    .footer-social a {
      color: #333;
      margin-left: 15px;
      font-size: 18px;
    }

    #scroll-Top {
      position: fixed;
      bottom: 20px;
      right: 20px;
      background-color: #000;
      border: 1px solid var(--light-color-op);
      color: #fff;
      width: 40px;
      height: 40px;
      text-align: center;
      line-height: 40px;
      border-radius: 50%;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    #scroll-Top:hover {
      background-color: var(--brand-color-5);
      cursor: pointer;
    }

    @media (max-width: 768px) {
      .footer-top {
        padding: 20px 0;
      }

      .footer-copyright {
        flex-direction: column;
        align-items: flex-start;
      }

      .footer-social {
        margin-top: 15px;
      }

      .footer-social a:first-child {
        margin-left: 0;
      }
    }

    @media (min-width: 768px) {
      .contact {
        padding-left: 2rem;
        padding-right: 2rem;
      }
    }
    @media (min-width: 1024px) {
      .contact {
        padding-left: 3rem;
        padding-right: 3rem;
      }
    }
    @media (min-width: 1280px) {
      .contact {
        padding-left: 4rem;
        padding-right: 4rem;
      }
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'app-footer': AppFooter;
  }
}
