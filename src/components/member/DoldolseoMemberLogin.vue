<template>
  <div class="memberL-container">
    <img class="memberL-container__image--small"
         :src="imgPath+'/logo.png'"
         alt="logo"/>
    <div>
      <input class="memberL-container__input--big"
             type="text"
             maxlength="20"
             ref="focusId"
             v-model="id"
             placeholder="아이디"
             @click="loginMsg=''"
      />
      <br/>
      <input class="memberL-container__input--big"
             type="password"
             ref="focusPw"
             v-model="password"
             maxlength="30"
             placeholder="비밀번호"
             @click="loginMsg=''"
      />
      <br/>
    </div>

    <div class="memberL-container--checkbox">
      <input id="remember_id"
             type="checkbox"
             name="remember_id"
             value="y"
      />아이디 기억하기
    </div>
    <div class="memberL-msgbox">
      <p class="msg">
        {{ loginMsg }}
      </p>
    </div>
    <div class="memberL-btncontainer">
      <input type="button"
             value="로그인"
             @click="sendLoginData(this)"
      />
      <input type="button" value="회원가입" onclick="location.href='${pageContext.request.contextPath}/memberJ'">
      <input type="button" value="테스트버튼" @click="testMethod()">{{ loginSuccess }}
    </div>
  </div>
</template>

<script>
import {inject, ref} from "vue";
import {axios} from "@bundled-es-modules/axios";
import {useCookies} from "vue3-cookies"
import login from "../../module/login";

export default {
  name: "DoldolseoMemberLogin",
  setup() {
    const {cookies} = useCookies()
    const imgPath = inject('contextPath') + '_image/member'
    const URL_MEMBER_LOGIN = inject('doldolseoMember') + '/login'

    const id = ref('')
    const password = ref('')
    const loginMsg = ref('')

    const sendLoginData = (template) => {
      if (!validateParams(template)) return
      login.doLogin(id.value, password.value, URL_MEMBER_LOGIN);
      loginMsg.value = login.loginMsg.value
    }

    const validateParams = (template) => {
      if (id.value.length === 0) {
        template.$refs.focusId.focus()
        loginMsg.value = "아이디를 입력해 주세요"
        return false

      } else if (password.value.length === 0) {
        template.$refs.focusPw.focus()
        loginMsg.value = "비밀번호를 입력해 주세요"
        return false
      }
      return true
    }

    const testMethod = () => {
      axios({
        method: 'get',
        url: '/doldolseo/testtest',
        params: {
          id: id.value,
        },
        headers: {
          Authorization: 'Bearer ' + cookies.get('token')
        },
      }).then((resp) => {
        console.log("테스트 메소드 요청 성공 status : " + resp.status)
        console.log(resp.data)
      }).catch(() => {
        console.log("테스트 메소드 요청 실패")
      })
    }

    let loginSuccess = login.loginSuccess

    return {
      imgPath,
      id,
      password,
      loginMsg,
      sendLoginData,
      testMethod,
      loginSuccess,
    }
  }
}
</script>

<style scoped>
/* memberLogin */
.memberL-container {
  width: 1500px;
  margin: 100px auto;
  text-align: center;
  display: flex;
  align-items: center;
  flex-direction: column;
}

.memberL-header {
  height: 150px;
  background-color: #4b8de9;
}

.memberL-container__image--small {
  width: 230px;
  height: 230px;
  margin: 70px 30px 70px 0;
}

.memberL-container__input--big {
  width: 470px;
  height: 55px;
  border: 2.5px solid #dadce0;
  font-size: 25px;
  margin: 10px auto;
}

.memberL-container__input--big:focus {
  border: 2.5px solid #0080c0;
  outline: none;
  box-shadow: 1px 1px 1px gray;
}

.memberL-container--checkbox {
  width: 480px;
  height: 20px;
  text-align: left;
}

.memberL-msgbox {
  width: 475px;
  height: 50px;
  text-align: left;
}

.msg {
  text-align: left;
  font-size: 16px;
  color: red;
}

.memberL-btncontainer {
  width: 500px;
  height: 150px;
  margin: 0 auto;
}

.memberL-btncontainer input {
  margin: 30px 5px;
  width: 235px;
  height: 55px;
  font-size: 23px;
  color: #ffffff;
  background-color: #0080c0;
  border: none;
  border-radius: 5px;
  font-family: 'Jua', sans-serif;
}


</style>