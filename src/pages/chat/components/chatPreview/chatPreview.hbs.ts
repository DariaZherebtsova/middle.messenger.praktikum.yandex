export const chatPreviewTmpl = `
  <div class="chat-preview__avatar">
    <img src="{{avatar}}">
  </div>
  <div class="chat-preview__content">
    <div class="chat-preview__chat-title">{{title}}</div>
    <div class="font-size-smaller color-grey">{{last_message}}</div>
  </div>
  <div class="chat-preview__aside">
    <time class="font-size-smaller color-grey">{{time}}</time>
  </div>`;
