<template>
  <input
    :class="classInput"
    :value="value"
    v-bind="$attrs"
    @input="changeInput"
    @blur="$emit('blur', $event)"
    @focus="$emit('focus', $event)"
  >
</template>

<script lang="ts">
import {
  Component, Emit, Prop, Vue,
} from 'vue-property-decorator';

@Component({})
export default class MInputComponent extends Vue {
  @Prop({
    default: 'm',
    validator: (value) => ['s', 'm', 'l'].includes(value),
  })
  readonly size!: string;

  @Prop([Number, String]) readonly value!: number | string;

  get classInput() {
    return [
      't-input',
      `t-input__size_${this.size}`,
    ];
  }

  /**
     * Input's 'input' event listener, 'nextTick' is used to prevent event firing
     * before ui update, helps when using masks (Cleavejs and potentially others).
     */
  changeInput = (value: any) => {
    this.$nextTick(() => {
      this.emitInput(value);
    });
  };

  @Emit('input')
  emitInput(value: number | string) {
    return value;
  }
}
</script>

<style lang="postcss" scoped>
  .t-input {
    height: inherit;
    line-height: var(--defaultLineHeight);
    background-color: #ffffff;
    color: var(--blackColor);
    border-radius: var(--defaultBorderRadius);
    border: 1px solid var(--borderColor);
    box-sizing: border-box;
    font-family: inherit;
    transition-property: color, border-color;
    transition-duration: .15s;
    transition-timing-function: ease-out;

    &::placeholder {
      color: var(--greyColor);
    }

    &:focus {
      /*color: var(--primaryColor1);*/
      /*border-color: var(--primaryColor1);*/
    }

    &__size_s {}

    &__size_m {
      font-size: 14px;
      line-height: 17px;

      padding: 12px 10px 11px 11px;
    }

    &__size_l {}
  }
</style>
