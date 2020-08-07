class YandexMetrikaHelper {
  static target(id: number, goalName: string) {
    console.log(id, goalName);

    if (process.env.NODE_ENV === 'production') {
      // @ts-ignore
      ym(id, 'reachGoal', goalName);
    }
  }

  static filterParams(id: number, name: string, place: string) {
    console.log(id, 'params', { params: { filter: { [place]: name } } });

    if (process.env.NODE_ENV === 'production') {
      // @ts-ignore
      ym(id, 'params', { params: { filter: { [place]: name } } });
    }
  }

  static mobileFilterParams(id: number, name: string, place: string) {
    console.log(id, 'params', { params: { mobileFilter: { [place]: name } } });

    if (process.env.NODE_ENV === 'production') {
      // @ts-ignore
      ym(id, 'params', { params: { mobileFilter: { [place]: name } } });
    }
  }
}

export default YandexMetrikaHelper;
