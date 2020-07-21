<template>
  <div class="menu">
    <TeamuLogo class="menu__item teamu-logo" />
    <CircleAvatar class="menu__item avatar" />
    <MyIdeaIcon class="menu__item my-idea" />
    <SearchIcon class="menu__item search" />
    <div class="menu__item empty" />
    <AllIdeasIcon class="menu__item all-idea" />
    <NotificationIcon class="menu__item notification" />
    <HelpIcon class="menu__item help" />
    <UsersIcon class="menu__item users" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import AllIdeasIcon from '@/static/images/svg/menu/all-ideas-icon.svg';
import MyIdeaIcon from '@/static/images/svg/menu/my-idea-icon.svg';
import NotificationIcon from '@/static/images/svg/menu/notification-icon.svg';
import SearchIcon from '@/static/images/svg/menu/search-icon.svg';
import HelpIcon from '@/static/images/svg/menu/help-icon.svg';
import TeamuLogo from '@/static/images/svg/menu/teamu-logo.svg';
import UsersIcon from '@/static/images/svg/menu/users-icon.svg';

@Component({
  components: {
    AllIdeasIcon,
    MyIdeaIcon,
    NotificationIcon,
    SearchIcon,
    HelpIcon,
    TeamuLogo,
    UsersIcon,
  },
})
export default class MenuComponent extends Vue {}
</script>

<style lang="postcss" scoped>
  .menu {
    display: flex;
    background: #FFFFFF;
    justify-content: space-around;
    align-items: center;

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
    }
  }

  @media (min-width: 992px) {
    .menu {
      flex-direction: column;
      justify-content: space-between;
      padding: 20px 0;

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
          height: 19px;
          width: 25px;
          display: inline;
          margin-bottom: 50px;
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
      }
    }
  }
</style>
