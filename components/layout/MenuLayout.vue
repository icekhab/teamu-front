<template>
  <div class="menu-layout">
    <div class="menu-layout__content">
      <slot />
    </div>
    <Menu class="menu-layout__menu" />
    <RegistrationLogin class="menu-layout__registration-login" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Menu from '~/components/common/Menu.vue';
import RegistrationLogin from '~/components/common/RegistrationLogin.vue';

@Component({
  components: { Menu, RegistrationLogin },
})
export default class MenuLayoutComponent extends Vue {}
</script>

<style lang="postcss" scoped>
  .menu-layout {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    width: 100%;
    align-items: center;
    background: var(--backgroundPageColor);

    &__content {
      flex: 1;
      padding: 30px 10px 70px;
      min-width: 320px;
      width: 100%;
      display: flex;
      justify-content: center;
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
