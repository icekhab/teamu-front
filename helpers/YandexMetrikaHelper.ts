class YandexMetrikaHelper {
  static target(id: number, goalName: string) {
    console.log(id, goalName);
    // @ts-ignore
    ym(id, 'reachGoal', goalName);
  }

  static filterParams(id: number, name: string, place: string) {
    console.log(id, 'params', { params: { filter: { name, place } } });
    // @ts-ignore
    ym(id, 'params', { params: { filter: { name, place } } });
  }

  static mobileFilterParams(id: number, name: string, place: string) {
    console.log(id, 'params', { params: { mobileFilter: { name, place } } });
    // @ts-ignore
    ym(id, 'params', { params: { mobileFilter: { name, place } } });
  }
}

export default YandexMetrikaHelper;
