<template>
  <div class="all-projects-header">
    <h1>Список проектов</h1>
    <TButton
      class="all-projects-header__add-project-btn"
      theme="black"
    >
      Добавить проект
    </TButton>
    <TButton
      class="all-projects-header__add-project-btn"
      theme="white-grey"
    >
      <span class="all-projects-header__add-project-btn-slot">
        <FilterIcon class="all-projects-header__add-project-btn-icon" />
        Фильтры
      </span>
    </TButton>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import TButton from '~/components/controls/TButton.vue';
import ProjectCard from '~/components/common/ProjectCard.vue';
import FilterIcon from '~/static/images/svg/filter-icon.svg';

@Component({
  components: {
    TButton,
    FilterIcon,
    ProjectCard,
  },
})
export default class MenuComponent extends Vue {}
</script>

<style lang="postcss" scoped>
  .all-projects-header {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;

    &__add-project-btn {
      margin-top: 15px;
    }

    &__add-project-btn-slot {
      display: inline-flex;
      align-items: center;
    }

    &__add-project-btn-icon {
      margin-right: 8px;
      color: var(--blackColor);
    }
  }
</style>
