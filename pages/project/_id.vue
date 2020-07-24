<template>
  <MenuLayout>
    <div class="project-page">
      <ProjectInfo />
    </div>
  </MenuLayout>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { State } from 'vuex-class';
import MenuLayout from '@/components/layout/MenuLayout.vue';
import DetailProjectEntity from '@/entities/DetailProjectEntity';
import ProjectInfo from '@/components/project/ProjectInfo.vue';

const namespace = 'project';

@Component({
  components: {
    ProjectInfo,
    MenuLayout,
  },

  async fetch({
    store, params: { id },
  }) {
    await store.dispatch('project/getProject', id);
  },

  validate({ params }: any) {
    return !!params.id;
  },
})
export default class MainPageComponent extends Vue {
  @State('project', { namespace }) project!: DetailProjectEntity;
}
</script>

<style lang="postcss" scoped>
  .project-page {
    width: 100%;
    min-width: 300px;
    max-width: 400px;
  }

  @media (min-width: 992px) {
    .project-page {
      max-width: 800px;
      display: flex;
    }
  }

  @media (min-width: 1200px) {
    .project-page {
      display: flex;
      max-width: 1108px;
    }
  }

  @media (min-width: 1200px) {
    .project-page {
      display: flex;
      max-width: 1400px;
    }
  }
</style>
