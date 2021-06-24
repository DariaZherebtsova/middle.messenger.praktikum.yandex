export const profileTempl = `
  <nav class="profile__nav">
    <button class="profile__back-btn" onclick="document.location='./index.html'"><img src="{{backBtnImg}}"></button>
  </nav>
  <main class="profile__main">
    <form class="profile__avatar-form" id="profile-avatar">
      <label class="avatar-label" for="avatar"><img class="avatar-img" src="{{noImgAvatarLarge}}" width="130" /></label>
      <input class="avatar-input" id="avatar" type="file" accept="image/*" name="avatar">
    </form>
    <div class="profile__name">
      Vano
    </div>
    <form id="profile-form">
      <div class="profile__data">
        <div class="profile__input-box">
        </div>
      </div>
      <div class="profile__btn-box submit-btn-box">
      </div>
    </form>
    <div class="profile__btn-box">
    </div>
  </main>`;
