<template>
  <div class="crewEJ-popup">
    <div class="crew-topContainer">
      <div class="common-top__title">
        가입 양식 수정
      </div>
    </div>
    <div class="crew_popupContainer">
      <span>가입질문1 :</span>
      <span>
        <input class="crewEJ-input--modify"
               type="text"
               v-model="questionFirst"
               placeholder="-"
        />
      </span>
    </div>
    <div class="crew_popupContainer">
      <span>가입질문2 :</span>
      <span>
      <input class="crewEJ-input--modify"
             type="text"
             v-model="questionSecond"
             placeholder="-"
      />
    </span>
    </div>
    <div class="crew_popupContainer">
      <span>가입질문3 :</span>
      <span>
      <input class="crewEJ-input--modify"
             type="text"
             v-model="questionThird"
             placeholder="-"
      />
    </span>
    </div>
    <div class="crewEJ-buttonBox">
      <button class="crew-button"
              type="button"
              @click="updateCrewJoinData()"
              style="position: relative; right: 20px">
        수정
      </button>
      <button class="crew-button"
              type="button"
              @click="togglePopup()"
              style="position: relative; right: 10px">
        취소
      </button>
    </div>
  </div>
</template>

<script>
import {inject, ref} from "vue";
import {axios} from "@bundled-es-modules/axios";

export default {
  name: "DoldolseoCrewJoinEdit",
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
    },
  },
  setup(props) {
    const URL_CREW = inject('doldolseoCrew')

    const crewNo = ref(props.crewNo)
    const questionFirst = ref(props.questionFirst)
    const questionSecond = ref(props.questionSecond)
    const questionThird = ref(props.questionThird)

    const updateCrewJoinData = () => {
      axios({
        method: 'put',
        url: URL_CREW + '/member/' + crewNo.value,
        data: {
          questionFirst: questionFirst.value,
          questionSecond: questionSecond.value,
          questionThird: questionThird.value,
        }
      }).then((resp) => {
        console.log(URL_CREW + '/member/' + crewNo.value + " 크루 수정" + resp.status)
        alert('수정이 완료 되었습니다.')
      }).catch(() => {
        console.log(URL_CREW + '/member/' + crewNo.value + " 크루 수정 실패")
      })
    }

    return {
      questionFirst,
      questionSecond,
      questionThird,

      updateCrewJoinData,
    }
  }
}
</script>

<style scoped>
.crewEJ-popup {
  width: 1000px;
  max-height: 470px;
  background: #EAEAEA;
  right: 0;
  border: 0;
  box-shadow: 1px 1px 5px lightgrey;
  padding-bottom: 10px;
  position: fixed;
  z-index: 99;
  top: 40%;
  left: 50%;
  transform: translate(-50%, 0);
}

.crew-topContainer {
  width: 800px;
  height: 70px;
  margin: 30px auto;
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

.crew_popupContainer {
  width: 800px;
  margin: 10px auto 0;
  /*border: 1px #CDCECF solid;*/
}

.crew_popupContainer > span {
  display: inline-block;
  text-align: left;
  line-height: 48px;
  font-family: "Nanum Gothic Coding", sans-serif;
  font-size: 20px;
  height: 50px;
  padding: 5px;
}

.crewEJ-input--modify {
  border: 1px #CDCECF solid;
  padding: 8px;
  width: 630px;
}

.crewEJ-buttonBox {
  width: 765px;
  height: 50px;
  margin: 0 auto;
  text-align: right;
  /*border: 1px solid;*/
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
</style>