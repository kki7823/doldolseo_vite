<template>
  <!-- 메인 컨테이너 -->
  <div class="review-container--main">
    <!-- 네비게이션 -->
    <nav class="review-container__navi">
      <doldolseo-review-nav/>
    </nav>

    <section class="reviewL-listbox">
      <div class="review-container--top">
        <div class="common-top__title">
          후기게시판
        </div>
        <span class="common-top__drilldownbox">
                    <span style="color: #F78181">지역게시판</span> &gt;
                    <span style="color: #F6CECE">{{ areaNo !== '' ? areaMenu[areaNo] : '전체' }}</span>
                </span>

        <!-- 글쓰기 버튼 -->
        <router-link :to="{name: 'reviewInsert'}">
          <button class="review-button">
            글쓰기
          </button>
        </router-link>
      </div>

      <!-- 글 목록-->
      <table class="reviewL-list">
        <!-- 로딩 창 -->
        <loading :active="isLoading"
                 :is-full-page="false"
                 :opacity="0.7">
        </loading>

        <tr class="list--header">
          <td style="width: 100px">지역</td>
          <td>제목</td>
          <td style="width: 100px">닉네임</td>
          <td style="width: 150px">등록일</td>
          <td style="width: 100px">조회수</td>
        </tr>

        <tr v-for="review in reviewList"
            class="list--item">
          <td>{{ areaMenu[review.areaNo] }}</td>
          <td>
            <router-link :to="{name: 'reviewDetail', params:{reviewNo: review.reviewNo}}">
              {{ review.title }}
            </router-link>
          </td>
          <td>
            <doldolseo-get-nickname :key="review.id"
                                    :id="review.id"/>
          </td>
          <td>{{ review.wdate[0] + '-' + review.wdate[1] + '-' + review.wdate[2] }}</td>
          <td>{{ review.hit }}</td>
        </tr>
      </table>

      <!-- 페이지네이션 및 검색창-->
      <div class="reviewL-container--bottom">
        <div class="reviewL-bottom__pagination">
          <doldolseo-pagenation
              v-if="totalPages > 1"
              :set-page = "setPage"
              :start-block-page="startBlockPage"
              :end-block-page="endBlockPage"
              :total-pages="totalPages"
          />
        </div>
        <!-- 검색창 -->
        <div id="reviewL-bottom_search"
             class="common-searchbar">
          <select><!-- 검색 조건 -->
            <option value="0">제목</option>
            <option value="1">내용</option>
            <option value="2">닉네임</option>
          </select>
          <input type="text"><!-- 검색어 입력 -->
          <button class="review-button"><!-- 검색 버튼 -->
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentcolor"
                 class="bi bi-search" viewBox="0 0 16 16">
              <path
                  d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
            </svg>
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import DoldolseoReviewNav from "./DoldolseoReviewNav.vue";
import {inject, provide, ref, watchEffect} from "vue";
import {axios} from "@bundled-es-modules/axios";
import {useRoute} from "vue-router";
import DoldolseoPagenation from "../common/DoldolseoPagenation.vue";
import Loading from "vue3-loading-overlay";
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css';
import onError from "../../module/onError";
import DoldolseoGetNickname from "../common/DoldolseoGetNickname.vue";

export default {
  name: "DoldolseoReviewList",
  components: {DoldolseoGetNickname, DoldolseoPagenation, DoldolseoReviewNav, Loading},
  setup() {
    const isLoading = ref(false);
    const route = useRoute()
    const areaMenu = inject('areaMenu')
    const areaNo = ref(route.params.areaNo)
    const reviewList = ref([])
    const page = ref(0)
    const setPage = (pageNumber) => {
      page.value = pageNumber
    }
    const startBlockPage = ref(0)
    const endBlockPage = ref(0)
    const totalPages = ref(0)

    const URL_REVIEW = inject('doldolseoReview')

    watchEffect(() => {
          isLoading.value = true

          axios.get(URL_REVIEW, {
            params: {
              areaNo: areaNo.value,
              page: page.value,
            }
          }).then((resp) => {
            console.log(URL_REVIEW + " - 요청 성공 status : " + resp.status)
            reviewList.value = resp.data.reviewList
            startBlockPage.value = resp.data.startBlockPage
            endBlockPage.value = resp.data.endBlockPage
            totalPages.value = resp.data.totalPages
            isLoading.value = false
          }).catch((err) => {
            console.log(URL_REVIEW + " - 요청 실패")
            isLoading.value = false
            onError.httpErrorException(err)
          })
        }
    )

    return {
      isLoading,

      areaMenu,
      areaNo,
      reviewList,
      page,
      setPage,
      startBlockPage,
      endBlockPage,
      totalPages,
    }
  }
}
</script>

<style scoped>
.review-container--main {
  height: 1200px;
  width: 100%;
  min-height: 1000px;
  text-align: center;
  margin: 0 auto;
  font-size: 0;
}

/* 네비게이션 컨테이너 - reviewL, reviewD */
.review-container__navi {
  display: inline-block;
  vertical-align: top;
  height: 1100px;
  left: 0;
}

/* 상단 컨테이너 (제목, 드릴다운 등) - reviewL, reviewD */
.review-container--top {
  width: 100%;
  height: 100px;
  margin: 40px auto 0;
  position: relative;
}

/* 상단 제목 - reviewL, reviewD */
.common-top__title {
  text-align: left;
  font-family: 'Jua', sans-serif;
  color: #F6CECE;
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

.review-button {
  color: white;
  background-color: #F78181;
  font-family: 'Jua', sans-serif;
  font-size: 19px;
  border-radius: 6px;
  border: none;
  padding: 6px 8px 4px 8px;
  cursor: pointer;
  position: absolute;
  right: 0;
}

.reviewL-listbox {
  display: inline-block;
  width: 80%;
  height: inherit;
  margin: 0 auto 0 30px;
  position: relative;
  /*border: 1px solid;*/
}

.reviewL-list {
  width: 100%;
  margin: 10px auto 0;
}

.reviewL-container--bottom {
  width: 100%;
  height: 118px;
  margin: 30px auto 0;
  text-align: center;
  /*border: 1px solid;*/
}

#reviewL-bottom_search {
  margin-top: 48px;
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

.list--header {
  color: white;
  background-color: #F78181;
  font-family: 'Jua', sans-serif;
  font-size: 18px;
}

.list--header > td {
  padding: 5px 3px 3px;
}

.list--item {
  border-bottom: 1px #CDCECF solid;
  font-family: 'Nanum Gothic', sans-serif;
  font-size: 16px;
}

.list--item > td {
  padding: 5px 3px 3px;
}
</style>