<template>
  <nav class="crew-navi">
      <span class="crew-navi__btn">
        <router-link :to="{name: 'crewPostList'}">
          크루활동
        </router-link>
      </span>
    <!--    <button>-->
    <!--      <router-link :to="{name: 'crewManage', params:{id: 'kki7823'}}">-->
    <!--        크루 관리-->
    <!--      </router-link>-->
    <!--    </button>-->
    <span class="crew-navi__btn">
      <router-link :to="{name: 'crewList'}">
        크루목록
      </router-link>
    </span>
    <button id="crew-navi__btn--mycrew"
            type="button"
            class="crew-button">
      My Crew
    </button>
  </nav>
</template>

<script>
export default {
  name: "DoldolseoCrewNav"
}
</script>

<style scoped>

.crew-navi {
  width: 1246px;
  height: 40px;
  margin: 20px auto 0;
  text-align: right;
  border-bottom: 1px #CDCECF solid;
  position: relative;
}

.crew-navi > button {
  margin: 2px;
}

.crew-navi__btn {
  color: #A4A4A4;
  background-color: unset;
  font-family: 'Jua', sans-serif;
  font-size: 23px;
  border-radius: 0;
  padding: 6px 4px 4px 4px;
  height: 34px;
  position: relative;
  top: 5px;
  right: 3px;
  cursor: pointer;
}

.crew-navi__btn > a {
  color: #A4A4A4;
}

.crew-navi__btn > a:hover {
  color: #A9E2F3;
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
  line-height: 21px;
}
</style>