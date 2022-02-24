<template>
  <div class="crewJ-container">
    <div class="crew-topContainer">
      <div class="common-top__title">
        크루 가입서
      </div>
    </div>
    <table class="crewJ-tbl">
      <tr class="common-tbl__item">
        <td style="width: 170px; height: 30px">
          <b>아이디</b>
        </td>
        <td>
          <span style="color: green">
            {{ memberId }}
          </span>
        </td>
      </tr>
      <tr class="common-tbl__item">
        <td style="width: 170px; height: 30px">
          <b>질문1</b>
        </td>
        <td>
          <span style="color: green">
            {{ questionFirst }}
          </span>
        </td>
      </tr>
      <tr class="common-tbl__item">
        <td>
          답변
        </td>
        <td>
          <span>
            {{ answerFirst }}
          </span>
        </td>
      </tr>
      <tr v-if="questionSecond.length !== 0"
          class="common-tbl__item">
        <td style="width: 170px; height: 30px">
          <b>질문2</b>
        </td>
        <td height="30px">
          <span style="color: green;">
            {{ questionSecond }}
          </span>
        </td>
      </tr>
      <tr v-if="questionSecond.length !== 0"
          class="common-tbl__item">
        <td>
          답변
        </td>
        <td>
          <span>
            {{ answerSecond }}
          </span>
        </td>
      </tr>
      <tr v-if="questionThird.length !== 0"
          class="common-tbl__item">
        <td style="width: 170px; height: 30px">
          <b>질문3</b>
        </td>
        <td>
          <span style="color: green">{{ questionThird }}</span>
        </td>
      </tr>
      <tr v-if="questionThird.length !== 0"
          class="common-tbl__item">
        <td>
          답변
        </td>
        <td>
          <span>
            {{ answerThird }}
          </span>
        </td>
      </tr>
    </table>
    <div class="crewJI-buttonBox">
      <button class="crew-button"
              @click="togglePopup()">
        확인
      </button>
    </div>
  </div>

</template>

<script>
import {inject, onMounted, ref} from "vue";
import {axios} from "@bundled-es-modules/axios";
import {useCookies} from "vue3-cookies";

export default {
  name: "DoldolseoCrewJoinInfo",
  props: {
    togglePopup: {},
    crewNo: {
      type: String,
      require: true,
    },
    memberId: {
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
    },
  },
  setup(props) {
    const URL_CREW = inject('doldolseoCrew')
    const URL_GET_CREW_MEMBER = URL_CREW + '/member/'
    const {cookies} =useCookies()

    const memberId = ref('')
    const answerFirst = ref('')
    const answerSecond = ref('')
    const answerThird = ref('')

    onMounted(() => {
      axios({
        method: 'get',
        url: URL_GET_CREW_MEMBER,
        headers: {
          Authorization: 'Bearer ' + cookies.get('token'),
        },
        params: {
          crewNo: props.crewNo,
          memberId: props.memberId,
        }
      }).then((resp) => {
        console.log(URL_GET_CREW_MEMBER + " 요청 성공")
        memberId.value = resp.data.memberId
        answerFirst.value = resp.data.answerFirst
        answerSecond.value = resp.data.answerSecond
        answerThird.value = resp.data.answerThird
      }).catch(() => {
        console.log(URL_GET_CREW_MEMBER + " 요청 실패")
      })
    })

    return {
      memberId,
      answerFirst,
      answerSecond,
      answerThird,
    }
  }
}
</script>

<style scoped>
.crewJ-container {
  width: 600px;
  margin: 1px auto 0;
  position: fixed;
  background: #FAFAFA;
  box-shadow: 1px 1px 3px lightgrey;
  border-radius: 10px;
  z-index: 99;
  top: 40%;
  left: 60%;
  transform: translate(-50%, 0);
  /*border: 1pt solid;*/
}

.crew-topContainer {
  width: 600px;
  height: 70px;
  margin: 10px auto 0;
  position: relative;
  border-bottom: 1px #CDCECF solid;
}

.common-top__title {
  font-family: 'Jua', sans-serif;
  color: #FAAC58;
  font-size: 40px;
  position: relative;
  text-align: center;
}

.crewJ-tbl {
  width: 600px;
  text-align: right;
  margin: 20px auto 0;
}

.common-tbl__item {
  font-family: 'Nanum Gothic Coding', monospace;
  font-size: 15px;
  color: black;
  text-align: left;
  /*border: 1px #CDCECF solid;*/
}

.common-tbl__item > td {
  padding: 10px 20px 10px 20px;
}

.crewJI-buttonBox {
  margin: 10px 20px 15px auto;
  text-align: right;
  /*border: 1px solid;*/
}

.crew-button {
  width: 80px;
  font-family: 'Jua', sans-serif;
  font-size: 19px;
  border-radius: 6px;
  border: none;
  padding: 6px 8px 4px 8px;
  cursor: pointer;
  background-color: #FF8000;
  color: white;
}
</style>