<template>
  <form class="profile-edit-form" @submit.prevent="submitForm">
    <AvatarChooser
      class="profile-edit-form__avatar"
      name="avatar-logo-chooser"
      :base-src="profile.imagePath"
      :username="profile.name"
      @change="avatarChanged"
    />

    <div class="profile-edit-form__form-blocks">
      <!--    Основная информация-->
      <div class="profile-edit-form__block">
        <h3>Основная информация</h3>
        <div class="profile-edit-form__inputs">
          <!--    Имя фамилия-->
          <TFormControl
            class="form-control"
            :is-error="$v.newProfile.name.$error"
          >
            Имя Фамилия
            <TInput
              v-model="newProfile.name"
              maxlength="255"
              class="form-input"
              @blur="$v.newProfile.name.$touch()"
            />

            <template slot="errors">
              <template v-if="!$v.newProfile.name.required">
                Заполните имя
              </template>
            </template>
          </TFormControl>

          <!--    Email-->
          <TFormControl
            class="form-control"
            :is-error="$v.newProfile.email.$error"
          >
            Email
            <TInput
              v-model="newProfile.email"
              maxlength="255"
              class="form-input"
              @blur="$v.newProfile.email.$touch()"
            />

            <template slot="errors">
              <template v-if="!$v.newProfile.email.required">
                Заполните email
              </template>
              <template v-else-if="!$v.newProfile.email.email">
                Некорректный email
              </template>
            </template>
          </TFormControl>

          <!--    Локация-->
          <TFormControl class="form-control">
            Локация
            <TInput
              v-model="newProfile.location"
              maxlength="255"
              class="form-input"
            />
          </TFormControl>

          <!--    Телефон-->
          <!--          <TFormControl class="form-control">-->
          <!--            Телефон-->
          <!--            <TInput-->
          <!--              v-model="newProfile.phone"-->
          <!--              maxlength="255"-->
          <!--              class="form-input"-->
          <!--            />-->
          <!--          </TFormControl>-->

          <!--    Роль-->
          <TFormControl class="form-control">
            Ваша роль
            <TInput
              v-model="newProfile.role"
              maxlength="255"
              class="form-input"
            />
          </TFormControl>
        </div>
      </div>

      <!--    About me-->
      <div class="profile-edit-form__block">
        <h3>Обо мне</h3>
        <TFormControl class="about-me">
          <TTextArea
            v-model="newProfile.about"
            maxlength="3000"
          />
        </TFormControl>
      </div>

      <!--    Contacts-->
      <div class="profile-edit-form__block">
        <h3>Контакты</h3>
        <div class="profile-edit-form__inputs">
          <TFormControl
            v-for="(contact, index) in newContacts"
            :key="index"
            :is-error="$v.newContacts.$each.$iter[index].link.$error"
            class="form-control"
            maxlength="255"
            @blur="$v.newContacts.$each.$iter[index].link.$touch()"
          >
            {{ contact.title }}
            <TInput v-model="contact.link" class="form-input" />

            <template slot="errors">
              <template v-if="!$v.newContacts.$each.$iter[index].link.link">
                Некорректный URL
              </template>
            </template>
          </TFormControl>
        </div>
      </div>

      <div class="profile-edit-form__submit-btn-wrap">
        <TButton
          class="profile-edit-form__submit-btn"
          type="submit"
          :loading="loading"
          :disabled="loading"
        >
          Сохранить
        </TButton>
        <span class="label">
          <span v-if="isSaved" class="label-success">
            Успешно сохранено!
          </span>
          <span v-else-if="serverError || $v.$error" class="label-error">
            {{ serverError || 'Заполните корректно все поля' }}
          </span>
        </span>
      </div>
    </div>
  </form>
</template>

<script lang="ts">
import {
  Component, Prop, Vue, Watch,
} from 'vue-property-decorator';
import UserEntity from '@/entities/UserEntity';
import TFormControl from '@/components/controls/TFormControl.vue';
import TInput from '@/components/controls/TInput.vue';
import TTextArea from '@/components/controls/TTextArea.vue';
import TButton from '@/components/controls/TButton.vue';
import deepCopyFunction from '@/helpers/deepCopy';
import UserContactEntity from '@/entities/UserContactEntity';
import AvatarChooser from '@/components/controls/AvatarChooser.vue';
import {
  email, required,
} from 'vuelidate/lib/validators';
import { url } from '@/helpers/validators';
import { Action } from 'vuex-class';
import FileEntity from '@/entities/FileEntity';
import UrlHelper from '@/helpers/UrlHelper';

@Component({
  components: {
    TFormControl,
    TInput,
    TTextArea,
    TButton,
    AvatarChooser,
  },

  validations: {
    newProfile: {
      name: {
        required,
      },
      email: {
        required,
        email,
      },
    },
    newContacts: {
      $each: {
        link: {
          url,
        },
      },
    },
  },
} as any)
export default class ProfileEditFormComponent extends Vue {
  @Prop({ type: Object, required: true }) profile!: UserEntity;

  @Prop({ type: Array, required: true }) contacts!: UserContactEntity[];

  @Prop({ type: Boolean, default: false }) isMy!: boolean;

  @Action('saveAvatar', { namespace: 'profile' }) saveAvatar!: (avatar: FileEntity) => Promise<string>;

  @Action('saveProfile', { namespace: 'profile' }) saveProfile!: (profile: UserEntity) => Promise<void>;

  @Action('saveContacts', { namespace: 'profile' }) saveContacts!: (contacts: UserContactEntity[]) => Promise<void>;

  newProfile: UserEntity = {
    id: 0,
    email: '',
    contacts: [],
  };

  newContacts: UserContactEntity[] = [
    {
      id: 0,
      title: 'Instagram',
      link: '',
    },
    {
      id: 0,
      title: 'Telegram',
      link: '',
    },
    {
      id: 0,
      title: 'ВКонтакте',
      link: '',
    },
    {
      id: 0,
      title: 'Twitter',
      link: '',
    },
    {
      id: 0,
      title: 'Facebook',
      link: '',
    },
    {
      id: 0,
      title: 'Openland',
      link: '',
    },
    {
      id: 0,
      title: 'LinkedIn',
      link: '',
    },
    {
      id: 0,
      title: 'Веб-сайт',
      link: '',
    },
  ];

  loading = false;

  isSaved = false;

  serverError = '';

  newAvatar?: FileEntity;

  @Watch('profile', { immediate: true })
  private onProfile(newVal: UserEntity): void {
    this.newProfile = deepCopyFunction(newVal);
  }

  @Watch('contacts', { immediate: true })
  private onContacts(newVal: UserContactEntity[]): void {
    this.newContacts = this.newContacts.map((contact) => {
      const {
        id = 0,
        link = '',
      } = newVal.find(({ title }) => title === contact.title) || {};

      return {
        ...contact,
        id,
        link,
      };
    });
  }

  avatarChanged(file: FileEntity) {
    this.newAvatar = file;
  }

  async submitForm() {
    try {
      this.serverError = '';
      this.isSaved = false;
      this.$v.$touch();

      if (this.$v.$invalid) return;

      this.loading = true;

      if (this.newAvatar) {
        const imagePath = await this.saveAvatar(this.newAvatar);

        this.newProfile = { ...this.newProfile, imagePath };
      }

      await this.saveProfile(this.newProfile);

      const savingContact = this.newContacts.filter(({ link }) => !!link).map((contact) => ({
        ...contact,
        link: UrlHelper.getUrlWithHttpIfNeed(contact.link),
      }));

      await this.saveContacts(savingContact);

      this.isSaved = true;
      this.loading = false;
    } catch (e) {
      this.loading = false;
      this.serverError = 'Oops, что-то пошло не так';
    }
  }
}
</script>

<style lang="postcss" scoped>
  .profile-edit-form {
    display: flex;
    flex-direction: column;

    &__block {
      &:not(:first-child) {
        margin-top: 15px;
      }
    }

    &__inputs {
      margin-top: 20px;
      display: grid;
      grid-template-columns: 1fr;
      grid-column-gap: 10px;
      grid-row-gap: 10px;

      .form-control {
        color: var(--greyColor);
      }

      .form-input {
        margin-top: 4px;
      }
    }

    .about-me {
      width: 100%;
      height: 200px;
      margin-top: 20px;
    }

    &__submit-btn {
      margin-top: 10px;
    }

    &__avatar {
      margin-bottom: 30px;
      width: 70px;
      min-width: 70px;
      height: 70px;
      min-height: 70px;
    }

    &__form-blocks {
      width: 100%;
    }

    &__submit-btn-wrap {
      display: flex;
      flex-direction: column-reverse;
      margin-top: 20px;
    }

    .label {
      white-space: nowrap;
      height: 17px;

      .label-success {
        color: #61C9A8;
      }

      .label-error {
        color: rgba(#FF4B3E, .7);
      }
    }
  }

  @media (min-width: 992px) {
    .profile-edit-form {
      display: flex;
      flex-direction: row;

      &__block {
        &:not(:first-child) {
          margin-top: 30px;
        }
      }

      &__inputs {
        margin-top: 30px;
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-column-gap: 20px;
        grid-row-gap: 15px;
      }

      .about-me {
        height: 250px;
        margin-top: 30px;
      }

      &__submit-btn {
        width: 140px;
        margin-top: 0;
        margin-right: 20px;
      }

      &__avatar {
        margin-bottom: 50px;
        width: 100px;
        min-width: 100px;
        height: 100px;
        min-height: 100px;
      }

      &__form-blocks {
        margin-left: 50px;
      }

      &__submit-btn-wrap {
        flex-direction: row;
        align-items: center;
      }

      .label {
        white-space: nowrap;
        height: 17px;

        .label-success {
          color: #61C9A8;
        }

        .label-error {
          color: rgba(#FF4B3E, .7);
        }
      }
    }
  }
</style>
