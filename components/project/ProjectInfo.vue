<template>
  <div class="project-info">
    <div class="project-info__main">
      <div class="project-info__about-creating">
        <span>Добавлена: {{ project.created | formatDate(true) }}</span>
        <span v-if="my" class="project-info__btn-panel">
          <TButton class="project-info__btn" theme="outline-primary" :to="projectEditLink" @click="editProjectPressed">
            Редактировать
          </TButton>
          <TButton v-if="!project.isPublished" class="project-info__publish-btn" @click="publish">
            Опубликовать
          </TButton>
          <TButton v-else class="project-info__publish-btn" @click="toDraft">
            В черновик
          </TButton>
        </span>
        <nuxt-link v-else :to="toUserProfile" class="project-info__author">
          Автор:
          <Avatar
            class="project-info__author-avatar"
            :size="25"
            :username="project.user.name || ''"
            :src="project.user.imagePath"
            :custom-style="{ 'background-size': 'cover' }"
          />
          <span class="project-info__author-name">{{ project.user.name }}</span>
        </nuxt-link>
      </div>

      <div class="project-info__header">
        <h1 class="project-info__name">
          {{ project.name }}
        </h1>
        <div class="project-info__labels">
          <ProjectLabel
            v-for="(label, index) in project.labels"
            :key="index"
            class="project-info__label-item"
            :label="label.title"
            check
          />
        </div>
      </div>
      <article class="project-info__description">
        {{ project.description }}
      </article>
      <img
        v-if="project.imagePath"
        class="project-info__logo-mobile"
        :src="project.imagePath"
        alt="project logo"
      >
      <div v-if="project.links.length" class="project-info__links-block">
        <span class="project-info__links">Ссылки</span>
        <a
          v-for="link in project.links"
          :key="link.id"
          class="project-info__link"
          :href="link.link"
          target="_blank"
        >
          {{ link.title }}
        </a>
      </div>
    </div>

    <img
      class="project-info__logo"
      :src="project.imagePath || noLogoUrl"
      alt="project logo"
    >
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Action, State } from 'vuex-class';
import DetailProjectEntity from '@/entities/DetailProjectEntity';
import ProjectLabel from '@/components/common/ProjectLabel.vue';
import TButton from '@/components/controls/TButton.vue';
import MetrikaHelper from '@/helpers/MetrikaHelper';
import Avatar from 'vue-avatar';

const namespace = 'project';

@Component({
  components: {
    ProjectLabel,
    TButton,
    Avatar,
  },
  head(this: ProjectInfoComponent): object {
    return {
      meta: [
        { hid: 'og:image', property: 'og:image', content: this.projectImg },
      ],
    };
  },
})
export default class ProjectInfoComponent extends Vue {
  @State('project', { namespace }) project!: DetailProjectEntity;

  @Prop({ default: false, type: Boolean }) my!: boolean;

  noLogoUrl = '/images/svg/no-photo.svg';

  @Action('publishProject', { namespace: 'myProjects' }) publishProject!: (id: number) => void;

  @Action('draftProject', { namespace: 'myProjects' }) draftProject!: (id: number) => void;

  async publish() {
    MetrikaHelper.publishProjectButtonPressed();

    await this.publishProject(this.project.id);
    await this.$store.dispatch('project/getProject', this.$route.params.id);
  }

  async toDraft() {
    MetrikaHelper.draftProjectButtonPressed();

    await this.draftProject(this.project.id);
    await this.$store.dispatch('project/getProject', this.$route.params.id);
  }

  editProjectPressed() {
    MetrikaHelper.editProjectButtonPressed();
  }

  get projectEditLink() {
    return {
      name: 'project-edit-id',
      params: {
        id: String(this.project.id),
      },
    };
  }

  get toUserProfile() {
    return {
      name: 'profile-id',
      params: { id: this.project.user.id },
    };
  }

  get projectImg() {
    return this.project.imagePath || this.noLogoUrl;
  }
}
</script>

<style lang="postcss" scoped>
  .project-info {
    width: 100%;
    justify-content: space-between;

    &__about-creating {
      display: flex;
      flex-direction: column;
      color: var(--greyColor);
    }

    &__author {
      display: flex;
      align-items: center;
      margin-top: 15px;
      text-decoration: none;
      color: var(--greyColor);
    }

    &__btn-panel {
      display: flex;
      flex-direction: column;
      margin-top: 15px;
    }

    &__publish-btn {
      margin-top: 15px;
    }

    &__author-avatar {
      height: 25px;
      width: 25px;
      margin: 0 5px 0 10px;
    }

    &__author-name {
      color: var(--blackColor);
    }

    &__header {
      margin-top: 30px;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
    }

    &__name {
      font-weight: 900;
      font-size: 26px;
      line-height: 31px;
      flex: 1 1 auto;
      margin: 0 15px 20px 0;
    }

    &__labels {
      display: flex;
      margin-bottom: 20px;
    }

    &__label-item:not(:last-child) {
      margin-right: 15px;
    }

    &__description {
      line-height: 130%;
      white-space: pre-line;
    }

    &__links-block {
      margin-top: 30px;
      display: flex;
      flex-direction: column;
    }

    &__links {
      font-weight: bold;
      font-size: 22px;
      line-height: 27px;
    }

    &__link {
      margin-top: 20px;
      color: #0085FF;
      font-weight: bold;
      text-decoration: none;
      align-self: flex-start;
    }

    &__logo-mobile {
      display: block;
      margin: 20px auto 0;
      width: 100%;
      max-width: 400px;
      min-height: 150px;
      max-height: 200px;
      border-radius: var(--defaultBorderRadius);
      object-fit: cover;
    }

    &__logo {
      display: none;
    }

    &__btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }
  }

  @media (min-width: 992px) {
    .project-info {
      width: 100%;
      display: flex;

      &__main {
        width: 550px;
      }

      &__btn-panel {
        flex-direction: row;
        margin-top: 0;
      }

      &__publish-btn {
        margin: 0 0 0 15px;
      }

      &__about-creating {
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
      }

      &__author {
        margin: 0 0 0 15px;
      }

      &__logo-mobile {
         display: none;
       }

      &__logo {
        display: block;
        width: 100%;
        max-width: 380px;
        min-height: 270px;
        max-height: 320px;
        margin: 57px 0 0 40px;
        border-radius: var(--defaultBorderRadius);
        object-fit: cover;
        box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.06);
      }
    }
  }

  @media (min-width: 1200px) {
    .project-info {
      &__main {
        width: 561px;
      }

      &__header {
        margin-top: 36px;
      }

      &__name {
        font-size: 36px;
        line-height: 44px;
      }

      &__logo {
        max-width: 380px;
        max-height: 320px;
        margin: 70px 0 0 100px;
      }
    }
  }

  @media (min-width: 1600px) {
    .project-info {
      &__main {
        min-width: 761px;
      }

      &__logo {
        min-width: 400px;
        max-width: 480px;
        min-height: 350px;
        max-height: 400px;
        margin-left: 140px;
        box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.06);
      }
    }
  }
</style>
