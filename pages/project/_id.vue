<template>
  <MenuLayout>
    <div class="project-page">
      {{ project }}
    </div>
  </MenuLayout>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { State } from 'vuex-class';
import MenuLayout from '@/components/layout/MenuLayout.vue';
import DetailProjectEntity from '@/entities/DetailProjectEntity';

const namespace = 'project';

@Component({
  components: {
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
  }
</style>
