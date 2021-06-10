export const loginFormTmpl = `
<div class="login-form">
  <p class="login-form__header">{{header}}</p>
  <form id="loginForm" class="login-form__form">
    <div class="login-form__input-box">
    </div>
    <div>
      <div class="login-form__button-box">
      </div>
      <div class="login-form__link-box">
        {{#loginLink}}{{body}}{{/loginLink}}
      </div>
    </div>
  </form>
</div>`;