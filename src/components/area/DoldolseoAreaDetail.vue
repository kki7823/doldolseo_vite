<template>
  <section class="areaDetail-container">
    <div class="areaDetail-topContainer">
      <div class="common-top__title" style="color: #0080c0;">
        지역게시판
      </div>
      <span class="common-top__drilldownbox">
                    <a href="#" style="color: #495c75;">지역게시판</a>
                    <span> > </span>
                    <a href="#">{{ areaMenu[areaData.sigungu] }}</a>
            </span>
    </div>

    <div class="areaDetail-content">
      <!--지역/이름-->
      <div class="areaDetail-name">
        <h3><b>{{ areaMenu[areaData.sigungu] }}</b></h3>
        <p>{{ areaData.name }}</p>
      </div>

      <hr style="width: 1200px; color: #495c75; "/>

      <!--사진-->
      <div class="areaDetail-img">
        <img v-if="areaData.image1 == null"
             :src="imgPath+'/areaListData/default.png'"
             width="550" height="500" alt="area_image"
        />
        <img v-else
             :src="areaData.image1"
             width="550" height="500" alt="area_image"
        />
      </div>

      <!--정보 : append -->
      <div class="areaDetail-info">
        <p class="areaDetail-overview">
          {{ overview }}
        </p>
      </div>

      <hr style="width: 1200px; color: #495c75; "/>

      <!--지도-->
      <div class="areaDetail-map">
        <kakao-map :x="areaData.x" :y="areaData.y" />
      </div>

      <!-- 주소 -->
      <div class="areaDetail-info__table">
        <table style="color: white;">
          <tr style="text-align: left">
            <th style="width: 140px">주소</th>
            <td>{{ areaData.address }}</td>
          </tr>
          <tr style="text-align: left">
            <th>전화번호</th>
            <td>{{ areaData.tel }}</td>
          </tr>
        </table>
      </div>
    </div>
  </section>
</template>

<script>
import {useRoute} from "vue-router";
import {axios} from "@bundled-es-modules/axios";
import {inject, ref} from "vue";
import KakaoMap from "./KakaoMap.vue";

export default {
  name: "DoldolseoAreaDetail",
  components: {KakaoMap},
  setup() {
    const route = useRoute()
    const name = ref(route.params.name)
    const URL = inject('doldolseoArea') + '/'
    const areaData = ref({})
    const imgPath = inject('contextPath') + '_image/area'
    const areaMenu = inject('areaMenu')

    const overview = ref('')

    const getAreaData = async () => {
      let contentId = ref(0)
      await axios.post(URL + name.value).then((resp) => {
        console.log(URL + ": 요청 성공 status : " + resp.status)
        areaData.value = resp.data
        contentId = resp.data.contentId
      }).catch(() => {
        console.log(URL + ": 요청 실패")
      })

      const key = "P3TbC5uJmBCIyJ5XyNE96Iggnml%2FE7YpEPLGKNQAG6P1Pg36WbbyZPeOkl%2BjZa9JsjLoIwO0saCVPxy48P5nMQ%3D%3D"
      const URL_overview = "http://api.visitkorea.or.kr/openapi/service/rest/KorService/detailCommon?ServiceKey=" + key + "&contentTypeId=&contentId=" + contentId + "&MobileOS=ETC&MobileApp=TourAPI3.0_Guide&defaultYN=Y&firstImageYN=Y&areacodeYN=Y&catcodeYN=Y&addrinfoYN=Y&mapinfoYN=Y&overviewYN=Y&transGuideYN=Y"
      await axios.get(URL_overview).then((resp) => {
        console.log(URL_overview + "-> 요청 성공 status : " + resp.status)
        overview.value = resp.data.response.body.items.item.overview;
      }).catch(() => {
        console.log(URL_overview + "-> 요청 실패")
      })
    }

    getAreaData()

    return {
      name,
      areaData,
      areaMenu,
      imgPath,
      overview,
    }
  }
}
</script>

<style scoped>
.areaDetail-container {
  background-color: white;
  width: 1500px;
  margin: 0 auto;
  /*border: 1px solid;*/
}

.areaDetail-topContainer {
  width: 1500px;
  height: 100px;
  margin-top: 40px;
  /*border: 1px solid;*/
}

.areaDetail-name {
  width: 1200px;
  text-align: center;
  margin: 0 auto;
  font-family: "Jua", sans-serif;
  /*border: 3px solid #CDCECF;*/
}

.areaDetail-content {
  width: 1500px;
  font-family: "Jua", sans-serif;
  text-align: center;
  margin-top: 0;
  /*border-radius: 20px;*/
  border: 1px solid #CDCECF;
}

.areaDetail-name h3 {
  color: #5882FA;
  font-family: 'Nanum Gothic Coding', sans-serif;
  font-weight: bold;
  font-size: 20px;
  margin: 30px 0 10px 0;
  /*border: 1px solid;*/
}

.areaDetail-name p {
  margin-top: 5px;
  color: #647C97;
  font-size: 40px;
  /*border: 1px solid;*/
}

.areaDetail-img {
  margin-top: 50px;
}

.areaDetail-info {
  margin: 40px auto;
  text-align: left;
  height: auto;
  width: 900px;
  /*border: 1px solid;*/
  font-family: "Nanum Gothic", sans-serif;
  font-weight: bold;
  font-size: 15px;
  color: black;
  padding: 20px;
}

.areaDetail-map {
  width: 1200px;
  margin: 40px auto;
  /*border: 1px solid;*/
}

.areaDetail-info__table {
  width: 640px;
  text-align: center;
  margin: 0 auto 40px;
  background-color: #647C97;
  font-family: nanumB, sans-serif;
  font-size: 18px;
  border-color: #647C97;
  border-radius: 10px;
  padding: 10px 30px 10px 30px;
}

.areaDetail-info__table th, td {
  /*border: 1px solid;*/
}

.common-top__title {
  text-align: left;
  font-family: 'Jua', sans-serif;
  color: #A9E2F3;
  font-size: 50px;
  position: relative;
}

.common-top__drilldownbox {
  float: left;
  font-family: 'Nanum Gothic', sans-serif;
  font-size: 20px;
}

</style>