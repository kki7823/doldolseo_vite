<template>
  <loading :active="isLoading"
           :is-full-page="true"
           :opacity="1.0">
  </loading>
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
      <button class="crew-button--close"
              @click="closeCrew()">
        크루 폐쇄
      </button>
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
            <label class="crew-label--upload"
                   for="crewM_input--image">
              변경
            </label>
            <input type="file"
                   id="crewM_input--image"
                   @change="updateCrewImage">
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
            <img :src="getCrewGrade('/_image/crew/grade/'+getCrewGrade(crewPoint))"
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
                    v-model="introDetail"
                    :style="{border: setBoderIfEdit(isClickedUpdateIntroDetail)}">
          </textarea>
          <button v-if="isClickedUpdateIntroDetail"
                  class="crewM-btn--modifyInfo"
                  @click="isClickedUpdateIntroDetail = !isClickedUpdateIntroDetail;
                          setFocus('crewM-IntroDetail');">
            수정
          </button>
          <button v-else
                  class="crewM-btn--modifyInfo"
                  @click="isClickedUpdateIntroDetail = !isClickedUpdateIntroDetail;
                          updateCrewData()">
            완료
          </button>
        </div>
      </div>
    </div>

    <div class="crew-midContainer--left">
      <div class="common-miniTitle"
           style="top:45px; font-size: 32px">
        <span>크루원 정보 </span>
      </div>
      <!-- 크루 멤버 컨테이너 -->
      <div class="crew-memberContainer">
        <table class="crew-memberTbl--top">
          <tr class="crew-memberTbl__header">
            <td style="width: 160px">멤버등급</td>
            <td>멤버</td>
          </tr>
        </table>

        <table class="crew-memberTbl--bottom">
          <!-- 크루원 목록 -->
          <tr v-for="member in members_joined"
              class="common-tbl__item">
            <td v-if="member.memberRole === 'CREWLEADER'">
              <div class="crew-master--decorate">
                <span class="crew-master--decotext">
                  크루장
                </span>
                <img :src="IMAGEPATH_CREW+'/crew_master_crown.png'"
                     alt="crown">
              </div>
            </td>
            <td v-else>
              <span class="crew-member-decotext">
                크루원
              </span>
            </td>
            <td>
              <div class="crew-member--idbox">
                <div class="crew-member--photo">
                  <img :src="URL_MEMBER_IMAGES+member.memberId"
                       alt="profile"
                  />
                </div>
                <div class="crew-member--id">
                  {{ member.memberId }}
                  <div v-if="member.memberRole !== 'CREWLEADER'"
                       class="crew-member--buttonbox">
                    <button type="button"
                            class="crew-button"
                            @click="delegateLeader(member.memberId)">
                      위임
                    </button>
                    <button type="button"
                            class="crew-button"
                            style="margin-left: 5px"
                            @click="kickMember(member.memberId)">
                      강퇴
                    </button>
                  </div>
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

        <button class="crew-button"
                @click="popupVal_JoinEdit = !popupVal_JoinEdit"
                style="float: right; margin-top: 2px; width: 130px">
          가입 양식 수정
        </button>
        <doldolseo-crew-join-edit v-if="popupVal_JoinEdit"
                                  :toggle-popup="togglePopup_JoinEdit"
                                  :crew-no="crewNo"
                                  :question-first="questionFirst"
                                  :question-second="questionSecond"
                                  :question-third="questionThird"
        />
      </div>
      <textarea class="crewM-textArea--recruit"
                :readonly="isClickedUpdateRecruit"
                id="crewM-IntroDetail"
                v-model="recruit"
                :style="{border: setBoderIfEdit(isClickedUpdateRecruit)}">
          </textarea>
      <button v-if="isClickedUpdateRecruit"
              class="crew-button"
              @click="isClickedUpdateRecruit = !isClickedUpdateRecruit;"
              style="float: right; margin-top: 7px">
        수정
      </button>
      <button v-else
              class="crew-button"
              @click="isClickedUpdateRecruit = !isClickedUpdateRecruit;
                      updateCrewData();"
              style="float: right; margin-top: 7px">
        완료
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
          <tr v-if="members_wating.length === 0"
              class="common-tbl__item"
              style="color: grey; text-align: center">
            <p>가입 신청이 없습니다</p>
          </tr>
          <!-- 가입대기자 목록 출력 -->
          <tr v-else
              v-for="(member, idx) in members_wating"
              :key="member.memberId"
              class="common-tbl__item">
            <td style="font-size: 20px; width: 100px">
              {{ idx + 1 }}
            </td>
            <td>
              <div class="crewM-member--idbox">
                <div class="crew-member--photo">
                  <img :src="URL_MEMBER_IMAGES+member.memberId"
                       alt="profile"
                  />
                </div>
                <div class="crew-member--id">
                  {{ member.memberId }}
                </div>
                <span class="crewM-member--idbox__btnbox">
                  <doldolseo-crew-join-info v-if="idx === selectIdx && popupVal_JoinInfo"
                                            :toggle-popup="togglePopup_JoinInfo"
                                            :crew-no="crewNo"
                                            :member-id="member.memberId"
                                            :question-first="questionFirst"
                                            :question-second="questionSecond"
                                            :question-third="questionThird"
                  />
                  <button class="crew-button"
                          type="button"
                          style="width: 100px"
                          @click="selectIdx = idx;
                                  popupVal_JoinInfo = !popupVal_JoinInfo">
                    가입서 보기
                  </button>
                  <button type="button"
                          class="crew-button"
                          @click="agreeJoin(member.memberId)">
                    승인
                  </button>
                  <button type="button"
                          class="crew-button"
                          @click="denyJoin(member.memberId)">
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
import DoldolseoCrewJoinEdit from "./DoldolseoCrewJoinEdit.vue";
import {inject, onMounted, provide, ref} from "vue";
import {axios} from "@bundled-es-modules/axios";
import DoldolseoCrewJoinInfo from "./DoldolseoCrewJoinInfo.vue";
import {useCookies} from "vue3-cookies";
import {useRouter} from "vue-router";
import Loading from 'vue3-loading-overlay';
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css';
import onError from "../../module/onError";

export default {
  name: "DoldolseoCrewManagement",
  components: {DoldolseoCrewJoinInfo, DoldolseoCrewJoinEdit, DoldolseoCrewNav, Loading},
  setup() {
    const isLoading = ref(false)

    const URL_CREW = inject('doldolseoCrew')
    const URL_CREW_IMAGE = inject('doldolseoCrew') + '/images/'
    const URL_CREW_MANAGE = URL_CREW + '/manage'
    const URL_MEMBER_IMAGES = inject('doldolseoMember') + '/images/'
    const URL_MEMBER = inject('doldolseoMember')
    const URL_MEMBER_REFRESH = URL_MEMBER + '/refresh'
    const areaMenu = inject('areaMenu')
    const {cookies} = useCookies()
    const router = useRouter()

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
    const isClickedUpdateRecruit = ref(true);

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
      getCrewData()
    })

    const getCrewData = () => {
      isLoading.value = true
      axios({
        method: 'post',
        url: URL_CREW_MANAGE,
        headers: {
          Authorization: 'Bearer ' + cookies.get('token')
        }
      }).then((resp) => {
        console.log(URL_CREW_MANAGE + " 요청 성공")
        crewNo.value = resp.data.crew.crewNo
        crewName.value = resp.data.crew.crewName
        areaNoFirst.value = resp.data.crew.areaNoFirst
        areaNoSecond.value = resp.data.crew.areaNoSecond
        areaNoThird.value = resp.data.crew.areaNoThird
        intro.value = resp.data.crew.intro
        introDetail.value = resp.data.crew.introDetail
        recruit.value = resp.data.crew.recruit
        questionFirst.value = resp.data.crew.questionFirst
        questionSecond.value = resp.data.crew.questionSecond
        questionThird.value = resp.data.crew.questionThird
        crewImage.value = resp.data.crew.crewImage
        crewPoint.value = resp.data.crew.crewPoint
        cDate.value = resp.data.crew.cdate
        crewLeader.value = resp.data.crew.crewLeader
        members_joined.value = resp.data.crewMember
        members_wating.value = resp.data.crewWatingMember
        isLoading.value = false
      }).catch((err) => {
        console.log(URL_CREW_MANAGE + " 요청 실패")
        onError.httpErrorException(err)
        isLoading.value = false
      })
    }

    provide('getCrewData', getCrewData)

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

    const updateCrewData = () => {
      isLoading.value = true
      axios({
        method: 'put',
        url: URL_CREW + '/' + crewNo.value,
        headers: {
          Authorization: 'Bearer ' + cookies.get('token')
        },
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
        isLoading.value = false
      }).catch((err) => {
        console.log(URL_CREW + '/' + crewNo.value, +" 크루 수정 실패")
        onError.httpErrorException(err)
        isLoading.value = false
      })
    }

    const updateCrewImage = (e) => {
      const formData = new FormData()
      formData.append('imageFile', e.target.files[0])

      isLoading.value = true
      axios.put(URL_CREW + '/' + crewNo.value + '/images', formData, {
        headers: {
          Authorization: 'Bearer ' + cookies.get('token'),
          'Content-Type': 'multipart/form-data'
        }
      }).then((resp) => {
        console.log(URL_CREW + '/' + crewNo.value + '/images' + " 요청 성공 status : " + resp.status)
        crewImage.value = resp.data
        alert('수정이 완료 되었습니다.')

        isLoading.value = false
      }).catch((err) => {
        console.log(URL_CREW + '/' + crewNo.value + '/images' + " 요청 실패")
        onError.httpErrorException(err)

        isLoading.value = false
      })
    }

    const popupVal_JoinEdit = ref(false)
    const popupVal_JoinInfo = ref(false)
    const selectIdx = ref(0)

    const togglePopup_JoinEdit = () => {
      popupVal_JoinEdit.value = !popupVal_JoinEdit.value
    }

    const togglePopup_JoinInfo = () => {
      popupVal_JoinInfo.value = !popupVal_JoinInfo.value
    }

    const kickMember = (memberId) => {
      if (!confirm("해당 크루원을 정말로 강퇴 하시겠습니까?")) return

      isLoading.value = true
      axios({
        method: 'delete',
        url: URL_CREW + '/' + crewNo.value + '/member',
        headers: {
          Authorization: 'Bearer ' + cookies.get('token')
        },
        params: {
          memberId: memberId,
        }
      }).then((resp) => {
        console.log(URL_CREW + '/' + crewNo.value + '/member' + " 요청 성공" + resp.status)
        alert('해당 크루원을 강퇴 하였습니다.')
        getCrewData()
        isLoading.value = false
      }).catch((err) => {
        console.log(URL_CREW + '/' + crewNo.value + '/member' + " 요청 실패")
        onError.httpErrorException(err)
        isLoading.value = false
      })
    }

    const agreeJoin = (memberId) => {
      if (!confirm("가입 신청을 승인하시겠습니까?")) return

      isLoading.value = true
      axios({
        method: 'post',
        url: URL_CREW + '/' + crewNo.value + '/member/' + memberId,
        headers: {
          Authorization: 'Bearer ' + cookies.get('token')
        },
      }).then((resp) => {
        console.log(URL_CREW + '/' + crewNo.value + '/member/' + memberId + " 크루원 승인" + resp.status)
        alert('승인 되었습니다.')
        getCrewData()

        isLoading.value = false
      }).catch((err) => {
        console.log(URL_CREW + '/' + crewNo.value + '/member/' + memberId + " 크루원 승인 실패")
        onError.httpErrorException(err)
        isLoading.value = false
      })
    }

    const denyJoin = (memberId) => {
      if (!confirm("가입 신청을 거절하시겠습니까?")) return

      isLoading.value = true
      axios({
        method: 'delete',
        url: URL_CREW + '/' + crewNo.value + '/member/wating',
        headers: {
          Authorization: 'Bearer ' + cookies.get('token')
        },
        params: {
          memberId: memberId
        }
      }).then((resp) => {
        console.log(URL_CREW + '/' + crewNo.value + '/member' + " 크루원 가입신청 거절" + resp.status)
        alert('가입신청을 거절 하였습니다.')
        getCrewData()

        isLoading.value = false
      }).catch((err) => {
        console.log(URL_CREW + '/' + crewNo.value + '/member' + "크루원 가입신청 거절 실패")
        onError.httpErrorException(err)
        isLoading.value = false
      })
    }

    const delegateLeader = async (memberId) => {
      if (!confirm("권한을 위임하면 해당 크루에 대한 관리자 권한이 사라지며, 해당 크루에서 자동으로 탈퇴됩니다. 위임 하시겠습니까?")) return

      try {
        isLoading.value = true
        const checkAlreadyLeader = await axios({
          url: URL_CREW + '/leader/' + memberId,
          method: 'post',
          headers: {
            Authorization: 'Bearer ' + cookies.get('token'),
          },
        })

        if (checkAlreadyLeader.data) {
          alert("해당 멤버는 이미 크루장 입니다.")
          isLoading.value = false
          return
        }

        const responseCrew = await axios({
          url: URL_CREW + '/' + crewNo.value + '/leader',
          method: 'put',
          headers: {
            Authorization: 'Bearer ' + cookies.get('token'),
          },
          params: {
            memberId: memberId,
          }
        })

        console.log(URL_CREW + '/' + crewNo.value + '/leader' + responseCrew.status)
        alert('위임 되었습니다.')

        const responseMember = await axios({
          method: 'post',
          url: URL_MEMBER_REFRESH,
          headers: {
            Authorization: 'Bearer ' + cookies.get('token')
          }
        })

        console.log(URL_MEMBER_REFRESH + " 요청 성공 status : " + responseMember.status)
        localStorage.setItem('memberRole', responseMember.data) //Refesh role

        isLoading.value = false
        router.push('/crew').then(() => {
        })

      } catch (err) {
        console.log(URL_CREW + " 요청 실패")
        onError.httpErrorException(err)
        isLoading.value = false
      }
    }

    const closeCrew = async () => {
      if (!confirm("크루가 폐쇄되면 크루원들과 크루활동게시글 정보가 자동으로 삭제됩니다.정말로 크루를 폐쇄 하시겠습니까?"))
        return

      try {
        isLoading.value = true

        const responseCrew = await axios({
          url: URL_CREW + '/' + crewNo.value,
          method: 'delete',
          headers: {
            Authorization: 'Bearer ' + cookies.get('token'),
          },
        })

        console.log(URL_CREW + " : " + responseCrew.data)

        const responseMember = await axios({
          method: 'post',
          url: URL_MEMBER_REFRESH,
          headers: {
            Authorization: 'Bearer ' + cookies.get('token')
          }
        })
        await console.log(URL_MEMBER_REFRESH + " 요청 성공 status : " + responseMember.status)
        await localStorage.setItem('memberRole', responseMember.data) //Refesh role

        alert("크루가 폐쇄 되었습니다.")
        isLoading.value = false
        router.replace('/crew').then(() => {
        })
      } catch (err) {
        console.log(URL_CREW + " 요청 실패")
        onError.httpErrorException(err)

        isLoading.value = false
      }
    }

    return {
      isLoading,

      URL_CREW_IMAGE,
      URL_MEMBER_IMAGES,
      areaMenu,

      crewNo,
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
      isClickedUpdateRecruit,

      setBoderIfEdit,
      setFocus,
      updateCrewData,
      updateCrewImage,

      areaNoToString,
      getCrewGrade,

      popupVal_JoinEdit,
      popupVal_JoinInfo,
      togglePopup_JoinEdit,
      togglePopup_JoinInfo,
      selectIdx,

      agreeJoin,
      denyJoin,
      kickMember,
      delegateLeader,
      closeCrew,
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

.crew-button--close {
  font-family: 'Jua', sans-serif;
  font-size: 1.2rem;
  line-height: 30px;
  border-radius: 6px;
  border: none;
  height: 28px;
  width: 90px;
  cursor: pointer;
  background-color: #6E6E6E;
  color: white;
  position: absolute;
  right: 2px;
  bottom: 2px;
}

.crew-member--buttonbox {
  display: inline-block;
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

.crewM-btn--modifyInfo {
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
  position: relative;
  left: 462px;
  top: 5px;
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
  width: 230px;
  display: inline-block;
  padding-left: 30px;
  /*border: 1px solid;*/
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
  position: relative;
  left: 15px;
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
  left: 15px;
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

.crewM-textArea--recruit {
  outline: none;
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
  resize: none;
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

.crew-label--upload {
  background-color: #FF8000;
  cursor: pointer;
  border-radius: 6px;
  border: none;
  color: #F8ECE0;
  width: 35px;
  height: 20px;
  font-family: 'Jua', sans-serif;
  font-size: 15px;
  padding: 1px;
  position: absolute;
  right: 0;
  bottom: 0;
  text-align: center;
  line-height: 20px;
  display: inline-block;
}

</style>