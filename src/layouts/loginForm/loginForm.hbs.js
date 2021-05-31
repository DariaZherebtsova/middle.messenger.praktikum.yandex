export const loginFormTmpl = `
<div class="login-form">
  <p class="login-form__header">Вход</p>
  <form id="loginForm" class="login-form__form" action="/signup" method="POST">
    {{#each fields}}
    <div class="custom-input">
      <label>{{label}}</label>
      <input name="{{name}}" type="{{type}}" value="{{value}}"> 
    </div>
    {{/each}}
    <div class="login-form__button-box">
      {{#submitButton}}{{body}}{{/submitButton}}
    </div>
    <div class="login-form__login-link">
      {{#loginLink}}{{body}}{{/loginLink}}
    </div>
  </form>
</div>`