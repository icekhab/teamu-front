class YandexMetrikaHelper {
  private static taskId: number = 66123097;

  static loginButtonPressed() {
    this.target(this.taskId, 'entryButton');
  }

  static target(id: number, goalName: string) {
    console.log('UTEam debug', id, goalName);

    // @ts-ignore
    ym(id, 'reachGoal', goalName);
    // @ts-ignore
    ym(id, 'params', {params: {test: {myParam: 'clickedButton'}}});
  }
}

export default YandexMetrikaHelper;
