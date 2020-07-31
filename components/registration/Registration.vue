<template>
  <modal name="registration-modal" width="640" height="754" adaptive>
    <div class="registration">
      <span class="registration__cross" @click="$emit('close')">X</span>
      <span class="registration__label">Регистрация в UTEAM</span>
      <TInput
        v-model="signup.email"
        class="registration__email-input"
        placeholder="Email"
      />
      <TInput
        v-model="signup.password"
        type="password"
        class="registration__password-input"
        placeholder="Пароль"
      />
      <TInput
        v-model="signup.openLandProfileLink"
        class="registration__link-on-profile-input"
        placeholder="Ссылка на профиль в MESTO"
      />
      <TInput
        v-model="signup.userRole"
        class="registration__role-in-project"
        placeholder="Ваша роль в проекте"
      />
      <div class="registration__policy">
        <TInput
          type="checkbox"
          class="registration__policy-cbx"
        />
        <span class="registration__policy-text">
          Я принимаю
        </span>
        <span class="registration__policy-link">
          политику конфиденциальности
        </span>
      </div>
      <TButton
        class="registration__register-btn"
        theme="primary"
        @click="onClick"
      >
        Зарегистрироваться
      </TButton>
      <span class="registration__divider" />
      <div class="registration__account">
        <span class="registration__account-question">
          Есть аккаунт?
        </span>
        <span class="registration__account-entry" @click="$emit('showLogin')">
          Войти
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
import SignUpEntity from '@/entities/SignUpEntity';

const namespace = 'registration';

@Component({
  components: {
    TButton,
    TInput,
  },
})
export default class RegistrationComponent extends Vue {
  @Action('postSignUp', { namespace }) postSignUp!: (signup: SignUpEntity) => void;

  @Prop({ default: false, type: Boolean })
  private value!: boolean;

  private currentShow: boolean = false;

  private signup: SignUpEntity = {
    name: '',
    email: '',
    password: '',
    verifyPassword: '',
    userRole: '',
    openLandProfileLink: '',
  };

  private async onClick() {
    try {
      await this.postSignUp(this.signup);
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
  .registration {
    display: flex;
    flex-direction: column;
    min-width: 320px;
    max-width: 400px;
    padding: 50px 20px 20px;
    margin: auto;

    &__cross {
      position: absolute;
      top: 1%;
      right: 3%;
      cursor: pointer;
    }

    &__label {
        width: 100%;
        text-align: center;
        margin-top: 50px;
        margin-left: 10px;
        margin-right: 10px;
        font-weight: 600;
        font-size: 26px;
        line-height: 44px;
        color: #333333;
    }

    &__email-input {
        display: inline;
        width: 100%;
        height: 40px;
        background: #fff url("/images/svg/registration/email-icon.svg") no-repeat scroll 22px 15px;
        padding-left: 50px;
        margin: 30px auto 0;
    }

    &__password-input {
        display: inline;
        width: 100%;
        height: 40px;
        background: #fff url("/images/svg/registration/password-icon.svg")
            no-repeat scroll 22px 12px;
        padding-left: 50px;
        margin: 30px auto 0;
    }

    &__link-on-profile-input {
        display: inline;
        width: 100%;
        height: 40px;
        padding-left: 23px;
        margin: 30px auto 0;
    }

    &__role-in-project {
        display: inline;
        width: 100%;
        height: 50px;
        padding-left: 23px;
        margin: 30px auto 0;
    }

    &__policy {
        margin: 30px auto 0;
        vertical-align: middle;
        font-size: 12px;
    }

    &__policy-text {
        display: inline-block;
        height: 20px;
        vertical-align: middle;
    }

    &__policy-link {
        display: inline-block;
        height: 20px;
        vertical-align: middle;
        color: #4F56F1;
    }

    &__policy-cbx {
        display: inline-block;
        width: 15px;
        height: 15px;
        margin-right: 10px;
        background: #FFFFFF;
        border: 1px solid #DBDBDB;
        box-sizing: border-box;
        border-radius: 5px;
    }

    &__register-btn {
        display: inline;
        width: 100%;
        height: 40px;
        box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.06);
        border-radius: 5px;
        margin: 30px auto 0;
    }

    &__divider {
        width: 100%;
        height: 1px;
        margin: 30px auto 0;
        background: #DBDBDB;
    }

    &__account {
        margin-top: 30px;
        margin-left: 10px;
        margin-right: 10px;
        vertical-align: middle;
        text-align: center;
        font-size: 12px;
    }

    &__account-question {
        display: inline-block;
        height: 20px;
        vertical-align: middle;
    }

    &__account-entry {
        display: inline-block;
        height: 20px;
        vertical-align: middle;
        color: #4F56F1;
    }
  }

  @media (min-width: 992px) {
    .registration {
      width: 600px;
      max-width: 600px;
      padding: 20px;

      &__label {
          width: 100%;
          margin: 50px auto 0;
          font-size: 36px;
      }

      &__email-input {
          width: 392px;
          height: 50px;
          background: #fff
            url("/images/svg/registration/email-icon.svg") no-repeat scroll 22px 15px;
          margin-top: 58px;
      }

      &__password-input {
          width: 392px;
          height: 50px;
          background: #fff url("/images/svg/registration/password-icon.svg")
              no-repeat scroll 22px 12px;
      }

      &__link-on-profile-input {
          width: 392px;
          height: 50px;
      }

      &__role-in-project {
          width: 392px;
      }

      &__policy {
          margin-left: 104px;
          margin-right: 104px;
          font-size: 14px;
      }

      &__policy-cbx {
          width: 20px;
          height: 20px;
      }

      &__register-btn {
          width: 392px;
          min-height: 44px;
          margin-top: 53px;
      }

      &__divider {
          width: 392px;
      }

      &__account {
          margin-top: 30px;
          vertical-align: middle;
          margin-bottom: 50px;
          font-size: 14px;
      }

      &__account-question {
          display: inline-block;
          height: 24px;
          vertical-align: middle;
      }

      &__account-entry {
          display: inline-block;
          height: 24px;
          vertical-align: middle;
          color: #4F56F1;
      }
    }
  }

  .registration-show {
    display: initial;
  }

  .registration-hide {
    display: none;
  }

</style>
