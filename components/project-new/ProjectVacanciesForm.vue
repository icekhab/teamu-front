<template>
  <form class="project-vacancies-form" @submit.prevent="submitForm">
    Форма добавления вакансий
    <TButton
      class="project-vacancies-form__submit-btn"
      type="submit"
      theme="primary"
    >
      Добавить проект
    </TButton>
  </form>
</template>

<script lang="ts">
import {
  Component, Emit, Vue,
} from 'vue-property-decorator';

@Component({
  components: {},
})
export default class ProjectVacanciesFormComponent extends Vue {
  @Emit('submit')
  submitForm() {}
}
</script>

<style lang="postcss" scoped>
  .project-vacancies-form {
    &__submit-btn {
      margin-top: 30px;
      width: 100%;
    }
  }
</style>
