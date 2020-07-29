<template>
  <form class="project-links-form" @submit.prevent="submitForm">
    <span class="project-links-form__description-text">
      Здесь вы можете добавить полезные ссылки на ваши материалы по проекту. Вместо “Наименования” вы можете указать, например “Наш сайт” / “Ссылка на дизайн проект” / “Ссылка на нашу презентацию” и тому подобные.
    </span>
    <div class="project-links-form__links">
      <div v-for="(link, index) in newLinks" :key="index" class="project-links-form__link-block">
        <TInput
          v-model="link.title"
          class="project-links-form__title"
          placeholder="Наименования"
        />
        <TInput
          v-model="link.link"
          class="project-links-form__link"
          placeholder="Ссылка"
        />
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
    <TButton
      class="project-links-form__submit-btn"
      type="submit"
      theme="primary"
    >
      Далее
    </TButton>
  </form>
</template>

<script lang="ts">
import {
  Component, Emit, Prop, Vue,
} from 'vue-property-decorator';
import LinkEntity from '@/entities/LinkEntity';

const emptyLink: LinkEntity = { id: 0, link: '', title: '' };

@Component({
  components: {},
})
export default class ProjectLinksFormComponent extends Vue {
  @Prop({
    default: [{ ...emptyLink }],
    type: Array,
  })
  readonly links!: LinkEntity[];

  newLinks = this.links;

  addLink() {
    this.newLinks.push({ ...emptyLink });
  }

  @Emit('submit')
  submitForm() {
    return this.newLinks;
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

    &__link-block:not(:first-child) {
      margin-top: 30px;
    }

    &__title {
      width: 100%;
    }

    &__link {
      width: 100%;
      margin-top: 10px;
    }

    &__add-link-btn {
      width: 100%;
      margin-top: 30px;
    }

    &__submit-btn {
      width: 100%;
      margin-top: 30px;
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

      &__link {
        margin: 0 0 0 30px;
      }

      &__add-link-btn {
        width: 192px;
        margin-top: 30px;
      }

      &__submit-btn {
        width: 115px;
        align-self: flex-end;
      }
    }
  }
</style>
