<template>
  <div>
    <div class="container">
      <div class="container__wrapper">
        <!-- top panel -->
        <div class="topBar">
          <div class="logo">
            <a href="/">
              <span class="logo__letter">U</span>
              <span class="logo__text">TEAM</span>
            </a>
          </div>
          <div class="nav">
            <div class="nav__link">
              <a v-scroll-to="'#for-whom'" href="#">Кому подойдет?</a>
            </div>
            <div class="nav__link">
              <a v-scroll-to="{ el: '#possibility', duration: 700 }" href="#">Возможности</a>
            </div>
            <div class="nav__link">
              <a v-scroll-to="{ el: '#feedback', duration: 900 }" href="#">Написать нам</a>
            </div>
          </div>
          <div class="rigthNav">
            <TButton
              class="rigthNav__loginBtn"
              theme="outline-primary"
              @click="goToProjectsAfterLogin"
            >
              Войти
            </TButton>
          </div>
        </div>

        <!-- first main block -->

        <div class="block first">
          <div class="block__leftPart">
            <h1>Место объединения сил для реализации любых идей</h1>
            <p>
              Размещай здесь идею или проект.
              Находи единомышленников и партнеров для их реализации
            </p>
            <div class="block__callToAction">
              <TButton class="block__link" theme="primary" :to="projectsLink">
                Попробовать бесплатно
              </TButton>
            </div>
          </div>
          <div class="block__rigthPart">
            <div class="imgContainer">
              <img src="/images/svg/landing/startup-3.svg" alt>
            </div>
          </div>
        </div>

        <!-- Block about for who the service is -->
        <div id="for-whom" class="featuresBlock">
          <h2>Для кого наш сервис</h2>
          <div class="infoBlock">
            <div class="infoBlock__leftPart">
              <div class="imgContainer">
                <img src="/images/svg/landing/startup.svg" alt>
              </div>
            </div>

            <div class="infoBlock__rigthPart">
              <h3>Авторам идей и проектов</h3>
              <ul>
                <li>Опиши свою идею или проект</li>
                <li>Найди людей, разделяющих идею и ценности проекта</li>
                <li>Объединитесь в команду и идите к цели!</li>
              </ul>
              <div class="infoBlock__callToAction">
                <TButton theme="outline-primary" @click="goToProjectNewAfterLogin">
                  Найти людей
                </TButton>
              </div>
            </div>
          </div>
          <!-- Block about proffesional -->
          <div class="infoBlock reverse">
            <div class="infoBlock__leftPart">
              <div class="imgContainer">
                <img src="/images/svg/landing/innovation.svg" alt>
              </div>
            </div>

            <div class="infoBlock__rigthPart">
              <h3>Профессионалам</h3>
              <p>Хватит обменивать свое время на деньги! Делай то, что нравится и во что ты веришь — с командой единомышленников. Это шанс стать свободным и независимым.</p>
              <div class="infoBlock__callToAction">
                <TButton theme="outline-primary" @click="goToProjectsAfterLogin">
                  Найти проект
                </TButton>
              </div>
            </div>
          </div>

          <!-- Block about opportunites -->
          <div id="possibility" class="featuresBlock">
            <h2>Возможности</h2>
            <p
              class="featuresBlock__subTitle"
            >
              Наша цель - помочь авторам идей (или проектов) найти тех, кто готов и может помочь в их реализации. Людям, которые ищут для себя новые возможности развития и самореализации - найти интересные для них идеи и проекты, участие в которых выведет их на новый уровень.
            </p>
            <div class="featurePanels">
              <div class="featurePanels__item">
                <div class="featurePanels__icon">
                  <img src="/images/svg/landing/search.svg" alt>
                </div>
                <div class="featurePanels__title">
                  Описать проект
                </div>
                <div
                  class="featurePanels__description"
                >
                  Описать проект, разместить ссылки на подробное описание или ТЗ.
                </div>
              </div>
              <div class="featurePanels__item">
                <div class="featurePanels__icon">
                  <img src="/images/svg/landing/write.svg" alt>
                </div>
                <div class="featurePanels__title">
                  Описать команду
                </div>
                <div class="featurePanels__description">
                  Кто уже есть в команде и кого не хватает.
                </div>
              </div>
              <div class="featurePanels__item">
                <div class="featurePanels__icon">
                  <img src="/images/svg/landing/discuss.svg" alt>
                </div>
                <div class="featurePanels__title">
                  Оговорить условия
                </div>
                <div
                  class="featurePanels__description"
                >
                  На каких условиях автор проекта приглашает членов команды.
                </div>
              </div>
            </div>
          </div>

          <!-- MVP feedback block  -->
          <div id="feedback" class="infoBlockTypeTwo">
            <div class="infoBlockTypeTwo__leftPart">
              <img src="/images/svg/landing/entrepreneurs.svg" alt>
            </div>

            <div class="infoBlockTypeTwo__rigthPart">
              <h3 class="infoBlockTypeTwo__underlindedHeader">
                Это пробная версия сервиса, MVP
              </h3>
              <p
                class="infoBlockTypeTwo__description"
              >
                Команда проекта будет очень благодарна за любые комментарии, советы и критику. Расскажите нам - что вам не хватает, какую проблему вы бы хотели решить с помощью подобного сервиса.
              </p>
              <div class="infoBlockTypeTwo__callToAction">
                <TButton
                  theme="outline-primary"
                  class="infoBlockTypeTwo__callToAction__link"
                  size="m"
                  target="_blank"
                  href="https://t.me/joinchat/CbUfXVP2Djjr4DtSxls0CA"
                >
                  Написать нам
                </TButton>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="separater" />
      <div class="container__wrapper noPaddingAndMargin">
        <div class="footer">
          <div class="footer__container">
            <div class="footer__leftPart">
              <div class="logo">
                <a href="/">
                  <span class="logo__letter logo__letter__invert">U</span>
                  <span class="logo__text">TEAM</span>
                </a>
              </div>
            </div>
            <div class="footer__rightPart">
              <div class="footer__title">
                Сделано с любовью
                <span>
                  <img src="/images/svg/landing/love.svg" alt>
                </span> для Mesto
              </div>
              <div class="footer__creators">
                <!-- TODO: fill linkedin links -->
                <a href="https://openland.com/generalsupport" target="_blank">Антон Захаров</a>
                <a href="https://openland.com/bondarev" target="_blank">Дмитрий Бондарев</a>
                <a href="https://openland.com/icekhab" target="_blank">Евгений Опрышко</a>
                <a href="https://www.linkedin.com/in/..." target="_blank">Дмитрий Шевчук</a>
                <a href="https://openland.com/uraganschik" target="_blank">Михаил Серёгин</a>
                <a href="https://openland.com/skob_ak" target="_blank">Александр Скобельцын</a>
                <a href="https://openland.com/logvinov_ek" target="_blank">Евгений Логвинов</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <RegistrationLogin />
  </div>
</template>

<script lang="ts">
/**
 * @author Aleksandr Skobeltcyn
 */

import { Component, Vue } from 'vue-property-decorator';
import RegistrationLogin from '@/components/common/RegistrationLogin.vue';
import { Mutation, State } from 'vuex-class';
import { RawLocation } from 'vue-router/types/router';

const namespace = 'user';

@Component({
  components: {
    RegistrationLogin,
  },
})
export default class LandingPageComponent extends Vue {
  @State('isAuthorize', { namespace }) isAuthorize!: boolean;

  @Mutation('setToAfterLogin', { namespace }) setToAfterLogin!: (toAfterLogin?: RawLocation) => void;

  projectsLink = {
    name: 'project',
  };

  projectNewLink = {
    name: 'project-new',
  };

  goToProjectsAfterLogin() {
    if (!this.isAuthorize) {
      this.setToAfterLogin(this.projectsLink);
      this.$modal.show('registration-modal');
    } else {
      this.$router.push(this.projectsLink);
    }
  }

  goToProjectNewAfterLogin() {
    if (!this.isAuthorize) {
      this.setToAfterLogin(this.projectNewLink);
      this.$modal.show('registration-modal');
    } else {
      this.$router.push(this.projectNewLink);
    }
  }
}
</script>

<style lang="postcss" scoped>
/* Reset styles */
* {
  text-decoration: none;
  color: #333;
  font-family: Inter;
  font-style: normal;
}
a:hover {
  color: #4f56f1;
}
h1 {
  font-family: Inter;
  font-style: normal;
  font-weight: bold;
  font-size: 48px;
  line-height: 130%;
}

/* Containers  and wrapper*/
.container {
  background: #f5f6fa;
  padding: 50px 0px;
  .container__wrapper {
    width: 90%;
    margin: 0px auto;
    max-width: 1120px;
  }
}

/* Top bar */
.topBar {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

/* Logo  */
.logo {
  font-family: Inter;
  font-style: normal;
  font-weight: bold;
  font-size: 26px;
  line-height: 21px;

  &__letter {
    background: #4f56f1;
    color: white;
    height: 41px;
    width: 41px;
    padding: 11px;
    border-radius: 25px;
    float: left;
  }
  &__letter__invert {
    background: white;
    color: #4f56f1;
  }
  &__text {
    float: left;
    color: #233348;
    text-transform: uppercase;
    float: left;
    padding: 10px 5px;
  }
}

@media (max-width: 1200px) {
  .logo {
    &__text {
      display: none;
    }
  }
}
.nav {
  &__link {
    font-family: Inter;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 22px;
    color: #878e99;
    float: left;
    margin: 10px 40px;
  }
}
.rigthNav {
}

/* Top block */
.block {
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  &__callToAction {
    &__link {
    }
  }
  &__leftPart {
    flex: 50%;
    p {
      font-family: Inter;
      font-style: normal;
      font-weight: normal;
      font-size: 19px;
      line-height: 130%;
      color: #878e99;
      margin: 30px 0px;
    }
  }
  &__link {
    display: inline-flex;
    align-items: center;
  }
  &__rigthPart {
    flex: 50%;
    img {
      width: 100%;
    }
  }
}
.first {
  margin-top: 90px;
}
.rigthNav {
  &__loginBtn {
  }
}

@media (max-width: 1200px) {
  .featuresBlock {
    margin-top: 50px;
  }
  .block {
    flex-direction: column-reverse;
    align-items: center;
    &__leftPart {
      flex: 100%;
    }
    &__rigthPart {
      flex: 100%;
      display: none;
    }
    &__callToAction {
      text-align: center;
    }
  }
  h1,
  p {
    text-align: center;
  }
}

/* First feature blocks */
.featuresBlock {
  margin-top: 150px;

  &__subTitle {
    font-family: Inter;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 30px;
    text-align: center;
    color: #878e99;
    mix-blend-mode: normal;
    margin: 30px auto;
    width: 80%;
  }

  h2 {
    font-family: Inter;
    font-style: normal;
    font-weight: bold;
    font-size: 36px;
    line-height: 56px;
    color: #333333;
    text-align: center;
    position: relative;
    padding-bottom: 30px;
    &:after {
      content: "";
      position: absolute;
      width: 56px;
      bottom: 0;
      height: 2px;
      left: 50%;
      background-color: #333;
      margin: 0px 0px 0px -28px;
    }
  }
}
.infoBlock {
  margin: 50px 0px 100px 0px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background: rgb(79 87 241 / 0.07);
  border-radius: 5px;
  padding: 70px 40px;
  &.reverse {
    flex-direction: row-reverse;
  }
  p {
    font-family: Inter;
    font-style: normal;
    font-weight: 500;
    font-size: 19px;
    line-height: 150%;
    color: #878e99;
    margin: 0px 0px 30px 0px;
  }
  h3 {
    font-family: Inter;
    font-style: normal;
    font-weight: 600;
    font-size: 30px;
    line-height: 36px;
    display: flex;
    align-items: center;
    margin: 30px 0px 30px 0px;
  }
  ul {
    font-family: Inter;
    font-style: normal;
    font-weight: 500;
    font-size: 19px;
    line-height: 150%;
    color: #878e99;
    margin: 0px 0px 30px 0px;
    list-style-type: none;

    & > li {
      text-indent: -5px;
      font-family: Inter;
      font-style: normal;
      font-weight: 500;
      font-size: 19px;
      line-height: 150%;
      color: #878e99;
      padding: 10px 0px;
    }
    & > li:before {
      content: "—";
      text-indent: -5px;
      padding-right: 10px;
    }
  }

  &__leftPart {
    flex: 50%;
    flex-direction: column;
    .imgContainer {
      text-align: center;
    }
  }
  &__rigthPart {
    flex: 50%;
    display: flex;
    flex-direction: column;
    .imgContainer {
      text-align: center;
    }
  }
}

@media (max-width: 1200px) {
  .infoBlock {
    flex-direction: column;
    align-items: center;
    gap: 30px;

    &.reverse {
      flex-direction: column;
      gap: 30px;
    }

    &__leftPart {
      flex: 100%;
      img {
        width: 100%;
      }
    }
    &__rigthPart {
      flex: 100%;
      img {
        width: 100%;
      }
    }
    &__callToAction {
      text-align: center;
    }
  }
}

/* Feature panels  */
.featurePanels {
  margin: 50px 0px 100px 0px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  &__description {
    font-family: Inter;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 150%;
    color: #878e99;
    mix-blend-mode: normal;
  }
  &__icon {
    text-align: center;
  }
  &__item {
    display: flex;
    flex-direction: column;
    max-width: 350px;
    background: #ffffff;
    padding: 38px;
    box-shadow: 10px 40px 50px rgba(229, 233, 246, 0.4);
    border-radius: 5px;
  }
  &__title {
    font-family: Inter;
    font-style: normal;
    font-weight: bold;
    font-size: 24px;
    line-height: 56px;
    color: #333333;
    mix-blend-mode: normal;
    margin-top: 25px;
  }
}

@media (max-width: 1200px) {
  .featurePanels {
    flex-direction: column;
    align-items: center;
    gap: 30px;
    &__title {
      text-align: center;
    }
    &__description {
      text-align: center;
    }
  }
}

/* MVP feedback block */
.infoBlockTypeTwo {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  h3 {
    font-family: Inter;
    font-style: normal;
    font-weight: bold;
    font-size: 36px;
    line-height: 56px;
    color: #333333;
    position: relative;
    padding: 30px 0px;
  }
  &__description {
    font-family: Inter;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 30px;
    color: #878e99;
    mix-blend-mode: normal;
    margin: 20px 0px;
  }
  &__leftPart {
    flex: 50%;
    flex-direction: column;
    img {
      max-width: 460px;
      width: 100%;
    }
  }
  &__rigthPart {
    flex: 50%;
    display: flex;
    flex-direction: column;
    img {
      max-width: 460px;
      width: 100%;
    }
  }
  &__underlindedHeader {
    &:after {
      content: "";
      position: absolute;
      width: 56px;
      bottom: 0;
      height: 2px;
      left: 0px;
      background-color: #333;
      margin: 0px 0px 0px 0px;
    }
  }

  &__callToAction {
    &__link {
      padding: 11px 20px 11px 20px;

      display: inline-flex;
      align-items: center;
      justify-content: center;
    }
  }
}

@media (max-width: 1200px) {
  .infoBlockTypeTwo {
    gap: 30px;
    flex-direction: column;
    align-items: center;
    h3 {
      text-align: center;
    }
    &__underlindedHeader {
      &:after {
        left: 50%;
        margin: 0px 0px 0px -28px;
      }
    }
    &__callToAction {
      text-align: center;
    }
  }
}

/* Footer  */
.footer {
  width: 100%;
  margin: 50px auto 0px auto;
  &__container {
    max-width: 650px;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  &__leftPart {
    flex: 400px;
  }
  &__rightPart {
    display: flex;
    flex-direction: column;
  }
  &__title {
    margin-bottom: 13px;
  }
  &__creators {
    display: flex;
    flex-direction: row;
    align-content: flex-start;
    /* justify-content: space-between; */
    flex-wrap: wrap;
    a {
      font-family: Inter;
      font-style: normal;
      font-weight: 500;
      font-size: 12px;
      line-height: 15px;
      align-items: center;
      text-align: center;
      color: #0085ff;
      display: flex;
      margin: 0px 10px 0px 0px;
    }
  }
}

@media (max-width: 1200px) {
  .footer {
    &__container {
      flex-direction: column;
      align-items: center;

      gap: 30px;
    }
    &__leftPart {
      flex: 100%;
      text-align: center;
      justify-content: center;
    }
    &__rightPart {
      display: flex;
      flex-direction: column;
      text-align: center;
      justify-content: space-between;
      align-items: center;
    }
    &__creators {
      flex-direction: column;
      align-items: center;
    }
  }
}

/* Separator */
.separater {
  width: 100%;
  height: 1px;
  background: #4f57f12a;
  margin: 50px 0px;
}

/* Helper classes */
.noPaddingAndMargin {
  padding: 0px !important;
  margin: 0px auto !important;
}
</style>
