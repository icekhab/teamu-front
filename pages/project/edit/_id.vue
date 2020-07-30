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
import { Action, State } from 'vuex-class';
import LabelEntity from '@/entities/LabelEntity';

const namespace = 'savingProject';

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
export default class MainPageComponent extends Vue {
  @State('project', { namespace }) readonly project!: DescriptionProjectEntity;

  @State('labels', { namespace }) readonly labels!: LabelEntity[];

  @State('links', { namespace }) readonly links!: LinkEntity[];

  @State('vacancies', { namespace }) readonly vacancies!: VacancyEntity[];

  @Action('saveProject', { namespace }) readonly saveProject!: (project: DescriptionProjectEntity) => void;

  @Action('saveLabels', { namespace }) readonly saveLabels!: (labels: LabelEntity[]) => void;

  @Action('saveLinks', { namespace }) readonly saveLinks!: (links: LinkEntity[]) => void;

  @Action('saveVacancies', { namespace }) readonly saveVacancies!: (vacancies: VacancyEntity[]) => void;

  tabs: TabEntity[] = [
    {
      value: 'description',
      title: 'Описание',
    },
    {
      value: 'links',
      title: 'Ссылки',
      disabled: true,
    },
    {
      value: 'vacancies',
      title: 'Мы ищем',
      disabled: true,
    },
  ];

  selectedTab = 'description';

  async mounted() {
    await this.$store.dispatch('savingProject/getProject', this.$route.params.id);
  }

  async submitDescriptionForm({ project, labels }: any) {
    await this.saveProject(project);
    await this.saveLabels(labels);

    this.selectedTab = 'links';
    this.tabs[1].disabled = false;
  }

  async submitLinkForm(links: LinkEntity[]) {
    await this.saveLinks(links);

    this.selectedTab = 'vacancies';
    this.tabs[2].disabled = false;
  }

  async submitVacanciesForm(vacancies: VacancyEntity[]) {
    await this.saveVacancies(vacancies);

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
