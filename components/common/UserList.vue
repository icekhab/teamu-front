<template>
  <div class="user-list">
    <UserCard
      v-for="user in users"
      :key="user.id"
      :user="user"
      v-bind="$attrs"
      v-on="$listeners"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import UserEntity from '@/entities/UserEntity';
import UserCard from '@/components/common/UserCard.vue';

@Component({
  components: {
    UserCard,
  },
})
export default class UserListComponent extends Vue {
  @Prop() readonly users!: UserEntity[];
}
</script>

<style lang="postcss" scoped>
  .user-list {
    display: grid;
    grid-template-columns: 1fr;
    grid-column-gap: 20px;
    grid-row-gap: 20px;

    @media (min-width: 992px) {
      grid-template-columns: 1fr 1fr;
    }

    @media (min-width: 1200px) {
      grid-column-gap: 36px;
      grid-row-gap: 36px;
    }

    @media (min-width: 1430px) {
      grid-template-columns: 1fr 1fr 1fr;
      grid-column-gap: 60px;
      grid-row-gap: 45px;
    }
  }
</style>
