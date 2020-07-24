<template>
  <div class="login">
    <span class="login__label">Вход в TEAMU</span>
    <TInput
      v-model="login.email"
      class="login__email-input"
      placeholder="Email"
    />
    <TInput
      v-model="login.password"
      type="password"
      class="login__password-input"
      placeholder="Пароль"
    />
    <TButton
      class="login__btn"
      theme="primary"
      @click="onClick"
    >
      Войти в сервис
    </TButton>
    <span class="login__divider" />
    <div class="login__forget-password">
      <span class="login__forget-password-question">
        Забыли пароль?
      </span>
      <span class="login__forget-password-reset">Сбросить</span>
    </div>
    <div class="login__have-not-account">
      <span class="login__have-not-account-question">
        Нет аккаунта?
      </span>
      <span class="login__have-not-account-registration">Пройти регистрацию</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Action } from 'vuex-class';
import TButton from '@/components/controls/TButton.vue';
import TInput from '@/components/controls/TInput.vue';
import LoginEntity from '@/entities/LoginEntity';

const namespace = 'registration';

@Component({
  components: {
    TButton,
    TInput,
  },
})
export default class LoginComponent extends Vue {
  @Action('postLogin', { namespace }) postLogin!: (login: LoginEntity) => void;

  private login: LoginEntity = {
    email: '',
    password: '',
  };

  private async onClick() {
    await this.postLogin(this.login);
  }
}
</script>

<style lang="postcss" scoped>
  .login {
    display: flex;
    flex-direction: column;
    width: 600px;
    height: 518px;
    border: black solid 1px;
    background-color: #fff;
    border-radius: 5px;

    &__email-input {
        display: inline;
        width: 392px;
        height: 50px;
        background: #fff url("/images/svg/registration/email-icon.svg") no-repeat scroll 22px 17px;
        padding-left: 50px;
        margin-top: 58px;
        margin-right: 104px;
        margin-left: 104px;
    }

    &__password-input {
        display: inline;
        width: 392px;
        height: 50px;
        margin-right: 20px;
        background: #fff url("/images/svg/registration/password-icon.svg")
            no-repeat scroll 22px 17px;
        padding-left: 50px;
        margin-top: 30px;
        margin-right: 104px;
        margin-left: 104px;
    }

    &__label {
        width: 403px;
        height: 44px;
        text-align: center;
        margin-top: 50px;
        margin-left: 99px;
        margin-right: 99px;
        font-family: Inter;
        font-style: normal;
        font-weight: 600;
        font-size: 36px;
        line-height: 44px;
        text-align: center;
        color: #333333;
    }

    &__btn {
        display: inline;
        width: 392px;
        height: 44px;
        box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.06);
        border-radius: 5px;
        margin-top: 30px;
        margin-right: 104px;
        margin-left: 104px;
    }

    &__divider {
        width: 392px;
        height: 1px;
        margin-top: 30px;
        margin-right: 104px;
        margin-left: 104px;
        background: #DBDBDB;
    }

    &__forget-password {
        width: 185px;
        height: 17px;
        margin-top: 30px;
        margin-left: 207px;
        margin-right: 208px;
        vertical-align: middle;
    }

    &__forget-password-question {
        display: inline-block;
        height: 24px;
        vertical-align: middle;
    }

    &__forget-password-reset {
        display: inline-block;
        height: 24px;
        vertical-align: middle;
        color: #4F56F1;
    }

    &__have-not-account {
        width: 251px;
        height: 17px;
        margin-top: 17px;
        margin-left: 174px;
        margin-right: 175px;
        vertical-align: middle;
    }

    &__have-not-account-question {
        display: inline-block;
        height: 24px;
        vertical-align: middle;
    }

    &__have-not-account-registration {
        display: inline-block;
        height: 24px;
        vertical-align: middle;
        color: #4F56F1;
    }
  }
</style>
