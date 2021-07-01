export const msgFeedTmpl = `
  <div class="msg-feed__header">
    <div class="msg-feed__avatar">
      <img src="{{avatar}}">
    </div>
    <div class="msg-feed__name">{{title}}</div>
    <div class="dropdown-box">
      <ul class="dropdown">
        <li><button>Добавить пользователя</button></li>
        <li><button>Удалить пользователя</button></li>
      </ul>
    </div>
  </div>
  <hr>
  <div class="msg-feed__feed">
    <time class="msg-feed__date font-size-smaller">{{date}}</time>
    <div class="msg-feed__msg">{{last_message}}</div>
  </div>
  <hr>
  <form id="send-msg-form" class="msg-feed__send-msg-form">
  </form>`;
