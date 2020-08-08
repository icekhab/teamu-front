<template>
  <div :class="classFormControl">
    <slot />
    <span class="form-control__error-block">
      <slot
        v-if="isError"
        name="errors"
      />
    </span>
  </div>
</template>

<script lang="ts">
import {
  Component, Prop, Vue,
} from 'vue-property-decorator';

@Component({
  components: {},
})
export default class TFormControlComponent extends Vue {
  @Prop(Boolean) readonly isError!: boolean;

  @Prop(Boolean) readonly showError!: boolean;

  get classFormControl() {
    return [
      'form-control',
      {
        'form-control__error': this.isError,
      },
    ];
  }
}
</script>

<style lang="postcss" scoped>
  .form-control {
    display: flex;
    flex-direction: column;
    height: auto;
    >>> .trigger {
      width: inherit;
    }

    &__error-block {
      margin-top: 5px;
      font-size: 14px;
      line-height: 17px;
      min-height: 20px;
      color: rgba(#FF4B3E, .7);
    }
  }
  .form-control__error {
    color: rgba(#FF4B3E, .7) !important;
    & >>> {
      .t-input, .t-input:focus, .t-text-area, .t-text-area:focus {
        border-color: rgba(#FF4B3E, .7) !important;
        color: rgba(#FF4B3E, .7) !important;

        & svg {
          fill: rgba(#FF4B3E, .7) !important;
        }
      }
      .t-checkbox__check {
        border-color: rgba(#FF4B3E, .7) !important;
      }
    }
  }
</style>
