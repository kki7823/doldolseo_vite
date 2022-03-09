<template>
  <div class="main_container">
    <!--배경사진-->
    <div class="main_img--seoul">
      <img :src="getImgUrl('main/seoul/seoul2.png') " alt="seoul">
    </div>
    <hr/>

    <!--추천코스-->
    <div class="main_bestcourse">
      <p>BEST COURSE</p>
      <svg @click="counter--" xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="#495c75"
           style="vertical-align: top; padding-top: 80px" class="bi bi-caret-left" viewBox="0 0 16 16">
        <path
            d="M10 12.796V3.204L4.519 8 10 12.796zm-.659.753-5.48-4.796a1 1 0 0 1 0-1.506l5.48-4.796A1 1 0 0 1 11 3.204v9.592a1 1 0 0 1-1.659.753z">
        </path>
      </svg>
      <img :src="getImgUrl('main/testCourse/'+imgSelector[Math.abs(counter) % 3])" alt="img1"/>
      <img :src="getImgUrl('main/testCourse/'+imgSelector[(Math.abs(counter)+1) % 3])" alt="img2"/>
      <img :src="getImgUrl('main/testCourse/'+imgSelector[(Math.abs(counter)+2) % 3])" alt="img3"/>
      <svg @click="counter++" xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="#495c75"
           style="vertical-align: top; padding-top: 80px" class="bi bi-caret-right" viewBox="0 0 16 16">
        <path
            d="M6 12.796V3.204L11.481 8 6 12.796zm.659.753 5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753z">
        </path>
      </svg>
    </div>
    <hr/>

    <!--지도-->
    <div class="main_map--text">
      <p>SEOUL AREA</p>
    </div>
    <div class="main_map">
      <img class="map" :src="getImgUrl('main/seoul/map-fi-c-1.png')" usemap="#image-map" alt="map"/>
      <map name="image-map">
        <area target="" alt="광화문" title="광화문" href="${pageContext.request.contextPath}/areaL?sigungu=3"
              coords="337,150,58" shape="circle"/>
        <area target="" alt="홍대" title="홍대" href="${pageContext.request.contextPath}/areaL?sigungu=7"
              coords="350,260,52" shape="circle">
        <area target="" alt="강남" title="강남" href="${pageContext.request.contextPath}/areaL?sigungu=1"
              coords="510,400,51" shape="circle">
        <area target="" alt="여의도" title="여의도" href="${pageContext.request.contextPath}/areaL?sigungu=5"
              coords="225,300,62" shape="circle">
        <area target="" alt="잠실" title="잠실" href="${pageContext.request.contextPath}/areaL?sigungu=6"
              coords="615,350,52" shape="circle">
        <area target="" alt="명동" title="명동" href="${pageContext.request.contextPath}/areaL?sigungu=4"
              coords="460,156,420,300" shape="rect"/>
        <area target="" alt="강북" title="강북" href="${pageContext.request.contextPath}/areaL?sigungu=2" coords="480,77,54"
              shape="circle">
      </map>
    </div>
    <hr/>

    <!--인기 크루-->
    <div class="main_crew">
      <div>
        <div class="main_crew--text">
          <div class="main_crew--text1">
            <p style="border: 1px solid; background-color: #5882FA; color: white; padding: 10px;">BEST
              CREW</p>
          </div>
          <div class="main_crew--text2">
            <p style="border: 1px solid; background-color: #5882FA; color: white; padding: 10px;">BEST CREW
              POST</p>
          </div>
        </div>
      </div>

      <div class="main_crew--container">
        <div class="main_crew--bc">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg"
                 viewBox="0 0 16 16"
                 @click="crewCounter--">
              <path
                  d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z">
              </path>
            </svg>

            <div class="main_crew--bc--photo">
              <img :src="getImgUrl('main/bestCrew/'+Object.keys(imgCrew)[Math.abs(crewCounter) % 5])"
                   alt="crew_logo">
            </div>

            <svg xmlns="http://www.w3.org/2000/svg"
                 viewBox="0 0 16 16"
                 @click="crewCounter++">
              <path
                  d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"></path>
            </svg>
          </div>
          <p style="font-family: nanumB; font-size: 1.1em; color: #647C97">
            <B>{{ Object.values(imgCrew)[Math.abs(crewCounter) % 5] }}</B></p>
        </div>

        <div class="main_crew--bcp">
          <div class="main_crew--bcp--table">
            <table style="width: 800px; height: 250px; border-collapse: collapse">
              <thead>
              <tr style="height:35px; line-height: 40px; text-align:center; color: white; font-size: 18px; background-color: #1b3067;">
                <th>CREW</th>
                <th>CATEGORY</th>
                <th>TITLE</th>
                <th>WRITER</th>
              </tr>
              </thead>
              <tbody style="text-align: center; font-family: nanumB; font-size: 16px;">
              <tr>
                <td>돌고래와춤을</td>
                <td>맛집</td>
                <td><a href="#"><b>애완 돌고래 동반 가능한 맛집 리스트</b></a></td>
                <td>young2</td>
              </tr>
              <tr>
                <td>청사모</td>
                <td>쇼핑</td>
                <td><a href="#"><b>청바지도 감성이 있다구요</b></a></td>
                <td>kki0829</td>
              </tr>
              <tr>
                <td>인생한방</td>
                <td>자유</td>
                <td><a href="#"><b>찐 명당 알려준다 드루와</b></a></td>
                <td>gogojy</td>
              </tr>
              <tr>
                <td>멍멍멍</td>
                <td>자유</td>
                <td><a href="#"><b>강아지 팔자가 좋다는건 옛말</b></a></td>
                <td>bboong</td>
              </tr>
              <tr>
                <td>freeflux</td>
                <td>자유</td>
                <td><a href="#"><b>이모티콘 모음입니다..m^_^m</b></a></td>
                <td>kkh123</td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {inject, ref} from "vue";

export default {
  name: "DoldolseoMain",
  setup() {
    const imgPath = inject('contextPath') + '/_image/main'
    const counter = ref(0)
    const imgSelector = ['course1.png', 'course2.png', 'course3.png']
    const crewCounter = ref(0)
    const imgCrew = {
      '1.png': '돌고래와 춤을1',
      '2.png': '돌고래와 춤을2',
      '3.png': '돌고래와 춤을3',
      '4.png': '돌고래와 춤을4',
      '5.png': '돌고래와 춤을5',
    }

    const getImgUrl = inject('getImgUrl')
    return {
      imgPath,
      counter,
      imgSelector,
      crewCounter,
      imgCrew,
      getImgUrl,
    }
  }
}
</script>


<style scoped>
hr {
  width: 100%;
  color: #bac8d9;
  margin-top: 40px;
}

.main_container {
  width: 100%;
  background-color: white;
  margin: 0 auto 40px;
  /*border: 1px solid;*/
}

.main_img--seoul {
  margin: 40px auto 0;
  text-align: center;
  /*border: 1px solid;*/
}

.main_img--seoul img {
  width: 1300px;
  height: 440px;
}

.main_bestcourse {
  text-align: center;
  color: white;
  margin-top: 50px;
  margin-bottom: 40px;
}

.main_bestcourse img {
  width: 300px;
  height: 250px;
  border-radius: 10px;
  border: 4px solid #495c75;
  margin: 0 3px 0 3px;
}

.main_bestcourse > p {
  background-color: #5882FA;
  font-family: "jua", sans-serif;
  color: white;
  width: 100%;
  font-size: 33px;
  padding: 5px 1px 5px 1px;
}

.main_map--text {
  margin-top: 50px;
  color: #495c75;
  text-align: center;
  font-family: "jua", sans-serif;
  font-size: 1.7em;
}

.main_map--text > p {
  background-color: #5882FA;
  font-family: "jua", sans-serif;
  color: white;
  width: 100%;
  font-size: 33px;
  padding: 5px 1px 5px 1px;
}

.main_map {
  width: 770px;
  margin: 0 auto;
  /*border: 1px solid;*/
}

.main_map > img {
  display: block;
  width: 900px;
  height: 500px;
  margin: 0 auto;
}

.main_crew {
  margin-top: 40px;
  font-size: 20px;
  width: 100%;
  /*border: 1px solid;*/
}

.main_crew--text {
  width: 100%;
  text-align: center;
  display: block;
  font-size: 20px;
  /*border: 1px solid;*/
}

.main_crew--text1 {
  display: inline-block;
  width: 350px;
}

.main_crew--text2 {
  display: inline-block;
  margin-left: 55px;
  width: 850px;
}

.main_crew p {
  font-family: "jua";
  font-size: 1.6em;
  color: #495c75;
}

.main_crew--bc {
  width: 350px;
  height: 310px;
  border: 4px solid #495c75;
  border-radius: 10px;
  display: inline-block;
  vertical-align: top;
}

.main_crew--bc svg {
  display: inline-block;
  vertical-align: top;
  margin-top: 110px;
  width: 50px;
  height: 50px;
  fill: #495c75;
}

.main_crew--bc--photo {
  padding-top: 28px;
  display: inline-block;
}

.main_crew--bc--photo img {
  width: 230px;
  height: 200px;
}

.main_crew--container {
  width: inherit;
  display: block;
  text-align: center;
  /*border: 1px solid;*/
}

.main_crew--bcp {
  margin-left: 50px;
  width: 850px;
  height: 310px;
  border-radius: 10px;
  border: 4px solid #495c75;
  display: inline-block;
}

.main_crew--bcp--table {
  font-family: nanumB, nanum;
  margin: 27px;
}

.main_crew--bcp--table tr {
  border-bottom: 1px solid black;
}

.main_crew--bcp--table a {
  text-decoration: none;
  color: #647C97;
}

</style>