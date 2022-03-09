<template>
  <div class="crewEJ-popup">
    <div class="crewJ-loading">
      <loading :active="isLoading"
               :is-full-page="false"
               :opacity="0.7">
      </loading>
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
  </div>
</template>

<script>
import {inject, ref} from "vue";
import {axios} from "@bundled-es-modules/axios";
import Loading from 'vue3-loading-overlay';
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css';
import {useCookies} from "vue3-cookies";
import onError from "../../module/onError";

export default {
  name: "DoldolseoCrewJoinEdit",
  components: {Loading},
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
    const isLoading = ref(false)
    const {cookies} = useCookies()
    const URL_CREW = inject('doldolseoCrew')

    const crewNo = ref(props.crewNo)
    const questionFirst = ref(props.questionFirst)
    const questionSecond = ref(props.questionSecond)
    const questionThird = ref(props.questionThird)
    const getCrewData = inject('getCrewData')

    const updateCrewJoinData = () => {
      isLoading.value = true
      axios({
        method: 'put',
        url: URL_CREW + '/' + crewNo.value + '/question',
        headers: {
          Authorization: 'Bearer ' + cookies.get('token'),
        },
        data: {
          questionFirst: questionFirst.value,
          questionSecond: questionSecond.value,
          questionThird: questionThird.value,
        }
      }).then((resp) => {
        console.log(URL_CREW + '/member/' + crewNo.value + " 크루 수정" + resp.status)
        isLoading.value = false
        alert('수정이 완료 되었습니다.')
        getCrewData()
      }).catch((err) => {
        console.log(URL_CREW + '/member/' + crewNo.value + " 크루 수정 실패")
        isLoading.value = false
        onError.httpErrorException(err)
      })
    }

    return {
      isLoading,
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

.crewJ-loading {
  position: relative;
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