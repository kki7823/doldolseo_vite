<template>
  <section class="crew-mainContainer">
    <div class="crew-topContainer">
      <!-- 제목 -->
      <div class="common-top__title">
        크루 생성
      </div>
    </div>

    <!-- 크루 정보 입력 폼 : 로고, 크루명, 관심지역, 크루 소개(간략, 상세) -->
    <div class="common-miniTitle">
      크루 정보 입력
    </div>
    <table class="crewI-insertTbl">
      <tr class="common-tbl__item">
        <td rowspan="2">
          로고
        </td>
        <td rowspan="2"
            class="common-td__border">
          <div class="crew-logobox">
            <img v-if="crewImgUrl == null"
                 :src="IMAGEPATH_CREW_LOGO_DEFAULT"
                 alt="crew-logo"
            />
            <img v-else
                 id="crewI_img"
                 :src="crewImgUrl"
                 alt="crew-logo"
            />
            <label id="crewI-label--img"
                   class="crew-label--upload"
                   for="crewI_input--image">
              변경
            </label>
            <input type="file"
                   id="crewI_input--image"
                   name="crewImageFile"
                   @change="setCrewImg"
            />
          </div>
        </td>
        <td>
          크루명
        </td>
        <td class="crewI-namebox">
          <input name="crewName"
                 type="text"
                 class="crewI-name"
                 v-model="crewName"
                 ref="focusCrewName"
                 @keyup="validateCrewName(crewName)"
                 @focusin="validateCrewName(crewName)"
                 @change="isCheckedCrewNameDuplicate=false"
          />
          <button type="button"
                  class="crew-button" @click="checkDuplicateCrewName(crewName)">
            중복 확인
          </button>
          <p class="msg"
             :style="{color: crewNameMsgColor}">
            {{ crewNameMsg }}
          </p>
        </td>
      </tr>
      <tr class="common-tbl__item">
        <td>
          관심지역
        </td>
        <td>
          <span v-for="(item,idx) in areaMenu"
                style="line-height: 26px; font-size: 13px">
          <input
              type="checkbox"
              v-model="checkedArea"
              :value="idx"
              :disabled="checkedArea.length >= 3 && checkedArea.indexOf(idx) === -1"
              ref="focusCheckArea"
          />
            {{ item }}
          </span>
        </td>
      </tr>
      <tr class="common-tbl__item">
        <td colspan="2"
            class="common-td__border">
          크루 소개 (간략)
        </td>
        <td colspan="2">
          <textarea class="crewI-intro"
                    v-model="intro"
                    ref="focusIntro"
          />
        </td>
      </tr>
      <tr class="common-tbl__item">
        <td colspan="2"
            class="common-td__border">
          크루 소개 (상세)
        </td>
        <td colspan="2">
          <textarea class="crewI-introDetail"
                    v-model="introDetail"
                    ref="focusIntroDetail"
          />
        </td>
      </tr>
    </table>

    <!-- 크루 모집 공고 입력 폼 : 모집공고, 가입양식 질문 , 짋문추가 기능 -->
    <div class="common-miniTitle">
      크루 모집 공고 입력
      <button type="button"
              class="crew-button"
              @click="questionCounter++">
        질문 추가
      </button>
      <!-- 클릭시 가입 질문 양식 추가 됨 -->
    </div>
    <table class="crewI-insertTbl">
      <tr class='common-tbl__item'>
        <td style='width: 275px;'
            class="common-td__border">
          모집 공고
        </td>
        <td>
          <textarea class="crewI-recuit"
                    v-model="recruit"
                    ref="focusRecruit">
          </textarea>
        </td>
      </tr>
      <tr class='common-tbl__item'>
        <td class="common-td__border">
          가입 질문 (필수)
        </td>
        <td>
          <input type='text'
                 class="crewI-question"
                 v-model="questionFirst"
                 ref="focusQuestion"
          />
        </td>
      </tr>
      <tr v-if="questionCounter >= 1"
          class='common-tbl__item'>
        <td class="common-td__border">
          가입 질문 (선택)
        </td>
        <td>
          <input type='text'
                 class="crewI-question"
                 v-model="questionSecond"
          />
        </td>
      </tr>
      <tr v-if="questionCounter >= 2"
          class='common-tbl__item'>
        <td class="common-td__border">
          가입 질문 (선택)
        </td>
        <td>
          <input type='text'
                 class="crewI-question"
                 v-model="questionThird"
          />
        </td>
      </tr>
    </table>

    <!-- 저장 버튼 -->
    <div class="crewI-box-savebutton">
      <button type="button"
              class="crew-button"
              @click="sendCrewData(this)">
        저장
      </button>
    </div>
  </section>
</template>

<script>
import {inject, ref} from "vue";
import {axios} from "@bundled-es-modules/axios";
import {useRouter} from "vue-router";
import {useCookies} from "vue3-cookies";
import login from "../../module/login";

export default {
  name: "DoldolseoCrewCreate",
  setup() {
    const URL_CREW = inject('doldolseoCrew')
    const URL_MEMBER = inject('doldolseoMember')
    const URL_MEMBER_REFRESH = URL_MEMBER + '/refresh'
    const IMAGEPATH_CREW_LOGO_DEFAULT = inject('contextPath') + '/_image/crew/logo/default_crew.png'
    const {cookies} = useCookies()
    const router = useRouter()
    const crewName = ref('')
    const checkedArea = ref([])
    const intro = ref('')
    const introDetail = ref('')
    const recruit = ref('')
    const questionFirst = ref('')
    const questionSecond = ref('')
    const questionThird = ref('')

    const crewImgUrl = ref(null)
    let imageFile = null;
    const areaMenu = inject('areaMenu')

    const setCrewImg = (e) => {
      imageFile = e.target.files[0]

      if (!checkExt(imageFile)) return;
      if (!checkFileSize(imageFile)) return

      crewImgUrl.value = URL.createObjectURL(imageFile)
    }

    const checkFileSize = (file) => {
      if (file.size > 500000) {
        alert("이미지 사이즈는 500Kb 이내로 첨부 가능합니다. ")
        return false
      }
      return true
    }

    const checkExt = (file) => {
      const fileName = file.name
      const extList = ['jpg', 'jpeg', 'png', 'gif']
      const extIdx = fileName.lastIndexOf(".")
      const ext = fileName.substring(extIdx + 1, fileName.length).toLowerCase()

      if (extList.indexOf(ext) === -1) {
        alert("이미지 파일만 첨부 가능합니다.")
        return false
      }
      return true
    }

    const questionCounter = ref(0)

    const sendCrewData = async (template) => {
      if (!validParams(template)) return

      const formData = new FormData()
      formData.append('crewName', crewName.value)

      const areaNoArray = ['areaNoFirst', 'areaNoSecond', 'areaNoThird']
      for (let i = 0; i < checkedArea.value.length; i++) {
        formData.append(areaNoArray[i], checkedArea.value[i])
      }
      formData.append('intro', intro.value)
      formData.append('introDetail', introDetail.value)
      formData.append('recruit', recruit.value)
      formData.append('imageFile', imageFile)
      formData.append('questionFirst', questionFirst.value)
      formData.append('questionSecond', questionSecond.value)
      formData.append('questionThird', questionThird.value)

      try {
        const responseCrew = await axios.post(URL_CREW, formData, {
          headers: {
            Authorization: 'Bearer ' + cookies.get('token'),
            'Content-Type': 'multipart/form-data'
          }
        })

        console.log(URL_CREW + " 요청 성공 status : " + responseCrew.status)

        const responseMember = await axios({
          method: 'post',
          url: URL_MEMBER_REFRESH,
          headers: {
            Authorization: 'Bearer ' + cookies.get('token')
          }
        })

        console.log(URL_MEMBER_REFRESH + " 요청 성공 status : " + responseMember.status)
        await localStorage.setItem('memberRole', responseMember.data) //Refesh role

        await router.replace('/crew').then(() => {
        })

      } catch (err) {
        console.log(URL_CREW + " 요청 실패")
        if (err.response.status === 401) {
          alert("로그인이 필요 합니다.")
          router.replace('/member/login').then(() => {
            login.removeUserInfo()
          })
        }
      }
    }

    const crewNameMsg = ref('')
    const crewNameMsgColor = ref('')
    let isCheckedCrewName = false

    const validParams = (template) => {
      if (crewName.value.length === 0 || isCheckedCrewName === false) {
        template.$refs.focusCrewName.focus()
        return false;

      } else if (isCheckedCrewNameDuplicate.value === false) {
        alert('크루명 중복체크는 필수 입니다')
        template.$refs.focusCrewName.focus()
        return false;

      } else if (checkedArea.value.length === 0) {
        alert('관심지역을 1개이상 입력해 주세요')
        template.$refs.focusCheckArea.focus()
        return false;

      } else if (intro.value.length === 0) {
        alert('내용을 입력해 주세요')
        template.$refs.focusIntro.focus()
        return false;

      } else if (introDetail.value.length === 0) {
        alert('내용을 입력해 주세요')
        template.$refs.focusIntroDetail.focus()
        return false;

      } else if (recruit.value.length === 0) {
        alert('내용을 입력해 주세요')
        template.$refs.focusRecruit.focus()
        return false;

      } else if (questionFirst.value.length === 0) {
        alert('내용을 입력해 주세요')
        template.$refs.focusQuestion.focus()
        return false;
      }
      console.log("all parameters are valid")
      return true
    }

    const validateCrewName = (crewName) => {
      crewNameMsgColor.value = 'red'
      const pattern = /^([가-힣A-Za-z0-9]){2,8}$/

      if (crewName.length === 0) {
        crewNameMsg.value = "필수정보 입니다.";
      } else if (pattern.test(crewName) === false) {
        crewNameMsg.value = "2~8자의 한글, 영문, 숫자만 허용 됩니다."
      } else {
        crewNameMsg.value = ''
        isCheckedCrewName = true
      }
    }

    const isCheckedCrewNameDuplicate = ref(false)

    const checkDuplicateCrewName = async (crewName) => {
      const URL_CREW_CHECK_CREWNAME = URL_CREW + '/check/' + crewName

      await axios({
        method: 'get',
        url: URL_CREW_CHECK_CREWNAME,
        headers: {
          Authorization: 'Bearer ' + cookies.get('token')
        },
        params: {
          crewName: crewName,
        }
      }).then((resp) => {
        console.log(URL_CREW_CHECK_CREWNAME + " 요청 성공 status : " + resp.status)
        const result = resp.data.result

        if (result) {
          crewNameMsg.value = "이미 사용중인 크루명 입니다"
          crewNameMsgColor.value = 'red'
        } else {
          crewNameMsg.value = "사용 가능한 크루명 입니다"
          crewNameMsgColor.value = 'green'
          isCheckedCrewNameDuplicate.value = true
        }

        return true
      }).catch((err) => {
        console.log(URL_CREW_CHECK_CREWNAME + " 요청 실패")
        if (err.response.status === 401) {
          alert("잘못된 접근 입니다.")
          router.replace('/member/login').then(() => {
            login.removeUserInfo()
          })
        }
      })
    }

    return {
      IMAGEPATH_CREW_LOGO_DEFAULT,
      crewName,
      checkedArea,
      intro,
      introDetail,
      recruit,
      questionFirst,
      questionSecond,
      questionThird,
      crewImgUrl,
      setCrewImg,
      areaMenu,
      questionCounter,
      crewNameMsg,
      crewNameMsgColor,
      isCheckedCrewNameDuplicate,
      validateCrewName,
      checkDuplicateCrewName,
      sendCrewData,
    }
  }
}
</script>

<style scoped>
.crew-mainContainer {
  width: 100%;
  max-width: 1246px;
  min-height: 800px;
  text-align: center;
  margin: 0 auto 30px;
  font-size: 0;
  /*border: 1pt solid;*/
}

.crew-topContainer {
  width: 100%;
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
  top: 45px;
  width: 100%;
}

.common-miniTitle {
  text-align: left;
  font-family: 'Jua', sans-serif;
  color: #6E6E6E;
  font-size: 25px;
  position: relative;
  width: 100%;
  /*border: 1px solid;*/
  top: 45px;
}

.crewI-insertTbl {
  width: 100%;
  margin-top: 50px;
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

.common-tbl__item select {
  width: 150px;
  border: 1px #CDCECF solid;
  padding: 8px;
}

.common-tbl__item input[type=checkbox] {
  position: relative;
  top: 2px;
}

.common-tbl__item textarea {
  border: 1px #CDCECF solid;
  padding: 8px;
  resize: none;
}

.common-td__border {
  border-right: 1px solid #CDCECF;
}

.crew-logobox {
  display: inline-block;
  width: 90px;
  height: 100px;
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

#crewI_input--image {
  display: none;
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

.crewI-namebox {
  position: relative;
}

.crewI-namebox {
  max-width: 280px;
}

.crewI-namebox > input {
  width: 240px;
}

.crewI-namebox > button {
  position: relative;
  top: 2px;
  left: 10px;
}

.crewI-name {
  width: 98%;
  border: 1px #CDCECF solid;
  padding: 8px;
}

.crew-button {
  font-family: 'Jua', sans-serif;
  font-size: 19px;
  border-radius: 6px;
  border: none;
  /*padding: 6px 8px 4px 8px;*/
  cursor: pointer;
  background-color: #FF8000;
  color: white;
  height: 25px;
  line-height: 27px;
}

.crewI-intro {
  width: 98%;
  height: 50px;
}

.crewI-introDetail {
  width: 98%;
  height: 90px;
}

.crewI-recuit {
  width: 98%;
  height: 90px;
}

.crewI-question {
  width: 99.1%;
  border: 1px #CDCECF solid;
  height: 25px;
}

.crewI-box-savebutton {
  width: 100%;
  margin-top: 30px;
  /*border: 1px solid;*/
  text-align: right;
}

.crewI-box-savebutton button {
  width: 90px;
}

.msg {
  color: red;
  margin-left: 20px;
  font-size: 13px;
  display: inline;
  /*border: 1px solid;*/
}
</style>