import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('not-found')
export class NotFound extends LitElement {

  render() {
    return html`
      <div role="main" class="container">
        <img src="/logo.png" alt="logo" />
        <h2>404 Not Found</h2>
        <a href="/" class="button-style">Return Home</a>
      </div>
    `;
  }

  static styles = css`
    .container {
      height: 100vh;
      width: 100vw;
      display: flex;
      gap: 16px;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background: rgb(25,35,70);
      background: linear-gradient(0deg, rgba(25,35,70,1) 0%, rgba(12,17,34,1) 50%, rgba(0,0,0,1) 100%);
    }

    .container img {
      width: 280px;
      height: 450px;
      border-radius: var(--border-radius);
    }

    h2 {
      color: var(--text-color-1); 
      font-size: 1.25rem;
      font-weight: 600;
    }

    .button-style {
      border-radius: 8px;
      text-decoration: none;
      background: rgb(222,33,37);
      background: linear-gradient(171deg, rgba(222,33,37,1) 0%, rgba(93,0,7,1) 40%, rgba(0,0,0,1) 100%);
      color: white;
      padding: 0.4rem 0.8rem;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  `;
}
