<template>
  <MenuLayout>
    <div class="profile-page">
      <client-only v-if="!loading">
        <h1
          v-if="isMy"
          class="profile-page__header"
        >
          Мой профиль

          <nuxt-link class="profile-page__go-to-edit" :to="goToEditProfile">
            <ToEditIcon />
          </nuxt-link>
        </h1>

        <ProfileAvatar class="profile-page__avatar" :profile="profile" />
        <ProfileBasicInfo class="profile-page__block" :profile="profile" :is-my="isMy" />
        <ProfileAbout class="profile-page__block" :profile="profile" />
        <ProfileContacts class="profile-page__block" :profile="profile" />
      </client-only>
    </div>
  </MenuLayout>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { State } from 'vuex-class';
import MenuLayout from '@/components/layout/MenuLayout.vue';
import UserEntity from '@/entities/UserEntity';
import ProfileAvatar from '@/components/profile/ProfileAvatar.vue';
import ProfileBasicInfo from '@/components/profile/ProfileBasicInfo.vue';
import ProfileAbout from '@/components/profile/ProfileAbout.vue';
import ProfileContacts from '@/components/profile/ProfileContacts.vue';
import ToEditIcon from '@/static/images/svg/to-edit-icon.svg';

const namespace = 'profile';

@Component({
  components: {
    ProfileContacts,
    ProfileAbout,
    ProfileBasicInfo,
    ProfileAvatar,
    MenuLayout,
    ToEditIcon,
  },

  validate({ params }: any) {
    return !!params.id;
  },
})
export default class MainPageComponent extends Vue {
  @State('profile', { namespace }) profile!: UserEntity;

  @State('user', { namespace: 'user' }) user?: UserEntity;

  loading = false;

  async created() {
    this.loading = true;
    await this.$store.dispatch('profile/getProfile', this.$route.params.id);
    this.loading = false;
  }

  get isMy() {
    return this.user?.id === this.profile.id;
  }

  get goToEditProfile() {
    return {
      name: 'profile-edit',
    };
  }
}
</script>

<style lang="postcss" scoped>
  .profile-page {
    width: 100%;
    min-width: 300px;
    max-width: 400px;
    flex-direction: column;

    &__header {
      margin-bottom: 30px;
      display: flex;
      align-items: center;
    }

    &__avatar {
      margin-bottom: 30px;
    }

    &__block {
      margin-bottom: 30px;
    }

    &__go-to-edit {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 20px;
      height: 20px;
      border-radius: var(--defaultBorderRadius);
      background: var(--greyColor);
      color: #FFFFFF;
      margin-left: 10px;
      transition: color .15s ease-out;

      &:hover {
        background: var(--primaryColor);
      }
    }
  }

  @media (min-width: 992px) {
    .profile-page {
      max-width: 930px;
      display: flex;

      &__header {
        margin-bottom: 50px;
      }

      &__avatar {
        margin-bottom: 50px;
      }

      &__block {
        margin-bottom: 50px;
        max-width: 800px;
      }
    }
  }

  @media (min-width: 1200px) {
    .profile-page {
      display: flex;
      max-width: 1108px;
    }
  }

  @media (min-width: 1200px) {
    .profile-page {
      display: flex;
      max-width: 1400px;
    }
  }
</style>
