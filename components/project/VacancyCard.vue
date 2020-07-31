<template>
  <div class="vacancy-card">
    <div class="vacancy-card__row">
      <span class="vacancy-card__name">Ищем в команду:</span>
      <span class="vacancy-card__value">{{ vacancy.title }}</span>
    </div>

    <div v-if="vacancy.shareType === VacancyShareType.share" class="vacancy-card__row">
      <span class="vacancy-card__name">Доля в проекте (%):</span>
      <span class="vacancy-card__value">{{ vacancy.value }}</span>
    </div>

    <div class="vacancy-card__row">
      <span class="vacancy-card__name vacancy-card__share">{{ shareTypeText }}</span>
      <span class="vacancy-card__check">
        <span class="vacancy-card__check-background">
          <CheckIcon />
        </span>
      </span>
    </div>

    <TButton
      v-if="!my"
      class="vacancy-card__send-request-btn"
      theme="primary"
      target="_blank"
      :href="`mailto:${vacancy.contact.email}`"
    >
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

  @Prop({ default: false, type: Boolean }) my!: boolean;

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
    width: auto;
    /*min-height: 263px;*/

    background: #FFFFFF;
    color: var(--greyColor);
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.06);
    border-radius: var(--defaultBorderRadius);
    padding: 20px;

    &__row {
      width: 100%;
      display: flex;
      margin-bottom: 28px;
      align-items: center;
    }

    &__name {
      min-width: 138px;
      max-width: 138px;
      align-self: flex-start;
      white-space: nowrap;

      &.vacancy-card__share {
        white-space: normal;
      }
    }

    &__value {
      margin-left: 20px;
      font-weight: bold;
      flex-grow: 1;
      color: var(--blackColor);
    }

    &__check {
      margin-left: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 20px;
      height: 20px;
      background: rgba(#4F56F1, 0.5);
      border-radius: 5px;
      color: #FFFFFF;
    }

    &__check-background {
      width: 14px;
      height: 14px;
      display: flex;
      background: #4F56F1;
      border-radius: 5px;
      align-items: center;
      justify-content: center;
    }

    &__send-request-btn {
      display: inline-flex;
      width: 100%;
      align-items: center;
      justify-content: center;
    }
  }

  @media (min-width: 992px) {
    .vacancy-card {
      width: 350px;

      &__send-request-btn {
        width: 158px;
      }
    }
  }
</style>
