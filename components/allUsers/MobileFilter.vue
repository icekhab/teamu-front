<template>
  <div class="all-users-mobile-filter">
    <span class="all-users-mobile-filter__header">Фильтры:</span>
    <div class="all-users-mobile-filter__items">
      <TInput
        v-model="role"
        class="all-users-mobile-filter__role-search-input"
        placeholder="Введите роль"
      />
      <TInput
        v-model="location"
        class="all-users-mobile-filter__location-search-input"
        placeholder="Введите город"
      />
      <TCheckbox
        v-model="hasActiveProjects"
        class="all-users-mobile-filter__is-active-cbx"
      >
        Есть активные проекты
      </TCheckbox>
    </div>
    <TButton
      class="all-users-mobile-filter__confirm"
      theme="primary"
      @click="applyFilter"
    >
      Применить
    </TButton>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import FilterIcon from '~/static/images/svg/filter-icon.svg';
import ProjectLabel from '~/components/common/ProjectLabel.vue';
import TCheckbox from '~/components/controls/TCheckbox.vue';

@Component({
  components: {
    ProjectLabel,
    FilterIcon,
    TCheckbox,
  },
})
export default class MobileFilterComponent extends Vue {
  @Prop({ default: '', type: String }) typedRole!: string;

  @Prop({ default: '', type: String }) typedLocation!: string;

  @Prop({ default: false, type: Boolean }) checkedHasActiveProjects!: boolean;

  role = this.typedRole;

  location = this.typedLocation;

  hasActiveProjects = this.checkedHasActiveProjects;

  applyFilter() {
    this.$emit('filter', {
      location: this.location,
      role: this.role,
      hasActiveProjects: this.hasActiveProjects,
    });
  }
}
</script>

<style lang="postcss" scoped>
  .all-users-mobile-filter {
    display: flex;
    flex-direction: column;
    border-radius: var(--defaultBorderRadius);

    &__items {
      display: flex;
      flex-direction: column;
    }

    &__role-search-input {
      margin-top: 20px;
    }

    &__location-search-input {
      margin-top: 20px;
    }

    &__is-active-cbx {
      margin-top: 20px;
    }

    &__confirm {
      width: 100%;
      margin-top: 30px;
    }
  }
</style>
