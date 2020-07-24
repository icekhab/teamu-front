import Vue from 'vue';
import DateHelper from '@/helpers/DateHelper';

Vue.filter(
  'formatDate',
  (
    value?: string,
    alwaysWithYear = false,
  ) => value && DateHelper.toDateString(new Date(value), alwaysWithYear),
);
