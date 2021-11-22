<template>
  <doldolseo-header/>
  <router-view/>
  <doldolseo-footer/>
</template>

<script>
import DoldolseoHeader from "./components/common/DoldolseoHeader.vue";
import DoldolseoMain from "./components/main/DoldolseoMain.vue";
import DoldolseoFooter from "./components/common/DoldolseoFooter.vue";
import {provide} from "vue";

export default {
  name : 'App',
  components: {DoldolseoFooter, DoldolseoMain, DoldolseoHeader},
  setup(){
    provide('contextPath','src/')
    provide('doldolseoArea','127.0.0.1:8080/doldolseo/area')
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
</style>
