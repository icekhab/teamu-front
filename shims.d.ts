// Import vue package in all *.vue files
declare module '*.vue' {
  // eslint-disable-next-line import/no-extraneous-dependencies
  import Vue from 'vue';

  export default Vue;
}

declare module 'webpack-hot-middleware' {
  const middleware: any;
  export interface MiddlewareOptions {
    [proName: string]: any;
  }
  export interface ClientOptions {
    [proName: string]: any;
  }
  export default middleware;
}
