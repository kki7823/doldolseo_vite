<template>
  <doldolseo-header-widget/>
  <div class="container">
    <div class="imgbox_logo1">
      <img :src="img_logo1" alt="logo">
    </div>

    <div class="imgbox_logo2">
      <a href="${pageContext.request.contextPath}/main">
        <img :src="img_logo2" alt="logo">
      </a>
    </div>

    <div class="navbar">
      <ul>
        <li @mouseover="isMouseover = true">
          <a href="#">
            <span @mouseover="textColorArea = '#E0EEFF'"
                  @mouseleave="textColorArea = 'white'"
                  :style="{color: textColorArea}">
              AREA
            </span>
          </a>
        </li>
        <li>
          <a href="${pageContext.request.contextPath}/review">
            <span @mouseover="textColorReview = '#F4B7B4'"
                  @mouseleave="textColorReview = 'white'"
                  :style="{color: textColorReview}">
              REVIEW
            </span>
          </a>
        </li>
        <li>
          <a href="${pageContext.request.contextPath}/crewL">
            <span @mouseover="textColorCrew = '#FF8000'"
                  @mouseleave="textColorCrew = 'white'"
                  :style="{color: textColorCrew}">
              CREW
            </span>
          </a>
        </li>
      </ul>
    </div>

    <!--미니프로필 -->
    <doldolseo-header-profile />

    <div class='navbar__area'
         v-show="isMouseover"
         @mouseleave="isMouseover = false">
      <ul>
        <li><a href="${pageContext.request.contextPath}/areaL?sigungu=1">강남</a></li>
        <li><a href="${pageContext.request.contextPath}/areaL?sigungu=2">강북</a></li>
        <li><a href="${pageContext.request.contextPath}/areaL?sigungu=3">광화문</a></li>
        <li><a href="${pageContext.request.contextPath}/areaL?sigungu=4">명동</a></li>
        <li><a href="${pageContext.request.contextPath}/areaL?sigungu=5">여의도</a></li>
        <li><a href="${pageContext.request.contextPath}/areaL?sigungu=6">잠실</a></li>
        <li><a href="${pageContext.request.contextPath}/areaL?sigungu=7">홍대</a></li>
        <li><a href="${pageContext.request.contextPath}/areaL?sigungu=0">etc</a></li>
      </ul>
    </div>
  </div>
</template>

<script>
import {inject, ref} from "vue";
import DoldolseoHeaderProfile from "./DoldolseoHeaderProfile.vue";
import DoldolseoHeaderWidget from "./DoldolseoHeaderWidget.vue";

export default {
  name: "DoldolseoHeader",
  components: {DoldolseoHeaderWidget,DoldolseoHeaderProfile},

  setup() {
    const imgPath = inject('contextPath') + '_image/header/logo/'
    const img_logo1 = imgPath + 'header_logo1.png'
    const img_logo2 = imgPath + 'header_logo2.png'

    const textColorArea = ref('white')
    const textColorReview = ref('white')
    const textColorCrew = ref('white')
    const isMouseover = ref(false)

    return {
      img_logo1,
      img_logo2,
      textColorArea,
      textColorReview,
      textColorCrew,
      isMouseover,
    }
  }
}
</script>

<style scoped>

.container {
  width: 100%;
  height: 145px;
  background-color: #5882FA;
  font-size: 15px;
  position: relative;
  text-align: center;
}

.imgbox_logo1 {
  display: inline-block;
  position: absolute;
  left: 0;
  /*border: 1px solid;*/
}

.imgbox_logo1 img {
  width: 145px;
  height: 130px;
}

.imgbox_logo2 {
  display: inline-block;
  position: absolute;
  left: 145px;
  top: 35px;
  /*border: 1px solid;*/
}

.imgbox_logo2 img {
  width: 160px;
  height: 85px;
}

.navbar {
  display: block;
  width: 540px;
  height: 60px;
  font-family: "jua", sans-serif;
  font-size: 35px;
  margin: 0 auto;
  padding-top: 17px;
  border: 1px solid #5882FA;
  /*border: 1px solid black;*/
}

.navbar ul li {
  list-style-type: none;
  float: left;
  margin-left: 40px;
  /*border: 1px solid;*/
}

.navbar a {
  text-decoration: none;
  color: white;
}

.navbar__area {
  display: block;
  width: 800px;
  margin: 0 auto;
  font-family: "Nanum Gothic Coding", sans-serif;
  font-size: 19px;
  /*border: 1px solid;*/
}

.navbar__area > ul {
  height: 25px;
  /*border: 1px solid;*/
}

.navbar__area li {
  list-style-type: none;
  float: left;
  margin-left: 41px;
}

.navbar__area a {
  text-decoration: none;
  color: #E6E6E6;
}

.navbar__area a:hover {
  color: #37FFEB
}

</style>