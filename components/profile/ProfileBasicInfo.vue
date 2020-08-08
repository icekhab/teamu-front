<template>
  <div class="profile-basic-info">
    <h3>Основная информация</h3>
    <div class="profile-basic-info__content">
      <span v-if="profile.email && isMy" class="profile-basic-info-item">
        <MailIcon class="profile-basic-info-item__icon" /> {{ profile.email }}
      </span>
      <span v-if="profile.phone" class="profile-basic-info-item">
        <MobileIcon class="profile-basic-info-item__icon" /> {{ profile.phone }}
      </span>
      <span v-if="profile.location" class="profile-basic-info-item">
        <HouseIcon class="profile-basic-info-item__icon" /> {{ profile.location }}
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import UserEntity from '@/entities/UserEntity';
import HouseIcon from '@/static/images/svg/profile/house-icon.svg';
import MailIcon from '@/static/images/svg/profile/mail-icon.svg';
import MobileIcon from '@/static/images/svg/profile/mobile-icon.svg';

@Component({
  components: {
    HouseIcon,
    MailIcon,
    MobileIcon,
  },
})
export default class ProfileBasicInfoComponent extends Vue {
  @Prop({ type: Object, required: true }) profile!: UserEntity;

  @Prop({ type: Boolean, default: false }) isMy!: boolean;
}
</script>

<style lang="postcss" scoped>
  .profile-basic-info {
    display: flex;
    flex-direction: column;

    &__content {
      display: flex;
      flex-direction: column;
      margin-top: 20px;
      width: 100%;
      min-height: 60px;
      background: #FFFFFF;
      border-radius: 5px;
      padding: 20px;
    }

    .profile-basic-info-item {
      display: flex;
      align-items: center;

      &:not(:first-child) {
        margin-top: 20px;
      }

      &__icon {
        color: #4F56F1;
        margin-right: 12px;
      }
    }
  }

  @media (min-width: 992px) {
    .profile-basic-info {
      &__content {
        min-height: 123px;
        flex-direction: row;
        padding: 50px 45px;
      }

      .profile-basic-info-item {
        font-size: 16px;
        line-height: 19px;

        &:not(:first-child) {
          margin: 0 0 0 31px;
        }
      }
    }
  }
</style>
