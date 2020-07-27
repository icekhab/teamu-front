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

  @Prop({ type: Boolean }) readonly active?: boolean;

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
      this.active ? 'active' : undefined,
    ];
  }
}
</script>

<style lang="postcss" scoped>
  .project-label {
    font-size: 14px;
    line-height: 17px;
    padding: 4px 10px;
    border: 1px solid var(--primaryColor);
    color: var(--blackColor);
    box-sizing: border-box;
    border-radius: var(--defaultBorderRadius);
    display: inline-block;
    background: #ffffff;
    transition: all .15s ease-in-out;

    &.check {
      background: var(--primaryColor);
    }

    &.analyzing {
      border-color: #E8D5CE;

      &.check {
        background: #E8D5CE;

        &.active:hover {
          background: #E6BFB1;
        }
      }

      &.active:hover {
        border-color: #E6BFB1;
      }
    }

    &.exist-idea {
      border-color: #F9D1E8;

      &.check {
        background: #F9D1E8;

        &.active:hover {
          background: #FCB9DF;
        }
      }

      &.active:hover {
        border-color: #FCB9DF;
      }
    }

    &.exist-specification {
      border-color: #F9EED3;

      &.check {
        background: #F9EED3;

        &.active:hover {
          background: #F3DDA7;
        }
      }

      &.active:hover {
        border-color: #F3DDA7;
      }
    }

    &.mvp-in-progress {
      border-color: #CBE5FB;

      &.check {
        background: #CBE5FB;

        &.active:hover {
          background: #ABD5FA;
        }
      }

      &.active:hover {
        border-color: #ABD5FA;
      }
    }

    &.mvp-ready {
      border-color: #E0D7F9;

      &.check {
        background: #E0D7F9;

        &.active:hover {
          background: #CFC0F8;
        }
      }

      &.active:hover {
        border-color: #CFC0F8;
      }
    }

    &.scaling {
      border-color: #D7D7D5;

      &.check {
        background: #D7D7D5;

        &.active:hover {
          background: #BBBBBA;
        }
      }

      &.active:hover {
        border-color: #BBBBBA;
      }
    }

    &.working {
      border-color: #D0E8E2;

      &.check {
        background: #D0E8E2;

        &.active:hover {
          background: #B8EBDE;
        }
      }

      &.active:hover {
        border-color: #B8EBDE;
      }
    }
  }
</style>
