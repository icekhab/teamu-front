import UrlHelper from '@/helpers/UrlHelper';
import { helpers } from 'vuelidate/lib/validators';

// eslint-disable-next-line import/prefer-default-export
export const url = (value: string) => !helpers.req(value) || UrlHelper.validate(value);
