<template>
  <MenuLayout>
    <div class="project-page">
      <ProjectInfo />
      <div
        v-if="project.vacancy.length"
        class="project-page__vacancies"
      >
        <span class="project-page__vacancy-header">Мы ищем</span>
        <Vacancies :vacancies="project.vacancy" />
      </div>
    </div>
  </MenuLayout>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { State } from 'vuex-class';
import MenuLayout from '@/components/layout/MenuLayout.vue';
import DetailProjectEntity from '@/entities/DetailProjectEntity';
import ProjectInfo from '@/components/project/ProjectInfo.vue';
import Vacancies from '@/components/project/Vacancies.vue';

const namespace = 'project';

@Component({
  components: {
    Vacancies,
    ProjectInfo,
    MenuLayout,
  },

  async fetch({
    store, params: { id },
  }) {
    await store.dispatch('project/getProject', id);
  },

  validate({ params }: any) {
    return !!params.id;
  },
})
export default class MainPageComponent extends Vue {
  @State('project', { namespace }) project!: DetailProjectEntity;
}
</script>

<style lang="postcss" scoped>
  .project-page {
    width: 100%;
    min-width: 300px;
    max-width: 400px;
    flex-direction: column;

    &__vacancies {
      margin-top: 30px;
    }

    &__vacancy-header {
      display: block;
      font-weight: bold;
      font-size: 22px;
      line-height: 27px;
      margin-bottom: 20px;
    }
  }

  @media (min-width: 992px) {
    .project-page {
      max-width: 800px;
      display: flex;
    }
  }

  @media (min-width: 1200px) {
    .project-page {
      display: flex;
      max-width: 1108px;
    }

    &__vacancies {
      margin-top: 75px;
    }

    &__vacancy-header {
      margin-bottom: 20px;
    }
  }

  @media (min-width: 1200px) {
    .project-page {
      display: flex;
      max-width: 1400px;
    }
  }
</style>
