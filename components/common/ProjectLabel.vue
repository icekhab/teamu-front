<template>
  <span :class="classes">
    {{ label }}
  </span>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import ProjectLabelEnum from '@/enums/ProjectLabelEnum';

@Component({})
export default class ProjectLabelComponent extends Vue {
  @Prop() readonly label!: ProjectLabelEnum;

  @Prop({ type: Boolean }) readonly check?: boolean;

  private labelClasses = {
    [ProjectLabelEnum.analyzing]: 'analyzing',
    [ProjectLabelEnum.existIdea]: 'exist-idea',
    [ProjectLabelEnum.existSpecification]: 'exist-specification',
    [ProjectLabelEnum.mvpInProgress]: 'mvp-in-progress',
    [ProjectLabelEnum.mvpReady]: 'mvp-ready',
    [ProjectLabelEnum.scaling]: 'scaling',
    [ProjectLabelEnum.working]: 'working',
  };

  get classes() {
    const labelClass = this.labelClasses[this.label];

    return [
      'project-label',
      labelClass || 'default',
      this.check ? 'check' : undefined,
    ];
  }
}
</script>

<style lang="postcss" scoped>
  .project-label {
    font-size: 14px;
    line-height: 17px;
    padding: 6px 10px;
    border: 1px solid var(--primaryColor);
    color: var(--blackColor);
    box-sizing: border-box;
    border-radius: var(--defaultBorderRadius);
    display: inline-block;
    background: #ffffff;

    &.check {
      background: var(--primaryColor);
    }

    &.analyzing {
      border-color: #BD90E3;

      &.check {
        background: #BD90E3;
      }
    }

    &.exist-idea {
      border-color: #43470B;

      &.check {
        background: #43470B;
        color: #ffffff;
      }
    }

    &.exist-specification {
      border-color: #FED766;

      &.check {
        background: #FED766;
      }
    }

    &.mvp-in-progress {
      border-color: #4113AE;

      &.check {
        background: #4113AE;
        color: #ffffff;
      }
    }

    &.mvp-ready {
      border-color: #B8E9D4;

      &.check {
        background: #B8E9D4;
      }
    }

    &.scaling {
      border-color: #E98142;

      &.check {
        background: #E98142;
        color: #ffffff;
      }
    }

    &.working {
      border-color: #9BB2E5;

      &.check {
        background: #9BB2E5;
      }
    }
  }
</style>
