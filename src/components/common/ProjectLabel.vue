<template>
  <span :class="classes">
    {{ label.title }}
  </span>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import ProjectLabel from '@/enums/ProjectLabel';
import LabelEntity from '@/entities/LabelEntity';

@Component({})
export default class ProjectLabelComponent extends Vue {
  @Prop() readonly label!: LabelEntity;

  @Prop({ type: Boolean }) readonly check?: boolean;

  private labelClasses = {
    [ProjectLabel.analyzing]: 'analyzing',
    [ProjectLabel.existIdea]: 'exist-idea',
    [ProjectLabel.existSpecification]: 'exist-specification',
    [ProjectLabel.mvpInProgress]: 'mvp-in-progress',
    [ProjectLabel.mvpReady]: 'mvp-ready',
    [ProjectLabel.scaling]: 'scaling',
    [ProjectLabel.working]: 'working',
  };

  get classes() {
    const labelClass = this.labelClasses[this.label.title];

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
    line-height: 17px;
    padding: 7px 10px;
    border: 1px solid var(--primaryColor);
    color: var(--blackColor);
    box-sizing: border-box;
    border-radius: 5px;
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
