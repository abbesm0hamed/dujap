import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('app-footer')
export class AppFooter extends LitElement {
  render() {
    return html`
      <footer id="contact" class="contact">
        <div class="container">
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
          <div class="footer-copyright">
            <p>
              © 2024 <a target="_blank" href="https://www.holmena.com/">HOLMENA</a>.
            </p>
            <div class="footer-social">
              <a href="#"><img src="/icons/socials/instagram.svg" alt="instagram" width="20" /></a>
              <a href="#"><img src="/icons/socials/facebook.svg" alt="facebook" width="20" /></a>
              <a href="#"><img src="/icons/socials/tiktok.svg" alt="tiktok" width="20" /></a>
            </div>
          </div>
        </div>
        <div id="scroll-Top">
          <img
            src="/icons/chevron-top.svg"
            id="scroll-top"
            data-toggle="tooltip"
            data-placement="top"
            title="Back to Top"
          />
        </div>
      </footer>
    `;
  }

  static styles = css`
    :host {
      display: block;
    }

    footer {
      display: flex;
      flex-direction: column;
    }

    .container {
      width: 100%;
      max-width: var(--max-width);
      margin: 0 auto;
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
      color: #C8F7FC;
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
      padding: 20px 0;
      border-top: 0.5px solid rgba(200, 247, 252, 0.6);
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
      border: 0.5px solid rgba(200, 247, 252, 0.2);
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

    @media (max-width: 768px) {
      * {
        margin: 0;
        padding: 0;
      }

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
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'app-footer': AppFooter;
  }
}
