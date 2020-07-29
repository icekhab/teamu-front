<template>
  <div>
    <div class="container">
      <div class="container__wrapper">
        <div class="topBar">
          <div class="logo">
            <a href="/">
              <span class="logo__letter">U</span>
              <span class="logo__text">TEAM</span>
            </a>
          </div>
          <div class="nav">
            <div class="nav__link">
              <a href=""> Кому подойдет?</a>
            </div>
            <div class="nav__link">
              <a href=""> Возможности</a>
            </div>
            <div class="nav__link">
              <a href=""> Написать нам</a>
            </div>
          </div>

          <div class="rigthNav">
            <TButton
              class="rigthNav__loginBtn"
              theme="outline-primary"
            >
              Войти
            </TButton>
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
*{
  text-decoration: none;
}
.container{
  width:100%;
  .container__wrapper{
    width:90%;
    margin:50px auto;
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
    height:41px;
    width:41px;
    padding: 11px;
    border-radius: 25px;
    float:left;
  }
  &__text {
    float:left;
    color: #233348;
    text-transform: uppercase;
    float:left;
    padding:10px 5px;
  }
}
.nav {
  &__link {
    font-family: Inter;
font-style: normal;
font-weight: normal;
font-size: 18px;
line-height: 22px;
color: #878E99;
float:left;
margin: 10px 40px;
  }
}
.rigthNav {
}

</style>
