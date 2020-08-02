<template>
  <modal name="login-modal" width="640" height="auto" adaptive @closed="onClosed">
    <div class="login">
      <span class="login__cross" @click="$emit('close')">X</span>
      <span class="login__label">Вход в UTEAM</span>
      <TFormControl
        :is-error="$v.login.email.$error"
        class="login__form-control"
      >
        <TInput
          v-model="login.email"
          class="login__email-input"
          placeholder="Email"
          @blur="$v.login.email.$touch()"
        />
        <template slot="errors">
          <template v-if="!$v.login.email.required">
            Заполните email
          </template>
          <template v-else-if="!$v.login.email.email">
            Некорректный email
          </template>
        </template>
      </TFormControl>
      <TFormControl
        :is-error="$v.login.password.$error"
        class="login__form-control"
      >
        <TInput
          v-model="login.password"
          type="password"
          class="login__password-input"
          placeholder="Пароль"
          @blur="$v.login.password.$touch()"
        />
        <template slot="errors">
          <template v-if="!$v.login.password.required">
            Заполните пароль
          </template>
        </template>
      </TFormControl>
      <TFormControl
        :is-error="!!serverError"
        class="login__form-control"
      >
        <TButton
          class="login__btn"
          theme="primary"
          :disabled="loading"
          :loading="loading"
          @click="onClick"
        >
          Войти в сервис
        </TButton>
        <template slot="errors">
          {{ serverError }}
        </template>
      </TFormControl>
      <span class="login__divider" />
      <div class="login__forget-password">
        <span class="login__forget-password-question">
          Забыли пароль?
        </span>
        <span class="login__forget-password-reset uteam-link">Сбросить</span>
      </div>
      <div class="login__have-not-account">
        <span class="login__have-not-account-question">
          Нет аккаунта?
        </span>
        <span class="login__have-not-account-registration uteam-link" @click="$emit('showRegistration')">
          Пройти регистрацию
        </span>
      </div>
    </div>
  </modal>
</template>

<script lang="ts">
import {
  Vue, Component, Prop, Watch,
} from 'vue-property-decorator';
import { Action } from 'vuex-class';
import TButton from '@/components/controls/TButton.vue';
import TInput from '@/components/controls/TInput.vue';
import TFormControl from '@/components/controls/TFormControl.vue';
import LoginEntity from '@/entities/LoginEntity';
import { required, email } from 'vuelidate/lib/validators';

const namespace = 'registration';

@Component({
  components: {
    TButton,
    TInput,
    TFormControl,
  },

  validations: {
    login: {
      email: {
        required,
        email,
      },
      password: {
        required,
      },
    },
  },
} as any)
export default class LoginComponent extends Vue {
  @Action('postLogin', { namespace }) postLogin!: (login: LoginEntity) => void;

  @Prop({ default: false, type: Boolean })
  private value!: boolean;

  private currentShow: boolean = false;

  login: LoginEntity = this.getDefaultLoginData();

  loading = false;

  serverError = '';

  statusErrors: { [key: number]: string } = {
    401: 'Неверный email или пароль',
  };

  private async onClick() {
    try {
      this.serverError = '';
      this.$v.$touch();

      if (this.$v.$invalid) return;

      this.loading = true;

      await this.postLogin(this.login);

      this.login = this.getDefaultLoginData();
      this.$emit('close');
      this.loading = false;
    } catch (err) {
      this.serverError = this.statusErrors[err?.response?.status] || 'Oops, что-то пошло не так';
      this.login.password = '';
      this.$v.login.password.$reset();
      this.loading = false;
    }
  }

  @Watch('value', { immediate: true })
  private onValue(newVal: boolean): void {
    this.currentShow = newVal;
  }

  private getDefaultLoginData() {
    return {
      email: '',
      password: '',
    };
  }

  private onClosed() {
    this.$v.$reset();
    this.serverError = '';
    this.login.password = '';
  }
}
</script>

<style lang="postcss" scoped>
  .login {
    display: flex;
    flex-direction: column;
    width: 320px;
    //height: 470px;
    padding: 40px 0;
    margin: auto;

    &__cross {
      position: absolute;
      top: 1%;
      right: 3%;
      cursor: pointer;
    }

    &__label {
        height: 44px;
        font-size: 26px;
        text-align: center;
        font-family: Inter;
        font-style: normal;
        font-weight: 600;
        line-height: 44px;
        text-align: center;
        color: #333333;
    }

    &__form-control {
      width: auto;
    }

    &__email-input {
        display: inline;
        width: 100%;
        height: 40px;
        padding-left: 50px;
        margin-top: 40px;
        background: #fff url("/images/svg/registration/email-icon.svg") no-repeat scroll 22px 14px;
    }

    &__password-input {
        display: inline;
        width: 100%;
        height: 40px;
        padding-left: 50px;
        margin-top: 10px;
        background: #fff
          url("/images/svg/registration/password-icon.svg") no-repeat scroll 22px 11px;
    }

    &__btn {
        display: inline;
        width: 100%;
        height: 40px;
        margin-top: 10px;
        box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.06);
        border-radius: 5px;
    }

    &__divider {
        width: 100%;
        height: 1px;
        margin-top: 20px;
        background: #DBDBDB;
    }

    &__forget-password {
        width: 100%;
        height: 17px;
        text-align: center;
        margin-top: 30px;
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
        width: 100%;
        height: 17px;
        text-align: center;
        margin-top: 10px;
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
      width: 392px;

      &__label {
          width: 403px;
          height: 44px;
          font-size: 36px;
      }

      &__email-input {
          display: inline;
          width: 392px;
          height: 50px;
          background: #fff
            url("/images/svg/registration/email-icon.svg") no-repeat scroll 22px 19px;
          padding-left: 50px;
          margin-top: 58px;
      }

      &__password-input {
          width: 392px;
          height: 50px;
          background: #fff url("/images/svg/registration/password-icon.svg")
              no-repeat scroll 22px 17px;
          margin-top: 10px;
      }

      &__btn {
        width: 100%;
        height: 44px;
        margin: 10px 0 5px;
      }

      &__divider {
          width: 100%;
          margin-top: 30px;
      }

      &__forget-password {
          width: 185px;
          margin: 30px auto 0;
          vertical-align: middle;
      }

      &__have-not-account {
          width: 251px;
          margin: 30px auto 0;
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
