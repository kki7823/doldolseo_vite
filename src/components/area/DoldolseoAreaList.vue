<template>
  <section class="areaList-container">

    <!-- 지역별 배경사진 -->
    <div class="areaList-img">
      <img :src="imgPath+ '/areaBanner/'+areaImages[sigungu]"
           alt="img"
      />
    </div>

    <!-- 게시판 드릴 다운 메뉴 -->
    <div class="areaL-drilldownBox">
            <span class="drilldownbox">
              <span style="color: #5882FA">지역게시판</span> &gt;
              <span style="color: #0080c0" @click="">{{ areaMenu[sigungu] }}</span> &gt;
              <span>{{ contentMenu[contentIdx].name }}</span>
            </span>
    </div>

    <!--네비(카테고리/검색창)-->
    <div class="areaList-nav">
      <!--네비_카테고리-->
      <div class="areaList-nav__cat">
        <ul>
          <li v-for="(item, idx) in contentMenu"
              @click="contentType = item.contentType; contentIdx=idx">
            {{ item.name }}
          </li>
        </ul>
      </div>

      <!--네비_검색창 -->
      <div class="areaList-nav__search">
        <p>{{ searchKeywordText }}</p>
        <input class="areaList-nav__search__input"
               type="text"
               v-model="searchKeywordText"
        />

        <button class="areaList-nav__search__btn"
                type="button"
                @click="searchKeyword = searchKeywordText">
          <svg xmlns="http://www.w3.org/2000/svg"
               viewBox="0 0 16 16">
            <path
                d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"></path>
          </svg>
        </button>
      </div>
    </div>

    <!-- 지역 게시글 목록 -->
    <div class="areaList-dataContainer">
      <!-- 로딩 창 -->
      <loading :active="isLoading"
               :is-full-page="false"
               :opacity="0.7">
      </loading>
      <div class="areaList-dataBox">

        <!-- 항목 -->
        <div v-for="area in areaList"
             class="areaList-data">
          <div class="areaList-dataImg">
            <!-- 상세보기로 이동 -->
            <router-link :to="{name: 'areaDetail', params:{name: encodeURIComponent(area.name) }}">
              <img v-if="area.image1 == null"
                   :src="imgPath+'/areaListData/default.png'"
                   alt="area_image"
              />
              <img v-else
                   :src="area.image1"
                   alt="image1"
              />
            </router-link>
          </div>

          <div class="areaList-dataName" style="margin: 0 auto;">
            <b>{{ area.name }}</b>
          </div>
        </div>
        <div class="clear-both"></div>
      </div>

      <!-- 페이징 처리 -->
      <div class="areaList-dataPage">
        <table class="pagination">
          <tr>
            <td @click="page=0"> &lt;&lt;</td>
            <td v-if="startBlockPage === 1"
                @click="page = startBlockPage-2">
              &lt;
            </td>
            <td v-for="idx in endBlockPage-startBlockPage+1"
                @click="page = idx-1">
              {{ idx }}
            </td>
            <td v-if="endBlockPage !== totalPages"
                @click="page = endBlockPage">
              &gt;
            </td>
            <td @click="page=totalPages-1">
              &gt;&gt;
            </td>
          </tr>
        </table>
      </div>
    </div>
  </section>
</template>

<script>
import Loading from "vue3-loading-overlay";
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css';
import {inject, ref, watchEffect} from "vue";
import {axios} from "@bundled-es-modules/axios";
import {useRoute} from "vue-router";

export default {
  name: "DoldolseoAreaList",
  components: {Loading},
  setup() {
    const isLoading = ref(false);

    const route = useRoute()
    const imgPath = inject('contextPath') + '_image/area'
    const areaImages = {
      1: 'areaImage_gangnam.png',
      2: 'areaImage_gangbuk.png',
      3: 'areaImage_gwanghwamun.png',
      4: 'areaImage_myeongdong.png',
      5: 'areaImage_yeouido.png',
      6: 'areaImage_jamsil.png',
      7: 'areaImage_hongdae.png',
      99: 'areaImage_etc.png',
    }
    const contentMenu = inject('contentMenu')
    const areaMenu = inject('areaMenu')

    const areaList = ref([])
    const page = ref(0)
    const startBlockPage = ref(0)
    const endBlockPage = ref(0)
    const totalPages = ref(0)

    const URL = inject('doldolseoArea')
    const sigungu = ref(route.query.sigungu)
    const contentType = ref('')
    const contentIdx = ref(0)
    const searchKeywordText = ref('')
    const searchKeyword = ref(null)

    watchEffect(() => {
      isLoading.value = true

      axios.get(URL, {
        params: {
          sigungu: sigungu.value,
          contentType: contentType.value,
          searchKeyword: searchKeyword.value,
          page: page.value,
        }
      }).then((resp) => {
        console.log(URL + "요청 성공 status : " + resp.status)

        areaList.value = resp.data.areaList
        startBlockPage.value = resp.data.startBlockPage
        endBlockPage.value = resp.data.endBlockPage
        totalPages.value = resp.data.totalPages
        isLoading.value = false
      }).catch(() => {
        console.log(URL + "요청 실패")
      })

      searchKeyword.value = null
    })

    return {
      isLoading,

      imgPath,
      areaMenu,
      areaImages,
      contentMenu,
      areaList,
      page,
      startBlockPage,
      endBlockPage,
      totalPages,
      contentIdx,
      sigungu,
      contentType,
      searchKeywordText,
      searchKeyword,
    }
  }
}
</script>

<style scoped>
.areaList-container {
  background-color: white;
  width: 100%;
  margin: 0 auto 40px;
  position: relative;
  /*border: 1px solid;*/
}

.areaList-img {
  margin-top: 50px;
  text-align: center;
  /*border: 1px solid;*/
}

.areaList-img img {
  width: 1300px;
  height: 400px;
}

.areaL-drilldownBox {
  /*border: 1px solid;*/
  width: 350px;
  height: 30px;
  margin-top: 30px;
}

.drilldownbox {
  float: left;
  font-family: 'Nanum Gothic', sans-serif;
  font-size: 20px;
}

.areaList-nav {
  width: 100%;
  height: 80px;
  margin: 0 auto;
  position: relative;
  /*border: 1px solid;*/
}

.areaList-nav__cat {
  display: inline-block;
  width: 540px;
  height: 50px;
  position: absolute;
  left: 0;
  top: 14px;
  background-color: #E0EEFF;
  border-radius: 20px;
  box-shadow: 1px 2px 5px #CDCECF;
}

.areaList-nav__cat li {
  list-style: none;
  float: left;
  font-family: 'jua', sans-serif;
  font-size: 20px;
  margin-left: 28px;
  cursor: pointer;
  color: #647C97;
}

.areaList-nav__search {
  font-size: 0;
  display: inline-block;
  width: 310px;
  height: 50px;
  position: absolute;
  right: 0;
  top: 14px;
  text-align: center;
  border-radius: 20px;
  border: 1px solid #E0EEFF;
  background-color: #E0EEFF;
}

.areaList-nav__search__input {
  margin-top: 10px;
  width: 220px;
  height: 25px;
  border: 2px solid #00addd;
}

.areaList-nav__search__btn {
  vertical-align: bottom;
  text-align: center;
  width: 36px;
  height: 31px;
  border: 2px solid #00addd;
  background-color: #00addd;
  cursor: pointer;
}

.areaList-nav__search__btn svg {
  width: 20px;
  height: 18px;
  fill: white;
}

.areaList-dataContainer {
  border-radius: 20px;
  width: 100%;
  height: 1285px;
  border: 1px solid #E0EEFF;
  background-color: #E0EEFF;
  color: #647C97;
  position: relative;
}

.areaList-dataBox {
  width: 1175px;
  height: 1175px;
  margin: 50px auto 0;
  text-align: left;
}

.areaList-data {
  float: left;
  display: inline-block;
  width: 290px;
  height: 380px;
  text-align: center;
  border: 1pt solid #E0EEFF;
  /*border: 1px solid;*/
}

.clear-both {
  clear: both;
}

.areaList-dataImg {
  width: 250px;
  height: 250px;
  display: inline-block;
  margin: 20px;
}

.areaList-dataImg img {
  width: 250px;
  height: 250px;
}

.areaList-dataName {
  margin-top: 20px;
  font-family: nanumB;
  font-size: 18px;
  padding-left: 20px;
  padding-right: 20px;
  /*border: 1px solid;*/

}

.areaList-dataPage {
  padding-top: 10px;
  color: #2a5470;
  font-family: 'jua', sans-serif;
  font-size: 20px;
  text-align: center;
}

.pagination {
  display: inline-block;
}

.pagination td {
  border: 1px #CDCECF solid;
  font-family: 'Nanum Gothic Coding', sans-serif;
  font-size: 15px;
  font-weight: bold;
  padding: 4px 14px 4px 14px;
  cursor: pointer;
}

</style>