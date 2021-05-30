export const profileTempl = `
<div class="profile-wrapper">
    <nav class="profile__nav">
      <button class="profile__back-btn"><img src="{{backBtnImg}}"></button>
    </nav>
    <main class="profile__main">
      <div class="profile__data">
        <div class="profile__avatar">
          <img src="{{noImgAvatarLarge}}">
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
      <div class="profile__menu">
        {{#buttons}}{{body}}{{/buttons}}
      </div>
    </main>
  </div>`