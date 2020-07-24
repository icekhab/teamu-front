<template>
  <div class="project-card">
    <div class="project-card__header">
      <nuxt-link :to="projectLink" class="project-card__title">
        {{ project.name }}
      </nuxt-link>
      <span v-if="project.accounts" class="project-card__accounts">
        <ProfileIcon class="project-card__accounts-icon" />
        {{ project.accounts }}
      </span>
      <span>{{ project.created | formatDate }}</span>
    </div>
    <div class="project-card__text">
      {{ project.description }}
    </div>
    <div class="project-card__footer">
      <div class="project-card__author">
        Автор:
        <CircleAvatar class="project-card__author-avatar" />
        <span class="project-card__author-name">
          {{ project.user.name || project.user.email }}
        </span>
      </div>
      <div class="project-card__labels">
        <ProjectLabel
          v-for="label in project.labels.slice(0, 2)"
          :key="label.id"
          :label="label.title"
          check
          class="project-card__label"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import ProjectEntity from '@/entities/ProjectEntity';
import ProfileIcon from '@/static/images/svg/profile-icon.svg';
import ProjectLabel from '@/components/common/ProjectLabel.vue';

@Component({
  components: {
    ProfileIcon,
    ProjectLabel,
  },
})
export default class ProjectCardComponent extends Vue {
  @Prop() readonly project!: ProjectEntity;

  projectLink = {
    name: 'project-id',
    params: {
      id: this.project.id,
    },
  };
}
</script>

<style lang="postcss" scoped>
  .project-card {
    padding: 15px 10px 20px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.06);
    border-radius: var(--defaultBorderRadius);
    display: flex;
    flex-direction: column;
    background: #FFFFFF;
    color: var(--greyColor);
    line-height: 17px;
    min-width: 300px;
    max-width: 356px;

    &__header {
      display: flex;
      align-items: flex-start;
      width: 100%;
    }

    &__title {
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      text-decoration: none;
      display: -webkit-box;
      line-height: 17px;     /* fallback */
      max-height: 34px;      /* fallback */
      -webkit-line-clamp: 2; /* number of lines to show */
      -webkit-box-orient: vertical;
      color: var(--blackColor);
    }

    &__accounts {
      display: inline-flex;
      align-items: center;
      margin: 0 15px;
    }

    &__accounts-icon {
      color: #3B60E4;
      margin-right: 7px;
    }

    &__text {
      margin: 16px 0;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      line-height: 17px;     /* fallback */
      max-height: 51px;      /* fallback */
      -webkit-line-clamp: 3; /* number of lines to show */
      -webkit-box-orient: vertical;
    }

    &__author {
      display: flex;
      align-items: center;
    }

    &__author-avatar {
      height: 25px;
      width: 25px;
      min-width: 25px;
      margin: 0 5px;
    }

    &__author-name {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      color: var(--blackColor);
    }

    &__labels {
      margin-top: 15px;
      width: 100%;
      white-space: nowrap;
      overflow: hidden;
    }

    &__label:not(:first-child) {
      margin-left: 15px;
    }
  }
</style>
