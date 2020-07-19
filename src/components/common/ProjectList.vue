<template>
  <div class="project-list">
    <ProjectCard
      v-for="project in projects"
      :key="project.id"
      :project="project"
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
}
</script>

<style lang="postcss" scoped>
  .project-list {

  }
</style>
