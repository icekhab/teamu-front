// Import vue package in all *.vue files
declare module '*.vue' {
  // eslint-disable-next-line import/no-extraneous-dependencies
  import Vue from 'vue';

  export default Vue;
}
