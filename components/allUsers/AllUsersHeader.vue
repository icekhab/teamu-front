<template>
  <div class="all-users-header">
    <div class="all-users-header__top">
      <h1 class="all-users-header__text">
        Пользователи
      </h1>
      <TButton
        class="all-users-header__filter-btn"
        theme="white-grey"
        @click="$modal.show('all-user-filter-modal')"
      >
        <span class="all-users-header__open-filters-btn-slot">
          <FilterIcon class="all-users-header__open-filters-btn-icon" />
          Фильтры
        </span>
      </TButton>
    </div>
    <div class="all-users-header__bottom">
      <div class="all-users-header__filter-items">
        <TInput
          :value="filter.role"
          class="all-users-header__role-search-input"
          placeholder="Введите роль"
          @input="changeRoleFilter"
        />
        <TInput
          :value="filter.location"
          class="all-users-header__location-search-input"
          placeholder="Введите город"
          @input="changeLocationFilter"
        />
        <TCheckbox
          :value="filter.hasActiveProjects"
          class="all-users-header__is-active-cbx"
          @input="changeHasActiveProjectsFilter"
        >
          Есть активные проекты
        </TCheckbox>
      </div>
    </div>
    <client-only>
      <modal
        name="all-user-filter-modal"
        class="all-users-header__mobile-filter-popup"
        height="auto"
        adaptive
      >
        <MobileFilter
          class="all-users-header__mobile-filter"
          name="all-users"
          :typed-role="filter.role"
          :typed-location="filter.location"
          :checked-has-active-projects="filter.hasActiveProjects"
          @filter="changeMobileFilter"
        />
      </modal>
    </client-only>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Mutation, State } from 'vuex-class';
import UsersFilterEntity from '@/entities/UsersFilterEntity';
import FilterIcon from '@/static/images/svg/filter-icon.svg';
import MobileFilter from './MobileFilter.vue';
import TCheckbox from '~/components/controls/TCheckbox.vue';

const namespace = 'allUsers';

@Component({
  components: {
    FilterIcon,
    MobileFilter,
    TCheckbox,
  },
})
export default class AllUsersHeader extends Vue {
  @State('filter', { namespace }) filter!: UsersFilterEntity;

  @Mutation('setFilter', { namespace }) setFilter!: (filter: UsersFilterEntity) => void;

  @Mutation('setSearchRoleFilter', { namespace }) setSearchRoleFilter!: (role: string) => void;

  @Mutation('setSearchLocationFilter', { namespace }) setSearchLocationFilter!: (location: string) => void;

  @Mutation('setHasActiveProjectsFilter', { namespace }) setHasActiveProjectsFilter!: (hasActiveProjects: boolean) => void;

  isVisibleMobileFilter = false;

  changeHasActiveProjectsFilter(hasActiveProjects: boolean) {
    this.setHasActiveProjectsFilter(hasActiveProjects);
  }

  changeRoleFilter(role: string) {
    this.setSearchRoleFilter(role);
  }

  changeLocationFilter(location: string) {
    this.setSearchLocationFilter(location);
  }

  changeMobileFilter(filter: UsersFilterEntity) {
    this.setFilter(filter);
    this.$modal.hide('all-user-filter-modal');
    this.isVisibleMobileFilter = false;
  }
}
</script>

<style lang="postcss" scoped>
  .all-users-header {
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

    &__open-filters-btn {
      width: 100%;
      margin: 15px 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    &__filter-btn {
      width: 100%;
      margin-top: 30px;
      color: var(--primaryColor);
      border: 1px solid var(--primaryColor);
    }

    &__open-filters-btn-slot {
      display: inline-flex;
      align-items: center;
    }

    &__open-filters-btn-icon {
      margin-right: 8px;
      color: var(--primaryColor);
    }

    &__mobile-filter {
      padding: 30px 10px 42px;
      background: var(--backgroundPageColor);
    }
  }

  @media (min-width: 992px) {
    .all-users-header {
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

      &__filter-items {
        display: flex;
        flex: 1;
        flex-wrap: wrap;
      }

      &__role-search-input {
        width: 173px;
        margin-right: 30px;
      }

      &__location-search-input {
        width: 181;
        margin-right: 30px;
      }

      &__is-active-cbx {
        color: var(--primaryColor);
      }

      &__text {
        flex: 1;
      }

      &__filter-btn {
        display: none;
      }

      &__open-filters-btn {
        margin: 0;
        width: 177px;
      }

      &__mobile-filter-popup {
        display: none;
      }
    }
  }
</style>
