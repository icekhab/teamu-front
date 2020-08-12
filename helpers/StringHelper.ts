class StringHelper {
  /**
   * Расчет числительных (https://htmler.ru/2013/11/22/sklonenie-chislitelnah-na-javascript/)
   * title — для единиц, второй — для пар, третия — для других чисел.
   * @param n число
   * @param title список слов которые склоняются, например (человек, человека, человек)
   */
  static declOfNum(n: number, titles: string[]) {
    const cases = [2, 0, 1, 1, 1, 2];

    return titles[(n % 100 > 4 && n % 100 < 20) ? 2 : cases[(n % 10 < 5) ? n % 10 : 5]];
  }
}

export default StringHelper;
