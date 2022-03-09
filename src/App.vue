<template>
  <doldolseo-header/>
  <router-view :key="$route.fullPath"/>
  <doldolseo-footer/>
</template>

<script>
import DoldolseoHeader from "/@components/common/DoldolseoHeader.vue";
import DoldolseoMain from "/@components/main/DoldolseoMain.vue";
import DoldolseoFooter from "/@components/common/DoldolseoFooter.vue";
import {provide} from "vue";
import {useCookies} from "vue3-cookies";

export default {
  name: 'App',
  components: {DoldolseoFooter, DoldolseoMain, DoldolseoHeader},
  setup() {
    // provide('contextPath', 'src/')
    provide('contextPath', '/@/')
    provide('doldolseoArea', 'http://34.64.123.102:9999/doldolseo/area')
    provide('doldolseoMember', 'http://34.64.123.102:9999/doldolseo/member')
    provide('doldolseoReview', 'http://34.64.123.102:9999/doldolseo/review')
    provide('doldolseoCrew', 'http://34.64.123.102:9999/doldolseo/crew')
    provide('doldolseoCrewPost', 'http://34.64.123.102:9999/doldolseo/crew/post')


    //img 태그에 alias경로 binding
    const getImgUrl = (name) => {
      return new URL(`/src/_image/${name}`, import.meta.url).href
    }

    provide('getImgUrl', getImgUrl)

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

    const crew_categoryMenu = {
      1: '맛집',
      2: '쇼핑',
      3: '문화',
      4: '자유',
    }
    provide('crew_categoryMenu', crew_categoryMenu)

    const {cookies} = useCookies()
    provide('cookies', cookies)
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
  color: #2c3e50;
  width: 100%;
  min-width: 1300px;
  margin: 0;
  padding: 0;
}

a {
  text-decoration-line: none;
  color: black;
}

table {
  /*border: 1pt solid;*/
  border-collapse: collapse;
}

/* tiptap */
.ProseMirror {
  height: 100%;
  width: 100%;
  outline: none;
  content: attr(data-placeholder);
}

.ProseMirror p.is-editor-empty:first-child::before {
  content: attr(data-placeholder);
  float: left;
  color: #adb5bd;
  pointer-events: none;
  height: 0;
  width: 500px;
}

</style>
