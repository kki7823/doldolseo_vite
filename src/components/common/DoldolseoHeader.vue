<template>
  <doldolseo-header-widget/>
  <div class="container">
    <div class="imgbox_logo1">
      <img :src="getImgUrl('/header/logo/header_logo1.png')" alt="logo">
    </div>

    <div class="imgbox_logo2">
      <router-link to="/">
        <img :src="getImgUrl('/header/logo/header_logo2.png')" alt="logo">
      </router-link>
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
          <router-link :to="{name: 'reviewList', params:{areaNo: ''}}">
            <span @mouseover="textColorReview = '#F4B7B4'"
                  @mouseleave="textColorReview = 'white'"
                  :style="{color: textColorReview}">
              REVIEW
            </span>
          </router-link>
        </li>
        <li>
          <router-link :to="{name: 'crewList'}">
            <span @mouseover="textColorCrew = '#FF8000'"
                  @mouseleave="textColorCrew = 'white'"
                  :style="{color: textColorCrew}">
              CREW
            </span>
          </router-link>
        </li>
      </ul>
    </div>

    <!--미니프로필 -->
    <doldolseo-header-profile :key="profileRefreshKey"/>

    <div class='navbar__area'
         v-show="isMouseover"
         @mouseleave="isMouseover = false">
      <ul>
        <li v-for="(areaName, sigungu) in areaMenu">
          <router-link :to="{name: 'areaList', query:{sigungu: sigungu}}">
            {{ areaName }}
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {inject, ref} from "vue";
import DoldolseoHeaderProfile from "./DoldolseoHeaderProfile.vue";
import DoldolseoHeaderWidget from "./DoldolseoHeaderWidget.vue";
import login from "../../module/login";

export default {
  name: "DoldolseoHeader",
  components: {DoldolseoHeaderWidget, DoldolseoHeaderProfile},

  setup() {
    const getImgUrl = inject('getImgUrl')
    const areaMenu = inject('areaMenu')

    const textColorArea = ref('white')
    const textColorReview = ref('white')
    const textColorCrew = ref('white')
    const isMouseover = ref(false)

    const profileRefreshKey = login.refreshKey

    return {
      getImgUrl,
      areaMenu,
      textColorArea,
      textColorReview,
      textColorCrew,
      isMouseover,
      profileRefreshKey,
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