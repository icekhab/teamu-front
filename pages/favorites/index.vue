<template>
  <MenuLayout>
    <div class="favorites">
      <client-only v-if="!loading">
        <div class="favorites__header">
          <h1 class="favorites__header-text">
            Избранное
          </h1>
        </div>
        <div class="favorites__tabs">
          <span
            class="favorites__tab"
            :class="{'active': !isActiveUsers}"
            @click="isActiveUsers = false"
          >
            Проекты
          </span>
          <span
            class="favorites__tab"
            :class="{'active': isActiveUsers}"
            @click="isActiveUsers = true"
          >
            Люди
          </span>
        </div>
        <div class="favorites__content">
          <template v-if="!isActiveUsers">
            <ProjectList
              v-if="projects.length"
              class="favorites__content__project-list"
              :projects="projects"
              @add-to-favorite="addProjectToFavorites"
              @remove-from-favorite="removeProjectFromFavorites"
            />
            <div v-else class="favorites__not-found">
              <span class="favorites__not-found-text">К сожалению, по вашим параметрам проектов не найдено.</span>
              <img class="favorites__not-found-img" src="/images/svg/projects/not-found.svg" alt="">
            </div>
          </template>
          <template v-else>
            <UserList
              v-if="users.length"
              class="favorites__content__user-list"
              :users="users"
              @add-to-favorite="addUserToFavorites"
              @remove-from-favorite="removeProjectFromFavorites"
            />
            <div v-else class="favorites__not-found">
              <span class="favorites__not-found-text">К сожалению, по вашим параметрам пользователей не найдено.</span>
              <img class="favorites__not-found-img" src="/images/svg/projects/not-found.svg" alt="">
            </div>
          </template>
        </div>
      </client-only>
    </div>
  </MenuLayout>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import MenuLayout from '@/components/layout/MenuLayout.vue';
import ProjectList from '@/components/common/ProjectList.vue';
import UserList from '@/components/common/UserList.vue';
import { Action, State, Mutation } from 'vuex-class';
import UserEntity from '@/entities/UserEntity';
import ProjectEntity from '@/entities/ProjectEntity';

const namespace = 'userFavorites';

@Component({
  components: {
    MenuLayout,
    ProjectList,
    UserList,
  },
})
export default class FavoritesPageComponent extends Vue {
  @Action('getAllFavorites', { namespace }) readonly getAllFavorites!: () => void;

  @State('users', { namespace }) users!: UserEntity[];

  @State('projects', { namespace }) projects!: ProjectEntity[];

  @Action('addFavoriteProject', { namespace }) addFavoriteProject!: (id: number) => void;

  @Action('removeFavoriteProject', { namespace }) removeFavoriteProject!: (id: number) => void;

  @Action('addFavoriteUser', { namespace }) addFavoriteUser!: (id: number) => void;

  @Action('removeFavoriteUser', { namespace }) removeFavoriteUser!: (id: number) => void;

  @Mutation('changeUserFavorite', { namespace }) changeUserFavorite!: (id: number) => void;

  @Mutation('changeProjectFavorite', { namespace }) changeProjectFavorite!: (id: number) => void;

  isActiveUsers = false;

  loading = false;

  async mounted() {
    this.loading = true;
    await this.getAllFavorites();
    this.loading = false;
  }

  async addProjectToFavorites(id: number) {
    await this.addFavoriteProject(id);
    this.changeProjectFavorite(id);
  }

  async removeProjectFromFavorites(id: number) {
    await this.removeFavoriteProject(id);
    this.changeProjectFavorite(id);
  }

  async addUserToFavorites(id: number) {
    await this.addFavoriteUser(id);
    this.changeUserFavorite(id);
  }

  async removeUserFromFavorites(id: number) {
    await this.removeFavoriteUser(id);
    this.changeUserFavorite(id);
  }
}
</script>

<style lang="postcss" scoped>
  .favorites {
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    max-width: 356px;

    &__header {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      width: 100%;
    }

    &__tabs {
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      width: 100%;
    }

    &__tab {
      cursor: pointer;
      height: 22px;
      margin-top: 30px;
      margin-right: 30px;

      font-family: Inter;
      font-style: normal;
      font-weight: 500;
      font-size: 18px;
      line-height: 22px;

      display: flex;
      align-self: flex-start;
      text-align: center;

      color: var(--greyColor);

      &.active {
      color: var(--blackColor);
      }
    }

    &__content {
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      width: 100%;

      &__project-list {
        width: 100%;
        margin-top: 20px;
      }

      &__user-list {
        width: 100%;
        margin-top: 20px;
      }
    }

    &__not-found {
      display: flex;
      flex-direction: column;
      margin-top: 60px;
      align-items: center;
      width: 100%;
    }

    &__not-found-text {
      font-weight: 500;
      font-size: 17px;
      line-height: 20px;
      color: var(--blackColor);
      margin-bottom: 30px;
      text-align: center;
    }

    &__not-found-img {
      width: 275px;
    }
  }

  @media (min-width: 992px) {
    .favorites {
      width: 1108px;
      max-width: none;
      align-items: flex-start;

      &__project-list {
        width: auto;
        margin-top: 50px;
      }
    }
  }

  @media (min-width: 1200px) {
    .favorites {
      width: 1400px;
    }
  }
</style>
