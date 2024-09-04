// store.js
import { ReactiveElement } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('navbar-store')
class NavbarStore extends ReactiveElement {
  static properties = {
    data: { type: Object },
  };

  constructor() {
    super();
    this.data = {};
  }

  setState(newState) {
    this.data = { ...this.data, ...newState };
    this.requestUpdate();
  }

  getState() {
    return this.data;
  }
}
export const store = document.createElement('navbar-store');
