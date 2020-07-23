<template>
  <MenuLayout>
    <div class="main">
      <AllProjectsHeader class="main__header" />
      <ProjectList class="main__project-list" :projects="projects" />
    </div>
  </MenuLayout>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Getter } from 'vuex-class';
import MenuLayout from '@/components/layout/MenuLayout.vue';
import AllProjectsHeader from '@/components/allProjects/AllProjectsHeader.vue';
import ProjectList from '@/components/common/ProjectList.vue';
import ProjectEntity from '@/entities/ProjectEntity';

const namespace = 'allProjects';

@Component({
  components: {
    MenuLayout,
    AllProjectsHeader,
    ProjectList,
  },

  async fetch({
    store,
  }) {
    await store.dispatch('allProjects/getAllProjects');
  },
})
export default class MainPageComponent extends Vue {
  @Getter('projects', { namespace }) projects!: ProjectEntity[];
}
</script>

<style lang="postcss" scoped>
  .main {
    display: flex;
    flex-direction: column;
    margin: auto;
    width: 100%;
    align-items: center;
    max-width: 356px;

    &__project-list {
      width: 100%;
      margin-top: 20px;
    }

    @media (min-width: 992px) {
      max-width: 1108px;
      align-items: flex-start;
      padding: 50px 30px 50px 30px;

      &__project-list {
        width: auto;
        margin-top: 50px;
      }
    }

    @media (min-width: 1200px) {
      max-width: 1140px;
    }
  }
</style>
