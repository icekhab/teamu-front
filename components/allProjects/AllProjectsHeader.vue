<template>
  <div class="all-projects-header">
    <div class="all-projects-header__top">
      <h1 class="all-projects-header__text">
        Список проектов
      </h1>
      <TInput
        :value="filter.search"
        class="all-projects-header__search-input"
        placeholder="Поиск проекта"
        @input="setSearchFilterDebounce($event)"
      />
      <TButton
        class="all-projects-header__add-project-btn"
        theme="black"
      >
        Добавить проект
      </TButton>
      <TButton
        class="all-projects-header__filter-btn"
        theme="white-grey"
      >
        <span class="all-projects-header__add-project-btn-slot">
          <FilterIcon class="all-projects-header__add-project-btn-icon" />
          Фильтры
        </span>
      </TButton>
    </div>
    <div class="all-projects-header__bottom">
      <span>Выберите метку проекта:</span>
      <div class="all-projects-header__filter-labels">
        <template v-for="(label, _, index) in ProjectLabelEnum">
          <ProjectLabel
            :key="index"
            class="all-projects-header__filter-label-item"
            :label="label"
            :check="filter.projectLabels.includes(label)"
            @click.native="changeLabel(label)"
          />
          <div v-if="index === 4" :key="index" class="break" />
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ProjectLabelEnum from '@/enums/ProjectLabelEnum';
import { Mutation, State } from 'vuex-class';
import ProjectsFilterEntity from '@/entities/ProjectsFilterEntity';
import debounce from '@/helpers/debounce';
import ProjectCard from '~/components/common/ProjectCard.vue';
import FilterIcon from '~/static/images/svg/filter-icon.svg';
import ProjectLabel from '~/components/common/ProjectLabel.vue';

const namespace = 'allProjects';

@Component({
  components: {
    ProjectLabel,
    FilterIcon,
    ProjectCard,
  },
})
export default class AllProjectsHeaderComponent extends Vue {
  @State('filter', { namespace }) filter!: ProjectsFilterEntity;

  @Mutation('setSearchFilter', { namespace }) setSearchFilter!: (search: string) => void;

  @Mutation('addProjectLabelFilter', { namespace }) addProjectLabelFilter!: (label: ProjectLabelEnum) => void;

  @Mutation('deleteProjectLabelFilter', { namespace }) deleteProjectLabelFilter!: (label: ProjectLabelEnum) => void;

  setSearchFilterDebounce = debounce(this.setSearchFilter, 500);

  ProjectLabelEnum = ProjectLabelEnum;

  changeLabel(label: ProjectLabelEnum) {
    // eslint-disable-next-line no-debugger
    debugger;
    const isLabelChecked = this.filter.projectLabels.includes(label);
    // eslint-disable-next-line no-debugger
    debugger;

    if (isLabelChecked) {
      this.deleteProjectLabelFilter(label);
    } else {
      this.addProjectLabelFilter(label);
    }
  }
}
</script>

<style lang="postcss" scoped>
  .all-projects-header {
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
      margin: 15px 0;
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

    @media (min-width: 992px) {
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
        padding-left: 57px;
      }
    }

    @media (min-width: 1200px) {
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
