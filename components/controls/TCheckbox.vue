<template>
  <label
    ref="label"
    class="t-checkbox"
    :class="classLabel"
    :disabled="disabled"
    @click="focus"
    @keydown.prevent.enter="label.click()"
  >
    <input
      ref="input"
      :value="newValue"
      class="t-checkbox__input"
      type="checkbox"
      :disabled="disabled"
      :required="required"
      :name="name"
      @change="input"
      @click.stop
    >
    <span class="t-checkbox__check">
      <CheckIcon v-if="newValue" class="t-checkbox__check-icon" />
    </span>
    <span class="t-checkbox__label"><slot /></span>
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
export default class MCheckboxComponent extends Vue {
  @Ref('input') readonly inputCheckbox!: HTMLInputElement;

  @Ref('label') readonly label!: HTMLLabelElement;

  @Prop({ type: Boolean, default: false }) readonly value!: boolean;

  @Prop({ type: Boolean, default: false }) readonly disabled!: boolean;

  @Prop({ type: Boolean, default: false }) readonly required!: boolean;

  @Prop({ type: String }) readonly name: string | undefined;

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
    if (this.newValue === value) return;

    this.newValue = value;
    this.input(value);
  }

  @Watch('value')
  onChangeValue(newValue: boolean) {
    this.newValue = newValue;
  }

  @Emit()
  input(event: any) {
    this.newValue = event.target.checked;

    return this.newValue;
  }

  get classLabel() {
    return [
      `t-checkbox__theme_${this.theme}`,
      { 'is-checked': this.newValue },
    ];
  }

  focus() {
    // MacOS FireFox and Safari do not focus when clicked
    this.inputCheckbox.focus();
  }
}
</script>

<style lang="postcss" scoped>
  .t-checkbox {
    position: relative;
    outline: none;
    display: flex;
    align-items: center;
    user-select: none;

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

    &.t-checkbox__theme_default {
      color: #FFFFFF;

      &.is-checked {
        & .t-checkbox__check {
          border: 0;
          background: var(--primaryColor);
        }

        &:hover {
          & .t-checkbox__check {
            background: var(--primaryColor-hover);
          }
        }
      }

      & .t-checkbox__check {
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

      & .t-checkbox__check-icon {
        width: 10px;
        height: 8px;
      }

      &:hover {
        & .t-checkbox__check {
          border-color: var(--primaryColor-hover);
        }
      }
    }
  }
</style>
