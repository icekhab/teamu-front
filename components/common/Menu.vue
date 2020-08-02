<template>
  <div class="menu">
    <nuxt-link class="menu__item teamu-logo" to="/">
      <span class="logo">U</span>
    </nuxt-link>
    <CircleAvatar class="menu__item avatar" @click="onClickAvatar" />
    <nuxt-link class="menu__item my-idea" :class="getClass(myProjectsLink)" :to="myProjectsLink">
      <MyIdeaIcon />
    </nuxt-link>
    <SearchIcon class="menu__item search" />
    <div class="menu__item empty" />
    <nuxt-link class="menu__item all-idea" :class="getClass(projectsLink)" :to="projectsLink">
      <AllIdeasIcon />
    </nuxt-link>
    <!--    <div class="menu__item notification" />-->
    <nuxt-link class="menu__item help" :to="{ name: 'routeName'}" href="https://t.me/joinchat/CbUfXVP2Djjr4DtSxls0CA" target="_blank">
      <HelpIcon />
    </nuxt-link>
    <!--    <UsersIcon class="menu__item users" />-->
    <client-only>
      <modal
        v-if="isAuthorize"
        name="user-menu"
        :shift-x="0"
        :shift-y="1"
        transition="user-menu"
        :min-width="320"
        :height="231"
        :max-width="420"
        adaptive
      >
        <div class="user-menu">
          <div class="user-menu__about-user">
            <CircleAvatar class="user-menu__avatar" @click="onClickAvatar" />
            <span class="user-menu__email">{{ user.name || user.email }}</span>
          </div>
          <div class="line" />
          <div class="user-menu__item help-item">
            <HelpIcon class="user-menu__item-icon" />
            <span class="user-menu__item-label">Помощь</span>
          </div>
          <div class="user-menu__item" @click="logoutAndCloseMenu">
            <LogoutIcon class="user-menu__item-icon" />
            <span class="user-menu__item-label">Выйти</span>
          </div>
        </div>
      </modal>
    </client-only>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import AllIdeasIcon from '@/static/images/svg/menu/all-ideas-icon.svg';
import MyIdeaIcon from '@/static/images/svg/menu/my-idea-icon.svg';
import NotificationIcon from '@/static/images/svg/menu/notification-icon.svg';
import SearchIcon from '@/static/images/svg/menu/search-icon.svg';
import HelpIcon from '@/static/images/svg/menu/help-icon.svg';
import LogoutIcon from '@/static/images/svg/menu/logout-icon.svg';
import TeamuLogo from '@/static/images/svg/menu/teamu-logo.svg';
import UsersIcon from '@/static/images/svg/menu/users-icon.svg';
import { State, Action } from 'vuex-class';
import UserEntity from '@/entities/UserEntity';

@Component({
  components: {
    AllIdeasIcon,
    MyIdeaIcon,
    NotificationIcon,
    SearchIcon,
    HelpIcon,
    TeamuLogo,
    UsersIcon,
    LogoutIcon,
  },
})
export default class MenuComponent extends Vue {
  @State('isAuthorize', { namespace: 'user' }) isAuthorize!: boolean;

  @State('user', { namespace: 'user' }) user?: UserEntity;

  @Action('logout', { namespace: 'user' }) logout!: () => Promise<void>;

  projectsLink = {
    name: 'project',
  };

  myProjectsLink = {
    name: 'project-my',
  };

  getClass(to: any) {
    return { active: to.name === this.$router.currentRoute.name };
  }

  onClickAvatar() {
    if (this.isAuthorize) {
      this.$modal.show('user-menu');
    } else {
      this.$modal.show('login-modal');
    }
  }

  async logoutAndCloseMenu() {
    await this.logout();
    this.$modal.hide('user-menu');
  }
}
</script>

<style lang="postcss">
  .menu {
    display: flex;
    background: #FFFFFF;
    justify-content: space-around;
    align-items: center;

    .user-menu {
      display: flex;
      flex-direction: column;
      padding: 30px;

      &__about-user {
        display: flex;
        align-items: center;
      }

      &__avatar {
        width: 35px;
        height: 35px;
      }

      &__email {
        color: #0085FF;
        font-size: 16px;
        line-height: 19px;
        margin-left: 10px;
      }

      &__item {
        display: flex;
        align-items: center;
        color: var(--greyColor);
        width: auto;
        align-self: flex-start;
        cursor: pointer;

        &:hover {
          color: var(--blackColor);
        }

        &:not(:last-child) {
          margin-bottom: 20px;
        }
      }

      &__item-icon {
        width: 25px;
        height: 25px;
      }

      &__item-label {
        margin-left: 10px;
      }

      .line {
        width: 240px;
        height: 1px;
        background: var(--borderColor);
        border-radius: var(--defaultBorderRadius);
        margin: 30px 0 30px 3px;
      }
    }

    .vm--modal {
      min-width: 100%;
    }

    &__item {
      height: 20px;
      width: 20px;
      cursor: pointer;
      color: var(--greyColor);
      transition: color .1s ease-in;

      &.help, &.teamu-logo, &.users, &.empty {
        display: none;
      }

      &:hover {
        color: var(--blackColor);
      }

      &.active {
        color: var(--blackColor);
      }
    }
  }

  @media (min-width: 992px) {
    .menu {
      flex-direction: column;
      justify-content: space-between;
      padding: 20px 0;

      .vm--container {
        padding: 40px;
      }

      .vm--modal {
        min-width: auto;
        max-width: 306px;
        max-height: 181px;
        position: absolute!important;
        top: auto!important;
        left: 10px!important;
        bottom: 70px!important;
      }

      .help-item {
        display: none;
      }

      &__item {
        height: 25px;
        width: 25px;

        &.avatar {
          height: 37px;
          width: 37px;
          order: 7;
          justify-self: end;
        }

        &.help {
          display: inline;
          order: 6;
          margin-bottom: 20px;
        }

        &.teamu-logo {
          height: 35px;
          width: 35px;
          margin-bottom: 50px;
          background: #4f56f1;
          color: white;
          padding: 9px;
          border-radius: 100%;
          font-weight: bold;
          font-size: 26px;
          line-height: 31px;
          text-decoration: none;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        &.users {
          display: inline;
          order: 3
        }

        &.my-idea {
          display: inline;
          margin-bottom: 26px;
        }

        &.search {
          display: none;
        }

        &.all-idea {
          display: inline;
          margin-bottom: 26px;
        }

        &.notification {
          display: inline;
          order: 5;
          margin-bottom: 20px;
        }

        &.empty {
          cursor: auto;
          display: inline;
          flex: 1;
          order: 5
        }
      }
    }
  }

  @media (min-width: 1200px) {
    .menu {
      .vm--modal {
        left: 16px!important;
      }

      &__item {
        &.help {
          margin-bottom: 30px;
        }

        &.teamu-logo {
          margin-bottom: 60px;
        }

        &.my-idea {
          margin-bottom: 36px;
        }

        &.all-idea {
          margin-bottom: 36px;
        }

        &.notification {
          margin-bottom: 30px;
        }

        &.teamu-logo {
          height: 36px;
          width: 36px;
          font-size: 26px;
          line-height: 31px;
        }
      }
    }
  }

  .user-menu-enter-active,
  .user-menu-leave-active {
    transition: all 400ms;
  }
  .user-menu-enter,
  .user-menu-leave-active {
    opacity: 0;
    transform: translateY(50px);
  }
</style>
