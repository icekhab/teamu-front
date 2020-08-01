<template>
  <div :class="projectListClass">
    <ProjectCard
      v-for="project in projects"
      :key="project.id"
      :project="project"
      :is-my="isMy"
      v-bind="$attrs"
      v-on="$listeners"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import ProjectEntity from '@/entities/ProjectEntity';
import ProjectCard from '@/components/common/ProjectCard.vue';

@Component({
  components: {
    ProjectCard,
  },
})
export default class ProjectListComponent extends Vue {
  @Prop() readonly projects!: ProjectEntity[];

  @Prop({ default: false, type: Boolean }) readonly isMy!: boolean;

  get projectListClass() {
    return [
      'project-list',
      { 'project-list__is-my': this.isMy },
    ];
  }
}
</script>

<style lang="postcss" scoped>
  .project-list {
    display: grid;
    grid-template-columns: 1fr;
    grid-column-gap: 20px;
    grid-row-gap: 20px;

    @media (min-width: 992px) {
      grid-template-columns: 1fr 1fr;
    }

    @media (min-width: 1200px) {
      grid-column-gap: 36px;
      grid-row-gap: 36px;
    }

    @media (min-width: 1450px) {
      grid-template-columns: 1fr 1fr 1fr;
      grid-column-gap: 60px;
      grid-row-gap: 45px;
      &__is-my {
        grid-template-columns: 1fr 1fr 1fr;
      }
    }
  }
</style>
