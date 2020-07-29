<template>
  <div class="registration-login">
    <Login v-model="isShowLogin" @showRegistration="showRegistration" @close="close" />
    <Registration v-model="isShowRegistration" @showLogin="showLogin" @close="close" />
  </div>
</template>

<script lang="ts">
import {
  Component, Vue, Prop, Watch,
} from 'vue-property-decorator';
import Login from '@/components/registration/Login.vue';
import Registration from '@/components/registration/Registration.vue';

@Component({
  components: { Login, Registration },
})
export default class RegistrationLoginComponent extends Vue {
  @Prop({ default: false, type: Boolean })
  private value!: boolean;

  @Watch('value', { immediate: true })
  private onValue(newVal: boolean): void {
    if (newVal) {
      this.showRegistration();
    }
  }

  private isShowLogin: boolean = false;

  private isShowRegistration: boolean = false;

  private showRegistration() {
    this.isShowRegistration = !this.isShowRegistration;
    this.isShowLogin = false;
  }

  private showLogin() {
    this.isShowLogin = !this.isShowLogin;
    this.isShowRegistration = false;
  }

  private close() {
    this.isShowLogin = false;
    this.isShowRegistration = false;
    this.$emit('close');
  }
}
</script>
