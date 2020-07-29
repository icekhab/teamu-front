<template>
  <div class="registration-login">
    <Login v-model="isShowLogin" @showRegistration="showRegistration" @close="close" />
    <Registration v-model="isShowRegistration" @showLogin="showLogin" @close="close" />
  </div>
</template>

<script lang="ts">
import {
  Component, Vue,
} from 'vue-property-decorator';
import Login from '@/components/registration/Login.vue';
import Registration from '@/components/registration/Registration.vue';
import { State, Mutation } from 'vuex-class';

@Component({
  components: { Login, Registration },
})
export default class RegistrationLoginComponent extends Vue {
  @State('isShowLogin', { namespace: 'user' }) isShowLogin!: boolean;

  @State('isShowRegistration', { namespace: 'user' }) isShowRegistration!: boolean;

  @Mutation('setIsShowLogin', { namespace: 'user' }) setIsShowLogin!: (isShowLogin: boolean) => void;

  @Mutation('setIsShowRegistration', { namespace: 'user' }) setIsShowRegistration!: (setIsShowRegistration: boolean) => void;

  private showRegistration() {
    this.setIsShowLogin(false);
    this.setIsShowRegistration(true);
  }

  private showLogin() {
    this.setIsShowRegistration(false);
    this.setIsShowLogin(true);
  }

  private close() {
    this.setIsShowRegistration(false);
    this.setIsShowLogin(false);
    this.$emit('close');
  }
}
</script>
