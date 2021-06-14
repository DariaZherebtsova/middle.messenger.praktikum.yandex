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
    <div class="msg-feed__date font-size-smaller">{{date}}</div>
    <div class="msg-feed__msg">{{msg}}</div>
  </div>
  <hr>
  <div class="msg-feed__msg-input">
    <button class="msg-feed__attach-btn"><img src="{{attachBtnImg}}"></button>
    <input class="msg-feed__input" type="text" name="message">
    <button class="msg-feed__send-btn"><img src="{{sendBtnImg}}"></button>
  </div>`;
