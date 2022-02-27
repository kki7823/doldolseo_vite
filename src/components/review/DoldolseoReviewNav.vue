<template>
  <div class="nav-container">
    <div class="nav-titlebox">
      <span class="nav-titlebox__title">REVIEW</span>
    </div>
    <hr class="nav--line__horizon">
    <ul class="nav-list">
      <li class="nav-list__item">
        <router-link :to="{name: 'reviewList'}" >
          전체
        </router-link>
      </li>
      <li class="nav-list__item"
          v-for="(item, idx) in areaMenu">
        <router-link :to="{name: 'reviewList', params:{areaNo: idx }}" >
          {{ item }}
        </router-link>
      </li>
    </ul>
    <div id="nav-backimg">
      <img :src="imgPath+'navi_image.png'"
           alt="deco"
      />
    </div>
  </div>
</template>

<script>
import {inject} from "vue";

export default {
  name: "DoldolseoReviewNav",
  setup() {
    const imgPath = inject('contextPath') + '_image/nav/'
    const areaMenu = inject('areaMenu')

    return {
      imgPath,
      areaMenu,
    }
  }
}
</script>

<style scoped>
.nav-container {
  width: 220px;
  background-color: #F78181;
  border-top: 1pt solid white;
  min-height: 900px;
  height: 100%;
  margin-top: 40px;
  position: relative;
}

.nav-titlebox {
  margin: 50px 0 20px 25px;
  text-align: left;
}

.nav-titlebox__title {
  font-family: 'Jua', sans-serif;
  font-size: 30px;
  color: white;
}

.nav-list {
  font-family: 'Nanum Gothic Coding', sans-serif;
  font-weight: bold;
  list-style: none;
  padding-left: 0;
}

.nav-list__item {
  font-size: 20px;
  text-align: left;
  margin-top: 24px;
  margin-left: 25px;
  color: blue;
}

.nav-list__item > a {
  text-decoration-line: none;
  color: white;
}

.nav-list__item > a:hover {
  color: #F6CECE;
}

#nav-backimg {
  width: inherit;
  height: 250px;
  position: absolute;
  bottom: 0;
  overflow: hidden;
  /*border: 1pt solid;*/
}

#nav-backimg > img {
  width: inherit;
  height: inherit;
  object-fit: cover;
}

.nav--line__horizon {
  background-color: #CDCECF;
  border: 0;
  height: 2px;
  margin: 0 20px 0 20px;
}
</style>