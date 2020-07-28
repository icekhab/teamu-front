<template>
  <img v-if="src" src="avatar.png" alt="Avatar" class="avatar" @click="$emit('click')">
  <div v-else class="avatar avatar-empty" @click="$emit('click')" />
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
    border-radius: 50%;
    display: inline-block;
    min-width: 20px;
    min-height: 20px;

    &.avatar-empty {
      background: linear-gradient(180deg, #56CCF2 0%, rgba(47, 128, 237, 0.49) 100%);
    }
  }
</style>
