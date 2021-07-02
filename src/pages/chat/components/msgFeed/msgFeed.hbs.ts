export const msgFeedTmpl = `
  <div class="msg-feed__header">
  </div>
  <hr>
  <div class="msg-feed__feed">
    <time class="msg-feed__date font-size-smaller">{{date}}</time>
    <div class="msg-feed__msg">{{currentChat.last_message}}</div>
  </div>
  <hr>
  <form id="send-msg-form" class="msg-feed__send-msg-form">
  </form>`;
