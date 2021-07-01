export const msgFeedTmpl = `
  <div class="msg-feed__header">
    <div class="msg-feed__avatar">
      <img src="{{avatar}}">
    </div>
    <div class="msg-feed__name">{{title}}</div>
    <div class="msg-feed__dropdown-box">
      <ul class="msg-feed__dropdown">
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
