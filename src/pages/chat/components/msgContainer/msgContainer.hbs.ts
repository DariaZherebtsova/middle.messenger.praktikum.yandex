export const msgContainerTmpl = `
  {{#each messages}}
  <li>
    {{#if content}}
    <div class="msg-container__msg">{{content}}</div>
    {{/if}}
  </li>
  {{/each}}
`;
