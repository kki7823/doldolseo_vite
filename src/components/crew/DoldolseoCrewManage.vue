<template>
  <doldolseo-crew-nav/>

  <section class="crew-mainContainer">
    <!-- 상단 제목,드릴다운 : 공통 -->
    <div class="crew-topContainer">
      <!-- 제목 -->
      <div class="common-top__title">
        크루 관리
      </div>
      <!-- 게시판 드릴다운 -->
      <span class="common-top__drilldownbox">
        <a href="#"
           style="color: #FF8000;">크루 게시판</a>
        <span> > </span>
        <a href="#"
           style="color: #6E6E6E">크루 관리</a>
      </span>
    </div>

    <div class="common-miniTitle">
      크루 정보
    </div>
    <!-- 크루 정보 컨테이너 -->
    <div class="crew-infoContainer">
      <div class="crew-info__infobox">

        <!-- 크루 로고 : 수정 -->
        <div class="crew-info__item">
          <span>로고 :</span>
          <div class="crew-logobox">
            <img id="crewM_img"
                 :src="URL_CREW_IMAGE+crewImage"
                 alt="crew-logo"
            />
            <form id="crewM-form-img" enctype="multipart/form-data">
              <label id="crewD-label--img"
                     class="crew-label--upload"
                     for="crewM_input--image">
                변경
              </label>
              <input type="file"
                     name="crewImageFile"
                     id="crewM_input--image"
                     onchange="setImg_m(event,'${pageContext.request.contextPath}',${crew.crewNo})">
            </form>
          </div>
        </div>

        <!-- 크루 명 -->
        <div class="crew-info__item">
          <span>크루명 :</span>
          <span class="crew-namelabel">
            {{ crewName }}
          </span>
        </div>

        <!-- 크루 설립일 -->
        <div class="crew-info__item">
          크루설립일 :
          <span class="crew-namelabel">
            {{ cDate[0] + '-' + cDate[1] + '-' + cDate[2] }}
          </span>
        </div>

        <!-- 크루 등급 -->
        <div class="crew-info__item">
          크루등급 :
          <div class="crew-info__grade">
            <!-- 크루등급별 등급사진 선택 -->
            <img :src="IMAGEPATH_CREW_GRADE+getCrewGrade(crewPoint)"
                 alt="grade"
            />
          </div>
          <button class="crew-button"
                  style="width: 80px; margin-left: 5px">
            등급안내
          </button>

        </div>

        <!-- 크루 포인트 -->
        <div class="crew-info__item">
          크루포인트 :
          <div class="crew-info__pointbar--holder">
            <div class="crew-info__pointbar--bar">
              {{ crewPoint }}
            </div>
          </div>
        </div>
      </div>

      <!-- 관심 지역 : 수정 -->
      <div class="crew-info__introbox">

        <div class="crew-info__item"
             style="margin-top: 40px;">
          관심지역 :
          <span class="crew-namelabel">
            {{ areaNoToString(areaNoFirst, areaNoSecond, areaNoThird) }}
          </span>
          <button class="crew-button"
                  style="height: 31px; margin-left: 5px;"
                  onclick="goAreaEditMode('${pageContext.request.contextPath}',${crew.crewNo})">
            수정
          </button>
        </div>


        <!-- 크루소개(간략) : 수정 -->
        <div class="crew-info__item">
          <span>크루소개(간략) :</span><br/>
          <textarea class="crewM-textArea--intro"
                    :readonly="isClickedUpdateIntro"
                    id="crewM-Intro"
                    v-model="intro"
                    :style="{border: setBoderIfEdit(isClickedUpdateIntro)}">
          </textarea>
          <button v-if="isClickedUpdateIntro"
                  class="crew-button"
                  @click="isClickedUpdateIntro = !isClickedUpdateIntro;
                          setFocus('crewM-Intro');"
                  style="position: relative; bottom: 6px; left: 4px">
            수정
          </button>
          <button v-else
                  class="crew-button"
                  @click="isClickedUpdateIntro = !isClickedUpdateIntro;
                          updateCrewData()"
                  style="position: relative; bottom: 6px; left: 4px">
            완료
          </button>
        </div>

        <!-- 크루소개(상세) : 수정 -->
        <div class="crew-info__item">
          <span>크루소개(상세) :</span>
          <textarea class="crewM-textArea--introDetail"
                    :readonly="isClickedUpdateIntroDetail"
                    id="crewM-IntroDetail"
                    :style="{border: setBoderIfEdit(isClickedUpdateIntroDetail)}">{{ introDetail }}</textarea>
          <button id="crewM-btn--modifyInfo"
                  class="crew-button"
                  @click="isClickedUpdateIntroDetail = !isClickedUpdateIntroDetail;
                          setFocus('crewM-IntroDetail');">
            수정
          </button>
          <form id="crewM-form--introD"
                method="post">
            <label id="crewM-editBox--intro">
              <!-- 수정 양식 추가 되는 곳 -->
            </label>
          </form>
        </div>
      </div>
    </div>

    <div class="crew-midContainer--left">
      <div class="common-miniTitle"
           style="top:45px; font-size: 32px">
        <span>크루원 정보</span>
      </div>
      <!-- 크루 멤버 컨테이너 -->
      <div class="crew-memberContainer">
        <table class="crew-memberTbl--top">
          <tr class="crew-memberTbl__header">
            <td style="width: 160px">멤버등급</td>
            <td>멤버</td>
          </tr>
        </table>
        <!-- 크루장 -->
        <table class="crew-memberTbl--bottom">
          <tr class="common-tbl__item">
            <td>
              <div class="crew-master--decorate">
                <span class="crew-master--decotext">크루장</span>
                <img :src="IMAGEPATH_CREW+'/crew_master_crown.png'"
                     alt="crown">
              </div>
            </td>
            <td>
              <div class="crew-member--idbox">
                <div class="crew-member--photo">
                  <img src="${pageContext.request.contextPath}/_image/crew/profile/${crew.member.member_img}"
                       alt="profile"/>
                </div>
                <div class="crew-member--id">
                  {{ crewLeader }}
                </div>
              </div>
            </td>
          </tr>
          <!-- 크루원 목록 -->
          <tr v-for="member in members_joined"
              class="common-tbl__item">
            <td>
              <span class="crew-member-decotext">크루원</span>
            </td>
            <td>
              <div class="crew-member--idbox">
                <div class="crew-member--photo">
                  <img src="${pageContext.request.contextPath}/_image/profile/${crewMember.member.member_img}"/>
                </div>
                <div class="crew-member--id">
                  {{ member.crewMemberId }}
                  <button type="button"
                          class="crew-button"
                          onclick="giveCrewMaster('${pageContext.request.contextPath}',${crew.crewNo})">
                    위임
                  </button>
                  <button type="button"
                          class="crew-button"
                          style="margin-left: 5px"
                          onclick="DenyOrKick('${pageContext.request.contextPath}',${crewMember.regNo})">
                    강퇴
                  </button>
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

        <button id=crewM-btn--modifyJoin
                class="crew-button"
                onclick="popupEditJoin()"
                style="float: right; margin-top: 2px; width: 130px">
          가입 양식 수정
        </button>
      </div>
      <div id="crewM-recruiutBox"
           class="crew-recruitContainer">
        {{ recruit }}
      </div>
      <button id=crewM-btn--modifyRecuit
              class="crew-button"
              onclick="goRecruitEditMode('${pageContext.request.contextPath}',${crew.crewNo})"
              style="float: right; margin-top: 7px">수정
      </button>
    </div>


    <!-- 가입대기자 정보 -->
    <div class="common-miniTitle"
         style="width: 1120px; font-size: 32px;">
      가입 대기
    </div>
    <div class="crewM-container--bottom">
      <div id="crewM-container__wating"
           class="crew-memberContainer">
        <table id="crewM-container__wating--top"
               class="crew-memberTbl--top">
          <tr class="crew-memberTbl__header">
            <td style="width: 150px">대기순번</td>
            <td>멤버</td>
          </tr>
        </table>
        <table class="crew-memberTbl--bottom">

          <!-- 가입대기자 목록 출력 -->
          <tr v-for="(member, idx) in members_wating"
              class="common-tbl__item">
            <td style="font-size: 20px; width: 100px">
              {{ idx + 1 }}
            </td>
            <td>
              <div class="crewM-member--idbox">
                <div class="crew-member--photo">
                  <img src="${pageContext.request.contextPath}/_image/profile/${watingMember.member.member_img}"
                       alt="profile"
                  />
                </div>
                <div class="crew-member--id">
                  {{ member.crewMemberId }}
                </div>
                <span class="crewM-member--idbox__btnbox">
                  <button class="crew-button"
                          type="button"
                          style="width: 100px"
                          onclick="getJoinInfo('${watingMember.member.id}')">
                    가입서 보기
                  </button>
                  <button type="button"
                          class="crew-button"
                          onclick="agreeJoin('${pageContext.request.contextPath}',${watingMember.regNo})">
                    승인
                  </button>
                  <button type="button"
                          class="crew-button"
                          onclick="DenyOrKick('${pageContext.request.contextPath}',${watingMember.regNo})">
                    거절
                  </button>
                </span>
              </div>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </section>
</template>

<script>
import DoldolseoCrewNav from "./DoldolseoCrewNav.vue";
import {inject, onMounted, ref} from "vue";
import {axios} from "@bundled-es-modules/axios";

export default {
  name: "DoldolseoCrewManagement",
  components: {DoldolseoCrewNav},
  props: {
    id: {
      type: String,
      require: true
    }
  },
  setup(props) {
    const URL_CREW = inject('doldolseoCrew')
    const URL_CREW_IMAGE = inject('doldolseoCrew') + '/images/'
    const URL_GET_CREW_BY_ID = URL_CREW + '/manage/' + props.id
    const IMAGEPATH_CREW = inject('contextPath') + '/_image/crew'
    const IMAGEPATH_CREW_GRADE = IMAGEPATH_CREW + '/grade/'
    const areaMenu = inject('areaMenu')

    const crewNo = ref(0)
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
    const members_joined = ref({})
    const members_wating = ref({})

    const isClickedUpdateIntro = ref(true);
    const isClickedUpdateIntroDetail = ref(true);

    const setBoderIfEdit = (isClicked) => {
      if (!isClicked) {
        return '3px solid #A9E2F3'
      } else {
        return '1px #CDCECF solid'
      }
    }

    const setFocus = (elementId) => {
      document.getElementById(elementId).focus()
    }

    onMounted(() => {
      axios({
        method: 'get',
        url: URL_GET_CREW_BY_ID,
      }).then((resp) => {
        console.log(URL_GET_CREW_BY_ID + " 요청 성공")
        crewNo.value = resp.data.crewDTO.crewNo
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
        members_joined.value = resp.data.crewMemberDTO_Joined
        members_wating.value = resp.data.crewMemberDTO_Wating

      }).catch(() => {
        console.log(URL_GET_CREW_BY_ID + " 요청 실패")
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

    const updateCrewData = () =>{
      axios({
        method: 'put',
        url: URL_CREW + '/' + crewNo.value,
        data: {
          areaNoFirst: areaNoFirst.value,
          areaNoSecond: areaNoSecond.value,
          areaNoThird: areaNoThird.value,
          intro: intro.value,
          introDetail: introDetail.value,
          recruit: recruit.value,
        }
      }).then((resp) => {
        console.log(URL_CREW + '/' + crewNo.value, +" 크루 수정" + resp.status)
        alert('수정이 완료 되었습니다.')
      }).catch(() => {
        console.log(URL_CREW + '/' + crewNo.value, +" 크루 수정 실패")
      })
    }

    return {
      URL_CREW_IMAGE,
      IMAGEPATH_CREW,
      IMAGEPATH_CREW_GRADE,
      areaMenu,

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
      members_joined,
      members_wating,

      isClickedUpdateIntro,
      isClickedUpdateIntroDetail,
      setBoderIfEdit,
      setFocus,
      updateCrewData,

      areaNoToString,
      getCrewGrade,
    }

  }
}
</script>

<style scoped>
.crew-mainContainer {
  width: 1120px;
  min-height: 800px;
  text-align: left;
  margin: 0 auto 30px;
  font-size: 0;
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
  width: 1120px;
  text-align: left;
  font-size: 32px;
  font-family: 'Jua', sans-serif;
  color: #6E6E6E;
  position: relative;
  top: 45px;
}

.crew-infoContainer {
  width: 1120px;
  height: 720px;
  margin-top: 50px;
  border: 1px solid #CDCECF;
  box-shadow: 1px 2px 5px #CDCECF;
  border-radius: 20px;
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
  margin: 20px auto 0;
  padding: 12px;
  border-bottom: 1px solid #CDCECF;
  line-height: 29px;
}

#crewM_input--image {
  display: none;
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

.crew-namelabel {
  display: inline-block;
  text-align: center;
  font-size: 1.2rem;
  line-height: 32px;
  font-family: 'Jua', sans-serif;
  color: white;
  background-color: #6E6E6E;
  height: 27px;
  width: 120px;
  border-radius: 5px;
  padding-bottom: 2px;
  margin-left: 5px;
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
  font-size: 1.2rem;
  line-height: 32px;
  border-radius: 6px;
  border: none;
  height: 28px;
  width: 50px;
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

.crewM-textArea--intro {
  width: 420px;
  height: 50px;
  resize: none;
  outline: none;
  padding: 10px;
  margin-top: 7px;
  font-size: 15px;
  font-family: 'Nanum Gothic', sans-serif;
  border: 1px solid #CDCECF;
  border-radius: 5px;
}

.crewM-textArea--introDetail {
  resize: none;
  outline: none;
  display: block;
  text-align: left;
  font-size: 15px;
  font-family: 'Nanum Gothic', sans-serif;
  width: 490px;
  height: 266px;
  margin: 10px 0 auto;
  border-radius: 5px;
  border: 1px solid #CDCECF;
  padding: 10px;
}

#crewM-btn--modifyInfo {
  position: relative;
  left: 462px;
  top: 5px;
}


.crew-infolabel {
  display: block;
  text-align: left;
  font-size: 15px;
  font-family: 'Nanum Gothic', sans-serif;
  width: 490px;
  height: 266px;
  margin: 10px 0 auto;
  border-radius: 5px;
  border: 1px solid #CDCECF;
  padding: 10px;
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

.crew-member--idbox {
  text-align: left;
  width: 270px;
  display: inline-block;
  padding-left: 30px;
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

.crew-member--id {
  display: inline-block;
  position: relative;
  bottom: 18px;
}

.crew-member-decotext {
  font-family: 'Jua', sans-serif;
  font-size: 14px;
  color: white;
  background-color: #6E6E6E;
  padding: 6px 12px 3px 12px;
  border-radius: 15px;
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

.crewM-container--bottom {
  width: 1120px;
  height: 500px;
  /*border: 1px solid;*/
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

.crewM-member--idbox {
  text-align: left;
  width: 300px;
  display: inline-block;
  position: relative;
  left: 10px;
  /*border: 1pt solid;*/
}

.crewM-member--idbox__btnbox {
  position: absolute;
  right: 0px;
  top: 10px;
}

.crewM-member--idbox__btnbox button {
  margin-left: 3px;
}

</style>