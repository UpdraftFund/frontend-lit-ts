import { customElement, property } from "lit/decorators.js";
import { LitComponent } from "../components/litComponent";
import { html } from "lit";
import { createRequest } from '@urql/core';
import { IdeaDocument } from '../../.graphclient';
import urqlClient from '../urql-client';

@customElement('idea-page')
export class IdeaPage extends LitComponent {
  @property() ideaId?: string;
  @property() data?: object;
  @property() error?: object;
  @property() loading: boolean = false;

  render() {
    return html`
      <div class="idea-page">
        <p>Idea ID: ${this.ideaId}</p>
      </div>
      <p>${this.loading ? 'Loading...' : 'You can find the result below...'}</p>
      <fieldset>
        ${this.data
          ? html`<form>
              <label>Data</label>
              <br />
              <textarea readOnly rows="25" cols="80">${JSON.stringify(this.data, null, 2)}</textarea>
            </form>`
          : ''}
        ${this.error
          ? html`<form>
              <label>Error</label>
              <br />
              <textarea readOnly rows="25" cols="80">${JSON.stringify(this.error, null, 2)}</textarea>
            </form>`
          : ''}
      </fieldset>
    `;
  }

  async firstUpdated() {
    if (this.ideaId) {
      this.loading = true;
      const { executeQuery } = urqlClient;
      try {
        const result = await executeQuery(createRequest(IdeaDocument, { ideaId: this.ideaId }));
        this.data = result.data;
        this.error = result.error;
      } catch (e) {
        this.error = e as object;
      } finally {
        this.loading = false;
      }
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'idea-page': IdeaPage;
  }
}