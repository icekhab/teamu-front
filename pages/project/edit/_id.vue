<template>
  <MenuLayout>
    <div class="project-new">
      <h1 class="project-new__header">
        Добавление проекта
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
          :vacancies="vacancies"
          @submit="submitVacanciesForm"
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
import DescriptionProjectEntity from '@/entities/DescriptionProjectEntity';
import ProjectDescriptionForm from '@/components/project-new/ProjectDescriptionForm.vue';
import ProjectVacanciesForm from '@/components/project-new/ProjectVacanciesForm.vue';
import LinkEntity from '@/entities/LinkEntity';
import VacancyEntity from '@/entities/VacancyEntity';
import VacancyShareType from '@/enums/VacancyShareType';
import ProjectService from '@/services/ProjectService';
import LabelService from '@/services/LabelService';
import LinkService from '@/services/LinkService';
import VacancyService from '@/services/VacancyService';

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

  vacancies: VacancyEntity[] = [{ id: 0, title: '', shareType: VacancyShareType.share }];

  selectedTab = 'description';

  async submitDescriptionForm({ project, labels }: any) {
    this.project = project;
    this.labels = labels;

    this.project.id = await ProjectService.create(this.project);

    await LabelService.saveLabels(this.project.id, this.labels);
  }

  async submitLinkForm(links: LinkEntity[]) {
    this.links = links;

    const creatingLinksPromises = this.links.map(
      (link) => LinkService.create(this.project.id, link),
    );

    await Promise.all(creatingLinksPromises);
  }

  async submitVacanciesForm(vacancies: VacancyEntity[]) {
    const creatingVacanciesPromises = vacancies.map(
      (vacancy) => VacancyService.create(this.project.id, vacancy),
    );

    await Promise.all(creatingVacanciesPromises);

    await this.$router.push({
      name: 'project-id',
      params: {
        id: this.project.id.toString(),
      },
    });
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
