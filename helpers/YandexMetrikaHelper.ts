class YandexMetrikaHelper {
  static loginButtonPressed() {
      this.target(66123097, 'entryButton')
  }

  static target(id: number, goalName: string) {
    // @ts-ignore
    ym(id, 'reachGoal', goalName);
  }
}

export default YandexMetrikaHelper;
