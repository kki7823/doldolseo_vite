<template>
  <div class="crew-grade-info--container">
    <h2 class="crew-grade-info--title">
      등급 안내
    </h2>
    <div class="crew-grade-info--row">
      <div class="crew-grade-info--col">
        등급
      </div>
      <div class="crew-grade-info--col">
        포인트
      </div>
    </div>
    <div class="crew-grade-info--row"
         v-for="crewGrade in crewGradeInfoArr">
      <div class="crew-grade-info--col">
        <div class="crew-info__grade">
          <img :src="getImgUrl('crew/grade/'+crewGrade.imgfile)"
               alt="grade"
          />
        </div>
        <span class="crew-grade-info--gradename">
        {{ crewGrade.gradeName }}
        </span>
      </div>
      <div class="crew-grade-info--col">
          <span class="crew-grade-info--point">
                {{ crewGrade.startPoint }}
          </span>
        <span class="crew-grade-info--point">
            ~
          </span>
        <span class="crew-grade-info--point">
                {{ crewGrade.endPoint }}
          </span>
      </div>
    </div>

    <div class="crew-grade-info--buttonBox">
      <button class="crew-button"
              @click="togglePopup()">
        확인
      </button>
    </div>
  </div>
</template>

<script>
import {inject} from "vue";

export default {
  name: "DoldolseoCrewGradeInfo",
  props: {
    togglePopup: {},
  },
  setup(props) {
    const getImgUrl = inject('getImgUrl')

    const crewGradeInfoArr = [
      {
        imgfile: 'crew_grade_1.png',
        gradeName: '돌고래',
        startPoint: 0,
        endPoint: 999,
      },
      {
        imgfile: 'crew_grade_2.png',
        gradeName: '동고래',
        startPoint: 1000,
        endPoint: 9999,
      },
      {
        imgfile: 'crew_grade_3.png',
        gradeName: '은고래',
        startPoint: 10000,
        endPoint: 99999,
      }
      , {
        imgfile: 'crew_grade_4.png',
        gradeName: '금고래',
        startPoint: 100000,
        endPoint: null,
      }
    ]

    return {
      getImgUrl,
      crewGradeInfoArr,
    }
  }
}
</script>

<style scoped>
.crew-grade-info--container {
  width: 460px;
  height: 450px;
  text-align: left;
  margin: 1px auto 0;
  position: fixed;
  background: white;
  box-shadow: 1px 1px 5px lightgrey;
  border-radius: 10px;
  z-index: 99;
  top: 25%;
  left: 47%;
  transform: translate(-50%, 0);
  padding: 30px;
  /*border: 1pt solid;*/
}

.crew-grade-info--title {
  text-align: center;
  font-family: 'Jua', sans-serif;
  color: #FAAC58;
  font-size: 40px;
}

.crew-grade-info--row {
  margin: 0 auto;
  text-align: center;
  width: 400px;
  padding-top: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid #6E6E6E;
}

.crew-grade-info--col {
  display: inline-block;
  width: 49%;
  height: 30px;
  font-size: 25px;
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

.crew-grade-info--gradename{
  font-size: 18px;
}

.crew-grade-info--point {
  display: inline-block;
  font-size: 15px;
  width: 60px;
  /*border: 1px solid;*/
}

.crew-grade-info--buttonBox {
  width: 100%;
  margin: 60px auto 0;
  text-align: center;
  /*border: 1px solid;*/
}

.crew-button {
  width: 130px;
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