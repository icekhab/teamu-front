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
      border-color: #E8D5CE;

      &.check {
        background: #E8D5CE;
      }
    }

    &.exist-idea {
      border-color: #F9D1E8;

      &.check {
        background: #F9D1E8;
      }
    }

    &.exist-specification {
      border-color: #F9EED3;

      &.check {
        background: #F9EED3;
      }
    }

    &.mvp-in-progress {
      border-color: #CBE5FB;

      &.check {
        background: #CBE5FB;
      }
    }

    &.mvp-ready {
      border-color: #E0D7F9;

      &.check {
        background: #E0D7F9;
      }
    }

    &.scaling {
      border-color: #D7D7D5;

      &.check {
        background: #D7D7D5;
      }
    }

    &.working {
      border-color: #D0E8E2;

      &.check {
        background: #D0E8E2;
      }
    }
  }
</style>
