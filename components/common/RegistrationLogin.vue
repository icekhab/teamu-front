<template>
  <div class="registration-login">
    <client-only>
      <Login @showRegistration="showRegistration" @close="close" />
      <Registration @showLogin="showLogin" @close="close" />
    </client-only>
  </div>
</template>

<script lang="ts">
import {
  Component, Vue,
} from 'vue-property-decorator';
import Login from '@/components/registration/Login.vue';
import Registration from '@/components/registration/Registration.vue';
import { Mutation } from 'vuex-class';
import { RawLocation } from 'vue-router/types/router';

@Component({
  components: { Login, Registration },
})
export default class RegistrationLoginComponent extends Vue {
  @Mutation('setToAfterLogin', { namespace: 'user' }) setToAfterLogin!: (toAfterLogin?: RawLocation) => void;

  private showRegistration() {
    this.$modal.hide('login-modal');
    this.$modal.show('registration-modal');
  }

  private showLogin() {
    this.$modal.show('login-modal');
    this.$modal.hide('registration-modal');
  }

  private close() {
    this.$modal.hide('registration-modal');
    this.$modal.hide('login-modal');
    this.setToAfterLogin(undefined);
    this.$emit('close');
  }
}
</script>
