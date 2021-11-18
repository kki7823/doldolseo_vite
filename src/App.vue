<template>
  <doldolseo-header-widget/>
  <doldolseo-header/>
</template>

<script>
import DoldolseoHeader from "./components/common/DoldolseoHeader.vue";
import {provide} from "vue";
import DoldolseoHeaderWidget from "./components/common/DoldolseoHeaderWidget.vue";
export default {
  name : 'App',
  components: {DoldolseoHeaderWidget, DoldolseoHeader},
  setup(){
    provide('contextPath','src/')
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Jua&family=Nanum+Gothic&family=Nanum+Gothic+Coding:wght@700&display=swap');
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
