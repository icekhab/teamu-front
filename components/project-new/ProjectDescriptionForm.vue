<template>
  <form class="project-description-form" @submit.prevent="submitForm">
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
      <ProjectLabelListCheck v-model="newLabels" class="project-description-form__labels" />
    </div>
    <ImageChooser class="project-description-form__logo" name="project-logo" :base-src="newProject.imagePath" />
    <TButton class="project-description-form__submit" type="submit">
      Далее
    </TButton>
  </form>
</template>

<script lang="ts">
import {
  Component, Emit, Prop, Vue,
} from 'vue-property-decorator';
import TInput from '@/components/controls/TInput.vue';
import TTextArea from '@/components/controls/TTextArea.vue';
import DescriptionProjectEntity from '@/entities/DescriptionProjectEntity';
import ImageChooser from '@/components/controls/ImageChooser.vue';
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
  @Prop({ required: false, type: Object }) project?: DescriptionProjectEntity;

  @Prop({ required: false, type: Array }) labels?: DescriptionProjectEntity;

  newProject = this.project || {};

  newLabels = this.labels || [];

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

    &__description {
      width: 100%;
      margin-top: 20px;
      resize: none;
    }

    &__labels {
      align-items: flex-start;
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
</style>
