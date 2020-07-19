class DateHelper {
  static toDateString(date: Date, alwaysWithYear = false) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const currentYear = new Date().getFullYear();

    const dayString = day < 10 ? `0${day}` : day;
    const monthString = month < 10 ? `0${month}` : month;

    return alwaysWithYear || year !== currentYear
      ? `${dayString}.${monthString}.${year}`
      : `${dayString}.${monthString}`;
  }
}

export default DateHelper;
