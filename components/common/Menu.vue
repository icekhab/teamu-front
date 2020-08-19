<template>
  <div class="menu">
    <nuxt-link class="menu__item teamu-logo" to="/">
      <TeamuLogo class="logo" />
    </nuxt-link>
    <client-only>
      <Avatar
        class="menu__item avatar"
        :username="user.name || ''"
        :src="user.imagePath || undefined"
        :custom-style="{ 'background-size': 'cover' }"
        @click.native="onClickAvatar"
      />
    </client-only>
    <client-only>
      <nuxt-link v-if="isAuthorize" class="menu__item my-idea" :to="myProjectsLink">
        <MyIdeaIcon class="menu__item my-idea" :class="getClass(myProjectsLink)" />
      </nuxt-link>
      <MyIdeaIcon v-else class="menu__item my-idea" :class="getClass(myProjectsLink)" @click="authAndGoMyProjects" />
      <slot slot="placeholder">
        <MyIdeaIcon class="menu__item my-idea" :class="getClass(myProjectsLink)" @click="authAndGoMyProjects" />
      </slot>
    </client-only>
    <SearchIcon class="menu__item search" />
    <div class="menu__item empty" />
    <nuxt-link class="menu__item all-idea" :to="projectsLink">
      <AllIdeasIcon class="menu__item all-idea" :class="getClass(projectsLink)" />
    </nuxt-link>
    <!--    <div class="menu__item notification" />-->
    <a class="menu__item help" href="https://t.me/joinchat/CbUfXVP2Djjr4DtSxls0CA" target="_blank">
      <HelpIcon class="menu__item help" />
    </a>
    <nuxt-link v-if="isAuthorize" class="menu__item all-users" :to="usersLink">
      <UsersIcon class="menu__item users" :class="getClass(usersLink)" />
    </nuxt-link>
    <client-only>
      <modal
        v-if="isAuthorize"
        name="user-menu"
        :shift-x="0"
        :shift-y="1"
        transition="user-menu"
        :min-width="320"
        :height="265"
        :max-width="420"
        adaptive
      >
        <div class="user-menu">
          <nuxt-link
            :to="myProfileLink"
            class="user-menu__about-user"
          >
            <Avatar
              class="user-menu__avatar"
              :size="35"
              :username="user.name || ''"
              :src="user.imagePath"
              :custom-style="{ 'background-size': 'cover' }"
            />
            <span class="user-menu__email">{{ user.name || user.email }}</span>
          </nuxt-link>
          <div class="line" />
          <client-only>
            <nuxt-link class="user-menu__item" :to="myProfileLink">
              <ProfileIcon class="user-menu__item-icon" />
              <span class="user-menu__item-label">Мой профиль</span>
            </nuxt-link>
          </client-only>
          <a class="user-menu__item help-item" href="https://t.me/joinchat/CbUfXVP2Djjr4DtSxls0CA" target="_blank">
            <HelpIcon class="user-menu__item-icon" />
            <span class="user-menu__item-label">Помощь</span>
          </a>
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
import TeamuLogo from '@/static/images/svg/menu/teamu-logo-2020-08-19.svg';
import UsersIcon from '@/static/images/svg/menu/users-icon.svg';
import ProfileIcon from '@/static/images/svg/menu/profile-logo.svg';
import { State, Action, Mutation } from 'vuex-class';
import UserEntity from '@/entities/UserEntity';
import Avatar from 'vue-avatar';
import { RawLocation } from 'vue-router/types/router';

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
    ProfileIcon,
    Avatar,
  },
})
export default class MenuComponent extends Vue {
  @State('isAuthorize', { namespace: 'user' }) isAuthorize!: boolean;

  @State('user', { namespace: 'user' }) user?: UserEntity;

  @Action('logout', { namespace: 'user' }) logout!: () => Promise<void>;

  @Mutation('setToAfterLogin', { namespace: 'user' }) setToAfterLogin!: (toAfterLogin?: RawLocation) => void;

  projectsLink = {
    name: 'project',
  };

  usersLink = {
    name: 'user',
  };

  myProjectsLink = {
    name: 'project-my',
  };

  get myProfileLink() {
    return {
      name: 'profile-id',
      params: {
        id: this.user?.id,
      },
    };
  }

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

  authAndGoMyProjects() {
    this.setToAfterLogin(this.myProjectsLink);
    this.$modal.show('login-modal');
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
        text-decoration: none;
      }

      &__avatar {
        width: 35px;
        min-width: 35px;
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
        text-decoration: none;

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

      &.help, &.teamu-logo, &.empty, &.search {
        display: none;
      }

      &:hover {
        color: var(--blackColor);
      }

      &.active {
        color: var(--blackColor);
      }

      &.avatar {
        height: 20px;
        min-height: 20px;
        max-height: 20px;
        width: 20px;
        min-width: 20px;
        max-width: 20px;
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
        width: auto!important;
        min-width: 306px;
        max-width: 400px;
        max-height: 231px;
        position: absolute!important;
        top: auto!important;
        left: 10px!important;
        bottom: 70px!important;
      }

      .user-menu {
        .line {
          width: 100%;
        }
      }

      .help-item {
        display: none;
        text-decoration: none;
      }

      &__item {
        height: 25px;
        width: 25px;

        &.avatar {
          height: 37px;
          min-height: 37px;
          max-height: 37px;
          width: 37px;
          min-width: 37px;
          max-width: 37px;
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
          color: white;
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

        &.all-users {
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
        &.avatar {
          height: 40px;
          min-height: 40px;
          max-height: 40px;
          width: 40px;
          min-width: 40px;
          max-width: 40px;
        }

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
