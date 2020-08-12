<template>
  <div class="project-card__wrap" style="display: flex">
    <div class="project-card">
      <nuxt-link :to="projectLink" class="project-card__link-block">
        <div
          :style="style"
          class="project-card__image"
        >
          <img
            class="project-card__image__logo"
            :src="project.imagePath || baseSrc"
            alt="project logo"
          >
        </div>
        <div class="project-card__content">
          <div class="project-card__header">
            <span :to="projectLink" class="project-card__title">
              {{ project.name }}
            </span>
            <span v-if="project.accounts" class="project-card__accounts">
              <ProfileIcon class="project-card__accounts-icon" />
              {{ project.accounts }}
            </span>
          </div>
          <div class="project-card__looking-for">
            Ищем в команду:
            <span class="project-card__looking-for__number">{{declOfNumPeople(3)}}</span>
          </div>
          <div class="project-card__text">
            {{ project.description }}
          </div>
          <div class="project-card__footer">
            <div class="project-card__labels">
              <ProjectLabel
                v-for="label in project.labels.slice(0, 2)"
                :key="label.id"
                :label="label.title"
                check
                class="project-card__label"
              />
            </div>
            <div v-if="!isMy" class="project-card__author">
              Автор:
              <Avatar
                class="project-card__author-avatar"
                :size="25"
                :username="project.user.name || ''"
                :src="project.user.imagePath"
                :custom-style="{ 'background-size': 'cover' }"
              />
              <span class="project-card__author-name">
                {{ project.user.name }}
              </span>
            </div>
            <div v-if="!isMy" class="project-card__published-data">
              Опубликовано:
              <span>{{ project.created | formatDate(true) }}</span>
            </div>
          </div>
        </div>
        <div v-if="!isMy" class="project-card__bookmark">
          <BookmarkIcon />
        </div>
      </nuxt-link>
      <div v-if="isMy" class="project-card__buttons">
        <TButton
          v-if="isDraft"
          class="project-card__buttons__btn"
          theme="outline-primary"
          type="button"
          @click="$emit('publish', project.id)"
        >
          Опубликовать
        </TButton>
        <TButton
          v-else
          class="project-card__buttons__btn"
          theme="outline-primary"
          type="button"
          @click="$emit('toDraft', project.id)"
        >
          В черновик
        </TButton>
        <v-popover>
          <button class="project-card__buttons__drop-down-menu">
            <PolygonIcon/>
          </button>
          <template slot="popover">
            <div class="edit-menu">
              <div class="edit-menu__edit-block" @click="editProject">
                <EditIcon class="edit-menu__edit-block__edit-icon" />
                Редактировать
              </div>
              <div class="edit-menu__delete-block" @click="deleteProject">
                <CloseIcon class="edit-menu__delete-block__delete-icon" />
                Удалить
              </div>
            </div>
          </template>
        </v-popover>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import ProjectEntity from '@/entities/ProjectEntity';
import EditIcon from '@/static/images/svg/edit.svg';
import ProfileIcon from '@/static/images/svg/profile-icon.svg';
import CloseIcon from '@/static/images/svg/close.svg';
import DotsIcon from '@/static/images/svg/dots.svg';
import BookmarkIcon from '@/static/images/svg/bookmark-icon.svg';
import PolygonIcon from '@/static/images/svg/polygon-icon.svg';
import ProjectLabel from '@/components/common/ProjectLabel.vue';
import MetrikaHelper from '@/helpers/MetrikaHelper';
import StringHelper from '@/helpers/StringHelper';
import Avatar from 'vue-avatar';

@Component({
  components: {
    ProfileIcon,
    ProjectLabel,
    EditIcon,
    CloseIcon,
    DotsIcon,
    BookmarkIcon,
    PolygonIcon,
    Avatar,
  },
})
export default class ProjectCardComponent extends Vue {
  @Prop() readonly project!: ProjectEntity;

  @Prop({ default: false, type: Boolean }) readonly isMy!: boolean;

  @Prop({ default: false, type: Boolean }) readonly isDraft!: boolean;

  private baseSrc: string = '/images/svg/no-photo.svg';

  get modalName() {
    return `edit-menu-${this.project.id}`;
  }

  private showModal() {
    this.$modal.show(this.modalName);
  }

  private editProject() {
    MetrikaHelper.editProjectButtonPressed();

    this.$modal.hide(this.modalName);
    this.$emit('edit', this.project.id);
  }

  private deleteProject() {
    MetrikaHelper.deleteProjectButtonPressed();

    this.$modal.hide(this.modalName);
    this.$emit('delete', this.project.id);
  }

  private style() {
    const containerStyle: any = {};
    containerStyle.backgroundImage = `url(${this.project.imagePath || this.baseSrc})`;
    containerStyle.backgroundSize = 'cover';

    return containerStyle;
  }

  private declOfNumPeople(n: number) {
    return `${n} ${StringHelper.declOfNum(n, ['человек', 'человекa', 'человек'])}`;
  }

  projectLink = {
    name: 'project-id',
    params: {
      id: this.project.id,
    },
  };
}
</script>

<style lang="postcss">
  .project-card {
    position: relative;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.06);
    border-radius: var(--defaultBorderRadius);
    display: flex;
    flex-direction: column;
    background: #FFFFFF;
    color: var(--greyColor);
    line-height: 17px;
    width: 100%;
    text-decoration: none;
    transition: all .15s ease-in;

    &__content {
      padding: 0 10px;
    }

    &__link-block {
      display: flex;
      flex-direction: column;
      background: #FFFFFF;
      color: var(--greyColor);
      text-decoration: none;
    }

    &:hover {
      box-shadow: var(--hoverBlockBoxShadow);
    }

    &__header {
      display: flex;
      align-items: flex-start;
      width: 100%;
      margin-top: 20px;
      height: 72px;
    }

    &__title {
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      text-decoration: none;
      display: -webkit-box;
      max-height: 72px;      /* fallback */
      -webkit-line-clamp: 3; /* number of lines to show */
      -webkit-box-orient: vertical;
      color: var(--blackColor);
      font-family: Inter;
      font-style: normal;
      font-weight: bold;
      font-size: 20px;
      line-height: 24px;
    }

    &__accounts {
      display: inline-flex;
      align-items: center;
      margin: 0 15px;
    }

    &__looking-for {
      margin: 16px 0;

      &__number {
        font-family: Inter;
        font-style: normal;
        font-weight: bold;
        font-size: 14px;
        line-height: 17px;
        color: var(--blackColor);
      }
    }

    &__accounts-icon {
      color: #3B60E4;
      margin-right: 7px;
    }

    &__text {
      margin-bottom: 20px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      line-height: 17px;     /* fallback */
      height: 51px;
      -webkit-line-clamp: 3; /* number of lines to show */
      -webkit-box-orient: vertical;
      font-family: Inter;
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      color: var(--blackColor);
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

    &__published-data {
      margin-top: 12px;
    }

    &__labels {
      margin-bottom: 16px;
      width: 100%;
      height: 27px;
      white-space: nowrap;
      overflow: hidden;
    }

    &__label:not(:first-child) {
      margin-left: 15px;
    }

    &__footer {
      margin-bottom: 20px;
    }

    &__buttons {
      display: flex;
      align-items: center;
      margin: 0 10px 20px;

      &__btn {
        width: 100%;
        height: 37px;
        margin-right: 10px;
      }

      &__drop-down-menu {
        text-decoration: none;
        border-radius: var(--defaultBorderRadius);
        border: 0;
        transition: all .15s ease-in-out;
        box-sizing: border-box;
        white-space: nowrap;
        width: 55px;
        background: transparent;
        border: 1px solid var(--primaryColor);
        color: var(--primaryColor);
        height: 41px;

        &:hover {
          box-shadow: 0 0 0 1px var(--primaryColor-hover);
          border-color: var(--primaryColor-hover);
          color: var(--primaryColor-hover);
        }

        &:active {
          box-shadow: var(--activeControlBoxShadow);
        }
      }
    }

    &__image {
      display: flex;
      height: 150px;
      transition: all .1s ease-in;
      &__logo {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: var(--defaultBorderRadius);
      }
    }

    &__bookmark {
      position: absolute;
      cursor: pointer;
      bottom: 30px;
      right: 10px;
      width: 25px;
      height: 25px;
    }
  }

  .edit-menu {
    padding: 20px;
    background-color: #fff;
    box-shadow: var(--defaultBoxShadow);
    color: var(--greyColor);
    border-radius: var(--defaultBorderRadius);

    &__edit-block {
      display: flex;
      align-items: center;
      cursor: pointer;
      transition: all .15s ease-in-out;

      &__edit-icon {
        margin-right: 8px;
        vertical-align: bottom;
        display: inline-block;
        width: 23px;
        height: 23px;
      }

      &:hover {
        color: var(--blackColor);
      }
    }

    &__delete-block {
      display: flex;
      align-items: center;
      margin-top: 16px;
      cursor: pointer;
      transition: all .15s ease-in-out;

      &__delete-icon {
        margin-right: 8px;
        vertical-align: bottom;
        display: inline-block;
        width: 23px;
        height: 23px;
      }

      &:hover {
        color: var(--blackColor);
      }
    }
  }

  @media (min-width: 992px) {
    .project-card {
      width: 370px;
    }
  }

  .edit-menu-enter-active,
  .edit-menu-leave-active {
    transition: all 400ms;
  }
  .edit-menu-enter,
  .edit-menu-leave-active {
    opacity: 0;
    transform: translateY(50px);
  }

  .tooltip {
    .tooltip-inner {
      top: -28px;
      left: 79px;
    }

    &[aria-hidden='true'] {
      visibility: hidden;
      opacity: 0;
      transition: opacity .25s ease-out, visibility .15s ease-out;
    }

    &[aria-hidden='false'] {
      visibility: visible;
      opacity: 1;
      transition: opacity .25s ease-out;
    }
  }
</style>
