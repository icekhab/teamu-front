<template>
  <MenuLayout>
    <div class="main">
      <div>
        <h1>Список идей</h1>
      </div>
    </div>
  </MenuLayout>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import ProjectService from '@/services/ProjectService';
import ProjectEntity from '@/entities/ProjectEntity';
import TButton from '~/components/controls/TButton.vue';
import MenuLayout from '~/components/layout/MenuLayout.vue';

@Component({
  components: {
    TButton,
    MenuLayout,
  },
})
export default class MainPageComponent extends Vue {
  projects: ProjectEntity[] = [];

  async mounted() {
    this.projects = await ProjectService.get();
  }
}
</script>

<style lang="postcss" scoped>
  .main {
    display: flex;
    width: fit-content;
    flex-direction: column;
    padding: 50px;
    & * {
      margin-top: 20px;
    }
  }
</style>
