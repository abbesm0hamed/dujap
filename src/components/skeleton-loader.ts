import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('skeleton-loader')
export class SkeletonLoader extends LitElement {
  @property({ type: String }) shape: 'text' | 'circle' | 'rect' = 'text';
  @property({ type: String }) width = '100%';
  @property({ type: String }) height = '1em';

  static styles = css`
    :host {
      display: block;
    }
    .skeleton {
      background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
      background-size: 200% 100%;
      animation: loading 1.5s infinite;
      display: inline-block;
    }
    .rect {
      border-radius: 4px;
    }
    .circle {
      border-radius: 50%;
    }
    @keyframes loading {
      0% {
        background-position: 200% 0;
      }
      100% {
        background-position: -200% 0;
      }
    }
  `;

  render() {
    return html`
      <div 
        class="skeleton ${this.shape}" 
        style="width: ${this.width}; height: ${this.height};"
      ></div>
    `;
  }
}
