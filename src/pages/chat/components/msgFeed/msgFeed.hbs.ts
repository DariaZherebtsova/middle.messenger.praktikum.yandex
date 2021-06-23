export const msgFeedTmpl = `
  <div class="msg-feed__header">
    <div class="msg-feed__avatar">
      <img src="{{noImgAvatar}}">
    </div>
    <div class="msg-feed__name">{{name}}</div>
    <div class="msg-feed__header__menu">
      <a></a>
    </div>
  </div>
  <hr>
  <div class="msg-feed__feed">
    <time class="msg-feed__date font-size-smaller">{{date}}</time>
    <div class="msg-feed__msg">{{msg}}</div>
  </div>
  <hr>
  <form id="send-msg-form" class="msg-feed__send-msg-form">
  </form>`;