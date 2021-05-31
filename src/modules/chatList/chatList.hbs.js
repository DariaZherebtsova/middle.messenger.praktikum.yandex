export const chatList = `
<section class='chat-list'>
  <div class="chat-list__header">
    <a class="custom-link" href="./authorization.html">❮ Вход</a>
    <a class="custom-link" href="./profile.html">Профиль ❯</a>
  </div>
  <div class="chat-list__search">
    <input class="chat-list__search-input type="text" placeholder="Поиск">
  </div>
  <ul class="chat-list__preview-list">
    {{#each chats}}
    <li>
      <hr>
      {{> chatPreview name=name lastMsg=lastMsg time=time img=img}}
    </li>
    {{/each}}
  </ul>
</section>
`;