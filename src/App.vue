<template>
  <doldolseo-header/>
  <router-view :key="$route.fullPath"/>
  <doldolseo-footer/>
</template>

<script>
import DoldolseoHeader from "./components/common/DoldolseoHeader.vue";
import DoldolseoMain from "./components/main/DoldolseoMain.vue";
import DoldolseoFooter from "./components/common/DoldolseoFooter.vue";
import {provide} from "vue";

export default {
  name: 'App',
  components: {DoldolseoFooter, DoldolseoMain, DoldolseoHeader},
  setup() {
    provide('contextPath', 'src/')
    provide('doldolseoArea', '/doldolseo/area')

    const areaMenu = {
      1: '강남',
      2: '강북',
      3: '광화문',
      4: '명동',
      5: '여의도',
      6: '잠실',
      7: '홍대',
      99: '기타',
    }
    provide('areaMenu', areaMenu)

    const contentMenu = [
      {
        contentType: '',
        name: '전체'
      },
      {
        contentType: 1,
        name: '축제&행사'
      },
      {
        contentType: 2,
        name: '음식'
      },
      {
        contentType: 3,
        name: '쇼핑'
      },
      {
        contentType: 4,
        name: '문화&관광'
      },
      {
        contentType: 0,
        name: '기타'
      },
    ]
    provide('contentMenu', contentMenu)
  }
}
</script>

<style>
/* 웹 폰트 */
@import url('https://fonts.googleapis.com/css2?family=Jua&family=Nanum+Gothic&family=Nanum+Gothic+Coding:wght@700&display=swap');

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  min-width: 1300px;
}

a {
  text-decoration-line: none;
  color: black;
}

table {
  /*border: 1pt solid;*/
  border-collapse: collapse;
}
</style>
