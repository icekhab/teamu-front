import YandexMetrikaHelper from './YandexMetrikaHelper';

class MetrikaHelper {
  private static yandexTaskId: number = 66123097;

  static loginButtonPressed() {
    YandexMetrikaHelper.target(this.yandexTaskId, 'entryButton');
  }

  static tryFreeButtonPressed() {
    YandexMetrikaHelper.target(this.yandexTaskId, 'tryFreeButton');
  }

  static findPeolpeButtonPressed() {
    YandexMetrikaHelper.target(this.yandexTaskId, 'findPeopleButton');
  }

  static findProjectButtonPressed() {
    YandexMetrikaHelper.target(this.yandexTaskId, 'findProjectButton');
  }

  static registrationButtonPressed() {
    YandexMetrikaHelper.target(this.yandexTaskId, 'registrationButton');
  }

  static addProjectButtonButtonPressed() {
    YandexMetrikaHelper.target(this.yandexTaskId, 'addProjectButton');
  }

  static forWhomMenuPressed() {
    YandexMetrikaHelper.target(this.yandexTaskId, 'forWhomMenu');
  }

  static possibilityMenuPressed() {
    YandexMetrikaHelper.target(this.yandexTaskId, 'possibilityMenu');
  }

  static saveProjectButtonPressed() {
    YandexMetrikaHelper.target(this.yandexTaskId, 'saveProjectButton');
  }

  static editProjectButtonPressed() {
    YandexMetrikaHelper.target(this.yandexTaskId, 'editProjectButton');
  }

  static deleteProjectButtonPressed() {
    YandexMetrikaHelper.target(this.yandexTaskId, 'deleteProjectButton');
  }

  static publishProjectButtonPressed() {
    YandexMetrikaHelper.target(this.yandexTaskId, 'publishProjectButton');
  }

  static draftProjectButtonPressed() {
    YandexMetrikaHelper.target(this.yandexTaskId, 'draftProjectButton');
  }

  static saveEditedProjectButtonPressed() {
    YandexMetrikaHelper.target(this.yandexTaskId, 'saveEditedProjectButton');
  }

  static filterMobilePressed() {
    YandexMetrikaHelper.target(this.yandexTaskId, 'applyFilterButtonMoblie');
  }

  static mobileFilterChanged(name: string, place: string) {
    YandexMetrikaHelper.mobileFilterParams(this.yandexTaskId, name, place);
  }

  static filterChanged(name: string, place: string) {
    YandexMetrikaHelper.filterParams(this.yandexTaskId, name, place);
  }
}

export default MetrikaHelper;
