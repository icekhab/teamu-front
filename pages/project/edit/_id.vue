<template>
  <MenuLayout>
    <div class="project-new">
      <h1 class="project-new__header">
        Редактирование проекта
      </h1>
      <div class="project-new__content">
        <div class="project-new__tabs-wrap">
          <Tabs
            v-model="selectedTab"
            :tabs="tabs"
            class="project-new__tabs"
          />
        </div>
        <ProjectDescriptionForm
          v-show="selectedTab === 'description'"
          class="project-new__form"
        />
        <ProjectLinksForm
          v-show="selectedTab === 'links'"
          class="project-new__form"
        />
        <ProjectVacanciesForm
          v-show="selectedTab === 'vacancies'"
          class="project-new__form"
        />
      </div>
    </div>
  </MenuLayout>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import MenuLayout from '@/components/layout/MenuLayout.vue';
import ProjectInfo from '@/components/project/ProjectInfo.vue';
import Tabs from '@/components/common/Tabs.vue';
import TabEntity from '@/entities/TabEntity';
import ProjectLinksForm from '@/components/project-new/ProjectLinksForm.vue';
import ProjectDescriptionForm from '@/components/project-new/ProjectDescriptionForm.vue';
import ProjectVacanciesForm from '@/components/project-new/ProjectVacanciesForm.vue';
import { Action } from 'vuex-class';

@Component({
  components: {
    ProjectDescriptionForm,
    ProjectLinksForm,
    ProjectVacanciesForm,
    Tabs,
    ProjectInfo,
    MenuLayout,
  },

  async fetch({
    store,
  }) {
    await store.dispatch('labels/getLabels');
  },

  validate({ params }: any) {
    return !!params.id;
  },
})
export default class ProjectEditPageComponent extends Vue {
  @Action('getProject', { namespace: 'savingProject' }) readonly getProject!: (projectId: number) => void;

  tabs: TabEntity[] = [
    {
      value: 'description',
      title: 'Описание',
    },
    {
      value: 'links',
      title: 'Ссылки',
    },
    {
      value: 'vacancies',
      title: 'Мы ищем',
    },
  ];

  selectedTab = 'description';

  async mounted() {
    await this.getProject(Number(this.$route.params.id));
  }
}
</script>

<style lang="postcss" scoped>
.project-new {
  width: 100%;
  min-width: 300px;
  max-width: 400px;
  flex-direction: column;

  &__content {
    display: flex;
    flex-direction: column;
    margin-top: 30px;
  }

  &__tabs {
  }

  &__form {
    margin-top: 30px;
    width: 100%;
  }
}

@media (min-width: 992px) {
  .project-new {
    max-width: 800px;
    display: flex;

    &__form {
      margin-top: 0;
    }

    &__content {
      display: flex;
      flex-direction: row;
      align-items: flex-start;
    }

    &__tabs-wrap {
      min-width: 180px;
      background: #FFFFFF;
      border-radius: var(--defaultBorderRadius);
      height: auto;
      padding: 29px 20px 29px 39px;
      margin-right: 40px;
    }
  }
}

@media (min-width: 1200px) {
  .project-new {
    display: flex;
    max-width: 1108px;
  }
}

@media (min-width: 1200px) {
  .project-new {
    display: flex;
    max-width: 1400px;
  }
}
</style>
