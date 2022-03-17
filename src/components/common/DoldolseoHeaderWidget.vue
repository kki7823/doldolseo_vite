<template>
  <div class="widgetContainer">
    <!--로고-->
    <div class="logoBox">
      <img class="logoBox__img1"
           :src="getImgUrl('header/logo/header_widget_logo1.png')"
           alt="logo">
      <img class="logoBox__img2"
           :src="getImgUrl('header/logo/header_widget_logo2.png')"
           alt="logo">
    </div>

    <!--검색창-->
    <div class="searchBox">
      <input type="text">
      <button>
        <svg xmlns="http://www.w3.org/2000/svg"
             viewBox="0 0 15 15">
          <path
              d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z">
          </path>
        </svg>
      </button>
    </div>

    <!--날씨-->
    <div class="weatherBox">
      <div class="weatherBox__area">
        <h4>Seoul,KR</h4>
      </div>
      <div class="weatherBox__icon">
        <img v-if="weatherImgsrc.length === 0"
             :src="getImgUrl('header/logo/default_weather.png')"
             alt="logo">
        <img v-else
             :src="weatherImgsrc"
             alt="logo">
      </div>
      <div class="weatherBox__text">
        <span>
          {{ weatherDesc }}
        </span>
      </div>
      <div id="weatherTmp" class="weatherBox__tmp">
        <i id="wi wi-thermometer"></i>
        {{ weatherTmp }} ℃
      </div>
    </div>
  </div>
</template>

<script>
import {inject, ref} from "vue";
import {axios} from "@bundled-es-modules/axios";
import onError from "../../module/onError";

export default {
  name: "DoldolseoHeaderWidget",
  setup() {
    const getImgUrl = inject('getImgUrl')
    const weatherDesc = ref('')
    const weatherTmp = ref(0)
    const weatherImgsrc = ref('')

    const URL = 'https://api.openweathermap.org/data/2.5/weather?q=Seoul,kr&appid=876eb9965cb5694a2644df701fa197dd'
    axios.get(URL).then((resp) => {
      console.log(URL + "요청 성공 status : " + resp.status)
      weatherDesc.value = resp.data.weather[0].description
      weatherTmp.value = Math.floor(resp.data.main.temp - 273.15);
      weatherImgsrc.value = "http://openweathermap.org/img/wn/" + resp.data.weather[0].icon + "@2x.png";
      console.log("https://openweathermap.org/img/wn/" + resp.data.weather[0].icon + "@2x.png")
    }).catch((err) => {
      console.log(URL + "요청 실패")
      onError.httpErrorException(err)
    })

    return {
      getImgUrl,
      weatherDesc,
      weatherTmp,
      weatherImgsrc,
    }
  }
}
</script>

<link href="src/_css/weather-icons-wind.css" type="text/css" rel="stylesheet">
<link href="src/_css/weather-icons-wind.min.css" type="text/css" rel="stylesheet">
<style scoped>
.widgetContainer {
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

.logoBox__img1 {
  width: 50px;
  height: 40px;
  margin: 4px 0 9px 0;
}

.logoBox__img2 {
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

.searchBox svg {
  width: 18px;
  height: 18px;
  fill: white;
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
  height: 40px;
  width: 70px;
  overflow: hidden;
  padding-top: 5px;
  text-align: center;
  /*border: 1px solid;*/
}

.weatherBox__icon > img {
  width: inherit;
  height: inherit;
  object-fit: cover;
  /*border: 1px solid;*/
}


.weatherBox__text {
  height: 53px;
  width: 80px;
  display: inline-block;
  font-family: 'Jua', sans-serif;
  color: #1b3067;
  position: relative;
  text-align: center;
  /*border: 1px solid;*/
}

.weatherBox__text span {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /*border: 1px solid;*/
}

.weatherBox__tmp {
  height: 30px;
  width: 70px;
  padding-top: 17px;
  font-family: 'Jua', sans-serif;
  display: inline-block;
  color: #B40404;
  font-size: 18px;
  text-align: center;
  vertical-align: top;
  line-height: 20px;
  /*border: 1px solid;*/
}

</style>