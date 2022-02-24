<template>
  <section class="crew-mainContainer">
    <doldolseo-crew-nav/>
    <!-- 상단 제목,드릴다운 : 공통 -->
    <div class="crew-topContainer">
      <!-- 제목 -->
      <div class="common-top__title">
        크루 목록
      </div>
      <!-- 게시판 드릴다운 -->
      <span class="common-top__drilldownbox">
        <router-link :to="{name: 'crewList'}"
                     style="color: #ff8000">
          크루 게시판
        </router-link>
        <span> > </span>
        <router-link :to="{name: 'crewList'}"
                     style="color: #6E6E6E">
          크루 목록
        </router-link>
      </span>

      <!-- 로그인 및 권한에 따라 구분 -->
      <div v-if="token != null && memberRole === 'USER'">
        <router-link to="/crew/create">
          <button>
            크루 생성
          </button>
        </router-link>
      </div>
      <div v-else-if="token != null && memberRole === 'CREWLEADER'">
        <router-link :to="{name: 'crewManage'}">
          <button>
            크루 관리
          </button>
        </router-link>
      </div>
    </div>

    <!-- 상단 정렬버튼 + 검색창 -->
    <div class="crew-topContainer__sub">
      <div class="crew-topContainer__subBtnbox">
        <button class="crew-button">등급 순</button>
        <button class="crew-button">가입 순</button>
      </div>

      <!-- 검색창 -->
      <div class="common-searchbar"
           id="crewL-searchBar">
        <select><!-- 검색 조건 -->
          <option value="0">크루명</option>
          <option value="1">지역</option>
          <option value="2">크루장</option>
        </select>
        <input type="text"><!-- 검색어 입력 -->
        <button class="crew-button"
                style="background-color: #FF8000"><!-- 검색 버튼 -->
          <svg xmlns="http://www.w3.org/2000/svg"
               width="20"
               height="20"
               fill="#F6CEEC"
               viewBox="0 0 16 16">
            <path
                d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
            />
          </svg>
        </button>
      </div>
    </div>

    <!-- 크루 목록 -->
    <div class="crew-listContainer">
      <!-- 크루프로필 start -->
      <div v-for="crew in crewList"
           class="crew-crewProfile">
        <div class="crew-crewProfile__logo">
          <img :src="URL_CREW_IMAGE+crew.crewImage"
               alt="crew_logo">
        </div>
        <div class="crew-crewProfile__crewnameBox">
          <span class="crew-crewProfile__crewnameBox__name">
            <span class="crew-crewProfile__crewnameBox__grade">
              <img :src="IMAGEPATH_CREW_GRADE+getCrewGrade(crew.crewPoint)"/>
            </span>
            <router-link :to="{name: 'crewDetail', params:{crewNo: crew.crewNo}}">
              <span class="crew-crewName">
                {{ crew.crewName }}
              </span>
            </router-link>
          </span>
        </div>
        <div class="crew-crewProfile__master">
          <span class="crew-label--crewmaster">
            크루장
          </span>
          {{ crew.crewLeader }}
        </div>
        <div class="crew-crewProfile__region">
          <span style="color: #5882FA">
            지역
          </span>
          > {{ areaNoToString(crew.areaNoFirst, crew.areaNoSecond, crew.areaNoThird) }}
        </div>
        <div class="crew-crewProfile__intro">
          {{ crew.intro }}
        </div>
      </div>
      <!-- 크루프로필 end -->
      <!--      </c:forEach>-->

    </div>
    <!-- 페이지네이션 및 검색창-->
    <div id="crewL-container--bottom">
      <!-- 페이지네이션 -->
      <div id="crewL-bottom__pagination">
        <doldolseo-pagenation
            v-if="totalPages > 1"
            :page="page"
            :start-block-page="startBlockPage"
            :end-block-page="endBlockPage"
            :total-pages="totalPages"
        />
      </div>
    </div>
  </section>
</template>

<script>
import DoldolseoPagenation from "../common/DoldolseoPagenation.vue";
import {inject, ref, watchEffect} from "vue";
import {axios} from "@bundled-es-modules/axios";
import DoldolseoCrewNav from "./DoldolseoCrewNav.vue";
import {useCookies} from "vue3-cookies";
import {useRouter} from "vue-router";

export default {
  name: "DoldolseoCrewList",
  components: {DoldolseoCrewNav, DoldolseoPagenation},
  props: {
    memberId: {
      type: String,
    }
  },
  setup(props) {
    const URL_CREW = inject('doldolseoCrew')
    const URL_CREW_IMAGE = URL_CREW + '/images/'
    const IMAGEPATH_CREW_GRADE = inject('contextPath') + '/_image/crew/grade/'
    const areaMenu = inject('areaMenu')
    const {cookies} = useCookies()
    const router = useRouter()

    const crewList = ref([])
    const page = ref(0)
    const startBlockPage = ref(0)
    const endBlockPage = ref(0)
    const totalPages = ref(0)

    const token = ref(cookies.get('token'))
    const memberRole = ref(localStorage.getItem('memberRole'))

    const areaNoToString = (first, second, third) => {
      let areaArray = []
      areaArray.push(areaMenu[first])
      areaArray.push(areaMenu[second])
      areaArray.push(areaMenu[third])

      return areaArray.toString().slice(0, -1)
    }

    watchEffect(() => {
      axios.get(URL_CREW, {
        params: {
          page: page.value,
          memberId: props.memberId
        }
      }).then((resp) => {
        console.log(URL_CREW + " - 요청 성공 status : " + resp.status)
        crewList.value = resp.data.crewList
        startBlockPage.value = resp.data.startBlockPage
        endBlockPage.value = resp.data.endBlockPage
        totalPages.value = resp.data.totalPages
      }).catch(() => {
        console.log(URL_CREW + " - 요청 실패")
      })
    })

    const getCrewGrade = (crewPoint) => {
      if (crewPoint >= 1000) return 'crew_grade_4.png'
      else if (crewPoint >= 700) return 'crew_grade_3.png'
      else if (crewPoint >= 300) return 'crew_grade_2.png'
      else return 'crew_grade_1.png'
    }

    return {
      URL_CREW_IMAGE,
      IMAGEPATH_CREW_GRADE,
      crewList,
      page,
      startBlockPage,
      endBlockPage,
      totalPages,
      areaNoToString,
      getCrewGrade,
      token,
      memberRole,
    }
  }
}
</script>

<style scoped>
.crew-mainContainer {
  max-width: 1400px;
  min-height: 800px;
  text-align: center;
  margin: 0 auto 30px;
  font-size: 0;
  /*border: 1pt solid;*/
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
  line-height: 21px;
}

.crew-topContainer {
  width: 1246px;
  height: 100px;
  margin: 10px auto 0;
  position: relative;
  border-bottom: 1px #CDCECF solid;
}

.crew-topContainer button {
  /*width: 150px;*/
  color: #FF8000;
  background-color: white;
  border: 1pt solid #FF8000;
  font-family: Jua, sans-serif;
  font-size: 19px;
  border-radius: 10px;
  padding: 4px 8px 2px 8px;
  position: absolute;
  right: 3px;
  bottom: 14px;
  box-shadow: 1px 1px;
  /*border: none;*/
}

.crew-topContainer__sub {
  width: 1246px;
  height: 48px;
  margin: 15px auto 0;
  position: relative;
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

.common-searchbar > button {
  position: absolute;
  height: 33px;
  border-radius: 0;
  bottom: 6px;
  margin: 1px;
}

.common-top__title {
  text-align: left;
  font-family: 'Jua', sans-serif;
  color: #FAAC58;
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

.crew-listContainer {
  width: 1400px;
  margin: 1px auto 0;
  position: relative;
  text-align: left;
  left: 50px;
  /*border: 1pt solid;*/
}

.crew-crewProfile {
  display: inline-block;
  width: 270px;
  height: 180px;
  /*margin: 1px;*/
  margin: 18px 25px 18px 25px;
  position: relative;
  box-shadow: 1px 2px 5px #CDCECF;
  border: 1pt solid #CDCECF;
  border-radius: 10px;
}

.crew-crewProfile__logo {
  display: inline-block;
  width: 70px;
  height: 70px;
  position: absolute;
  top: 10px;
  left: 15px;
  overflow: hidden;
  box-shadow: 1px 2px 5px #CDCECF;
  border: 1pt solid #CDCECF;
}

.crew-crewProfile__logo > img {
  width: inherit;
  height: inherit;
  object-fit: cover;
}

.crew-crewName {
  color: white;
}

.crew-crewProfile__crewnameBox {
  width: 160px;
  height: 35px;
  text-align: center;
  position: absolute;
  top: 15px;
  right: 15px;
  border: 1pt solid;
  border-radius: 10px;
  background-color: #6E6E6E;
  color: #F2F2F2;
  padding-bottom: 2px;
  line-height: 30px;
}

.crew-crewProfile__crewnameBox__name {
  display: inline-block;
  width: 160px;
  height: 30px;
  position: absolute;
  top: 3px;
  left: 0;
  font-size: 20px;
  font-family: 'Jua', sans-serif;
  /*border: 1pt solid;*/
}

.crew-crewProfile__crewnameBox__grade {
  display: inline;
  width: 19px;
  height: 20px;
  overflow: hidden;
  /*border: 1pt solid;*/
}

.crew-crewProfile__crewnameBox__grade > img {
  vertical-align: middle;
  width: inherit;
  height: inherit;
  object-fit: cover;
  margin-bottom: 4px;
}

.crew-crewProfile__master {
  width: 160px;
  height: 25px;
  position: absolute;
  top: 60px;
  right: 15px;
  font-size: 16px;
  font-family: 'Jua', sans-serif;
  color: #6E6E6E;
  text-align: left;
  /*border: 1pt solid;*/
}

.crew-crewProfile__region {
  width: 150px;
  height: 20px;
  position: absolute;
  top: 90px;
  left: 15px;
  font-size: 13px;
  font-family: 'Nanum Gothic', sans-serif;
  font-weight: bold;
  text-align: left;
  /*border: 1pt solid;*/
}

.crew-crewProfile__intro {
  width: 235px;
  height: 55px;
  position: absolute;
  bottom: 10px;
  left: 15px;
  font-size: 15px;
  font-family: 'Nanum Gothic', sans-serif;
  text-align: left;
  padding: 2px;
  border: 1pt solid #A4A4A4;
  border-radius: 5px;
}

#crewL-container--bottom {
  width: 1246px;
  height: 50px;
  margin: 30px auto 0;
  text-align: center;
  /*border: 1px solid;*/
}

#crewL-searchBar {
  position: absolute;
  top: 1px;
  right: 0;
  /*border: 1pt solid;*/
}
</style>