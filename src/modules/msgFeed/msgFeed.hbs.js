export const msgFeed = `
<section class='msg-feed'>
  <div class="msg-feed__header">
    <div class="msg-feed__avatar">
      <img src="{{msgFeedData.noImgAvatar}}">
    </div>
    <div class="msg-feed__name">Ilya</div>
    <div class="msg-feed__header__menu">
      <a href="./menu.hbs"></a>
    </div>
  </div>
  <hr>
  <div class="msg-feed__feed"></div>
  <hr>
  <div class="msg-feed__msg">
    <button class="msg-feed__attach-btn"><img src="{{msgFeedData.attachBtnImg}}"></button>
    <input class="msg-feed__input" type="text" name="message">
    <button class="msg-feed__send-btn"><img src="{{msgFeedData.sendBtnImg}}"></button>
  </div>
</section>`