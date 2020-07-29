<template>
  <div class="tabs">
    <span
      v-for="(tab, index) in tabs"
      :key="index"
      :class="getTabClass(tab)"
      @click="tab.disabled || setValue(tab.value)"
    >
      <span v-if="tab.value === newValue" class="line" />{{ tab.title }}
    </span>
  </div>
</template>

<script lang="ts">
import {
  Component, Emit, Prop, Vue, Watch,
} from 'vue-property-decorator';
import TabEntity from '@/entities/TabEntity';

@Component({})
export default class TabsComponent extends Vue {
  @Prop({ required: true, type: Array }) tabs!: TabEntity[];

  @Prop({ required: false }) value?: any;

  newValue = this.value;

  mounted() {
    if (!this.value || !this.tabs[this.value]) {
      this.setValue(this.tabs[0].value);
    }
  }

  getTabClass(tab: TabEntity) {
    return [
      'tabs__item',
      {
        disabled: tab.disabled,
      },
      {
        selected: tab.value === this.newValue,
      },
    ];
  }

  @Watch('value')
  onChangeValue(newValue: boolean) {
    this.newValue = newValue;
  }

  @Emit('input')
  setValue(value: any) {
    this.newValue = value;

    return value;
  }
}
</script>

<style lang="postcss" scoped>
  .tabs {
    display: flex;
    justify-content: space-between;

    &__item {
      color: var(--greyColor);
      transition: all .15s ease-in-out;

      &:not(.disabled,.selected) {
        cursor: pointer;

        &:hover {
          color: #6F7681;
        }
      }

      &.selected {
        color: var(--blackColor);
      }
    }
  }

  @media (min-width: 992px) {
    .tabs {
      flex-direction: column;
      font-size: 16px;
      line-height: 19px;

      &__item {
        display: flex;
        align-items: center;

        &.selected .line {
          display: inline-block;
          width: 20px;
          height: 2px;
          background: black;
          margin-right: 5px;
        }

        &:not(:last-child) {
          margin-bottom: 20px;
        }
      }
    }
  }

  @media (min-width: 1600px) {
    .tabs {
    }
  }
</style>
