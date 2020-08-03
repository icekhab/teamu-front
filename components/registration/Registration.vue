<template>
  <modal name="registration-modal" width="640" height="auto" adaptive @closed="onClosed">
    <div class="registration">
      <span class="registration__cross" @click="$emit('close')">X</span>
      <span class="registration__label">Регистрация в UTEAM</span>
      <TFormControl
        :is-error="$v.signup.name.$error"
        class="registration__form-control"
      >
        <TInput
          v-model="signup.name"
          class="registration__name-input"
          placeholder="Имя"
          maxlength="255"
          @blur="$v.signup.name.$touch()"
        />
        <template slot="errors">
          <template v-if="!$v.signup.name.required">
            Заполните имя
          </template>
        </template>
      </TFormControl>

      <TFormControl
        :is-error="$v.signup.email.$error"
        class="registration__form-control"
      >
        <TInput
          v-model="signup.email"
          class="registration__email-input"
          placeholder="Email"
          maxlength="255"
          @blur="$v.signup.email.$touch()"
        />
        <template slot="errors">
          <template v-if="!$v.signup.email.required">
            Заполните email
          </template>
          <template v-else-if="!$v.signup.email.email">
            Некорректный email
          </template>
        </template>
      </TFormControl>

      <TFormControl
        :is-error="$v.signup.password.$error"
        class="registration__form-control"
      >
        <TInput
          v-model="signup.password"
          type="password"
          class="registration__password-input"
          placeholder="Пароль"
          maxlength="255"
          @blur="$v.signup.password.$touch()"
        />
        <template slot="errors">
          <template v-if="!$v.signup.password.required">
            Заполните пароль
          </template>
          <template v-if="!$v.signup.password.minLength">
            Минимум 6 символов
          </template>
        </template>
      </TFormControl>

      <TFormControl
        :is-error="$v.signup.openLandProfileLink.$error"
        class="registration__form-control"
      >
        <TInput
          v-model="signup.openLandProfileLink"
          class="registration__link-on-profile-input"
          placeholder="Ссылка на профиль в MESTO"
          maxlength="255"
          @blur="$v.signup.openLandProfileLink.$touch()"
        />
        <template slot="errors">
          <template v-if="!$v.signup.openLandProfileLink.url">
            Некорректный URL
          </template>
        </template>
      </TFormControl>

      <TFormControl
        :is-error="$v.isAccept.$error"
        class="registration__form-control"
      >
        <TCheckbox v-model="isAccept">
          <span>
            <span>
              Я принимаю
            </span>
            <span class="uteam-link">
              политику конфиденциальности
            </span>
          </span>
        </TCheckbox>
        <template slot="errors">
          <template v-if="!$v.isAccept.checked">
            Примите политику конфиденциальности
          </template>
        </template>
      </TFormControl>

      <TFormControl
        :is-error="serverError"
        class="registration__form-control"
      >
        <TButton
          class="registration__register-btn"
          theme="primary"
          :loading="loading"
          :disabled="loading"
          @click="onClick"
        >
          Зарегистрироваться
        </TButton>
        <template slot="errors">
          {{ serverError }}
        </template>
      </TFormControl>
      <span class="registration__divider" />
      <div class="registration__account">
        <span class="registration__account-question">
          Есть аккаунт?
        </span>
        <span class="registration__account-entry uteam-link" @click="$emit('showLogin')">
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
import TFormControl from '@/components/controls/TFormControl.vue';
import TCheckbox from '@/components/controls/TCheckbox.vue';
import SignUpEntity from '@/entities/SignUpEntity';
import {
  email, required, minLength,
} from 'vuelidate/lib/validators';
import { url } from '@/helpers/validators';
import UrlHelper from '@/helpers/UrlHelper';

const namespace = 'registration';

@Component({
  components: {
    TButton,
    TInput,
    TFormControl,
    TCheckbox,
  },

  validations: {
    signup: {
      name: {
        required,
      },
      email: {
        required,
        email,
      },
      password: {
        required,
        minLength: minLength(6),
      },
      openLandProfileLink: {
        url,
      },
    },
    isAccept: {
      checked: (value?: boolean) => value === true,
    },
  },
} as any)
export default class RegistrationComponent extends Vue {
  @Action('postSignUp', { namespace }) postSignUp!: (signup: SignUpEntity) => void;

  @Prop({ default: false, type: Boolean })
  private value!: boolean;

  private currentShow: boolean = false;

  serverError = '';

  loading = false;

  isAccept = false;

  private signup: SignUpEntity = this.getDefaultSignupData();

  private async onClick() {
    try {
      this.serverError = '';

      this.$v.$touch();

      if (this.$v.$invalid) return;

      this.loading = true;

      this.signup.openLandProfileLink = this.signup.openLandProfileLink
          && UrlHelper.getUrlWithHttpIfNeed(this.signup.openLandProfileLink);

      await this.postSignUp(this.signup);
      this.signup = this.getDefaultSignupData();
      this.loading = false;

      this.$emit('close');
    } catch (err) {
      this.serverError = 'Oops, что-то пошло не так';
      this.signup.password = '';
      this.$v.signup.password.$reset();
      this.loading = false;
    }
  }

  @Watch('value', { immediate: true })
  private onValue(newVal: boolean): void {
    this.currentShow = newVal;
  }

  private getDefaultSignupData() {
    return {
      name: '',
      email: '',
      password: '',
      verifyPassword: '',
      userRole: '',
      openLandProfileLink: '',
    };
  }

  private onClosed() {
    this.$v.$reset();
    this.serverError = '';
    this.signup.password = '';
    this.isAccept = false;
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
        margin: 50px auto 20px;
        font-weight: 600;
        font-size: 26px;
        line-height: 44px;
        color: #333333;
    }

    &__form-control {
      width: 100%;
      margin: 0 auto 10px;
    }

    &__name-input {
      display: inline;
      width: 100%;
      height: 40px;
      background: #fff url("/images/svg/registration/profile-icon.svg") no-repeat scroll 20px 11px;
      padding-left: 50px;
    }

    &__email-input {
      display: inline;
      width: 100%;
      height: 40px;
      background: #fff url("/images/svg/registration/email-icon.svg") no-repeat scroll 22px 14px;
      padding-left: 50px;
    }

    &__password-input {
        display: inline;
        width: 100%;
        height: 40px;
        background: #fff url("/images/svg/registration/password-icon.svg")
            no-repeat scroll 22px 11px;
        padding-left: 50px;
    }

    &__link-on-profile-input {
        display: inline;
        width: 100%;
        height: 40px;
        padding-left: 23px;
    }

    &__role-in-project {
        display: inline;
        width: 100%;
        height: 50px;
        padding-left: 23px;
    }

    &__policy {
        //margin: 0 auto;
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
        //display: inline-block;
        //width: 15px;
        //height: 15px;
        margin-right: 10px;
        //background: #FFFFFF;
        //border: 1px solid #DBDBDB;
        //box-sizing: border-box;
        //border-radius: 5px;
    }

    &__register-btn {
        display: inline;
        width: 100%;
        height: 40px;
        box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.06);
        border-radius: 5px;
        margin: 10px auto 0;
    }

    &__divider {
        width: 100%;
        height: 1px;
        margin: 15px auto 0;
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

      &__form-control {
        width: auto;
        margin-bottom: 15px;
      }

      &__label {
          width: 100%;
          margin: 50px auto 58px;
          font-size: 36px;
      }

      &__name-input {
        width: 392px;
        height: 50px;
        background: #fff url("/images/svg/registration/profile-icon.svg") no-repeat scroll 20px 16px;
      }

      &__email-input {
          width: 392px;
          height: 50px;
          background: #fff
            url("/images/svg/registration/email-icon.svg") no-repeat scroll 22px 19px;
      }

      &__password-input {
          width: 392px;
          height: 50px;
          background: #fff url("/images/svg/registration/password-icon.svg")
              no-repeat scroll 22px 16px;
      }

      &__link-on-profile-input {
          width: 392px;
          height: 50px;
      }

      &__role-in-project {
          width: 392px;
      }

      &__policy {
          //margin-left: 104px;
          //margin-right: 104px;
          font-size: 14px;
      }

      &__policy-cbx {
          width: 20px;
          height: 20px;
      }

      &__register-btn {
          width: 392px;
          min-height: 44px;
          margin-top: 10px;
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
