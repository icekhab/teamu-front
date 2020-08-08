<template>
  <div class="profile-about">
    <h3>Обо мне</h3>
    <div class="profile-about__content">
      <span>{{ profile.about }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import UserEntity from '@/entities/UserEntity';

@Component({
  components: {},
})
export default class ProfileAboutComponent extends Vue {
  @Prop({ type: Object, required: true }) profile!: UserEntity;
}
</script>

<style lang="postcss" scoped>
  .profile-about {
    display: flex;
    flex-direction: column;

    &__content {
      margin-top: 20px;
      min-height: 65px;
      width: 100%;
      background: #FFFFFF;
      border-radius: 5px;
      padding: 20px;
      white-space: pre-line;
      font-size: 14px;
      line-height: 135%;
    }
  }

  @media (min-width: 992px) {
    .profile-about {
      &__content {
        padding: 50px 45px;
        font-size: 16px;
        line-height: 130%;
        min-height: 135px;
      }
    }
  }
</style>
