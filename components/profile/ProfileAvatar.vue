<template>
  <div class="profile-avatar">
    <Avatar
      class="profile-avatar__avatar"
      :size="70"
      :username="profile.name"
      :src="profile.imagePath"
      :custom-style="{ 'background-size': 'cover' }"
    />
    <div class="profile-avatar__user-block">
      <span class="profile-avatar__name">{{ profile.name }}</span>
      <span v-if="profile.role" class="profile-avatar__role">{{ profile.role }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Avatar from 'vue-avatar';
import UserEntity from '@/entities/UserEntity';

@Component({
  components: {
    Avatar,
  },
})
export default class ProfileAvatarComponent extends Vue {
  @Prop({ type: Object, required: true }) profile!: UserEntity;
}
</script>

<style lang="postcss" scoped>
  .profile-avatar {
    display: flex;

    &__user-block {
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-left: 14px;
    }

    &__name {
      font-weight: 600;
      font-size: 22px;
      line-height: 27px;
    }

    &__role {
      margin-top: 10px;
      font-size: 14px;
      line-height: 17px;
      color: var(--greyColor);
    }
  }

  @media (min-width: 992px) {
    .profile-avatar {
      &__avatar {
        width: 100px!important;
        height: 100px!important;
      }

      &__user-block {
        margin-left: 21px;
      }

      &__role {
        font-size: 16px;
        line-height: 19px;
      }
    }
  }
</style>
