<template>
  <!--  <form :action="URL"-->
  <!--        method="post"-->
  <!--        enctype="multipart/form-data"-->
  <!--        name="joinFrm">-->

  <div class="memberJ-container">
    <div class="memberJ--logobox">
      <img id="logoImg"
           :src="imgPath+'/logo.png'"
           alt="logo">
    </div>

    <!-- 아아디, 비밀번호 입력 -->
    <div class="memberJ-idcontainer">
      <h4>아이디</h4>
      <input type="text"
             class="memberJ-container--praram"
             maxlength="20"
             ref="focusId"
             v-model="id"
             @focusout="validateId(id)"
      />
      <p class="msg" :style="{color: idMsgColor}">
        {{ idValidateMsg }}
      </p>
      <h4>비밀번호</h4>
      <input type="password"
             class="memberJ-container--praram"
             maxlength="30"
             ref="focusPw"
             :style="{backgroundImage: pwdLockImgUrl}"
             v-model="password"
             @focusout="validatePwd(password)"
             @keyup="confirmPwd(password, passwordConfirm)"
      />
      <p class="msg">
        {{ pwdValidateMsg }}
      </p>
      <h4>비밀번호 확인</h4>
      <input type="password"
             class="memberJ-container--praram"
             maxlength="30"
             :style="{backgroundImage: pwdConfirmLockImgUrl}"
             v-model="passwordConfirm"
             @keyup="confirmPwd(password, passwordConfirm)"
      />
      <p class="msg">
        {{ pwdConfirmValidateMsg }}
      </p>
    </div>

    <!-- 이름, 닉네임, 생년월일,성별 입력 -->
    <div class="memberJ-namecontainer">
      <h4>이름</h4>
      <input type="text"
             class="memberJ-container--praram"
             maxlength="20"
             v-model="name"
             @focusout="validateName(name)"
      />
      <p class="msg">
        {{ nameValidateMsg }}
      </p>
      <h4>닉네임</h4>
      <input type="text"
             class="memberJ-container--praram"
             v-model="nickname"
             maxlength="20"
             @focusout="validateNickname(nickname)"
      />
      <p class="msg">
        {{ nicknameValidateMsg }}
      </p>
      <h4>생년월일</h4>
      <div class="memberJ--birthBox">
        <input type="text"
               class="memberJ-namecontainer__input--blue"
               v-model="year"
               maxlength="4"
               placeholder="년"
               @focusout="validatebirth(year, month, day)"
        />
        <select class="memberJ-namecontainer__birth--blue"
                v-model="month"
                @focusout="validatebirth(year, month, day)">
          <option selected='selected'>
            월
          </option>
          <option v-for="m in 12">
            {{ m }}
          </option>
        </select>
        <input type="text"
               class="memberJ-namecontainer__input--blue"
               v-model="day"
               maxlength="2"
               placeholder="일"
               @focusout="validatebirth(year, month, day)"
        />
      </div>
      <p class="msg">
        {{ birthValidateMsg }}
      </p>
      <!-- 성별 입력 -->
      <h4>성별</h4>
      <select class="memberJ-namecontainer__gender--blue" v-model="gender">
        <option value="" selected="selected">성별</option>
        <option value="M">남자</option>
        <option value="F">여자</option>
      </select>
    </div>

    <!-- 프로필 사진 등록 -->
    <div class="memberJ-imgcontainer">
      <h4>프로필 사진 (선택)</h4>
      <img
          v-if="memberImgUrl == null"
          class="memberJ-imgcontainer__img-small"
          :src="imgPath+'/sample.png'"
          alt="default_profile"
      />
      <img
          v-else
          class="memberJ-imgcontainer__img-small"
          :src="memberImgUrl"
          alt="profile"
      />
      <label id="my_img_label"
             class="memberJ-imgcontainer__label-blue"
             for="member_img">
        업로드
      </label>
      <input id="member_img"
             type="file"
             class="memberJ-imgcontainer__input-disappear"
             @change="setMemberImg"
      />
    </div>

    <!-- 이메일, 전화번호 입력 -->
    <div class="memberJ-emailcontainer">
      <h4>이메일</h4>
      <input type="email"
             class="memberJ-container--praram"
             v-model="email"
             maxlength="50"
             @focusout="validateEmail(email)"
      />
      <p class="msg">
        {{ emailValidateMsg }}
      </p>

      <h4>연락처 (선택)</h4>
      <input type="tel"
             class="memberJ-container--praram"
             v-model="phone"
             maxlength="30"
             @focusout="validatephone(phone)"
      />
      <p class="msg">
        {{ phoneValidateMsg }}
      </p>
    </div>

    <!-- 이용약관 체크 여부 -->
    <div class="memberJ-rulecontainer">
      <button type="button"
              onclick="window.open('${pageContext.request.contextPath}/memberP')">
        이용방침
      </button>
      <button type="button"
              onclick="window.open('${pageContext.request.contextPath}/memberR')">
        가입약관
      </button>
      <br/>
      <label class="memberJ-rulecontainer__label--move">
        <input type="checkbox" class="memberJ-container__input--focus" name="check_rule"> 이용약관 체크 여부
        <div class="msg" id="validate_check_rule"></div>
      </label>
    </div>
    <!-- // 이용약관 체크 여부 -->

    <div class="memberJ-buttoncontainer">
      <input type="submit"
             class="memberJ-buttoncontainer__input--blue"
             value="회원가입"
             @click="sendData(this)"
      />
      <input type="hidden" name="crleader" value="n">
    </div>
  </div>
  <!--  </form>-->
</template>

<script>
import {inject, ref} from "vue";
import {axios} from "@bundled-es-modules/axios";

export default {
  name: "DoldolseoMemberJoin",
  setup() {
    const imgPath = inject('contextPath') + '_image/member'

    const id = ref('')
    const idMsgColor = ref('')
    const idValidateMsg = ref('')
    const validateId = (id) => {
      idMsgColor.value = 'red'
      const pattern = /^([a-z0-9]){4,20}$/
      if (id.length === 0) {
        idValidateMsg.value = "필수정보 입니다.";
      } else if (pattern.test(id) === false) {
        idValidateMsg.value = "ID는 4~20자의 영문, 숫자만 허용 됩니다."
      } else {
        idValidateMsg.value = "사용 가능한 ID 입니다"
        idMsgColor.value = 'green'
      }
    }

    const lockImg = {
      1: '/lock/lock_basic.png',
      2: '/lock/lock_blue.png',
      3: '/lock/lock_red.png'
    }
    const password = ref('')
    const pwdValidateMsg = ref('')
    const pwdLockImgUrl = ref('url(' + imgPath + lockImg[1] + ')')
    const validatePwd = (pwd) => {
      const pattern1 = /[0-9]/
      const pattern2 = /[a-zA-Z]/
      const pattern3 = /[~!@\#$%<>^&*]/
      if (pattern1.test(pwd) && pattern2.test(pwd) && pattern3.test(pwd) && pwd.length > 7 && pwd.length <= 20) {
        pwdValidateMsg.value = ''
        pwdLockImgUrl.value = 'url(' + imgPath + lockImg[2] + ')'
      } else {
        pwdValidateMsg.value = "8~20자 영문, 숫자, 특수문자를 사용하세요."
        pwdLockImgUrl.value = 'url(' + imgPath + lockImg[3] + ')'
      }
    }

    const passwordConfirm = ref('')
    const pwdConfirmValidateMsg = ref('')
    const pwdConfirmLockImgUrl = ref('url(' + imgPath + lockImg[1] + ')')
    const confirmPwd = (pwd, pwdConfirm) => {
      if (pwd === pwdConfirm) {
        pwdConfirmValidateMsg.value = ''
        pwdConfirmLockImgUrl.value = 'url(' + imgPath + lockImg[2] + ')'
      } else {
        pwdConfirmValidateMsg.value = "비밀번호가 일치하지 않습니다."
        pwdConfirmLockImgUrl.value = 'url(' + imgPath + lockImg[3] + ')'
      }
    }

    const name = ref('')
    const nameValidateMsg = ref('')
    const validateName = (name) => {
      if (name.length >= 2) {
        nameValidateMsg.value = ''
      } else {
        nameValidateMsg.value = "이름을 입력해 주세요."
      }
    }

    const nickname = ref('')
    const nicknameValidateMsg = ref('')
    const validateNickname = (nickname) => {
      if (nickname.length >= 2) {
        nicknameValidateMsg.value = ''
      } else {
        nicknameValidateMsg.value = "닉네임을 입력해 주세요."
      }
    }

    const year = ref('')
    const month = ref('')
    const day = ref('')
    let birth = ''
    const birthValidateMsg = ref('')
    const validatebirth = (year, month, day) => {
      const pattern1 = /([0-9])/
      const pattern2 = /([1-9])/
      if (year.length === 4 && year >= 1950 && year <= 2013 && month.length !== 0 && day.length !== 0 && pattern1.test(year) && pattern2.test(month) && pattern2.test(day) && day <= 31) {
        birthValidateMsg.value = ''
        console.log('????' + month.length)
        birth = year + '-' + (month.length === 1 ? '0' + month : month) + '-' + (day.length === 1 ? '0' + day : day)
      } else {
        birthValidateMsg.value = "올바른 형식의 날짜를 입력해 주세요."
      }
    }

    const gender = ref('')

    const memberImgUrl = ref(null)
    let memberImg = null
    const setMemberImg = (e) => {
      memberImg = e.target.files[0]
      memberImgUrl.value = URL.createObjectURL(memberImg)
    }

    const email = ref('')
    const emailValidateMsg = ref('')
    const validateEmail = (email) => {
      if (email !== '') {
        emailValidateMsg.value = ''
      } else {
        emailValidateMsg.value = "이메일 입력해 주세요."
      }
    }

    const phone = ref('')
    const phoneValidateMsg = ref('')
    const validatephone = (phone) => {
      const pattern = /[0-9]{11}/
      if (pattern.test(phone)) {
        phoneValidateMsg.value = ''
      } else {
        phoneValidateMsg.value = "- 을 제외한 11자리 휴대폰 번호를 입력해 주세요"
      }
    }

    const URL_MEMBER = inject('doldolseoMember')
    const sendData = (template) => {


      const formData = new FormData()
      formData.append('id', id.value)
      formData.append('password', password.value)
      formData.append('name', name.value)
      formData.append('nickname', nickname.value)
      formData.append('birth', birth)
      formData.append('memberImg', memberImg)
      formData.append('gender', gender.value)
      formData.append('email', email.value)
      formData.append('phone', phone.value)

      axios.post(URL_MEMBER, formData).then((resp) => {
        console.log(URL_MEMBER + "요청 성공 status : " + resp.status)
        console.log(resp.data)
      }).catch(() => {
        console.log(URL_MEMBER + "요청 실패")
      })
    }

    const validParams = (template) => {
      if(id.value.length === 0){
        template.$refs.focusId.focus()
      }
    }

    return {
      imgPath,
      id,
      idMsgColor,
      idValidateMsg,
      validateId,
      password,
      pwdValidateMsg,
      pwdLockImgUrl,
      validatePwd,
      passwordConfirm,
      pwdConfirmValidateMsg,
      pwdConfirmLockImgUrl,
      confirmPwd,
      name,
      nameValidateMsg,
      validateName,
      nickname,
      nicknameValidateMsg,
      validateNickname,
      year,
      month,
      day,
      birthValidateMsg,
      validatebirth,
      gender,
      memberImgUrl,
      setMemberImg,
      email,
      emailValidateMsg,
      validateEmail,
      phone,
      phoneValidateMsg,
      validatephone,
      URL,
      sendData,
    }
  }
}
</script>

<style scoped>
.memberJ-container {
  width: 1300px;
  margin: auto;
  text-align: center;
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: #f2f2f2;
  padding-top: 50px;
  padding-bottom: 40px;
}

.memberJ-container h4 {
  margin: 15px 0 5px 22px;
  height: 20px;
  width: 200px;
  text-align: left;
}

.memberJ-container--praram {
  height: 45px;
  width: 450px;
  border: 2px solid #dadce0;
  font-size: 18px;

  /* password lock image */
  background-color: white;
  background-size: 22px;
  background-position: 420px 6px;
  background-repeat: no-repeat;
}

.memberJ-container--praram:focus, .memberJ-container__input--focus:focus {
  border: 2px solid #0080c0;
  outline: none;
  box-shadow: 1px 1px 1px gray;
}

.msg {
  height: 20px;
  width: 300px;
  margin: 5px 0 5px 22px;
  text-align: left;
  font-size: 13px;
  color: red;
  display: block;
  border: none;
}

.memberJ--logobox {
  text-align: center;
  width: 100%;
  margin: 50px auto;
}

.memberJ--logobox img {
  width: 240px;
  height: 230px;
  border: none;
  margin: 20px 15px 0 auto;
}

.memberJ-idcontainer {
  height: 370px;
  width: 500px;
}

.memberJ-namecontainer {
  height: 480px;
  width: 500px;
}

.memberJ-namecontainer__input--blue {
  height: 45px;
  width: 140px;
  border: 2px solid #dadce0;
  font-size: 18px;
  margin: 0 5px 0 5px;
}

.memberJ-namecontainer__input--blue:focus, .memberJ-namecontainer__birth--blue:focus {
  border: 2px solid #0080c0;
  outline: none;
  box-shadow: 1px 1px 1px gray;
}

.memberJ-namecontainer__birth--blue {
  height: 50px;
  width: 150px;
  border: 2px solid #dadce0;
  font-size: 18px;
}

.memberJ-namecontainer__gender--blue {
  height: 51px;
  width: 460px;
  border: 2px solid #dadce0;
  font-size: 18px;
}

.memberJ-namecontainer__gender--blue:focus {
  border: 2px solid #0080c0;
  outline: none;
  box-shadow: 1px 1px 1px gray;
}

.memberJ-imgcontainer {
  height: 200px;
  width: 500px;
}

.memberJ-imgcontainer__img-small {
  height: 130px;
  width: 130px;
  margin: 20px 0 0 -325px;
  border: 2px solid #dadce0;
  border-radius: 50%;
}

.memberJ-imgcontainer__label-blue {
  color: #ffffff;
  background-color: #00addd;
  height: 40px;
  width: 100px;
  margin: -50px 0 0 200px;
  line-height: 40px;
  display: block;
  font-size: 16px;
  font-weight: 800;
  border-radius: 6px;
  font-family: 'Jua', sans-serif;
}

.memberJ-imgcontainer__input-disappear {
  width: 0;
  height: 0;
  overflow: hidden;
  border: 0;
}

.memberJ-emailcontainer {
  height: 220px;
  width: 500px;
}

.memberJ-rulecontainer {
  height: 120px;
  width: 500px;
  margin-top: 20px;
  /*border: 1px solid;*/
}

.memberJ-rulecontainer button {
  width: 225px;
  height: 50px;
  margin: 10px 4px 10px 4px;
  font-size: 20px;
  color: #ffffff;
  background-color: #a9e2f3;
  border: none;
  font-weight: 600;
  border-radius: 5px;
  font-family: 'Jua', sans-serif;
}

.memberJ-rulecontainer__label--move {
  margin-left: -290px;
}

.memberJ-buttoncontainer {
  height: 100px;
  width: 500px;
}

.memberJ-buttoncontainer__input--blue {
  height: 48px;
  width: 457px;
  font-size: 24px;
  color: #ffffff;
  background-color: #0080c0;
  border: none;
  border-radius: 5px;
  font-family: 'Jua', sans-serif;
  margin-bottom: 100px;
}
</style>