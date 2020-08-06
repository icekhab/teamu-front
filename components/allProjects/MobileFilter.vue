<template>
  <div class="all-projects-mobile-filter">
    <span>Выберите метку проекта:</span>
    <div class="all-projects-mobile-filter__labels">
      <template v-for="(label, _, index) in ProjectLabelEnum">
        <ProjectLabel
          :key="index"
          class="all-projects-mobile-filter__label-item"
          :label="label"
          :check="labels.includes(label)"
          @click.native="changeLabel(label)"
        />
      </template>
    </div>
    <TButton
      class="all-projects-mobile-filter__confirm"
      theme="primary"
      @click="applyFilter"
    >
      Применить
    </TButton>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import ProjectLabelEnum from '@/enums/ProjectLabelEnum';
import MetrikaHelper from '@/helpers/MetrikaHelper';
import ProjectCard from '~/components/common/ProjectCard.vue';
import FilterIcon from '~/static/images/svg/filter-icon.svg';
import ProjectLabel from '~/components/common/ProjectLabel.vue';

@Component({
  components: {
    ProjectLabel,
    FilterIcon,
    ProjectCard,
  },
})
export default class MobileFilterComponent extends Vue {
  @Prop() checkedLabels!: ProjectLabelEnum[];

  @Prop({ default: 'noname' }) name!: string;

  labels = [...this.checkedLabels];

  ProjectLabelEnum = ProjectLabelEnum;

  changeLabel(label: ProjectLabelEnum) {
    MetrikaHelper.mobileFilterChanged(label, this.name);

    const isLabelChecked = this.labels.includes(label);

    if (isLabelChecked) {
      const index = this.labels.findIndex((x) => x === label);
      this.labels.splice(index, 1);
    } else {
      this.labels.push(label);
    }
  }

  applyFilter() {
    MetrikaHelper.filterMobilePressed();

    this.$emit('filter', this.labels);
  }
}
</script>

<style lang="postcss" scoped>
  .all-projects-mobile-filter {
    display: flex;
    flex-direction: column;
    border-radius: var(--defaultBorderRadius);

    &__labels {
      margin-top: 20px;
    }

    &__label-item:not(:last-child) {
      margin-right: 20px;
      margin-bottom: 20px;
    }

    &__confirm {
      width: 100%;
      margin-top: 30px;
    }
  }
</style>
