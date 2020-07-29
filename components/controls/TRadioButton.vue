<template>
  <label
    ref="label"
    class="t-radio-button"
    :class="classLabel"
    :disabled="disabled"
    @keydown.prevent.enter="label.click()"
    @click="focus"
  >
    <input
      ref="input"
      v-model="computedValue"
      :value="val"
      class="t-radio-button__input"
      type="radio"
      :disabled="disabled"
      :required="required"
      :name="name"
      @click.stop
    >
    <span class="t-radio-button__check">
      <CheckIcon v-if="newValue === val" class="t-radio-button__check-icon" />
    </span>
    <span class="t-radio-button__label"><slot /></span>
  </label>
</template>

<script lang="ts">
import {
  Component, Emit, Prop, Ref, Vue, Watch,
} from 'vue-property-decorator';
import CheckIcon from '~/static/images/svg/check-icon.svg';

@Component({
  components: {
    CheckIcon,
  },
})
export default class TRadioButtonComponent extends Vue {
  @Ref('input') readonly inputCheckbox!: HTMLInputElement;

  @Ref('label') readonly label!: HTMLLabelElement;

  @Prop({ default: false }) readonly value!: any;

  @Prop({ type: Boolean, default: false }) readonly disabled!: boolean;

  @Prop({ type: Boolean, default: false }) readonly required!: boolean;

  @Prop({ type: String }) readonly name: string | undefined;

  @Prop() readonly val: any;

  @Prop({
    default: 'default',
    validator: (value: string) => ['default'].includes(value),
  })
  readonly theme!: string;

  newValue: boolean = this.value;

  get computedValue(): boolean {
    return this.newValue;
  }

  set computedValue(value: boolean) {
    this.newValue = value;
    this.input(value);
  }

  @Watch('value')
  onChangeValue(newValue: boolean) {
    this.newValue = newValue;
  }

  @Emit()
  input(value: boolean) {
    return value;
  }

  get classLabel() {
    return [
      `t-radio-button__theme_${this.theme}`,
      { 'is-checked': this.newValue === this.val },
    ];
  }

  focus() {
    // MacOS FireFox and Safari do not focus when clicked
    this.inputCheckbox.focus();
  }
}
</script>

<style lang="postcss" scoped>
  .t-radio-button {
    position: relative;
    outline: none;
    display: flex;
    align-items: center;
    user-select: none;
    width: 25px;
    height: 25px;

    cursor: pointer;

    &__input {
      position: absolute;
      left: 0;
      opacity: 0;
      outline: none;
      z-index: -1;

      cursor: pointer;
      vertical-align: baseline;
    }

    &__check {
      display: flex;
    }

    &__check-icon {
      margin: auto;
    }

    &__label {
      text-align: left;
      padding-left: 15px;
      transition: color .15s ease-out;
    }

    &.t-radio-button__theme_default {
      color: #FFFFFF;

      &.is-checked {
        & .t-radio-button__check {
          border: 0;
          background: var(--primaryColor);
        }

        &:hover {
          & .t-radio-button__check {
            background: var(--primaryColor-hover);
          }
        }
      }

      & .t-radio-button__check {
        width: 25px;
        height: 25px;
        flex-shrink: 0;
        border-radius: var(--defaultBorderRadius);
        border: 1px solid var(--borderColor);
        box-sizing: border-box;
        transition: background, border-color .15s ease-out;
        background: #FFFFFF;

        color: white;
      }

      & .t-radio-button__check-icon {
        width: 10px;
        height: 8px;
      }

      &:hover {
        & .t-radio-button__check {
          border-color: var(--primaryColor-hover);
        }
      }
    }
  }
</style>
