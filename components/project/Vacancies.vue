<template>
  <div class="vacancy-list">
    <VacancyCard
      v-for="vacancy in vacancies"
      :key="vacancy.id"
      :vacancy="vacancy"
      :my="my"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import VacancyCard from '@/components/project/VacancyCard.vue';
import VacancyEntity from '@/entities/VacancyEntity';

@Component({
  components: {
    VacancyCard,
  },
})
export default class ProjectInfoComponent extends Vue {
  @Prop({ required: true, type: Array }) vacancies!: VacancyEntity[];

  @Prop({ default: false, type: Boolean }) my!: boolean;
}
</script>

<style lang="postcss" scoped>
  .vacancy-list {
    display: grid;
    grid-template-columns: 1fr;
    grid-column-gap: 20px;
    grid-row-gap: 20px;
  }

  @media (min-width: 992px) {
    .vacancy-list {
      grid-template-columns: repeat(2, 1fr);
      justify-content: space-between;
    }
  }

  @media (min-width: 1200px) {
    .vacancy-list {
      grid-template-columns: repeat(3, auto);
      grid-column-gap: 36px;
      grid-row-gap: 36px;
    }
  }

  @media (min-width: 1600px) {
    .vacancy-list {
      grid-column-gap: 50px;
      grid-row-gap: 50px;
      justify-content: flex-start;
    }
  }
</style>
