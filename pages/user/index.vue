<template>
  <MenuLayout>
    <div class="main">
      <AllUsersHeader class="main__header" />
      <UserList
        v-if="users.length"
        class="main__user-list"
        :users="users"
        @add-to-favorite="addUserToFavorites"
        @remove-from-favorite="removeUserFromFavorites"
      />
      <div v-else class="main__not-found">
        <span class="main__not-found-text">
          К сожалению, по вашим параметрам пользователей не найдено.
        </span>
        <img class="main__not-found-img" src="/images/svg/projects/not-found.svg" alt="">
      </div>
    </div>
  </MenuLayout>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Getter, Action, Mutation } from 'vuex-class';
import MenuLayout from '@/components/layout/MenuLayout.vue';
import AllUsersHeader from '@/components/allUsers/AllUsersHeader.vue';
import UserList from '@/components/common/UserList.vue';
import UserEntity from '@/entities/UserEntity';

const namespace = 'allUsers';
const namespaceUserFavorites = 'userFavorites';

@Component({
  components: {
    MenuLayout,
    AllUsersHeader,
    UserList,
  },

  async fetch({
    store,
  }) {
    await store.dispatch('allUsers/getAllUsers');
  },
})
export default class UserPageComponent extends Vue {
  @Getter('users', { namespace }) users!: UserEntity[];

  @Mutation('changeUserFavorite', { namespace }) changeUserFavorite!: (id: number) => void;

  @Action('addFavoriteUser', { namespace: namespaceUserFavorites }) addFavoriteUser!: (id: number) => void;

  @Action('removeFavoriteUser', { namespace: namespaceUserFavorites }) removeFavoriteUser!: (id: number) => void;

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
  .main {
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    max-width: 356px;

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

    &__user-list {
      width: 100%;
      margin-top: 20px;
    }

    @media (min-width: 992px) {
      width: 1108px;
      max-width: none;
      align-items: flex-start;

      &__user-list {
        width: auto;
        margin-top: 50px;
      }

      &__not-found {
        margin-top: 50px;
      }

      &__not-found-text {
        font-size: 20px;
        line-height: 25px;
        margin-bottom: 35px;
      }

      &__not-found-img {
        width: auto;
        max-width: 460px;
      }
    }

    @media (min-width: 1200px) {
      width: 1400px;

      &__not-found {
        margin-top: 80px;
      }

      &__not-found-text {
        font-size: 22px;
        line-height: 27px;
        margin-bottom: 45px;
      }

      &__not-found-img {
        max-width: none;
      }
    }
  }
</style>
