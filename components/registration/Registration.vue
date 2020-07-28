<template>
  <div
    class="registration"
    :class="{ 'registration-show': !!currentShow, 'registration-hide': !currentShow }"
  >
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
    position: absolute;
    padding-top: 50px;
    top: 10%;
    left: 30%;
    display: flex;
    flex-direction: column;
    width: 320px;
    height: 610px;
    border: black solid 1px;
    background-color: #fff;

    &__label {
        width: 300px;
        height: 44px;
        text-align: center;
        margin-top: 50px;
        margin-left: 10px;
        margin-right: 10px;
        font-family: Inter;
        font-style: normal;
        font-weight: 600;
        font-size: 26px;
        line-height: 44px;
        text-align: center;
        color: #333333;
    }

    &__email-input {
        display: inline;
        width: 300px;
        height: 40px;
        background: #fff url("/images/svg/registration/email-icon.svg") no-repeat scroll 22px 15px;
        padding-left: 50px;
        margin-top: 30px;
        margin-right: 10px;
        margin-left: 10px;
    }

    &__password-input {
        display: inline;
        width: 300px;
        height: 40px;
        background: #fff url("/images/svg/registration/password-icon.svg")
            no-repeat scroll 22px 12px;
        padding-left: 50px;
        margin-top: 30px;
        margin-right: 10px;
        margin-left: 10px;
    }

    &__link-on-profile-input {
        display: inline;
        width: 300px;
        height: 40px;
        padding-left: 23px;
        margin-top: 30px;
        margin-right: 10px;
        margin-left: 10px;
    }

    &__role-in-project {
        display: inline;
        width: 300px;
        height: 50px;
        padding-left: 23px;
        margin-top: 30px;
        margin-right: 10px;
        margin-left: 10px;
    }

    &__policy {
        margin-top: 30px;
        margin-left: 10px;
        margin-right: 10px;
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
        width: 300px;
        height: 40px;
        box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.06);
        border-radius: 5px;
        margin-top: 30px;
        margin-right: 10px;
        margin-left: 10px;
    }

    &__divider {
        width: 300px;
        height: 1px;
        margin-top: 30px;
        margin-right: 10px;
        margin-left: 10px;
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
      height: 714px;

      &__label {
          width: 403px;
          margin-top: 50px;
          margin-left: 99px;
          margin-right: 60px;
          font-size: 36px;
      }

      &__email-input {
          width: 392px;
          height: 50px;
          background: #fff
            url("/images/svg/registration/email-icon.svg") no-repeat scroll 22px 15px;
          margin-top: 58px;
          margin-right: 104px;
          margin-left: 104px;
      }

      &__password-input {
          width: 392px;
          height: 50px;
          background: #fff url("/images/svg/registration/password-icon.svg")
              no-repeat scroll 22px 12px;
          margin-right: 104px;
          margin-left: 104px;
      }

      &__link-on-profile-input {
          width: 392px;
          height: 50px;
          margin-right: 104px;
          margin-left: 104px;
      }

      &__role-in-project {
          width: 392px;
          margin-right: 104px;
          margin-left: 104px;
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
          height: 44px;
          margin-top: 53px;
          margin-right: 104px;
          margin-left: 104px;
      }

      &__divider {
          width: 392px;
          margin-right: 104px;
          margin-left: 104px;
      }

      &__account {
          margin-top: 30px;
          margin-left: 228px;
          margin-right: 227px;
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
