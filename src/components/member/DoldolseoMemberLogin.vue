<template>
  <div class="memberL-container">
    <img class="memberL-container__image--small"
         :src="imgPath+'/logo.png'"
         alt="logo"/>

    <form action="${pageContext.request.contextPath}/login" method="post" name="loginForm"
          onsubmit="return loginCheck()">
      <div>
        <input id="login_id" class="memberL-container__input--big" type="text" name="id" size="30"
               placeholder="아이디"> <br/>
        <input id="login_pw" class="memberL-container__input--big" type="password" name="password" size="40"
               placeholder="비밀번호"> <br/>
      </div>

      <label class="memberL-container__label--move">
        <input id="remember_id" type="checkbox" name="remember_id" value="y"> 아이디 기억하기
      </label>

      <div class="memberL-btncontainer">
        <input type="submit" value="로그인">
        <input type="button" value="회원가입" onclick="location.href='${pageContext.request.contextPath}/memberJ'">
      </div>
    </form>
  </div>
</template>

<script>
import {inject} from "vue";

export default {
  name: "DoldolseoMemberLogin",
  setup() {
    const imgPath = inject('contextPath') + '_image/member'

    return {
      imgPath,
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

.memberL-container__label--move {
  margin-right: 335px;
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