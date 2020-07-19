<template>
  <MenuLayout>
    <div class="main">
      <AllProjectsHeader />
      <ProjectList :projects="projects" />
    </div>
  </MenuLayout>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { State } from 'vuex-class';
import TButton from '@/components/controls/TButton.vue';
import MenuLayout from '@/components/layout/MenuLayout.vue';
import AllProjectsHeader from '@/components/allProjects/AllProjectsHeader.vue';
import ProjectList from '@/components/common/ProjectList.vue';
import ProjectEntity from '@/entities/ProjectEntity';

const namespace = 'allProjects';

@Component({
  components: {
    TButton,
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
  @State('projects', { namespace }) projects!: ProjectEntity[];
}
</script>

<style lang="postcss" scoped>
  .main {
    display: flex;
    flex-direction: column;
    margin: auto;
    padding: 30px 10px;
    width: 100%;
    max-width: 320px;
  }
</style>
