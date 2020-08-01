<template>
  <MenuLayout>
    <div class="my-projects">
      <client-only v-if="!loading">
        <MyProjectsHeader class="my-projects__header" />
        <div
          v-if="!publishedProjects.length && !draftProjects.length"
          key="empty"
          class="empty-projects__empty-data"
        >
          <span class="empty-projects__empty-text">
            Пусто :( Добавьте ваш первый проект и соберите команду
          </span>
          <span class="empty-projects__idea-img" />
        </div>

        <template v-else>
          <!-- <div class="my-projects__menu">
            <span class="published-projects__label">Опубликованные</span>
            <span class="draft-projects__label">Черновики</span>
          </div> -->

          <div v-if="publishedProjects.length" key="published" class="published-projects">
            <span class="published-projects__label">Опубликованные</span>
            <ProjectList
              class="published-projects__project-list"
              :projects="publishedProjects"
              is-my
              @toDraft="toDraft"
              @edit="editProject"
              @delete="onDeleteProject"
            />
          </div>
          <div v-if="draftProjects.length" key="draft" class="draft-projects">
            <span class="draft-projects__label">Черновики</span>
            <ProjectList
              class="draft-projects__project-list"
              :projects="draftProjects"
              is-my
              is-draft
              @publish="publish"
              @edit="editProject"
              @delete="onDeleteProject"
            />
          </div>
        </template>
      </client-only>
    </div>
  </MenuLayout>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import MenuLayout from '@/components/layout/MenuLayout.vue';
import MyProjectsHeader from '@/components/myProjects/MyProjectsHeader.vue';
import ProjectList from '@/components/common/ProjectList.vue';
import { Action, Getter } from 'vuex-class';
import ProjectEntity from '@/entities/ProjectEntity';

const namespace = 'myProjects';

@Component({
  components: {
    MenuLayout,
    MyProjectsHeader,
    ProjectList,
  },
})
export default class MyProjectsPageComponent extends Vue {
  @Action('getPublishedProjects', { namespace }) readonly getPublishedProjects!: () => void;

  @Action('getDraftProjects', { namespace }) readonly getDraftProjects!: () => void;

  @Action('publishProject', { namespace }) publishProject!: (id: number) => void;

  @Action('draftProject', { namespace }) draftProject!: (id: number) => void;

  @Action('deleteProject', { namespace }) deleteProject!: (id: number) => void;

  @Getter('draftProjects', { namespace }) draftProjects!: ProjectEntity[];

  @Getter('publishedProjects', { namespace }) publishedProjects!: ProjectEntity[];

  loading = false;

  async mounted() {
    this.loading = true;
    await this.getPublishedProjects();
    await this.getDraftProjects();
    this.loading = false;
  }

  async toDraft(id: number) {
    await this.draftProject(id);
    await this.getPublishedProjects();
    await this.getDraftProjects();
  }

  async publish(id: number) {
    await this.publishProject(id);
    await this.getPublishedProjects();
    await this.getDraftProjects();
  }

  async onDeleteProject(id: number) {
    await this.deleteProject(id);
    await this.getPublishedProjects();
    await this.getDraftProjects();
  }

  async editProject(id: number) {
    this.$router.push({
      name: 'project-edit-id',
      params: {
        id: String(id),
      },
    });
  }
}
</script>

<style lang="postcss" scoped>
  .my-projects {
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    max-width: 356px;

    &__project-list {
      width: 100%;
      margin-top: 20px;
    }

    &__menu {
      display: flex;
      align-items: center;
      justify-content: left;
      width: 100%;
    }
  }

  .empty-projects {
    &__empty-data {
      text-align: center;
      margin: 0 auto;
    }

    &__empty-text {
      display: inline-block;
      margin-top: 60px;
      font-size: 17px;
      line-height: 20px;
    }

    &__idea-img {
      display: inline-block;
      width: 214px;
      height: 270px;
      margin-top: 30px;
      background: transparent url("/images/svg/idea-application.svg") no-repeat scroll;
    }
  }

  .draft-projects {
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;

    &__label {
        width: 100%;
        height: 22px;
        margin-top: 30px;

        font-family: Inter;
        font-style: normal;
        font-weight: 500;
        font-size: 18px;
        line-height: 22px;

        display: flex;
        align-self: flex-start;
        text-align: center;

        color: #878E99;
    }

    &__project-list {
      width: 100%;
      margin-top: 20px;
    }

    &__empty-data {
      text-align: center;
    }

    &__empty-text {
      display: inline-block;
      margin-top: 30px;
    }

    &__idea-img {
      display: inline-block;
      width: 148px;
      height: 188px;
      margin-top: 30px;
      margin-bottom: 32px;
      background: transparent url("/images/svg/idea-application.svg") no-repeat scroll;
    }
  }

  .published-projects {
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    max-width: 356px;

    &__label {
        width: 100%;
        height: 22px;
        margin-top: 30px;

        font-family: Inter;
        font-style: normal;
        font-weight: 500;
        font-size: 18px;
        line-height: 22px;

        display: flex;
        align-self: flex-start;
        text-align: center;

        color: #878E99;
    }

    &__project-list {
      width: 100%;
      margin-top: 20px;
    }
  }

  @media (min-width: 992px) {
    .my-projects {
      width: 1108px;
      max-width: none;
      align-items: flex-start;

      &__project-list {
        width: auto;
        margin-top: 50px;
      }

      .empty-projects {
        &__empty-data {
          text-align: center;
        }

        &__empty-text {
          width: 100%;
          margin-top: 35px;
          font-weight: 500;

          font-size: 20px;
          line-height: 25px;
          margin-bottom: 35px;
        }

        &__idea-img {
          display: inline-block;
          width: 261px;
          height: 330px;
          margin: 0;

          background: transparent url("/images/svg/idea-application.svg") no-repeat scroll;
        }
      }
    }
  }

  @media (min-width: 1200px) {
    .my-projects {
      width: 1400px;

      .empty-projects {
        &__empty-text {
          margin-top: 80px;

          font-size: 22px;
          line-height: 27px;
          margin-bottom: 45px;
        }

        &__idea-img {
          width: 370px;
          height: 466px;
        }
      }
    }
  }
</style>
