<template>
  <div class="mypageD-listcontainer">
    <ul class="mypageD-listcontainer__ul--blue">
      <li class="mypageD-listcontainer__li--big">
        마이 페이지
      </li>
      <li class="mypageD-listcontainer__li--small">
        <a href="#" class="mypageD-listcontainer__a--blue">
          <img class="mypageD-listcontainer__img--small"
               :src="getImgUrl('mypage/person.png')"
               alt="person"
          />&nbsp;
          개인 정보
        </a>
      </li>
      <li class="mypageD-listcontainer__li--small">
        <a href="#" class="mypageD-listcontainer__a--blue">
          <img class="mypageD-listcontainer__img--small"
               :src="getImgUrl('mypage/planner.png')"
               alt="planner"
          />&nbsp;&nbsp;
          내 플래너
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import {inject} from "vue";

export default {
  name: "DoldolseoMemberMypageNav",
  setup() {
    const getImgUrl = inject('getImgUrl')

    return {
      getImgUrl,
    }
  }
}
</script>

<style scoped>
.mypageD-listcontainer {
  width: 200px;
  height: 630px;
  background-color: #5882fa;
  display: inline-block;
  position: absolute;
  left: 0;
  top: 40px;

}

.mypageD-listcontainer__ul--blue {
  font-family: 'Jua', sans-serif;
  list-style-type: none;
  margin: 20px auto 0;
  padding: 0;
  color: white;
  width: 170px;
}

.mypageD-listcontainer__li--big {
  height: 56px;
  font-size: 20px;
  color: white;
  border-bottom: 3px solid #abb2c7;
  line-height: 60px;
  padding: 3px;
}

.mypageD-listcontainer__li--small {
  margin: 30px 0 30px 6px;
}

.mypageD-listcontainer__a--blue {
  font-size: 17px;
  text-decoration: none;
  color: white;
  font-family: 'Nanum Gothic', sans-serif;
  font-weight: bold;
}

.mypageD-listcontainer__img--small {
  width: 18px;
  height: 18px;
  vertical-align: sub;
}

</style>