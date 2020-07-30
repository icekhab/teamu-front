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
              <a href>Кому подойдет?</a>
            </div>
            <div class="nav__link">
              <a href>Возможности</a>
            </div>
            <div class="nav__link">
              <a href>Написать нам</a>
            </div>
          </div>

          <div class="rigthNav">
            <TButton class="rigthNav__loginBtn" theme="outline-primary">
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
              <TButton class="rigthNav__loginBtn" theme="primary">
                Попробовать бесплатно
              </TButton>
            </div>
          </div>
          <div class="block__rigthPart" />
        </div>

        <!-- Block about for who the service is -->
        <div class="featuresBlock">
          <h2>Для кого наш сревис</h2>
          <div class="infoBlock">
            <div class="infoBlock__leftPart">
              <img src="/images/svg/landing/startup.svg" alt>
            </div>

            <div class="infoBlock__rigthPart">
              <h3>Авторам идей и проектов</h3>
              <ul>
                <li>Опиши свою идею или проект</li>
                <li>Найди людей, разделяющих идею и ценности проекта</li>
                <li>Объединитесь в команду и идите к цели!</li>
              </ul>
              <TButton theme="outline-primary">
                Найти людей
              </TButton>
            </div>
          </div>

          <div class="infoBlock">
            <div class="infoBlock__leftPart">
              <h3>Авторам идей и проектов</h3>
              <ul>
                <li>Опиши свою идею или проект</li>
                <li>Найди людей, разделяющих идею и ценности проекта</li>
                <li>Объединитесь в команду и идите к цели!</li>
              </ul>
              <TButton theme="outline-primary">
                Найти людей
              </TButton>
            </div>

            <div class="infoBlock__rigthPart">
              <img src="/images/svg/landing/startup.svg" alt>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue } from 'vue-property-decorator';

export default class LandingPageComponent extends Vue {}
</script>

<style lang="postcss" scoped>
* {
  text-decoration: none;
  color: #333;
}
h1 {
  font-family: Inter;
  font-style: normal;
  font-weight: bold;
  font-size: 48px;
  line-height: 130%;
}
.container {
  width: 100%;
  .container__wrapper {
    width: 90%;
    margin: 50px auto;
    max-width: 1120px;
  }
}
.topBar {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

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
  &__text {
    float: left;
    color: #233348;
    text-transform: uppercase;
    float: left;
    padding: 10px 5px;
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

/* first block */

.block {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  &__callToAction {
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
  &__rigthPart {
    flex: 50%;
  }
}
.first {
  margin-top: 90px;
  background: #fff url("/images/svg/landing/startup-3.svg") no-repeat scroll
    22px 11px;
  background-position: right;
  background-size: contain;
}
.rigthNav {
  &__loginBtn {
  }
}

/* firt feature blocks */
.featuresBlock {
  margin-top: 150px;
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
  margin-top: 50px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  h3 {
    font-family: Inter;
    font-style: normal;
    font-weight: 600;
    font-size: 30px;
    line-height: 36px;
    display: flex;
    align-items: center;
    margin: 30px 0px 0px 0px;
  }
  ul {
    font-family: Inter;
    font-style: normal;
    font-weight: 500;
    font-size: 19px;
    line-height: 150%;
    color: #878e99;
    margin: 30px 0px;
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
  }
  &__rigthPart {
    flex: 50%;
    display: flex;
    flex-direction: column;
  }
}
</style>
