export const mainTempl = `
<div class="authorization-form">
  <p class="authorization-form__header">Вход</p>
  <form class="authorization-form__form" action="/signup" method="POST">
    <div class="custom-input">
      <label>Логин</label>
      <input type="email" name="email">
    </div>
    <div class="custom-input">
      <label>Пароль</label>
      <input type="password" name="password">
    </div>
    <div class="authorization-form__button-box">
      <button class="custom-button">
        Зарегистрироваться
      </button>
    </div>
    <div class="authorization-form__registration-link">
      <a>Нет аккаунта?</a>
    </div>
  </form>
</div>`