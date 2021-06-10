export const loginFormTmpl = `
<div class="login-form-wrapper">
  <div class="login-form">
    <p class="login-form__header">{{header}}</p>
    <form id="loginForm" class="login-form__form">
      <div>
        {{#each fields}}
        <div class="custom-input">
          <label>{{label}}</label>
          <input name="{{name}}" type="{{type}}" value="{{value}}"> 
        </div>
        {{/each}}
      </div>
      <div>
        <div class="login-form__button-box">
          {{#submitButton}}{{body}}{{/submitButton}}
        </div>
        <div class="login-form__link-box">
          {{#loginLink}}{{body}}{{/loginLink}}
        </div>
      </div>
    </form>
  </div>
</div>`;
