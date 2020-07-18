<template>
  <img v-if="src" src="avatar.png" alt="Avatar" class="avatar">
  <div v-else class="avatar avatar-empty" />
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({})
export default class CircleAvatarComponent extends Vue {
  @Prop({
    type: String,
    required: false,
  })
  readonly src?: string;
}
</script>

<style lang="postcss" scoped>
  .avatar {
    vertical-align: middle;
    width: 50px;
    height: 50px;
    border-radius: 50%;

    &.avatar-empty {
      background: linear-gradient(180deg, #0500FF 0%, rgba(251, 132, 22, 0.49) 100%);
    }
  }
</style>
