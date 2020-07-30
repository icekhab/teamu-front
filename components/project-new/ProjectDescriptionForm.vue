<template>
  <form class="project-description-form" @submit.prevent="submitForm">
    <div class="project-description-form__description-text">
      Расскажите о своем проекте. Укажите название проекта и его краткое описание. Выберите лейблы, которые отображают в какой стадии находится ваш проект. Загрузите картинку вашего проекта (это может быть сам продукт или то, что его отображает).
    </div>
    <div class="project-description-form__controls">
      <div class="project-description-form__inputs">
        <TInput
          v-model="newProject.name"
          class="project-description-form__name"
          placeholder="Название"
        />
        <TTextArea
          v-model="newProject.description"
          class="project-description-form__description"
          maxlength="6000"
          rows="5"
          placeholder="Описание"
        />
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

    <TButton class="project-description-form__submit" type="submit">
      Далее
    </TButton>
  </form>
</template>

<script lang="ts">
import {
  Component, Emit, Prop, Vue, Watch,
} from 'vue-property-decorator';
import TInput from '@/components/controls/TInput.vue';
import TTextArea from '@/components/controls/TTextArea.vue';
import DescriptionProjectEntity from '@/entities/DescriptionProjectEntity';
import ImageChooser from '@/components/controls/ImageChooser.vue';
import LabelEntity from '@/entities/LabelEntity';
import deepCopyFunction from '@/helpers/deepCopy';
import TCheckbox from '~/components/controls/TCheckbox.vue';
import TButton from '~/components/controls/TButton.vue';
import ProjectLabelListCheck from '~/components/common/ProjectLabelListCheck.vue';

@Component({
  components: {
    ProjectLabelListCheck,
    TInput,
    TTextArea,
    TCheckbox,
    TButton,
    ImageChooser,
  },
})
export default class ProjectDescriptionFormComponent extends Vue {
  @Prop({ required: true, type: Object }) project!: DescriptionProjectEntity;

  @Prop({ required: true, type: Array }) labels!: LabelEntity[];

  newProject = { ...this.project };

  newLabels = [...this.labels];

  @Watch('project', { immediate: false })
  private onProject(newVal: DescriptionProjectEntity): void {
    this.newProject = deepCopyFunction(newVal);
  }

  @Watch('labels', { immediate: false })
  private onLabels(newVal: LabelEntity[]): void {
    this.newLabels = deepCopyFunction(newVal);
  }

  @Emit('submit')
  submitForm() {
    return { project: this.newProject, labels: this.newLabels };
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

    &__submit {
      width: 100%;
      margin-top: 30px;
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

      &__submit {
        width: 115px;
        align-self: flex-end;
      }
    }
  }
</style>
