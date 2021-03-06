<template>
  <form class="project-links-form" @submit.prevent="submitForm">
    <span class="project-links-form__description-text">
      Здесь вы можете добавить полезные ссылки на ваши материалы по проекту. Вместо “Наименования” вы можете указать, например “Наш сайт” / “Ссылка на дизайн проект” / “Ссылка на нашу презентацию” и тому подобные.
    </span>
    <div class="project-links-form__links">
      <div v-for="(link, index) in newLinks" :key="index" class="project-links-form__link-block">
        <!-- Название ссылки-->
        <TFormControl
          :is-error="$v.newLinks.$each.$iter[index].title.$error"
          class="project-links-form__title"
        >
          <TInput
            v-model="link.title"
            class="project-links-form__input"
            placeholder="Наименования"
            @blur="$v.newLinks.$each.$iter[index].title.$touch()"
          />
          <template slot="errors">
            <template v-if="!$v.newLinks.$each.$iter[index].title.required">
              Заполните наименование ссылки
            </template>
          </template>
        </TFormControl>

        <!-- Ссылка-->
        <TFormControl
          :is-error="$v.newLinks.$each.$iter[index].link.$error"
          class="project-links-form__link"
        >
          <TInput
            v-model="link.link"
            class="project-links-form__input"
            placeholder="Ссылка"
            @blur="$v.newLinks.$each.$iter[index].link.$touch()"
          />

          <template slot="errors">
            <template v-if="!$v.newLinks.$each.$iter[index].link.required">
              Заполните ссылку
            </template>
            <template v-else-if="!$v.newLinks.$each.$iter[index].link.link">
              Некорректный URL
            </template>
          </template>
        </TFormControl>

        <!-- Кнопка удалить-->
        <span class="project-links-form__remove" @click="removeLink(index)">Удалить</span>
      </div>
      <TButton
        v-if="newLinks.length < 8"
        class="project-links-form__add-link-btn"
        type="button"
        theme="outline-primary"
        @click="addLink"
      >
        Добавить ссылку
      </TButton>
    </div>

    <div class="project-links-form__btn-panel">
      <div
        class="project-links-form"
        :style="{visibility: isSaved || serverError ? 'visible' : 'hidden'}"
      >
        <span v-if="isSaved" class="project-links-form__saved-text">
          Успешно сохранено!
        </span>
        <span v-else-if="serverError" class="project-links-form__error-text">
          {{ serverError }}
        </span>
      </div>
      <TButton
        class="project-links-form__submit-btn"
        type="submit"
        :loading="loading"
        :disabled="loading"
      >
        {{ btnText }}
      </TButton>
    </div>
  </form>
</template>

<script lang="ts">
import {
  Component, Prop, Vue, Watch,
} from 'vue-property-decorator';
import LinkEntity from '@/entities/LinkEntity';
import deepCopyFunction from '@/helpers/deepCopy';
import UrlHelper from '@/helpers/UrlHelper';
import TFormControl from '@/components/controls/TFormControl.vue';
import { Action, State } from 'vuex-class';
import { url } from '@/helpers/validators';
import { required } from 'vuelidate/lib/validators';

const namespace = 'savingProject';
const emptyLink: LinkEntity = { id: 0, link: '', title: '' };

@Component({
  components: {
    TFormControl,
  },

  validations: {
    newLinks: {
      $each: {
        title: {
          required,
        },
        link: {
          required,
          url,
        },
      },
    },
  },
} as any)
export default class ProjectLinksFormComponent extends Vue {
  @State('links', { namespace }) readonly links!: LinkEntity[];

  @Action('saveLinks', { namespace }) readonly saveLinks!: (links: LinkEntity[]) => void;

  @Prop({ default: 'Сохранить', type: String }) btnText!: string;

  newLinks: LinkEntity[] = [];

  loading = false;

  isSaved = false;

  serverError = '';

  @Watch('links', { immediate: true })
  private onLabels(newVal: LinkEntity[]): void {
    this.newLinks = deepCopyFunction(newVal);
  }

  addLink() {
    this.newLinks.push({ ...emptyLink });
  }

  removeLink(index: number) {
    this.newLinks.splice(index, 1);
  }

  async submitForm() {
    try {
      this.serverError = '';
      this.$v.$touch();

      if (this.$v.$invalid) return;

      this.loading = true;
      this.isSaved = false;

      this.newLinks = this.newLinks.map((link) => ({
        ...link,
        link: UrlHelper.getUrlWithHttpIfNeed(link.link),
      }));

      await this.saveLinks(this.newLinks);
      this.isSaved = true;
      this.loading = false;

      this.$emit('afterSubmit');
    } catch (e) {
      this.loading = false;
      this.serverError = 'Oops, что-то пошло не так';
    }
  }
}
</script>

<style lang="postcss" scoped>
  .project-links-form {
    &__description-text {
      line-height: 130%;
    }

    &__links {
      margin-top: 30px;
    }

    &__link-block {
      text-align: center;

      &:not(:first-child) {
        margin-top: 10px;
      }
    }

    &__input {
      width: 100%;
    }

    &__title {
      align-items: flex-start;
      width: 100%;
    }

    &__link {
      align-items: flex-start;
      width: 100%;
      margin-top: 10px;
    }

    &__remove {
      color: rgba(#FF4B3E, .7);
      margin-top: 15px;
      display: inline-block;
      cursor: pointer;
      transition: color .15s ease-out;

      &:hover {
        color: #FF4B3E;
      }
    }

    &__add-link-btn {
      width: 100%;
      margin-top: 30px;
    }

    &__btn-panel {
      display: flex;
      flex-direction: column;
      margin-top: 30px;
      align-items: center;
    }

    &__saved-text {
      color: #61C9A8;
    }

    &__error-text {
      color: rgba(#FF4B3E, .7);
    }

    &__submit-btn {
      width: 100%;
      margin-top: 15px;
    }
  }

  @media (min-width: 1200px) {
    .project-links-form {
      display: flex;
      flex-direction: column;

      &__description-text {
        max-width: 600px;
      }

      &__link-block {
        display: flex;
        max-width: 800px;
      }

      &__remove {
        margin: 12px 0 0 30px;
        display: flex;
      }

      &__link {
        margin: 0 0 0 30px;
      }

      &__add-link-btn {
        width: 192px;
        margin-top: 30px;
      }

      &__btn-panel {
        flex-direction: row;
        align-self: flex-end;
        align-items: center;
      }

      &__saved-text {
        color: #61C9A8;
        white-space: nowrap;
      }

      &__error-text {
        color: rgba(#FF4B3E, .7);
        white-space: nowrap;
      }

      &__submit-btn {
        min-width: 115px;
        align-self: flex-end;
        margin: 0 0 0 20px;
      }
    }
  }
</style>
