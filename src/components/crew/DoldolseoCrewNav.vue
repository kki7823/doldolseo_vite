<template>
  <nav class="crew-navi">
      <span class="crew-navi__btn">
        <router-link :to="{name: 'crewPostList'}">
          크루활동
        </router-link>
      </span>
    <span class="crew-navi__btn">
      <router-link :to="{name: 'crewList'}">
        크루목록
      </router-link>
    </span>
    <router-link :to="{name: 'crewList', params: {memberId: memberId}}">
      <button v-if="areYouLogedIn"
              type="button"
              class="crew-button">
        My Crew
      </button>
    </router-link>
  </nav>
</template>

<script>
import {computed, ref} from "vue";
import {useCookies} from "vue3-cookies";

export default {
  name: "DoldolseoCrewNav",
  setup() {
    const {cookies} = useCookies()

    const areYouLogedIn = computed(() => {
      return cookies.get('token') != null && localStorage.getItem('loginState') === 'login';
    })

    const memberId = ref(localStorage.getItem('id'))

    return {
      memberId,
      areYouLogedIn,
    }
  }
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
  line-height: 21px;
  color: white;
}
</style>