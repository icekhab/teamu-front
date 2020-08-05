<template>
  <form class="project-description-form" @submit.prevent="submitForm">
    <div class="project-description-form__description-text">
      Расскажите о своем проекте. Укажите название проекта и его краткое описание. Выберите лейблы, которые отображают в какой стадии находится ваш проект. Загрузите картинку вашего проекта (это может быть сам продукт или то, что его отображает).
    </div>
    <div class="project-description-form__controls">
      <div class="project-description-form__inputs">
        <TFormControl
          :is-error="$v.newProject.name.$error"
          class="registration__form-control"
        >
          <TInput
            v-model="newProject.name"
            class="project-description-form__name"
            maxlength="255"
            placeholder="Название"
            @blur="$v.newProject.name.$touch()"
          />

          <template slot="errors">
            <template v-if="!$v.newProject.name.required">
              Заполните название проекта
            </template>
          </template>
        </TFormControl>

        <TFormControl
          :is-error="$v.newProject.description.$error"
          class="registration__form-control"
        >
          <TTextArea
            v-model="newProject.description"
            class="project-description-form__description"
            maxlength="6000"
            rows="5"
            placeholder="Описание"
            @blur="$v.newProject.description.$touch()"
          />

          <template slot="errors">
            <template v-if="!$v.newProject.description.required">
              Заполните название проекта
            </template>
            <template v-if="!$v.newProject.description.minLength">
              Минимум 3 символа
            </template>
          </template>
        </TFormControl>

        <div class="project-description-form__labels-wrap">
          <span class="project-description-form__labels-header">Метка проекта</span>
          <ProjectLabelListCheck v-model="newLabels" class="project-description-form__labels" />
        </div>
      </div>

      <ImageChooser
        class="project-description-form__logo"
        name="project-logo"
        :base-src="newProject.imagePath"
      />
    </div>

    <div class="project-description-form__btn-panel">
      <div
        class="project-description-form__info-about-request-text"
        :style="{visibility: isSaved || serverError ? 'visible' : 'hidden'}"
      >
        <span v-if="isSaved" class="project-description-form__saved-text">
          Успешно сохранено!
        </span>
        <span v-else-if="serverError" class="project-description-form__error-text">
          {{ serverError }}
        </span>
      </div>
      <TButton
        class="project-description-form__submit"
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
import TInput from '@/components/controls/TInput.vue';
import TTextArea from '@/components/controls/TTextArea.vue';
import DescriptionProjectEntity from '@/entities/DescriptionProjectEntity';
import ImageChooser from '@/components/controls/ImageChooser.vue';
import LabelEntity from '@/entities/LabelEntity';
import MetrikaHelper from '@/helpers/MetrikaHelper';
import deepCopyFunction from '@/helpers/deepCopy';
import { Action, State } from 'vuex-class';
import {
  minLength, required,
} from 'vuelidate/lib/validators';
import TCheckbox from '~/components/controls/TCheckbox.vue';
import TFormControl from '~/components/controls/TFormControl.vue';
import TButton from '~/components/controls/TButton.vue';
import ProjectLabelListCheck from '~/components/common/ProjectLabelListCheck.vue';

const namespace = 'savingProject';

@Component({
  components: {
    ProjectLabelListCheck,
    TInput,
    TTextArea,
    TCheckbox,
    TButton,
    ImageChooser,
    TFormControl,
  },

  validations: {
    newProject: {
      name: {
        required,
      },
      description: {
        required,
        minLength: minLength(3),
      },
    },
  },
} as any)
export default class ProjectDescriptionFormComponent extends Vue {
  @State('project', { namespace }) readonly project!: DescriptionProjectEntity;

  @State('labels', { namespace }) readonly labels!: LabelEntity[];

  @Action('saveProject', { namespace }) readonly saveProject!: (project: DescriptionProjectEntity) => void;

  @Action('saveLabels', { namespace }) readonly saveLabels!: (labels: LabelEntity[]) => void;

  @Prop({ default: 'Сохранить', type: String }) btnText!: string;

  newProject: DescriptionProjectEntity = { id: 0, name: '', description: '' };

  newLabels: LabelEntity[] = [];

  loading = false;

  isSaved = false;

  serverError = '';

  @Watch('project', { immediate: true })
  private onProject(newVal: DescriptionProjectEntity): void {
    this.newProject = { ...newVal };
  }

  @Watch('labels', { immediate: true })
  private onLabels(newVal: LabelEntity[]): void {
    this.newLabels = deepCopyFunction(newVal);
  }

  async submitForm() {
    MetrikaHelper.saveEditedProjectButtonPressed();

    try {
      this.serverError = '';
      this.$v.$touch();

      if (this.$v.$invalid) return;

      this.loading = true;
      this.isSaved = false;

      await this.saveProject(this.newProject);
      await this.saveLabels(this.newLabels);
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
  .project-description-form {
    &__name {
      width: 100%;
    }

    &__description-text {
      line-height: 135%;
      margin-bottom: 30px;
    }

    &__description {
      width: 100%;
      margin-top: 20px;
      resize: none;
      -ms-overflow-style: none;
      overflow: -moz-scrollbars-none;

      &::-webkit-scrollbar {
        width: 0 !important
      }
    }

    &__labels {
      align-items: flex-start;
    }

    &__labels-header {
      display: block;
      margin-bottom: 20px;
    }

    &__labels-wrap {
      background: #FFFFFF;
      margin-top: 20px;
      padding: 20px;
      border: 1px solid var(--borderColor);
      box-sizing: border-box;
      border-radius: var(--defaultBorderRadius);
    }

    &__logo {
      margin-top: 20px;
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

    &__submit {
      width: 100%;
      margin-top: 15px;
    }
  }

  @media (min-width: 992px) {
    .project-description-form {
      display: flex;
      flex-direction: column;

      &__description-text {
        max-width: 600px;
        margin-bottom: 30px;
      }

      &__controls {
        display: flex;
      }

      &__inputs {
        order: 1;
        flex: 1;
      }

      &__logo {
        margin: 0 40px 0 0;
      }

      &__labels-header {
        display: none;
      }

      &__labels-wrap {
        padding: 0;
        background: none;
        border: 0;
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
        white-space: nowrap;
      }

      &__submit {
        min-width: 115px;
        align-self: flex-end;
        margin: 0 0 0 20px;
      }
    }
  }
</style>
