<template>
  <nuxt-link
    v-if="to"
    :class="classButton"
    :to="to"
    v-bind="$attrs"
    @click.native="$emit('click', $event)"
  >
    <slot />
  </nuxt-link>
  <a
    v-else-if="href"
    :class="classButton"
    :href="href"
    v-bind="$attrs"
  >
    <slot />
  </a>
  <button
    v-else
    v-bind="$attrs"
    :class="classButton"
    :disabled="disabled"
    @click="$emit('click', $event)"
  >
    <slot />
  </button>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({})
export default class TButtonComponent extends Vue {
  @Prop({
    default: 'm',
    validator: (value) => ['m', 'l'].includes(value),
  })
  readonly size!: string;

  @Prop({
    default: 'primary',
    validator: (value) => ['primary', 'black', 'transparent', 'white-black', 'white-grey'].includes(value),
  })
  readonly theme!: string;

  @Prop({
    type: [String, Object],
    default: '',
  })
  readonly to!: string | any;

  @Prop({
    type: String,
    default: '',
  })
  readonly href!: string;

  @Prop({
    type: Boolean,
    default: false,
  })
  readonly disabled!: boolean;

  get classButton() {
    return [
      't-button',
      `t-button__theme_${this.theme}`,
      `t-button__size_${this.size}`,
    ];
  }
}
</script>

<style lang="postcss" scoped>
  .t-button {
    text-decoration: none;
    border-radius: var(--defaultBorderRadius);
    border: 0;
    transition: background .1s ease-out;
    box-sizing: border-box;
    white-space: nowrap;

    &__size_m {
      height: 41px;
      padding: 0 20px;
    }

    &__size_l {
      font-size: 16px;
      line-height: 19px;

      padding: 15px 25px;
    }

    &__theme_primary {
      background: var(--primaryColor);
      color: #ffffff;
      box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.06);

      &:hover {
        /*background: var(--primaryColor-hover);*/
      }
    }

    &__theme_black {
      background: var(--blackColor);
      color: #ffffff;
      box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.06);

      &:hover {
        /*background: var(--blackColor-hover);*/
      }
    }

    &__theme_transparent {
      background: transparent;
      border: 1px solid var(--greyColor);
      color: var(--blackColor);

      &:hover {
        /*background: var(--greyColor-hover);*/
      }
    }

    &__theme_white-black {
      background: #ffffff;
      color: var(--blackColor);
      border: 1px solid var(--borderColor);

      &:hover {
        /*background: var(--whiteColor-hover);*/
      }
    }

    &__theme_white-grey {
      background: #ffffff;
      color: var(--greyColor);
      border: 1px solid var(--greyColor);

      &:hover {
        /*background: var(--whiteColor-hover);*/
      }
    }
  }
</style>
