<template>
  <form class="project-vacancies-form" @submit.prevent="submitForm">
    <div class="project-vacancies-form__description-text">
      Добавьте роли сотрудников, кого вы ищите в свой проект.
    </div>
    <div class="project-vacancies-form__vacancies">
      <div
        v-for="(vacancy, index) in newVacancies"
        :key="index"
        class="project-vacancies-form__vacancy-block"
      >
        <div class="project-vacancies-form__row">
          <div class="project-vacancies-form__label">
            Роль
          </div>
          <div class="project-vacancies-form__content">
            <TInput v-model="vacancy.title" class="input-text" />
          </div>
        </div>
        <div class="project-vacancies-form__row">
          <div class="project-vacancies-form__label">
            Доля в проекте (%)
          </div>
          <div class="project-vacancies-form__content">
            <TInput
              :value="vacancy.value"
              type="number"
              class="input-text"
              :disabled="vacancy.shareType !== VacancyShareType.share"
              @input="changeVacancyValue(index, $event)"
            />
          </div>
        </div>
        <div
          v-for="(item, shareTypeIndex) in dictionaryShareType"
          :key="shareTypeIndex"
          class="project-vacancies-form__row"
        >
          <div class="project-vacancies-form__label">
            {{ item.title }}
          </div>
          <div class="project-vacancies-form__content">
            <TRadioButton
              v-model="vacancy.shareType"
              :val="item.shareType"
              name="shareType"
              @input="changeShareType(index, $event)"
            />
          </div>
        </div>
        <div class="project-vacancies-form__row">
          <span class="project-vacancies-form__remove" @click="removeVacancy(index)">Удалить</span>
        </div>
      </div>

      <TButton
        v-if="newVacancies.length < 20"
        class="project-vacancies-form__add-vacancy-btn"
        type="button"
        theme="outline-primary"
        @click="addLink"
      >
        + Добавить роль
      </TButton>
    </div>

    <TButton
      class="project-vacancies-form__submit-btn"
      type="submit"
      theme="primary"
    >
      Добавить проект
    </TButton>
  </form>
</template>

<script lang="ts">
import {
  Component, Emit, Prop, Vue, Watch,
} from 'vue-property-decorator';
import VacancyEntity from '@/entities/VacancyEntity';
import VacancyShareType from '@/enums/VacancyShareType';
import TInput from '@/components/controls/TInput.vue';
import TRadioButton from '@/components/controls/TRadioButton.vue';
import deepCopyFunction from '@/helpers/deepCopy';

const emptyVacancy: VacancyEntity = {
  id: 0, title: '', shareType: VacancyShareType.share,
};

@Component({
  components: {
    TInput,
    TRadioButton,
  },
})
export default class ProjectVacanciesFormComponent extends Vue {
  @Prop({
    default: [{ ...emptyVacancy }],
    type: Array,
  })
  readonly vacancies!: VacancyEntity[];

  newVacancies = deepCopyFunction(this.vacancies);

  VacancyShareType = VacancyShareType;

  dictionaryShareType = [
    {
      shareType: VacancyShareType.share,
      title: 'Соучастник проекта',
    },
    {
      shareType: VacancyShareType.fullTime,
      title: 'Оплачиваемая работа Full-time',
    },
    {
      shareType: VacancyShareType.partTime,
      title: 'Оплачиваемая работа Part-time',
    },
  ];

  @Watch('vacancies', { immediate: false })
  private onLabels(newVal: VacancyEntity[]): void {
    this.newVacancies = deepCopyFunction(newVal);
  }

  changeVacancyValue(index: number, value?: string) {
    this.newVacancies[index].value = value ? Number(value) : undefined;
  }

  changeShareType(index: number, shareType: VacancyShareType) {
    if (shareType !== VacancyShareType.share) {
      this.newVacancies[index].value = undefined;
    }
  }

  addLink() {
    this.newVacancies.push({ ...emptyVacancy });
  }

  removeVacancy(index: number) {
    this.newVacancies.splice(index, 1);
  }

  @Emit('submit')
  submitForm() {
    return this.newVacancies;
  }
}
</script>

<style lang="postcss" scoped>
  .project-vacancies-form {
    &__description-text {
      line-height: 135%;
      margin-bottom: 30px;
      max-width: 600px;
    }

    &__vacancies {
      display: flex;
      flex-direction: column;
    }

    &__vacancy-block {
      display: flex;
      flex-direction: column;

      padding: 20px;
      background: #FFFFFF;
      box-shadow: var(--defaultBoxShadow);
      border-radius: var(--defaultBorderRadius);

      &:not(:first-child) {
        margin-top: 30px;
      }
    }

    &__row {
      width: 100%;
      color: var(--greyColor);
      display: flex;
      align-items: center;

      &:not(:first-child) {
        margin-top: 20px;
      }
    }

    &__label {
      max-width: 135px;
    }

    &__content {
      flex: 1;
      margin-left: 20px;
    }

    &__add-vacancy-btn {
      width: 194px;
      margin: 30px auto;
    }

    &__submit-btn {
      margin-top: 30px;
      width: 100%;
    }

    &__remove {
      color: rgba(#FF4B3E, .7);
      display: inline-block;
      cursor: pointer;
      transition: color .15s ease-out;
      margin: auto;

      &:hover {
        color: #FF4B3E;
      }
    }
  }

  @media (min-width: 992px) {
    .project-vacancies-form {
      display: flex;
      flex-direction: column;

      &__vacancies {
        max-width: 830px;
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-column-gap: 30px;
        grid-row-gap: 30px;
      }

      &__add-vacancy-btn {
        width: 194px;
        margin: 0;
      }

      &__vacancy-block {
        &:not(:first-child) {
          margin-top: 0;
        }
      }

      &__submit-btn {
        margin-top: 50px;
        width: 190px;
        align-self: flex-end;
      }
    }
  }

  .input-text {
    width: 100%;
  }
</style>
