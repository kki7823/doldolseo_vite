<template>
  <div class="miniprofile">
    <!-- After Login -->
    <div v-if="areYouLogedIn"
         class="miniprofileBox">
      <div class="miniprofile__photo">
        <img :src="URL_MEMBER_IMAGES"
             alt="profile2">
      </div>
      <div class="miniprofile__info">
        <span style="color:#37FFEB;"
              id="header-miniprofile__span--nickname">{{ memberNickname }}</span>
        <span id="header-miniprofile__span--white"> 님</span>
        <br/>
        안녕하세요
      </div>

      <div class="miniprofile__button">
        <button type="button"
                @click="logout(this, URL_MEMBER_LOGOUT)">
          LOGOUT
        </button>
        <router-link :to="{name: 'memberMypage'}">
          <button type="button">
            MYPAGE
          </button>
        </router-link>
      </div>
    </div>
    <!-- Before Login -->
    <div v-else
         class="miniprofileBox__guest">
      <button class="button1"
              type="button"
              @click="router.push({name: 'memberLogin'})">LOGIN
      </button>
      <button class="button2"
              type="button"
              @click="router.push({name: 'memberJoin'})">JOIN
      </button>
    </div>
  </div>
</template>

<script>
import {useRouter} from "vue-router";
import {useCookies} from "vue3-cookies";
import {computed, inject, ref} from "vue";
import login from "../../module/login";


export default {
  name: "DoldolseoHeaderProfile",
  setup() {
    const cookies = inject('cookies')
    const router = useRouter()
    const PATH_MEMBER_IMG_DEFAULT = inject('contextPath') + '_image/member/default_member.png'
    const URL_MEMBER_IMAGES = inject('doldolseoMember') + '/images/' + localStorage.getItem('id')
    const URL_MEMBER_LOGOUT = inject('doldolseoMember') +'/logout/' +localStorage.getItem('id')
    const memberNickname = localStorage.getItem('nickname')

    const areYouLogedIn = computed(() => {
      return cookies.get('token') != null && localStorage.getItem('loginState') === 'login';
    })

    const logout = (component, URL_MEMBER_LOGOUT) => {
      login.doLogout(component, URL_MEMBER_LOGOUT)
    }

    return {
      router,
      cookies,
      PATH_MEMBER_IMG_DEFAULT,
      URL_MEMBER_IMAGES,
      URL_MEMBER_LOGOUT,

      areYouLogedIn,
      memberNickname,
      logout,
    }
  }
}
</script>

<style scoped>
.miniprofileBox {
  width: 290px;
  height: 100px;
  position: relative;
  right: 0;
  border: 3px solid #1b3067;
  border-radius: 10px;
  background-color: #1b3067;
}

.miniprofile {
  display: inline-block;
  padding-top: 18px;
  font-family: "pooding", sans-serif;
  font-size: 1.2em;
  color: white;
  position: absolute;
  right: 20px;
  top: 2px;
  /*border: 1px solid;*/
}

.miniprofile__span--nickname {
  display: inline-block;
  max-width: 160px;
  text-align: right;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.miniprofile__span--white {
  vertical-align: top;
}

.miniprofile__photo {
  display: inline-block;
  width: 85px;
  height: 85px;
  border-radius: 70%;
  margin-top: 8px;
  margin-left: 8px;
  overflow: hidden;
  position: absolute;
  left: 0;
}

.miniprofile__photo > img {
  width: inherit;
  height: inherit;
  object-fit: cover;
}

.miniprofile__info {
  display: inline-block;
  width: 180px;
  text-align: center;
  font-size: 1.2em;
  position: absolute;
  right: 0;
  top: 14px;
  font-family: "pooding", sans-serif;
  /*border: 1px solid black;*/
}

.miniprofile__button {
  display: inline-block;
  width: 180px;
  position: absolute;
  bottom: 8px;
  right: 0;
  /*border: 1px solid;*/
}

.miniprofile__button button {
  background-color: #4b8de9;
  color: white;
  font-family: 'jua', sans-serif;
  font-size: 17px;
  border: 3px solid #1b3067;
  border-radius: 10px;
  cursor: pointer;
}

.miniprofileBox__guest {
  width: 290px;
  height: 100px;
  position: relative;
  right: 0;
  border: 3px solid #1b3067;
  border-radius: 10px;
  background-color: #1b3067;
}

.button1 {
  position: absolute;
  width: 110px;
  height: 40px;
  bottom: 30px;
  left: 30px;
  background-color: #4b8de9;
  color: white;
  font-family: 'jua', sans-serif;
  font-size: 1.4em;
  border: 3px solid #4b8de9;
  border-radius: 10px;
  cursor: pointer;
}

.button2 {
  position: absolute;
  width: 110px;
  height: 40px;
  bottom: 30px;
  right: 20px;
  background-color: #4b8de9;
  color: white;
  font-family: 'jua', sans-serif;
  font-size: 1.4em;
  border: 3px solid #4b8de9;
  border-radius: 10px;
  cursor: pointer;
}
</style>