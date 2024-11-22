import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('components-preview')
export class ComponentsPreview extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 2rem;
    }
    
    .component-section {
      margin-bottom: 2rem;
      padding: 1rem;
      border: 1px solid #ddd;
      border-radius: 8px;
    }
    
    h2 {
      margin-top: 0;
      color: #333;
    }
    
    .variants {
      display: flex;
      gap: 1rem;
      margin-top: 1rem;
    }
  `;

  render() {
    return html`
      <h1>Components Preview</h1>
      
      <demo-wrapper 
        title="Buttons" 
        description="Available button variants"
      >
        <div class="variants">
          <app-button label="Primary Button"></app-button>
          <app-button variant="secondary" label="Secondary Button"></app-button>
        </div>
      </demo-wrapper>
      
      <!-- Add more components as needed -->
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'components-preview': ComponentsPreview;
  }
} 