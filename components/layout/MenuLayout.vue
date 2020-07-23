<template>
  <div class="menu-layout">
    <div class="menu-layout__content">
      <slot />
    </div>
    <Menu class="menu-layout__menu" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Menu from '~/components/common/Menu.vue';

@Component({
  components: { Menu },
})
export default class MenuLayoutComponent extends Vue {}
</script>

<style lang="postcss" scoped>
  .menu-layout {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    width: 100%;

    &__content {
      flex: 1;
      padding: 30px 10px 70px;
      background: var(--backgroundPageColor);
    }

    &__menu {
      position: fixed;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 50px;
      border-top: 1.23px solid var(--borderColor);
    }
  }

  @media (min-width: 992px) {
    .menu-layout {
      &__content {
        padding: 50px 30px 50px 90px;
      }

      &__menu {
        min-height: 390px;
        top: 0;
        bottom: unset;
        height: 100%;
        width: 60px;
        border-top: 0;
        box-shadow: 1px 0 6px rgba(0, 0, 0, 0.06);
      }
    }
  }

  @media (min-width: 1200px) {
    .menu-layout {
      &__menu {
        min-height: 443px;
        width: 70px;
      }
    }
  }
</style>
