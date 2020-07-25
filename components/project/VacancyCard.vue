<template>
  <div class="vacancy-card">
    <div class="vacancy-card__row">
      <span class="vacancy-card__name">Роль</span>
      <span class="vacancy-card__value">{{ vacancy.title }}</span>
    </div>

    <div v-if="vacancy.shareType === VacancyShareType.share" class="vacancy-card__row">
      <span class="vacancy-card__name">Доля в проекте (%)</span>
      <span class="vacancy-card__value">{{ vacancy.value }}</span>
    </div>

    <div class="vacancy-card__row">
      <span class="vacancy-card__name">{{ shareTypeText }}</span>
      <CheckIcon class="vacancy-card__check" />
    </div>

    <TButton class="vacancy-card__send-request-btn" theme="primary">
      Подать заявку
    </TButton>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import VacancyEntity from '@/entities/VacancyEntity';
import TButton from '@/components/controls/TButton.vue';
import VacancyShareType from '@/enums/VacancyShareType';
import CheckIcon from '@/static/images/svg/check-icon.svg';

@Component({
  components: {
    TButton,
    CheckIcon,
  },
})
export default class VacancyCardComponent extends Vue {
  @Prop({ required: true, type: Object }) vacancy!: VacancyEntity;

  VacancyShareType = VacancyShareType;

  get shareTypeText() {
    const dictionary = {
      [VacancyShareType.share]: 'Соучастник проекта',
      [VacancyShareType.fullTime]: 'Оплачиваемая работа Full-time',
      [VacancyShareType.partTime]: 'Оплачиваемая работа Part-time',
    };

    return dictionary[this.vacancy.shareType];
  }
}
</script>

<style lang="postcss" scoped>
  .vacancy-card {
    min-width: 300px;
    max-width: 350px;
    /*min-height: 263px;*/

    background: #FFFFFF;
    color: var(--greyColor);
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.06);
    border-radius: var(--defaultBorderRadius);
    padding: 20px;

    &__row {
      width: 100%;
      display: flex;
      margin-bottom: 20px;
      align-items: center;
    }

    &__name {
      max-height: 55%;
    }

    &__value {
      margin-left: 20px;
      flex-grow: 1;
      padding: 10px 5px;
      background: #FFFFFF;
      border: 1px solid var(--borderColor);
      box-sizing: border-box;
      border-radius: 5px;
      display: flex;
      justify-content: center;
      color: var(--blackColor);
    }

    &__check {
      margin-left: 35px;
      color: var(--primaryColor);
    }

    &__send-request-btn {
      width: 100%;
    }
  }
</style>
