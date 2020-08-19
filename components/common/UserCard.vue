<template>
  <div class="user-card__wrap" style="display: flex">
    <div class="user-card">
      <nuxt-link :to="userLink" class="user-card__link-block">
        <div class="user-card__content">
          <div class="user-card__header">
            <div class="user-card__author">
              <Avatar
                class="user-card__author-avatar"
                :size="40"
                :username="user.name || ''"
                :src="user.imagePath"
                :custom-style="{ 'background-size': 'cover' }"
              />
              <span class="user-card__author-name">
                {{ user.name }}
              </span>
            </div>
            <div class="user-card__icons">
              <InstagramIcon class="user-card__icon" />
              <FacebookIcon class="user-card__icon" />
              <TelegramIcon class="user-card__icon" />
            </div>
          </div>

          <div class="user-card__footer">
            <div class="user-card__location">
              Локация:
              <span class="user-card__location-text">
                {{ user.location || ''}}
              </span>
            </div>
            <div class="user-card__role">
              Роль:
              <span class="user-card__role-text">
                {{ user.role || ''}}
              </span>
            </div>
            <div class="user-card__active-projects">
              Активные проекты:
              <span class="user-card__active-projects-text">
                <!-- {{ user.active-projects || ''}} -->
              </span>
            </div>
          </div>
        </div>
      </nuxt-link>
      <div class="user-card__bookmark" @click="$emit('add-to-favorite', user.id)">
        <BookmarkFilledIcon v-if="user.isFavorite"/>
        <BookmarkIcon v-else/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import UserEntity from '@/entities/UserEntity';
import EditIcon from '@/static/images/svg/edit.svg';
import ProfileIcon from '@/static/images/svg/profile-icon.svg';
import CloseIcon from '@/static/images/svg/close.svg';
import DotsIcon from '@/static/images/svg/dots.svg';
import BookmarkIcon from '@/static/images/svg/bookmark-icon.svg';
import BookmarkFilledIcon from '@/static/images/svg/bookmark-filled-icon.svg';
import PolygonIcon from '@/static/images/svg/polygon-icon.svg';
import ProjectLabel from '@/components/common/ProjectLabel.vue';
import Avatar from 'vue-avatar';
import FacebookIcon from '@/static/images/svg/social/facebook.svg';
import InstagramIcon from '@/static/images/svg/social/instagram.svg';
import TelegramIcon from '@/static/images/svg/social/telegram.svg';

@Component({
  components: {
    ProfileIcon,
    ProjectLabel,
    EditIcon,
    CloseIcon,
    DotsIcon,
    BookmarkIcon,
    BookmarkFilledIcon,
    PolygonIcon,
    FacebookIcon,
    InstagramIcon,
    TelegramIcon,
    Avatar,
  },
})
export default class UserCardComponent extends Vue {
  @Prop() readonly user!: UserEntity;

  userLink = {
    name: 'profile-id',
    params: {
      id: this.user.id,
    },
  };
}
</script>

<style lang="postcss">
  .user-card {
    position: relative;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.06);
    border-radius: var(--defaultBorderRadius);
    display: flex;
    flex-direction: column;
    background: #FFFFFF;
    color: var(--greyColor);
    line-height: 17px;
    width: 100%;
    text-decoration: none;
    transition: all .15s ease-in;

    &:hover {
      box-shadow: var(--hoverBlockBoxShadow);
    }

    &__content {
      padding: 0 10px;
      z-index: 1;
    }

    &__header {
      display: flex;
      justify-content: space-between;
      flex-direction: row;
      width: 100%;
      margin-top: 20px;
      line-height: 17px;
      text-decoration: none;
      transition: all .15s ease-in;
    }

    &__author {
      display: flex;
      align-items: center;
    }

    &__author-avatar {
      height: 25px;
      width: 25px;
      min-width: 25px;
      margin: 0 5px;
    }

    &__author-name {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-weight: bold;
      margin-left: 5px;
      color: var(--blackColor);
    }

    &__icons {
      display: flex;
      align-items: center;
      display: none;
    }

    &__icon {
      width: 15px;
      color: var(--primaryColor);
      margin-left: 10px;
    }

    &__link-block {
      display: flex;
      flex-direction: column;
      background: #FFFFFF;
      color: var(--greyColor);
      text-decoration: none;
    }

    &__footer {
      margin-bottom: 20px;
    }

    &__location {
      margin-top: 15px;
      color: var(--blackColor);
    }

    &__location-text {
      color: var(--greyColor);
    }

    &__role {
      margin-top: 10px;
      color: var(--blackColor);
    }

    &__role-text {
      color: var(--greyColor);
    }

    &__active-projects {
      display: none;
      margin-top: 15px;
      color: var(--blackColor);
    }

    &__active-projects-text {
      color: var(--greyColor);
    }

    &__bookmark {
      display: none;
      position: absolute;
      cursor: pointer;
      bottom: 15px;
      right: 15px;
      width: 25px;
      height: 25px;
      z-index: 2;
    }
  }
</style>
