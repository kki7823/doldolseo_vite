<template>
  <section class="crew-mainContainer">
    <doldolseo-crew-nav/>

    <!-- 상단 제목,드릴다운 : 공통 -->
    <div class="crew-topContainer">
      <!-- 제목 -->
      <div class="common-top__title" style="color: #FAAC58">
        크루 활동
      </div>
      <!-- 게시판 드릴다운 -->
      <span class="common-top__drilldownbox">
        <router-link :to="{name: 'crewList'}"
                     style="color: #ff8000">
          크루 게시판
        </router-link>
        <span> > </span>
        <router-link :to="{name: 'crewPostList'}"
                     style="color: #6E6E6E">
          크루 활동
        </router-link>
      </span>
    </div>

    <!-- 크루활동 게시판 네비 바 : 전체/맛집/쇼핑/문화/자유 -->
    <div class="cBoard-nav">
      <span @click="category=0">전체</span>
      <span v-for="(categoryNo, idx) in categoryMenu"
            @click="category=idx">
        {{ categoryNo }}
      </span>
    </div>

    <!-- 상단 정렬버튼 -->
    <div class="crew-topContainer__sub">
      <div class="crew-topContainer__subBtnbox">
        <button class="crew-button">
          크루 전체
        </button>
        <button class="crew-button">
          내 크루만
        </button>
      </div>
      <router-link :to="{name: 'crewPostInsert'}"
                   style="color: #6E6E6E">
        <button id="cBoardL-btn--write"
                class="crew-button">
          글쓰기
        </button>
      </router-link>
    </div>

    <table id="cBoardL-list">
      <tr class="list--header">
        <td>크루명</td>
        <td>카테고리</td>
        <td>제목</td>
        <td>닉네임</td>
        <td>등록일</td>
        <td>조회수</td>
      </tr>

      <tr v-for="crewPost in crewPosts"
          class="list--item">
        <td>{{ crewPost.crewNo }}</td>
        <td>{{ categoryMenu[crewPost.category] }}</td>
        <td>
          <router-link :to="{name: 'crewPostDetail', params:{crewPostNo: crewPost.crewPostNo}}">
            {{ crewPost.title }}
          </router-link>
        </td>
        <td>{{ crewPost.writerId }}</td>
        <td>{{ crewPost.wdate[0] + '-' + crewPost.wdate[1] + '-' + crewPost.wdate[2] }}</td>
        <td>{{ crewPost.hit }}</td>
      </tr>
    </table>

    <!-- 페이지네이션 및 검색창-->
    <div id="cBoardL-container--bottom">
      <!-- 페이지네이션 -->
      <doldolseo-pagenation
          v-if="totalPages > 1"
          :page="page"
          :start-block-page="startBlockPage"
          :end-block-page="endBlockPage"
          :total-pages="totalPages"
      />

      <!-- 검색창 -->
      <div id="cBoardL-bottom_search"
           class="common-searchbar">
        <select name="search"><!-- 검색 조건 -->
          <option value="0">제목</option>
          <option value="1">내용</option>
          <option value="2">닉네임</option>
          <option value="2">크루명</option>
        </select>
        <input type="text"><!-- 검색어 입력 -->
        <button class="crew-button"><!-- 검색 버튼 -->
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white"
               class="bi bi-search" viewBox="0 0 16 16">
            <path
                d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
          </svg>
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import DoldolseoCrewNav from "../crew/DoldolseoCrewNav.vue";
import {inject, ref, watchEffect} from "vue";
import {axios} from "@bundled-es-modules/axios";

export default {
  name: "DoldolseoCrewPostList",
  components: {DoldolseoCrewNav},
  setup() {
    const URL_CREW_POST = inject('doldolseoCrewPost')
    const categoryMenu = inject('crew_categoryMenu')

    const crewNo = ref(0)
    const category = ref(0)
    const crewPosts = ref([])

    const page = ref(0)
    const startBlockPage = ref(0)
    const endBlockPage = ref(0)
    const totalPages = ref(0)

    watchEffect(() => {
      axios.get(URL_CREW_POST, {
        params: {
          crewNo: crewNo.value,
          category: category.value,
          page: page.value,
        }
      }).then((resp) => {
        console.log(URL_CREW_POST + " - 요청 성공 status : " + resp.status)
        crewPosts.value = resp.data.crewPosts
        startBlockPage.value = resp.data.startBlockPage
        endBlockPage.value = resp.data.endBlockPage
        totalPages.value = resp.data.totalPages
      }).catch(() => {
        console.log(URL_CREW_POST + " - 요청 실패")
      })
    })

    return {
      categoryMenu,

      crewNo,
      category,
      crewPosts,
      startBlockPage,
      endBlockPage,
      totalPages,
    }
  }
}
</script>

<style scoped>
.crew-mainContainer {
  max-width: 1400px;
  min-height: 500px;
  text-align: center;
  margin: 0 auto 30px;
  font-size: 0;
  /*border: 1pt solid;*/
}

.crew-topContainer {
  width: 1246px;
  height: 100px;
  margin: 10px auto 0;
  position: relative;
  border-bottom: 1px #CDCECF solid;
}

.common-top__title {
  text-align: left;
  font-family: 'Jua', sans-serif;
  color: #A9E2F3;
  font-size: 50px;
  position: relative;
}

.common-top__drilldownbox {
  float: left;
  font-family: 'Nanum Gothic', sans-serif;
  font-size: 20px;
}

.common-top__drilldownbox a {
  color: #F78181;
}

.cBoard-nav {
  width: 1246px;
  height: 30px;
  margin: 0 auto;
  font-family: "Nanum Gothic Coding", sans-serif;
  font-size: 18px;
  border-bottom: 1px solid #CDCECF;
  text-align: right;
  line-height: 32px;
}

.cBoard-nav > span {
  color: #A4A4A4;
  margin-left: 10px;
}

.cBoard-nav > span:hover {
  color: #A9E2F3;
}

.crew-topContainer__sub {
  width: 1246px;
  height: 48px;
  margin: 15px auto 0;
  position: relative;
  top: 20px;
  /*border: 1pt solid;*/
}

.crew-topContainer__subBtnbox {
  width: 300px;
  height: 35px;
  text-align: left;
  position: relative;
  right: 2px;
  top: 11px;
  /*border: 1pt solid;*/
}

.crew-topContainer__subBtnbox > button {
  margin: 4px;
  height: 30px;
}

.crew-button {
  font-family: 'Jua', sans-serif;
  font-size: 19px;
  border-radius: 6px;
  border: none;
  padding: 6px 8px 4px 8px;
  cursor: pointer;
  background-color: #FF8000;
  color: white;
}

#cBoardL-list {
  width: 1246px;
  margin: 30px auto 0;
}

#cBoardL-btn--write {
  position: absolute;
  right: 0;
  top: 17px;
  height: 30px;
}

.list--header {
  color: white;
  background-color: #FF8000;
  font-family: 'Jua', sans-serif;
  font-size: 18px;
  text-align: center;
}

.list--header > td {
  padding: 5px 3px 3px;
  text-align: center;
}

.list--item {
  border-bottom: 1px #CDCECF solid;
  font-family: 'Nanum Gothic', sans-serif;
  font-size: 16px;
  text-align: center;
}

.list--item > td {
  padding: 5px 3px 3px;
}

#cBoardL-container--bottom {
  width: 1246px;
  margin: 30px auto 0;
  text-align: center;
}

#cBoardL-bottom_search {
  margin-top: 100px;
  right: 18px;
}

.common-searchbar {
  display: inline-block;
  position: relative;
  width: 330px;
  height: 50px;
}

.common-searchbar input[type=text] {
  border: 1px #CDCECF solid;
  padding: 8px;
  margin-top: 10px;
}

.common-searchbar select {
  width: 90px;
  border: 1px #CDCECF solid;
  padding: 8px;
  margin-top: 10px;
}

/*.common-searchBtn {*/
.common-searchbar > button {
  position: absolute;
  height: 33px;
  border-radius: 0;
  bottom: 6px;
  margin: 1px;
}
</style>