<template>
  <div class="project-card__wrap" style="display: flex">
    <div class="project-card">
      <nuxt-link :to="projectLink" class="project-card__link-block">
        <div class="project-card__header">
          <span :to="projectLink" class="project-card__title">
            {{ project.name }}
          </span>
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
      </div>
      <client-only>
        <modal
          :name="modalName"
          :shift-x="0.4"
          :shift-y="0.4"
          transition="edit-menu"
          :min-width="211"
          :height="101"
          :max-width="211"
          adaptive
        >
          <div class="edit-menu">
            <div class="edit-menu__edit-block" @click="edit">
              <span class="edit-menu__edit-block__edit-icon" />
              Редактировать
            </div>
            <div class="edit-menu__delete-block" @click="deleteProject">
              <span class="edit-menu__delete-block__delete-icon" />
              Удалить
            </div>
          </div>
        </modal>
      </client-only>
    </div>

    <v-popover v-if="isMy">
      <DotsIcon class="project-card__dots" />
      <template slot="popover">
        <div class="edit-menu">
          <div class="edit-menu__edit-block" @click="edit">
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
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import ProjectEntity from '@/entities/ProjectEntity';
import EditIcon from '@/static/images/svg/edit.svg';
import ProfileIcon from '@/static/images/svg/profile-icon.svg';
import CloseIcon from '@/static/images/svg/close.svg';
import DotsIcon from '@/static/images/svg/dots.svg';
import ProjectLabel from '@/components/common/ProjectLabel.vue';

@Component({
  components: {
    ProfileIcon,
    ProjectLabel,
    EditIcon,
    CloseIcon,
    DotsIcon,
  },
})
export default class ProjectCardComponent extends Vue {
  @Prop() readonly project!: ProjectEntity;

  @Prop({ default: false, type: Boolean }) readonly isMy!: boolean;

  @Prop({ default: false, type: Boolean }) readonly isDraft!: boolean;

  get modalName() {
    return `edit-menu-${this.project.id}`;
  }

  private showModal() {
    this.$modal.show(this.modalName);
  }

  private edit() {
    this.$modal.hide(this.modalName);
    this.$emit('edit', this.project.id);
  }

  private deleteProject() {
    this.$modal.hide(this.modalName);
    this.$emit('delete', this.project.id);
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
    padding: 15px 10px 20px;
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

    &__dots {
      display: none;
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

    &__buttons {
      display: flex;
      align-items: center;

      &__btn {
        width: 280px;
        height: 37px;
        margin: 20px auto 0;
        //color: #4F56F1;
        //background: #FFFFFF;
        //border: 1px solid #4F56F1;
        //box-sizing: border-box;
        //border-radius: 5px;
      }
    }
  }

  @media (min-width: 992px) {
    .project-card {
      width: 370px;
      &__dots {
        margin-left: 10px;
        display: inline-block;
        //position: absolute;
        cursor: pointer;
        //width: 30px;
        height: 25px;
        //top: 10px;
        //right: -35px;
        color: var(--greyColor);
        transition: all .15s ease-in-out;

        &:hover {
          color: var(--blackColor);
        }
      }
    }

    .edit-menu {
      //z-index: 101;
      padding: 20px;
      background: #FFFFFF;
      box-shadow: var(--defaultBoxShadow);
      color: var(--greyColor);
      border-radius: var(--defaultBorderRadius);
      //padding: 20px;

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
