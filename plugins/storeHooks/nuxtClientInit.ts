export default async (context: any) => {
  await context.store.dispatch('user/nuxtClientInit', context);
};
