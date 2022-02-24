<template>
  <section class="crewJ-popup">
    <div class="crewJ-top__title">
      크루 가입
    </div>
    <table class="crewJ-tbl">
      <tr class="crewJ-tbl__item">
        <td class="crewJ-tbl__label">
          <b>질문1</b>
        </td>
        <td>
          <span class="crewJ-tbl__question">
            {{ questionFirst }}
          </span>
        </td>
      </tr>
      <tr class="crewJ-tbl__item">
        <td class="crewJ-tbl__label">
          답변
        </td>
        <td>
          <input type="text"
                 v-model="answerFirst"
                 ref="focusAnswerFirst"
          />
        </td>
      </tr>
      <tr v-if="questionSecond !== ''"
          class="crewJ-tbl__item">
        <td class="crewJ-tbl__label">
          <b>질문2</b>
        </td>
        <td>
          <span class="crewJ-tbl__question">
            {{ questionSecond }}
          </span>
        </td>
      </tr>
      <tr v-if="questionSecond !== ''"
          class="crewJ-tbl__item">
        <td class="crewJ-tbl__label">
          답변
        </td>
        <td>
          <input
              type="text"
              v-model="answerSecond"
              ref="focusAnswerSecond"
          />
        </td>
      </tr>
      <tr v-if="questionThird !== ''"
          class="crewJ-tbl__item">
        <td class="crewJ-tbl__label">
          <b>질문3</b>
        </td>
        <td>
          <span class="crewJ-tbl__question">
            {{ questionThird }}
          </span>
        </td>
      </tr>
      <tr v-if="questionThird !== ''"
          class="crewJ-tbl__item">
        <td class="crewJ-tbl__label">
          답변
        </td>
        <td>
          <input type="text"
                 v-model="answerThird"
                 ref="focusAnswerThird"
          />
        </td>
      </tr>
      <tr class="crewJ-tbl__item">
        <td colspan="2">
          모집 공고 및 크루 규칙에 동의 하십니까?
          <input type="checkbox"
                 v-model="isAgree"
                 ref="focusIsAgree"
          />
        </td>
      </tr>
    </table>

    <div class="crewJ-container-bottom">
      <button type="button"
              @click="sendCrewJoinData()">
        가입
      </button>
      <button type="button"
              @click="togglePopup()">
        취소
      </button>
    </div>
  </section>
</template>

<script>
import {inject, ref} from "vue";
import {axios} from "@bundled-es-modules/axios";
import {useCookies} from "vue3-cookies";
import login from "../../module/login";
import {useRouter} from "vue-router";

export default {
  name: "DoldolseoCrewJoin",
  props: {
    togglePopup: {},
    crewNo: {
      type: String,
      require: true,
    },
    questionFirst: {
      type: String,
      require: true,
    },
    questionSecond: {
      type: String,
    },
    questionThird: {
      type: String,
    }
  },
  setup(props) {
    const URL_CREW = inject('doldolseoCrew')
    const URL_CREW_MEMBER = URL_CREW + '/' + props.crewNo + '/member'

    const {cookies} = useCookies()
    const router = useRouter()

    const answerFirst = ref('')
    const answerSecond = ref('')
    const answerThird = ref('')
    const isAgree = ref(false)


    const sendCrewJoinData = (template) => {
      if (!validParams(template)) return
      axios({
        method: 'post',
        url: URL_CREW_MEMBER,
        headers: {
          Authorization: 'Bearer ' + cookies.get('token')
        },
        data: {
          crew: {
            crewNo: props.crewNo,
          },
          memberId: localStorage.getItem('id'),
          answerFirst: answerFirst.value,
          answerSecond: answerSecond.value,
          answerThird: answerThird.value,
        },

      }).then((resp) => {
        console.log(URL_CREW_MEMBER + " 테스트 메소드 요청 성공 status : " + resp.status)
        console.log(resp.data)
        alert('가입 요청되었습니다. 크루원 활동은 요청이 승인 된 후부터 가능합니다. 감사합니다')
        props.togglePopup()
      }).catch((err) => {
        console.log(URL_CREW_MEMBER + " 테스트 메소드 요청 실패")
        if (err.response.status === 401) {
          alert("로그인이 필요 합니다.")
          router.replace('/member/login').then(() => {
            login.removeUserInfo()
          })
        }
      })
    }

    const validParams = (template) => {
      if (answerFirst.value.length === 0) {
        alert('질문에 대한 답변은 필수 입니다.')
        template.$refs.focusAnswerFirst.focus()
        return false;

      } else if (props.questionSecond.length !== 0 && answerSecond.value.length === 0) {
        alert('질문에 대한 답변은 필수 입니다.')
        template.$refs.focusAnswerSecond.focus()
        return false;

      } else if (props.questionThird.length !== 0 && answerThird.value.length === 0) {
        alert('질문에 대한 답변은 필수 입니다.')
        template.$refs.focusAnswerThird.focus()
        return false;

      } else if (!isAgree.value) {
        alert('모집 공고 및 크루 규칙에 동의해 주세요')
        template.$refs.focusIsAgree.focus()
        return false;
      }
      console.log("all parameters are valid")
      return true
    }

    return {
      answerFirst,
      answerSecond,
      answerThird,
      isAgree,

      sendCrewJoinData,
    }
  }
}
</script>

<style scoped>
.crewJ-popup {
  width: 1000px;
  height: 660px;
  background: white;
  position: fixed;
  z-index: 99;
  top: 10%;
  left: 50%;
  transform: translate(-50%, 0);
  right: 0;
  border: 0;
  box-shadow: 1px 1px 5px lightgrey;
}

.crewJ-top__title {
  text-align: center;
  font-family: 'Jua', sans-serif;
  color: #FAAC58;
  font-size: 30px;
  margin-top: 40px;
}


.crewJ-tbl {
  width: 800px;
  text-align: right;
  margin: 20px auto 0;
  border: 1px solid;
}

.crewJ-tbl__item {
  font-family: 'Nanum Gothic Coding', monospace;
  font-size: 15px;
  color: black;
  text-align: left;
  border: 1px #CDCECF solid;
}

.crewJ-tbl__label {
  width: 130px;
}

.crewJ-tbl__question {
  color: green;
}

.crewJ-tbl__item > td {
  padding: 10px 20px 10px 20px;
  height: 40px;
}

.crewJ-tbl__item input[type=text] {
  border: 1px #CDCECF solid;
  padding: 8px;
  width: 540px;
}

.crewJ-tbl__item input[type=checkbox] {
  position: relative;
  top: 2px;
}

.crewJ-container-bottom {
  width: 800px;
  text-align: center;
  /*border: 1px solid;*/
  margin: 0 auto;
}

.crewJ-container-bottom button {
  font-family: 'Jua', sans-serif;
  font-size: 19px;
  border-radius: 6px;
  border: none;
  padding: 6px 8px 4px 8px;
  cursor: pointer;
  background-color: #FF8000;
  color: white;
  margin: 60px 10px 0 10px;
  width: 100px;
}

</style>