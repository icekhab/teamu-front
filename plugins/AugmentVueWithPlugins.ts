// eslint-disable-next-line
import Vue from 'vue';

interface Plugins {
  $modal: any;
}

declare module 'vue/types/vue' {
  interface Vue extends Plugins {
    $v: any;
  }
}

declare module 'vuex/types/index' {
  interface Store<S> extends Plugins {}
}
