<template>
  <MenuLayout>
    <div class="project-new">
      <h1 class="project-new__header">
        Добавление проекта
      </h1>
      <Tabs
        v-model="selectedTab"
        :tabs="tabs"
        class="project-new__tabs"
      />
      <ProjectDescriptionForm
        v-show="selectedTab === 'description'"
        class="project-new__form"
        :project="project"
        :labels="labels"
        @submit="submitDescriptionForm"
      />
      <ProjectLinksForm
        v-show="selectedTab === 'links'"
        class="project-new__form"
        :links="links"
        @submit="submitLinkForm"
      />
      <ProjectVacanciesForm
        v-show="selectedTab === 'vacancies'"
        class="project-new__form"
        @submit="submitVacanciesForm"
      />
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
import DescriptionProjectEntity from '@/entities/DescriptionProjectEntity';
import ProjectDescriptionForm from '@/components/project-new/ProjectDescriptionForm.vue';
import ProjectVacanciesForm from '@/components/project-new/ProjectVacanciesForm.vue';
import LinkEntity from '@/entities/LinkEntity';

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
})
export default class MainPageComponent extends Vue {
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

  project: DescriptionProjectEntity = {
    id: 0,
    description: '',
    name: '',
  };

  labels = [];

  links: LinkEntity[] = [{ id: 0, link: '', title: '' }];

  selectedTab = 'description';

  async submitDescriptionForm({ project, labels }: any) {
    this.project = project;
    this.labels = labels;

    this.selectedTab = 'links';
    // const projectId = await ProjectService.create(project);
    // await LabelService.saveLabels(projectId, labels);
  }

  async submitLinkForm(links: LinkEntity[]) {
    this.links = links;

    this.selectedTab = 'vacancies';
  }

  async submitVacanciesForm() {
    alert('Проект создан, вы восхитительны!');
  }
}
</script>

<style lang="postcss" scoped>
  .project-new {
    width: 100%;
    min-width: 300px;
    max-width: 400px;
    flex-direction: column;

    &__tabs {
      margin-top: 30px;
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
