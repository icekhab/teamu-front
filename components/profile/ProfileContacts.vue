<template>
  <div class="profile-contacts">
    <h3>Контакты</h3>
    <div class="profile-contacts__content">
      <a
        v-for="contact in profile.contacts"
        :key="contact.id"
        class="profile-contacts-item"
        :href="contact.link"
        target="_blank"
      >
        <component :is="getIcon(contact.title)" class="profile-contacts-item__icon" />
        {{ contact.title }}
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import UserEntity from '@/entities/UserEntity';
import FacebookIcon from '@/static/images/svg/social/facebook.svg';
import InstagramIcon from '@/static/images/svg/social/instagram.svg';
import LinkedinIcon from '@/static/images/svg/social/linkedin.svg';
import OpenlandIcon from '@/static/images/svg/social/openland.svg';
import TelegramIcon from '@/static/images/svg/social/telegram.svg';
import TwitterIcon from '@/static/images/svg/social/twitter.svg';
import VkIcon from '@/static/images/svg/social/vk.svg';
import WebsiteIcon from '@/static/images/svg/social/website.svg';

@Component({
  components: {
    FacebookIcon,
    LinkedinIcon,
    InstagramIcon,
    OpenlandIcon,
    TelegramIcon,
    TwitterIcon,
    VkIcon,
    WebsiteIcon,
  },
})
export default class ProfileContactsComponent extends Vue {
  @Prop({ type: Object, required: true }) profile!: UserEntity;

  getIcon(contactTypeTitle: string) {
    switch (contactTypeTitle.toLowerCase()) {
      case 'instagram': return InstagramIcon;
      case 'telegram': return TelegramIcon;
      case 'вконтакте': return VkIcon;
      case 'twitter': return TwitterIcon;
      case 'facebook': return FacebookIcon;
      case 'openland': return OpenlandIcon;
      case 'linkedin': return LinkedinIcon;
      default: return WebsiteIcon;
    }
  }
}
</script>

<style lang="postcss" scoped>
  .profile-contacts {
    display: flex;
    flex-direction: column;

    &__content {
      margin-top: 20px;
      min-height: 65px;
      width: 100%;
      background: #FFFFFF;
      border-radius: 5px;
      padding: 20px;
      display: grid;
      grid-template-columns: 1fr auto;
      grid-gap: 20px;
    }

    .profile-contacts-item {
      display: flex;
      align-items: center;
      color: #0085FF;
      text-decoration: none;
      width: max-content;

      &:hover {
        text-decoration: underline;
      }

      &__icon {
        margin-right: 10px;
        color: #4F56F1;
      }
    }
  }

  @media (min-width: 992px) {
    .profile-contacts {
      &__content {
        padding: 50px 45px;
        min-height: 123px;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        grid-gap: 30px;
      }

      .profile-contacts-item {
        font-size: 16px;
        line-height: 19px;
      }
    }
  }
</style>
