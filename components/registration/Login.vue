<template>
  <div class="login" :class="{ 'login-show': !!currentShow, 'login-hide': !currentShow }">
    <span class="login__label">Вход в UTEAM</span>
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
      <span class="login__have-not-account-registration" @click="$emit('showRegistration')">
        Пройти регистрацию
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import {
  Vue, Component, Prop, Watch,
} from 'vue-property-decorator';
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

  @Prop({ default: false, type: Boolean })
  private value!: boolean;

  private currentShow: boolean = false;

  private login: LoginEntity = {
    email: '',
    password: '',
  };

  private async onClick() {
    try {
      await this.postLogin(this.login);
      this.$emit('close');
    } catch (err) {
      alert(err);
    }
  }

  @Watch('value', { immediate: true })
  private onValue(newVal: boolean): void {
    this.currentShow = newVal;
  }
}
</script>

<style lang="postcss" scoped>
  .login {
    position: absolute;
    top: 10%;
    left: 30%;
    display: flex;
    flex-direction: column;
    width: 320px;
    height: 470px;
    padding-top: 50px;
    border: black solid 1px;
    background-color: #fff;
    border-radius: 5px;

    &__label {
        width: 300px;
        height: 44px;
        margin-left: 10px;
        font-size: 26px;
        text-align: center;
        margin-top: 50px;
        font-family: Inter;
        font-style: normal;
        font-weight: 600;
        line-height: 44px;
        text-align: center;
        color: #333333;
    }

    &__email-input {
        display: inline;
        width: 300px;
        height: 40px;
        padding-left: 50px;
        margin-top: 58px;
        margin-right: 10px;
        margin-left: 10px;
        background: #fff url("/images/svg/registration/email-icon.svg") no-repeat scroll 22px 13px;
    }

    &__password-input {
        display: inline;
        width: 300px;
        height: 40px;
        padding-left: 50px;
        margin-top: 30px;
        margin-right: 10px;
        margin-left: 10px;
        background: #fff
          url("/images/svg/registration/password-icon.svg") no-repeat scroll 22px 13px;
    }

    &__btn {
        display: inline;
        width: 300px;
        height: 40px;
        margin-top: 30px;
        margin-right: 10px;
        margin-left: 10px;
        box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.06);
        border-radius: 5px;
    }

    &__divider {
        width: 300px;
        height: 1px;
        margin-top: 30px;
        margin-right: 10px;
        margin-left: 10px;
        background: #DBDBDB;
    }

    &__forget-password {
        width: 300px;
        height: 17px;
        text-align: center;
        margin-top: 30px;
        margin-left: 10px;
        margin-right: 10px;
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
        width: 300px;
        height: 17px;
        text-align: center;
        margin-top: 10px;
        margin-left: 10px;
        margin-right: 10px;
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

  @media (min-width: 992px) {
    .login {
      width: 600px;
      height: 518px;

      &__label {
          width: 403px;
          height: 44px;
          margin-left: 169px;
          margin-right: 171px;
          font-size: 36px;
      }

      &__email-input {
          display: inline;
          width: 392px;
          height: 50px;
          background: #fff
            url("/images/svg/registration/email-icon.svg") no-repeat scroll 22px 17px;
          padding-left: 50px;
          margin-right: 104px;
          margin-left: 104px;
      }

      &__password-input {
          width: 392px;
          height: 50px;
          background: #fff url("/images/svg/registration/password-icon.svg")
              no-repeat scroll 22px 17px;
          margin-right: 104px;
          margin-left: 104px;
      }

      &__btn {
          width: 392px;
          height: 44px;
          margin-right: 104px;
          margin-left: 104px;
      }

      &__divider {
          width: 392px;
          margin-right: 104px;
          margin-left: 104px;
      }

      &__forget-password {
          width: 185px;
          margin-left: 207px;
          margin-right: 208px;
          vertical-align: middle;
      }

      &__have-not-account {
          width: 251px;
          margin-top: 30px;
          margin-left: 174px;
          margin-right: 175px;
      }
    }
  }

  .login-show {
    display: initial;
  }

  .login-hide {
    display: none;
  }

</style>
