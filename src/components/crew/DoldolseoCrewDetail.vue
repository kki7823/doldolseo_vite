<template>
  <body>
    <doldolseo-crew-nav/>

    <section class="crew-mainContainer">

      <div class="crew-topContainer">
        <div class="common-top__title">
          크루 상세
        </div>

        <span class="common-top__drilldownbox">
                    <a href="#"
                       style="color: #FF8000;">크루 게시판</a>
                    <span> > </span>
                    <a href="#">크루 목록</a>
                    <span> > </span>
                    <a href="#">크루 상세</a>
            </span>
      </div>

      <div class="common-miniTitle">
        크루 정보
      </div>

      <div class="crew-infoContainer">
        <div class="crew-info__infobox">
          <div class="crew-info__item">
            <span>
              로고 :
            </span>
            <div class="crew-logobox">
              <img :src="URL_CREW_IMAGE+'/'+crewImage"
                   alt="crew-logo"
              />
            </div>
          </div>

          <div class="crew-info__item">
            <span>
              크루명 :
            </span>
            <span class="crew-namelabel">
              {{ crewName }}
            </span>
          </div>

          <div class="crew-info__item">
            크루설립일 :
            <span class="crew-namelabel">
              {{ cDate[0] + '-' + cDate[1] + '-' + cDate[2] }}
            </span>
          </div>

          <div class="crew-info__item">
            크루등급 :
            <div class="crew-info__grade">
              <!-- 크루등급별 등급사진 선택 -->
              <img :src="IMAGEPATH_CREW_GRADE+getCrewGrade(crewPoint)"
                   alt="grade"
              />
            </div>
            <button class="crew-button"
                    style="height: 30px">
              등급안내
            </button>
          </div>

          <div class="crew-info__item">
            크루포인트 :
            <div class="crew-info__pointbar--holder">
              <div class="crew-info__pointbar--bar">
                {{ crewPoint }}
              </div>
            </div>
          </div>
        </div>

        <div class="crew-info__introbox">
          <div class="crew-info__item"
               style="margin-top: 112px">
            관심지역 :
            <span class="crew-namelabel">
              {{ areaNoToString(areaNoFirst, areaNoSecond, areaNoThird) }}
            </span>
          </div>

          <div class="crew-info__item"
               style="border: none">
            <span>
              크루소개 :
            </span>
            <span class="crew-infolabel">
              {{ intro }}
            </span>
          </div>
        </div>
      </div>

      <div class="crew-midContainer--left">
        <div class="common-miniTitle"
             style="top:45px; font-size: 32px">
          <span>
            크루원 정보
            </span>
        </div>
        <!-- 크루 멤버 컨테이너 -->
        <div class="crew-memberContainer">
          <table class="crew-memberTbl--top">
            <tr class="crew-memberTbl__header">
              <td style="width: 160px">
                멤버등급
              </td>
              <td>
                멤버
              </td>
            </tr>
          </table>
          <!-- 크루장 -->
          <table class="crew-memberTbl--bottom">
            <tr class="common-tbl__item">
              <td>
                <div class="crew-master--decorate">
                  <span class="crew-master--decotext">
                    크루장
                  </span>
                  <img :src="IMAGEPATH_CREW+'crew_master_crown.png'"
                       alt="crown"
                  />
                </div>
              </td>
              <td>
                <div class="crew-member--idbox">
                  <div class="crew-member--photo">
                    <img :src="URL_MEMBER_IMAGE+crewLeader"
                         alt="profile"
                    />
                  </div>
                  <div class="crew-memberNickname">
                    {{ crewLeader }}
                  </div>
                </div>
              </td>
            </tr>

            <!-- 크루원 -->
            <tr v-for="member in members"
                class="common-tbl__item">
              <td>
                <span class="crew-member-decotext">크루원</span>
              </td>
              <td>
                <div class="crew-member--idbox">
                  <div class="crew-member--photo">
                    <img :src="URL_MEMBER_IMAGE+member.memberId"
                         alt="크루원"
                    />
                  </div>
                  <div class="crew-memberNickname">
                    {{ member.memberId }}
                  </div>
                </div>
              </td>
            </tr>
          </table>
        </div>
      </div>

      <!-- 모집 공고 및 크루 가입 -->
      <div class="crew-midContainer--right">
        <div class="common-miniTitle"
             style="width: 550px; top:45px; left: 65px; font-size: 32px;">
          <span>모집 공고</span>
          <button v-if="areYouLogedIn && areYouCrewMember"
                  class="crew-button"
                  style="float: right; margin-top: 2px"
                  @click="getOutOfThisCrew()">
            크루 탈퇴
          </button>
          <button v-else-if="areYouLogedIn && !areYouCrewMember"
                  class="crew-button"
                  style="float: right; margin-top: 2px"
                  @click="popupVal = !popupVal">
            크루 가입
          </button>
          <doldolseo-crew-join v-if="popupVal"
                               :crew-no="crewNo"
                               :toggle-popup="togglePopup"
                               :question-first="questionFirst"
                               :question-second="questionSecond"
                               :question-third="questionThird"
          />
        </div>
        <div class="crew-recruitContainer">
          {{ recruit }}
        </div>
      </div>
    </section>
  </body>
</template>

<script>
import DoldolseoCrewNav from "./DoldolseoCrewNav.vue";
import DoldolseoCrewJoin from "./DoldolseoCrewJoin.vue";
import {computed, inject, onMounted, ref} from "vue";
import {axios} from "@bundled-es-modules/axios";
import login from "../../module/login";
import {useCookies} from "vue3-cookies";
import {useRouter} from "vue-router";

export default {
  name: "DoldolseoCrewDetail",
  components: {DoldolseoCrewNav, DoldolseoCrewJoin},
  props: {
    crewNo: {
      type: String,
      require: true
    }
  },
  setup(props) {
    const URL_CREW = inject('doldolseoCrew')
    const URL_GET_CREW = URL_CREW + '/' + props.crewNo
    const URL_CREW_IMAGE = URL_CREW + '/images/'
    const URL_CREW_CHECKMEMBER = URL_CREW + '/member/check'
    const URL_CREW_GETOUT = URL_CREW + '/' + props.crewNo + '/member/' + localStorage.getItem('id')
    const URL_MEMBER_IMAGE = inject('doldolseoMember') + '/images/'

    const IMAGEPATH_CREW = inject('contextPath') + '/_image/crew/'
    const IMAGEPATH_CREW_GRADE = IMAGEPATH_CREW + '/grade/'

    const areaMenu = inject('areaMenu')
    const memberRole = localStorage.getItem('memberRole')

    const crewName = ref('')
    const areaNoFirst = ref('')
    const areaNoSecond = ref('')
    const areaNoThird = ref('')
    const intro = ref('')
    const introDetail = ref('')
    const recruit = ref('')
    const questionFirst = ref('')
    const questionSecond = ref('')
    const questionThird = ref('')
    const crewImage = ref('')
    const crewPoint = ref(0)
    const cDate = ref([])
    const crewLeader = ref('')
    const members = ref({})

    onMounted(() => {
      checkCrewMember()

      axios({
        method: 'get',
        url: URL_GET_CREW,
      }).then((resp) => {
        console.log(URL_GET_CREW + " 요청 성공")
        crewName.value = resp.data.crewDTO.crewName
        areaNoFirst.value = resp.data.crewDTO.areaNoFirst
        areaNoSecond.value = resp.data.crewDTO.areaNoSecond
        areaNoThird.value = resp.data.crewDTO.areaNoThird
        intro.value = resp.data.crewDTO.intro
        introDetail.value = resp.data.crewDTO.introDetail
        recruit.value = resp.data.crewDTO.recruit
        questionFirst.value = resp.data.crewDTO.questionFirst
        questionSecond.value = resp.data.crewDTO.questionSecond
        questionThird.value = resp.data.crewDTO.questionThird
        crewImage.value = resp.data.crewDTO.crewImage
        crewPoint.value = resp.data.crewDTO.crewPoint
        cDate.value = resp.data.crewDTO.cdate
        crewLeader.value = resp.data.crewDTO.crewLeader
        members.value = resp.data.crewMemberDTO_Joined

      }).catch(() => {
        console.log(URL_GET_CREW + " 요청 실패")
      })
    })

    const areaNoToString = (first, second, third) => {
      let areaArray = []
      areaArray.push(areaMenu[first])
      areaArray.push(areaMenu[second])
      areaArray.push(areaMenu[third])

      return areaArray.toString().slice(0, -1)
    }

    const getCrewGrade = (crewPoint) => {
      if (crewPoint >= 1000) return 'crew_grade_4.png'
      else if (crewPoint >= 700) return 'crew_grade_3.png'
      else if (crewPoint >= 300) return 'crew_grade_2.png'
      else return 'crew_grade_1.png'
    }

    const popupVal = ref(false)
    const togglePopup = () => {
      popupVal.value = !popupVal.value
    }

    const {cookies} = useCookies()
    const router = useRouter()
    const areYouLogedIn = computed(() => {
      return cookies.get('token') != null && localStorage.getItem('loginState') === 'login';
    })
    const areYouCrewMember = ref(false)

    const checkCrewMember = () => {
      if (!areYouLogedIn.value) return

      axios({
        method: 'get',
        url: URL_CREW_CHECKMEMBER,
        headers: {
          Authorization: 'Bearer ' + cookies.get('token')
        },
        params: {
            crewNo: props.crewNo,
        }
      }).then((resp) => {
        console.log(URL_CREW_CHECKMEMBER + " 요청 성공 status : " + resp.status)
        areYouCrewMember.value = resp.data
      }).catch((err) => {
        console.log(URL_CREW_CHECKMEMBER + "요청 실패 status :" + err.response.status)
        if (err.response.status === 401) {
          alert("로그인이 필요 합니다.")
          router.replace('/member/login').then(() => {
            login.removeUserInfo()
          })
        }
      })
    }

    const getOutOfThisCrew = () => {
      if (!confirm("정말로 크루를 탈퇴 하시겠습니까?")) return

      axios({
        method: 'delete',
        url: URL_CREW_GETOUT,
        headers: {
          Authorization: 'Bearer ' + cookies.get('token')
        },
      }).then((resp) => {
        console.log(URL_CREW_CHECKMEMBER + " 요청 성공 status : " + resp.status)
        alert('탈퇴 되었습니다.')
        router.replace('/crew').then(() => {
        })
      }).catch((err) => {
        console.log(URL_CREW_CHECKMEMBER + " 테스트 메소드 요청 실패")
        if (err.response.status === 401) {
          alert("로그인이 필요 합니다.")
          router.replace('/member/login').then(() => {
            login.removeUserInfo()
          })
        }
      })
    }

    return {
      URL_CREW_IMAGE,
      URL_MEMBER_IMAGE,
      IMAGEPATH_CREW,
      IMAGEPATH_CREW_GRADE,
      areaMenu,
      memberRole,

      crewName,
      areaNoFirst,
      areaNoSecond,
      areaNoThird,
      intro,
      introDetail,
      recruit,
      questionFirst,
      questionSecond,
      questionThird,
      crewImage,
      crewPoint,
      cDate,
      crewLeader,
      members,
      areYouLogedIn,
      areYouCrewMember,
      getOutOfThisCrew,

      areaNoToString,
      getCrewGrade,

      popupVal,
      togglePopup
    }
  }
}
</script>

<style scoped>
.crew-mainContainer {
  width: 1120px;
  min-height: 800px;
  margin: 0 auto 30px;
  font-size: 0;
  text-align: left;
  /*border: 1pt solid;*/
}


.crew-topContainer {
  width: 1120px;
  height: 100px;
  margin: 10px auto 0;
  position: relative;
  border-bottom: 1px #CDCECF solid;
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

.common-miniTitle {
  position: relative;
  width: 1120px;
  font-size: 32px;
  font-family: 'Jua', sans-serif;
  color: #6E6E6E;
  text-align: left;
  top: 45px;
}

.crew-infoContainer {
  width: 1120px;
  height: 720px;
  margin-top: 50px;
  border: 1px solid #CDCECF;
  box-shadow: 1px 2px 5px #CDCECF;
}

.crew-info__infobox {
  text-align: left;
  font-size: 21px;
  font-family: 'Nanum Gothic', sans-serif;
  font-weight: bold;
  display: inline-block;
  width: 557px;
  height: inherit;
  border-right: 1px solid #CDCECF;
  vertical-align: top;
}

.crew-info__item {
  width: 500px;
  padding: 12px;
  border-bottom: 1px solid #CDCECF;
  line-height: 29px;
  margin-top: 20px;
}

.crew-logobox {
  display: inline-block;
  width: 100px;
  height: 110px;
  border: 1pt solid #F2F2F2;
  overflow: hidden;
  position: relative;
  top: 7px;
  border-radius: 10px;
}

.crew-logobox > img {
  width: inherit;
  height: inherit;
  object-fit: cover;
}

.crew-info__grade {
  display: inline-block;
  width: 30px;
  height: 30px;
  vertical-align: bottom;
  overflow: hidden;
  /*border: 1pt solid;*/
}

.crew-info__grade > img {
  display: inline-block;
  width: inherit;
  height: inherit;
  vertical-align: bottom;
  object-fit: cover;
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

.crew-info__pointbar--holder {
  display: inline-block;
  width: 300px;
  height: 15px;
  border-radius: 20px;
  position: relative;
  border: 1px solid #CDCECF;
}

.crew-info__pointbar--bar {
  display: inline-block;
  width: 85.12%;
  height: 100%;
  background-image: linear-gradient(60deg, #3d3393 0%, #2b76b9 37%, #2cacd1 65%, #35eb93 100%);
  line-height: 15px;
  /*vertical-align: top;*/
  border-radius: 20px;
  position: absolute;
  top: 0;
  text-align: center;
  font-size: 10px;
  font-family: 'Jua', sans-serif;
  color: white;
}

.crew-info__introbox {
  text-align: left;
  font-size: 21px;
  font-family: 'Nanum Gothic', sans-serif;
  font-weight: bold;
  display: inline-block;
  width: 557px;
  height: inherit;
  vertical-align: top;
  /*border: 1pt solid;*/
}

.crew-midContainer--left {
  height: 400px;
  width: 500px;
  display: inline-block;
  vertical-align: top;
  margin-bottom: 40px;
  /*border: 1pt solid;*/
}


.crew-memberContainer {
  width: 500px;
  max-height: 300px;
  margin-top: 50px;
  border: 1px solid #CDCECF;
  box-shadow: 1px 2px 5px #CDCECF;
  border-radius: 20px;
  overflow-y: auto;
  position: relative;
}

.crew-memberContainer::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera*/
}

.crew-memberTbl--top {
  width: 100%;
  object-fit: cover;
  top: 0;
}

.crew-memberTbl--bottom {
  width: 100%;
  object-fit: cover;
}

.crew-memberTbl--top td {
  padding: 4px 1px 4px 1px;
  text-align: center;
  height: 31px;
  /*border: 1pt solid;*/
}

.crew-memberTbl--bottom td {
  padding: 4px 30px 4px 30px;
  height: 60px;
  text-align: center;
  /*border: 1pt solid;*/
}

.crew-memberTbl__header {
  font-family: 'Jua', sans-serif;
  font-size: 23px;
  color: white;
  background-color: #FF8000;
  /*border: 1px #CDCECF solid;*/
}

/*왜 두개임 */
.crew-master--decorate {
  width: 70px;
  height: 36px;
  overflow: hidden;
  position: relative;
  display: inline-block;
  /*border: 1pt solid;*/
}

.crew-master--decorate > img {
  width: inherit;
  height: inherit;
  object-fit: cover;
  position: absolute;
  right: 0;
}

.crew-master--decotext {
  font-family: 'Jua', sans-serif;
  font-size: 14px;
  color: white;
  z-index: 1;
  position: absolute;
  top: 16px;
  left: 19px;
}

.crew-member--idbox {
  text-align: left;
  width: 270px;
  display: inline-block;
  padding-left: 30px;
  /*border: 1pt solid;*/
}

.crew-memberNickname {
  display: inline-block;
  position: relative;
  bottom: 18px;
}

.crew-member--photo {
  width: 45px;
  height: 45px;
  margin: 0 auto;
  overflow: hidden;
  border-radius: 50px;
  border: 1pt solid #E6E6E6;
  display: inline-block;
  position: relative;
}

.crew-member--photo > img {
  width: inherit;
  height: inherit;
  object-fit: cover;
  position: absolute;
  right: 0;
}

.crew-member-decotext {
  font-family: 'Jua', sans-serif;
  font-size: 14px;
  color: white;
  background-color: #6E6E6E;
  padding: 6px 12px 3px 12px;
  border-radius: 15px;
}

.crew-midContainer--right {
  height: 400px;
  width: 615px;
  display: inline-block;
  vertical-align: top;
  margin-bottom: 40px;
  /*border: 1pt solid;*/
}

.crew-recruitContainer {
  display: inline-block;
  width: 530px;
  height: 239px;
  margin: 50px 0 0 65px;
  border: 1px solid #CDCECF;
  box-shadow: 1px 2px 5px #CDCECF;
  border-radius: 20px;
  overflow: hidden;
  font-family: 'Nanum Gothic', sans-serif;
  font-size: 17px;
  padding: 30px 10px 30px 10px;
}

.common-tbl__item {
  font-family: 'Nanum Gothic Coding', monospace;
  font-size: 15px;
  color: black;
  text-align: left;
  border: 1px #CDCECF solid;
}

.common-tbl__item > td {
  padding: 10px 20px 10px 20px;
}
</style>