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
          btn-text="Далее"
          @afterSubmit="submitDescriptionForm"
        />
        <ProjectLinksForm
          v-show="selectedTab === 'links'"
          class="project-new__form"
          btn-text="Далее"
          @afterSubmit="submitLinkForm"
        />
        <ProjectVacanciesForm
          v-show="selectedTab === 'vacancies'"
          class="project-new__form"
          btn-text="Добавить проект"
          @afterSubmit="submitVacanciesForm"
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
import { State } from 'vuex-class';

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
})
export default class ProjectNewPageComponent extends Vue {
  @State('project', { namespace }) readonly project!: DescriptionProjectEntity;

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

  async submitDescriptionForm() {
    this.selectedTab = 'links';
    this.tabs[1].disabled = false;
  }

  async submitLinkForm() {
    this.selectedTab = 'vacancies';
    this.tabs[2].disabled = false;
  }

  async submitVacanciesForm() {
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
