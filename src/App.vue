<template>
  <doldolseo-header/>
  <router-view :key="$route.fullPath"/>
  <doldolseo-footer/>
</template>

<script>
import DoldolseoHeader from "/@components/common/DoldolseoHeader.vue";
import DoldolseoMain from "/@components/main/DoldolseoMain.vue";
import DoldolseoFooter from "/@components/common/DoldolseoFooter.vue";
import {provide, ref} from "vue";
import {useCookies} from "vue3-cookies";
import {axios} from "@bundled-es-modules/axios";
import onError from "./module/onError";

export default {
  name: 'App',
  components: {DoldolseoFooter, DoldolseoMain, DoldolseoHeader},
  setup() {
    provide('contextPath', '/@/')

    const url_base = 'https://doldolseo.com:62390'
    // const url_base = 'https://127.0.0.1:9000'

    provide('doldolseoArea', url_base + '/doldolseo/area')
    provide('doldolseoMember', url_base + '/doldolseo/member')
    provide('doldolseoReview', url_base + '/doldolseo/review')
    provide('doldolseoCrew', url_base + '/doldolseo/crew')
    provide('doldolseoCrewPost', url_base + '/doldolseo/crew/post')

    //img 태그에 alias경로 binding
    const getImgUrl = (name) => {
      return new URL(`/src/_image/${name}`, import.meta.url).href
    }

    provide('getImgUrl', getImgUrl)

    const getMemberNickName = async (id) => {
      const URL_MEMBER_NICKNAME = url_base + '/doldolseo/member/nickname/' + id

      try {
        const {data:resp} = await axios.get(URL_MEMBER_NICKNAME)
        return resp
      }catch (err){
        onError.httpErrorException(err)
      }
    }
    provide('getMemberNickName', getMemberNickName)

    const getCrewName = async (crewNo) => {
      const URL_CREW_NAME = url_base + '/doldolseo/crew/' + crewNo + '/name'
      try {
        const resp = axios.get(URL_CREW_NAME)
        return resp.data
      } catch (err) {
        onError.httpErrorException(err)
        return '[Error]'
      }
    }

    provide('getCrewName', getCrewName)

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
