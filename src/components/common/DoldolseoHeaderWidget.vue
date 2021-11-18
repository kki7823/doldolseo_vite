<template>
  <div class="container">
    <!--로고-->
    <div class="logoBox">
      <img class="logoBox__img1" :src="img_logo1" alt="logo">
      <img class="logoBox__img2" :src="img_logo2" alt="logo">
    </div>

    <!--검색창-->
    <div class="searchBox">
      <input type="text">
      <button>
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="white" class="bi bi-search"
             viewBox="0 0 15 15">
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"></path>
        </svg>
      </button>
    </div>

    <!--날씨-->
    <div class="weatherBox">
      <div class="weatherBox__area">
        <h4>Seoul,KR</h4>
      </div>
      <div class="weatherBox__icon">
        <img class="weatherImg">
      </div>
      <div class="weatherText" class="weatherBox__text">
        <!--날씨 설명 들어가는 란-->
      </div>
      <div class="weatherTmp" class="weatherBox__tmp">
        <i class="wi wi-thermometer"></i>
        <!--기온 들어가는 란-->
      </div>
    </div>
  </div>
</template>

<script>

import {inject} from "vue";

export default {
  name: "DoldolseoHeaderWidget",
  setup() {
    const imgPath = inject('contextPath') + '_image/header/logo/'
    const img_logo1 = imgPath + 'header_widget_logo1.png'
    const img_logo2 = imgPath + 'header_widget_logo2.png'

    return {
      img_logo1,
      img_logo2,
    }
  }
}
</script>

<link href="src/_css/weather-icons-wind.css" type="text/css" rel="stylesheet">
<link href="src/_css/weather-icons-wind.min.css" type="text/css" rel="stylesheet">
<style scoped>

.container {
  font-size: 0;
  width: 100%;
  text-align: center;
  height: 55px;
  background-color: #bee2e6;
  position: relative;
  /*border: 1px solid;*/
}

.logoBox {
  width: 150px;
  height: 50px;
  display: inline-block;
  text-align: left;
  position: absolute;
  left: 20px;
  /*border: 1px solid;*/
}
.logoBox__img1{
  width: 50px;
  height: 40px;
  margin: 4px 0 9px 0;
}

.logoBox__img2{
  width: 70px;
  height: 40px;
}

.searchBox {
  display: inline-block;
  vertical-align: top;
  margin-top: 12px;
  /*border: 1px solid;*/
}

.searchBox > input[type=text] {
  width: 300px;
  height: 25px;
  border: 2px solid #1b3067;
}

.searchBox > button {
  width: 34px;
  height: 31px;
  background-color: #1b3067;
  border: 2px solid #1b3067;
  vertical-align: bottom;
}

.weatherBox {
  display: inline-block;
  font-size: 20px;
  width: 350px;
  height: 50px;
  position: absolute;
  right: 20px;
  text-align: right;
  /*border: 1px solid;*/
}

.weatherBox__area {
  display: inline-block;
  vertical-align: top;
  height: 50px;
  font-family: 'Jua', sans-serif;
  line-height: 0;
  padding-top: 1px;
  /*border: 1px solid;*/
}

.weatherBox__icon {
  display: inline-block;
  vertical-align: top;
  height: 50px;
  width: 80px;
  overflow: hidden;
  padding-top: 4px;
  /*border: 1px solid;*/
}

.weatherBox__icon > img {
  width: inherit;
  height: inherit;
  object-fit: cover;
}


.weatherBox__text {
  height: 30px;
  width: 80px;
  display: inline-block;
  font-family: 'Jua', sans-serif;
  color: #1b3067;
  vertical-align: top;
  padding-top: 16px;
  /*border: 1px solid;*/
}

.weatherBox__tmp {
  height: 30px;
  width: 70px;
  padding-top: 18px;
  display: inline-block;
  vertical-align: top;
  color: #B40404;
  font-size: 18px;
  /*border: 1px solid;*/
}


</style>