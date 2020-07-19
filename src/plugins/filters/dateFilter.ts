import Vue from 'vue';
import DateHelper from '@/helpers/DateHelper';

Vue.filter(
  'formatDate',
  (value?: string) => value && DateHelper.toDateString(new Date(value)),
);
