<template>
  <div class="project-label-list-check">
    <TCheckbox
      v-for="label in labels"
      :key="label.id"
      class="project-label-list-check__item"
      :value="value.some(({ id }) => id === label.id)"
      :disabled="isMaxChecked && !value.some(({ id }) => id === label.id)"
      @input="checkLabel(label)"
    >
      <ProjectLabel
        class="project-label-list-check__item-label"
        :label="label.title"
        check
        active
      />
    </TCheckbox>
  </div>
</template>

<script lang="ts">
import {
  Component, Emit, Prop, Vue,
} from 'vue-property-decorator';
import { State } from 'vuex-class';
import LabelEntity from '@/entities/LabelEntity';
import TCheckbox from '@/components/controls/TCheckbox.vue';
import ProjectLabel from '@/components/common/ProjectLabel.vue';

const namespace = 'labels';

@Component({
  components: { ProjectLabel, TCheckbox },
})
export default class ProjectLabelListCheckComponent extends Vue {
  @Prop({ default: [], type: Array }) value!: LabelEntity[];

  @Prop({ default: 2, type: Number }) maxCheck!: number;

  @State('labels', { namespace }) readonly labels!: LabelEntity[];

  get isMaxChecked() {
    return this.value.length >= this.maxCheck;
  }

  @Emit('input')
  checkLabel(label: LabelEntity) {
    const isCheckLabel = this.value.some(({ id }) => label.id === id);

    const newValue = [...this.value];

    if (isCheckLabel) {
      const index = this.value.findIndex(({ id }) => id === label.id);
      newValue.splice(index, 1);
    } else {
      newValue.push(label);
    }

    return newValue;
  }
}
</script>

<style lang="postcss" scoped>
  .project-label-list-check {
    display: flex;
    flex-direction: column;

    &__item {
      width: auto;

      &:not(:last-child){
        margin-bottom: 20px;
      }
    }
  }

  @media (min-width: 1200px) {
    .project-label-list-check {
      display: grid;
      grid-template-columns: auto auto auto;
      grid-column-gap: 20px;
      grid-row-gap: 20px;

      &__item {
        &:not(:last-child){
          margin-bottom: 0;
        }
      }
    }
  }
</style>
