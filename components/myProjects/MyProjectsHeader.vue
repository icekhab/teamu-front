<template>
  <div class="my-projects-header">
    <div class="my-projects-header__top">
      <h1 class="my-projects-header__text">
        Мои проекты
      </h1>
      <TInput
        :value="filter.search"
        class="my-projects-header__search-input"
        placeholder="Поиск проекта"
        @input="setSearchFilterDebounce($event)"
      />
      <TButton
        v-if="isAuthorize"
        key="addProjectButton"
        class="my-projects-header__add-project-btn"
        theme="primary"
        :to="createProjectLink"
        @click="onCreateProject"
      >
        Добавить проект
      </TButton>
      <TButton
        v-else
        class="my-projects-header__add-project-btn"
        theme="primary"
        type="button"
        @click.native="onCreateProjectNotAuthorized"
      >
        Добавить проект
      </TButton>
      <TButton
        class="my-projects-header__filter-btn"
        theme="white-grey"
        @click="$modal.show('my-projects-filter-modal')"
      >
        <span class="my-projects-header__add-project-btn-slot">
          <FilterIcon class="my-projects-header__add-project-btn-icon" />
          Фильтры
        </span>
      </TButton>
    </div>
    <div class="my-projects-header__bottom">
      <span>Выберите метку проекта:</span>
      <div class="my-projects-header__filter-labels">
        <template v-for="(label, _, index) in ProjectLabelEnum">
          <ProjectLabel
            :key="index"
            class="my-projects-header__filter-label-item"
            :label="label"
            :check="filter.projectLabels.includes(label)"
            active
            @click.native="changeLabel(label)"
          />
          <div v-if="index === 4" :key="index - 5" class="break" />
        </template>
      </div>
    </div>

    <client-only>
      <modal
        name="my-projects-filter-modal"
        class="my-projects-header__mobile-filter-popup"
        height="auto"
        adaptive
      >
        <MobileFilter
          class="my-projects-header__mobile-filter"
          name="my-projects"
          :checked-labels="filter.projectLabels"
          @filter="changeMobileFilter"
        />
      </modal>
    </client-only>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ProjectLabelEnum from '@/enums/ProjectLabelEnum';
import { Mutation, State } from 'vuex-class';
import ProjectsFilterEntity from '@/entities/ProjectsFilterEntity';
import debounce from '@/helpers/debounce';
import FilterIcon from '@/static/images/svg/filter-icon.svg';
import ProjectCard from '@/components/common/ProjectCard.vue';
import ProjectLabel from '@/components/common/ProjectLabel.vue';
import MobileFilter from '@/components/allProjects/MobileFilter.vue';
import MetrikaHelper from '@/helpers/MetrikaHelper';

const namespace = 'myProjects';

@Component({
  components: {
    ProjectLabel,
    FilterIcon,
    ProjectCard,
    MobileFilter,
  },
})
export default class MyProjectsHeaderComponent extends Vue {
  @State('filter', { namespace }) filter!: ProjectsFilterEntity;

  @State('isAuthorize', { namespace: 'user' }) isAuthorize!: boolean;

  @Mutation('setIsShowLogin', { namespace: 'user' }) setIsShowLogin!: (isShowLogin: boolean) => void;

  @Mutation('setMySearchFilter', { namespace }) setMySearchFilter!: (search: string) => void;

  @Mutation('addMyProjectLabelFilter', { namespace }) addMyProjectLabelFilter!: (label: ProjectLabelEnum) => void;

  @Mutation('deleteMyProjectLabelFilter', { namespace }) deleteMyProjectLabelFilter!: (label: ProjectLabelEnum) => void;

  @Mutation('setMyProjectLabelFilter', { namespace }) setProjectLabelFilter!: (labels: ProjectLabelEnum[]) => void;

  setSearchFilterDebounce = debounce(this.setMySearchFilter, 500);

  ProjectLabelEnum = ProjectLabelEnum;

  isVisibleMobileFilter = false;

  createProjectLink = {
    name: 'project-new',
  };

  onCreateProject() {
    MetrikaHelper.addProjectButtonButtonPressed();
  }

  onCreateProjectNotAuthorized() {
    this.onCreateProject();
    this.setIsShowLogin(true);
  }

  changeLabel(label: ProjectLabelEnum) {
    MetrikaHelper.filterChanged(label, 'my-projects');

    const isLabelChecked = this.filter.projectLabels.includes(label);

    if (isLabelChecked) {
      this.deleteMyProjectLabelFilter(label);
    } else {
      this.addMyProjectLabelFilter(label);
    }
  }

  changeMobileFilter(labels: ProjectLabelEnum[]) {
    this.setProjectLabelFilter(labels);
    this.$modal.hide('my-projects-filter-modal');
    this.isVisibleMobileFilter = false;
  }
}
</script>

<style lang="postcss" scoped>
  .my-projects-header {
    display: flex;
    flex-direction: column;
    width: 100%;

    &__top {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      width: 100%;
    }

    &__bottom {
      display: none;
    }

    &__add-project-btn {
      width: 100%;
      margin: 15px 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    &__filter-btn {
      width: 100%;
    }

    &__add-project-btn-slot {
      display: inline-flex;
      align-items: center;
    }

    &__add-project-btn-icon {
      margin-right: 8px;
      color: var(--blackColor);
    }

    &__search-input {
      display: none;
    }

    &__mobile-filter-popup {
      width: 100%;
      //position: fixed;
      //top: 0;
      //left: 0;
      //height: 100vh;
      //width: 100%;
      //background: rgba(#333333, .85);
      //display: flex;
      //justify-content: center;
      //align-items: center;
      //padding: 10px;
    }

    &__mobile-filter {
      width: 100%;
      padding: 30px 10px 42px;
      background: var(--backgroundPageColor);
    }
  }

  @media (min-width: 992px) {
    .my-projects-header {
      flex-direction: column;

      &__top {
        flex-direction: row;
      }

      &__bottom {
        display: flex;
        margin-top: 50px;
        font-size: 16px;
        line-height: 19px;
      }

      &__filter-labels {
        display: flex;
        flex: 1;
        flex-wrap: wrap;
        margin-left: 20px;
      }

      &__filter-label-item {
        margin-right: 20px;
        cursor: pointer;
      }

      &__text {
        flex: 1;
      }

      &__filter-btn {
        display: none;
      }

      &__add-project-btn {
        margin: 0;
        width: 177px;
      }

      &__search-input {
        display: inline;
        width: 326px;
        margin-right: 20px;
        background: #fff url("/images/svg/search-icon.svg") no-repeat scroll 22px 11px;
        padding-left: 57px!important;
      }

      &__mobile-filter-popup {
        display: none;
      }
    }
  }

  @media (min-width: 1200px) {
    .my-projects-header {
      &__search-input {
        display: inline;
        width: 356px;
        margin-right: 30px;
      }
    }
  }

  .break {
    flex-basis: 100%;
    height: 22px;
  }
</style>
