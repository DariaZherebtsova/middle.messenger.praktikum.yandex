export const profileTempl = `
<div class="profile-wrapper">
    <nav class="profile__nav">
      <button class="profile__back-btn" onclick="document.location='./index.html'"><img src="{{backBtnImg}}"></button>
    </nav>
    <main class="profile__main">
      <form id="profileForm">
        <div class="profile__data">
          <div class="profile__avatar">
            <input type="image" name="avatar" src="{{noImgAvatarLarge}}" width="130">
          </div>
          <div class="profile__name">
            Vano
          </div>
          {{#each fields}}
          <div class="profile__input">
            <label>{{label}}</label>
            <input name="{{name}}" type="{{type}}" value="{{value}}"> 
          </div>
          {{/each}}
        </div>
        <div class="profile__btn-box">
          {{#submitButton}}{{body}}{{/submitButton}}
        </div>
      </form>
      <div class="profile__btn-box">
        {{#buttons}}{{body}}{{/buttons}}
      </div>
    </main>
  </div>`