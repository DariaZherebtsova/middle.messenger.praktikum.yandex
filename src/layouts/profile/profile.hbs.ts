export const profileTempl = `
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
        <div class="profile__input-box">
        </div>
      </div>
      <div class="profile__btn-box submit-btn-box">
      </div>
    </form>
    <div class="profile__btn-box">
    </div>
  </main>`;
