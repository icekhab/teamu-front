<template>
  <MenuLayout>
    <div class="main">
      <AllProjectsHeader class="main__header" />
      <ProjectList v-if="projects.length" class="main__project-list" :projects="projects" @add-to-favorite="addProjectToFavorites"/>
      <div v-else class="main__not-found">
        <span class="main__not-found-text">К сожалению, по вашим параметрам проектов не найдено.</span>
        <img class="main__not-found-img" src="/images/svg/projects/not-found.svg" alt="">
      </div>
    </div>
  </MenuLayout>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Getter, Action } from 'vuex-class';
import MenuLayout from '@/components/layout/MenuLayout.vue';
import AllProjectsHeader from '@/components/allProjects/AllProjectsHeader.vue';
import ProjectList from '@/components/common/ProjectList.vue';
import ProjectEntity from '@/entities/ProjectEntity';

const namespace = 'allProjects';
const namespaceUserFavorites = 'userFavorites';

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

  @Action('addFavoriteProject', { namespace: namespaceUserFavorites }) addFavoriteProject!: (id: number) => void;

  addProjectToFavorites(id: number) {
    this.addFavoriteProject(id);
  }
}
</script>

<style lang="postcss" scoped>
  .main {
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    max-width: 356px;

    &__not-found {
      display: flex;
      flex-direction: column;
      margin-top: 60px;
      align-items: center;
      width: 100%;
    }

    &__not-found-text {
      font-weight: 500;
      font-size: 17px;
      line-height: 20px;
      color: var(--blackColor);
      margin-bottom: 30px;
      text-align: center;
    }

    &__not-found-img {
      width: 275px;
    }

    &__project-list {
      width: 100%;
      margin-top: 20px;
    }

    @media (min-width: 992px) {
      width: 1108px;
      max-width: none;
      align-items: flex-start;

      &__project-list {
        width: auto;
        margin-top: 50px;
      }

      &__not-found {
        margin-top: 50px;
      }

      &__not-found-text {
        font-size: 20px;
        line-height: 25px;
        margin-bottom: 35px;
      }

      &__not-found-img {
        width: auto;
        max-width: 460px;
      }
    }

    @media (min-width: 1200px) {
      width: 1400px;

      &__not-found {
        margin-top: 80px;
      }

      &__not-found-text {
        font-size: 22px;
        line-height: 27px;
        margin-bottom: 45px;
      }

      &__not-found-img {
        max-width: none;
      }
    }
  }
</style>
