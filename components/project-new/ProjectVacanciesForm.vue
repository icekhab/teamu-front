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
        <div class="project-vacancies-form__row project-vacancies-form__row-input">
          <div class="project-vacancies-form__label project-vacancies-form__label-for-input">
            Роль
          </div>
          <div class="project-vacancies-form__content">
            <!-- РОЛЬ -->
            <TFormControl
              :is-error="$v.newVacancies.$each.$iter[index].title.$error"
              class="project-links-form__title"
            >
              <TInput
                v-model="vacancy.title"
                class="input-text"
                @blur="$v.newVacancies.$each.$iter[index].title.$touch()"
              />
              <template slot="errors">
                <template v-if="!$v.newVacancies.$each.$iter[index].title.required">
                  Заполните роль
                </template>
              </template>
            </TFormControl>
          </div>
        </div>
        <div class="project-vacancies-form__row project-vacancies-form__row-input">
          <div class="project-vacancies-form__label project-vacancies-form__label-for-input">
            Доля в проекте (%)
          </div>
          <div class="project-vacancies-form__content">
            <!-- РОЛЬ -->
            <TFormControl
              :is-error="$v.newVacancies.$each.$iter[index].value.$error"
              class="project-links-form__title"
            >
              <TInput
                :value="vacancy.value"
                type="number"
                class="input-text"
                :disabled="vacancy.shareType !== VacancyShareType.share"
                @input="changeVacancyValue(index, $event)"
                @blur="$v.newVacancies.$each.$iter[index].value.$touch()"
              />
              <template slot="errors">
                <template v-if="!$v.newVacancies.$each.$iter[index].value.minValue">
                  Не меньше 0
                </template>
                <template v-if="!$v.newVacancies.$each.$iter[index].value.maxValue">
                  Не больше 100
                </template>
              </template>
            </TFormControl>
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

    <div class="project-vacancies-form__btn-panel">
      <div
        :style="{visibility: isSaved || serverError ? 'visible' : 'hidden'}"
      >
        <span v-if="isSaved" class="project-vacancies-form__saved-text">
          Успешно сохранено!
        </span>
        <span v-else-if="serverError" class="project-vacancies-form__error-text">
          {{ serverError }}
        </span>
      </div>
      <TButton
        class="project-vacancies-form__submit-btn"
        type="submit"
        :loading="loading"
        :disabled="loading"
      >
        {{ btnText }}
      </TButton>
    </div>
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
import TFormControl from '@/components/controls/TFormControl.vue';
import deepCopyFunction from '@/helpers/deepCopy';
import { Action, State } from 'vuex-class';
import { required, minValue, maxValue } from 'vuelidate/lib/validators';

const namespace = 'savingProject';

const emptyVacancy: VacancyEntity = {
  id: 0, title: '', shareType: VacancyShareType.share, value: undefined,
};

@Component({
  components: {
    TInput,
    TRadioButton,
    TFormControl,
  },

  validations: {
    newVacancies: {
      $each: {
        title: {
          required,
        },
        value: {
          minValue: minValue(0),
          maxValue: maxValue(100),
        },
      },
    },
  },
} as any)
export default class ProjectVacanciesFormComponent extends Vue {
  @State('vacancies', { namespace }) readonly vacancies!: VacancyEntity[];

  @Action('saveVacancies', { namespace }) readonly saveVacancies!: (vacancies: VacancyEntity[]) => void;

  @Prop({ default: 'Сохранить', type: String }) btnText!: string;

  newVacancies: VacancyEntity[] = [];

  VacancyShareType = VacancyShareType;

  loading = false;

  isSaved = false;

  serverError = '';

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

  @Watch('vacancies', { immediate: true })
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

  @Emit('afterSubmit')
  async submitForm() {
    try {
      this.serverError = '';
      this.$v.$touch();

      if (this.$v.$invalid) return;

      this.loading = true;
      this.isSaved = false;
      await this.saveVacancies(this.newVacancies);
      this.isSaved = true;
      this.loading = false;
    } catch (e) {
      this.loading = false;
      this.serverError = 'Oops, что-то пошло не так';
    }
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
      align-items: flex-start;

      &:not(:last-child) {
        margin-bottom: 20px;
      }

      &.project-vacancies-form__row-input {
        margin-bottom: 10px;
      }
    }

    &__label {
      max-width: 135px;
    }

    &__label-for-input {
      margin-top: 12px;
    }

    &__content {
      flex: 1;
      margin-left: 20px;
    }

    &__add-vacancy-btn {
      width: 194px;
      margin: 30px auto;
    }

    &__btn-panel {
      display: flex;
      flex-direction: column;
      margin-top: 30px;
      align-items: center;
    }

    &__saved-text {
      color: #61C9A8;
    }

    &__error-text {
      color: rgba(#FF4B3E, .7);
    }

    &__submit-btn {
      width: 100%;
      margin-top: 15px;
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

      &__btn-panel {
        flex-direction: row;
        align-self: flex-end;
        align-items: center;
      }

      &__saved-text {
        color: #61C9A8;
        white-space: nowrap;
      }

      &__error-text {
        color: rgba(#FF4B3E, .7);
        white-space: nowrap;
      }

      &__submit-btn {
        min-width: 190px;
        align-self: flex-end;
        margin: 0 0 0 20px;
      }
    }
  }

  .input-text {
    width: 100%;
  }
</style>
