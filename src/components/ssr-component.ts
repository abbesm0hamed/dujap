import { render } from '@lit-labs/ssr';
import { html } from 'lit';
import './my-element.js';
import { customElement } from 'lit/decorators.js';

@customElement('ssr')
export class SSR extends litElement {
  render(html`
  <h1>Hello SSR!</h1>
`)
};
