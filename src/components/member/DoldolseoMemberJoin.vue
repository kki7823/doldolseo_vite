<template>
  <div class="memberJ-container">
    <loading :active="isLoading"
             :is-full-page="false"
             :opacity="0.7">
    </loading>
    <div class="memberJ--logobox">
      <img id="logoImg"
           :src="getImgUrl('member/logo.png')"
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
             @input="validateId(id)"
             @focusout="checkDuplicateId(id)"
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
             @focusin="validatePwd(password)"
             @input="validatePwd(password)"
             @keyup="confirmPwd(password, passwordConfirm)"
      />
      <p class="msg">
        {{ pwdValidateMsg }}
      </p>
      <h4>비밀번호 확인</h4>
      <input type="password"
             class="memberJ-container--praram"
             maxlength="30"
             ref="focusPwConfirm"
             :style="{backgroundImage: pwdConfirmLockImgUrl}"
             v-model="passwordConfirm"
             @focusin="confirmPwd(password, passwordConfirm)"
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
             ref="focusName"
             v-model="name"
             @focusin="validateName(name)"
             @input="validateName(name)"
      />
      <p class="msg">
        {{ nameValidateMsg }}
      </p>
      <h4>닉네임</h4>
      <input type="text"
             class="memberJ-container--praram"
             v-model="nickname"
             ref="focusNickname"
             maxlength="20"
             @focusin="checkDuplicateNickname(nickname)"
             @input="validateNickname(nickname)"
             @focusout="checkDuplicateNickname(nickname)"
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
               ref="focusYear"
               placeholder="년"
               @focusin="validatebirth(year, month, day)"
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
               @input="validatebirth(year, month, day)"
        />
      </div>
      <p class="msg">
        {{ birthValidateMsg }}
      </p>
      <!-- 성별 입력 -->
      <h4>성별</h4>
      <select class="memberJ-namecontainer__gender--blue"
              v-model="gender"
              ref="focusGender">
        <option value="M" selected="selected">남자</option>
        <option value="F">여자</option>
      </select>
    </div>

    <!-- 프로필 사진 등록 -->
    <div class="memberJ-imgcontainer">
      <h4>프로필 사진 (선택)</h4>
      <img class="memberJ-imgcontainer__img-small"
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
             ref="focusEmail"
             @focusin="validateEmail(email)"
             @input="validateEmail(email)"
      />
      <p class="msg">
        {{ emailValidateMsg }}
      </p>

      <h4>연락처 (선택)</h4>
      <input type="tel"
             class="memberJ-container--praram"
             v-model="phone"
             maxlength="30"
             @focusin="validatephone(phone)"
             @keyup="validatephone(phone)"
      />
      <p class="msg">
        {{ phoneValidateMsg }}
      </p>
    </div>

    <div class="memberJ-rulecontainer">
      <button type="button"
              @click="popupVal_Policy = !popupVal_Policy">
        이용방침
      </button>
      <doldolseo-member-policy v-if="popupVal_Policy"
                               :toggle-popup="togglePopup_Policy"
      />
      <button type="button"
              @click="popupVal_Rule = !popupVal_Rule">
        가입약관
      </button>
      <doldolseo-member-rule v-if="popupVal_Rule"
                             :toggle-popup="togglePopup_Rule"
      />
      <br/>
      <label class="memberJ-rulecontainer__label--move">
        <input type="checkbox"
               class="memberJ-container__input--focus"
               v-model="agreeTerm"
               ref="focusAgreeTerms"
               @change="agreeTermMsg = ''"
        />
        위 내용에 동의합니다.
      </label>
      <p class="msg">
        {{ agreeTermMsg }}
      </p>
    </div>

    <div class="memberJ-buttoncontainer">
      <input type="submit"
             class="memberJ-buttoncontainer__input--blue"
             value="회원가입"
             @click="sendJoinData(this)"
      />
    </div>
  </div>
</template>

<script>
import {inject, ref} from "vue";
import {axios} from "@bundled-es-modules/axios";
import {useRouter} from "vue-router";
import DoldolseoMemberPolicy from "./DoldolseoMemberPolicy.vue";
import DoldolseoMemberRule from "./DoldolseoMemberRule.vue";
import Loading from "vue3-loading-overlay";
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css';
import onError from "../../module/onError";

export default {
  name: "DoldolseoMemberJoin",
  components: {DoldolseoMemberRule, DoldolseoMemberPolicy, Loading},
  setup() {
    const getImgUrl = inject('getImgUrl')
    const isLoading = ref(false);

    const URL_MEMBER = inject('doldolseoMember')
    const URL_MEMBER_CHECK_ID = URL_MEMBER + '/check'
    const fullPage = ref(true);


    let checkValues = {
      id: false,
      password: false,
      passwordConfirm: false,
      name: false,
      nickname: false,
      birth: false,
      agreeTerms: false,
    }
    const id = ref('')
    const idMsgColor = ref('')
    const idValidateMsg = ref('')

    const validateId = (id) => {
      idMsgColor.value = 'red'
      checkValues.id = false
      const pattern = /^([a-z0-9]){4,20}$/
      if (id.length === 0) {
        idValidateMsg.value = "필수정보 입니다.";
      } else if (pattern.test(id) === false) {
        idValidateMsg.value = "ID는 4~20자의 영문, 숫자만 허용 됩니다."
      } else {
        checkValues.id = true
        idValidateMsg.value = "사용 가능한 ID 입니다"
        idMsgColor.value = 'green'
      }
    }

    const checkDuplicateId = (id) => {
      axios({
        method: 'post',
        url: URL_MEMBER_CHECK_ID,
        params: {
          id: id,
        }
      }).then((resp) => {
        console.log(URL_MEMBER_CHECK_ID + " 요청 성공 status : " + resp.status)
        const isExist = resp.data

        if (isExist) {
          idValidateMsg.value = "이미 사용중인 ID 입니다"
          idMsgColor.value = 'red'
          checkValues.id = false
        }
      }).catch((err) => {
        console.log(URL_MEMBER_CHECK_ID + " 요청 실패 status : " + err.response)
        onError.httpErrorException(err)
      })
    }

    const password = ref('')
    const pwdValidateMsg = ref('')
    const pwdLockImgUrl = ref('url(' + getImgUrl('member/lock/lock_basic.png') + ')')

    const validatePwd = (pwd) => {
      const pattern1 = /[0-9]/
      const pattern2 = /[a-zA-Z]/
      const pattern3 = /[~!@\#$%<>^&*]/
      if (pattern1.test(pwd) && pattern2.test(pwd) && pattern3.test(pwd) && pwd.length > 7 && pwd.length <= 20) {
        checkValues.password = true
        pwdValidateMsg.value = ''
        pwdLockImgUrl.value = 'url(' + getImgUrl('member/lock/lock_blue.png') + ')'
      } else {
        checkValues.password = false
        pwdValidateMsg.value = "8~20자 영문, 숫자, 특수문자를 사용하세요."
        pwdLockImgUrl.value = 'url(' + getImgUrl('member/lock/lock_red.png') + ')'
      }
    }

    const passwordConfirm = ref('')
    const pwdConfirmValidateMsg = ref('')
    const pwdConfirmLockImgUrl = ref('url(' + getImgUrl('member/lock/lock_basic.png') + ')')

    const confirmPwd = (pwd, pwdConfirm) => {
      if (pwd === pwdConfirm) {
        checkValues.passwordConfirm = true
        pwdConfirmValidateMsg.value = ''
        pwdConfirmLockImgUrl.value = 'url(' + getImgUrl('member/lock/lock_blue.png') + ')'
      } else {
        checkValues.passwordConfirm = false
        pwdConfirmValidateMsg.value = "비밀번호가 일치하지 않습니다."
        pwdConfirmLockImgUrl.value = 'url(' + getImgUrl('member/lock/lock_red.png') + ')'
      }
    }

    const name = ref('')
    const nameValidateMsg = ref('')

    const validateName = (name) => {
      if (name.length >= 2) {
        checkValues.name = true
        nameValidateMsg.value = ''
      } else {
        nameValidateMsg.value = "이름을 입력해 주세요."
      }
    }

    const nickname = ref('')
    const nicknameValidateMsg = ref('')

    const validateNickname = (nickname) => {
      if (nickname.length >= 2) {
        checkValues.nickname = true
        nicknameValidateMsg.value = ''
      } else {
        nicknameValidateMsg.value = "닉네임을 입력해 주세요."
      }
    }

    const checkDuplicateNickname = (nickname) => {
      axios({
        method: 'post',
        url: URL_MEMBER_CHECK_ID,
        params: {
          nickName: nickname,
        }
      }).then((resp) => {
        console.log(URL_MEMBER_CHECK_ID + " 요청 성공 status : " + resp.status)
        const isExist = resp.data

        if (isExist) {
          nicknameValidateMsg.value = "이미 사용중인 닉네임 입니다"
          checkValues.nickname = false
        }
      }).catch((err) => {
        console.log(URL_MEMBER_CHECK_ID + " 요청 실패 status : " + err.response)
        onError.httpErrorException(err)
      })
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
        checkValues.birth = true
        birthValidateMsg.value = ''
        birth = year + '-' + (month.length === 1 ? '0' + month : month) + '-' + (day.length === 1 ? '0' + day : day)
      } else {
        birthValidateMsg.value = "올바른 형식의 날짜를 입력해 주세요."
      }
    }

    const gender = ref('')

    const memberImgUrl = ref(getImgUrl('member/default_member.png'))
    let memberImgFile = null;

    const setMemberImg = (e) => {
      memberImgFile = e.target.files[0]

      if (!checkExt(memberImgFile)) return;
      if (!checkFileSize(memberImgFile)) return

      memberImgUrl.value = URL.createObjectURL(memberImgFile)
    }

    const checkFileSize = (file) => {
      if (file.size > 500000) {
        alert("이미지 사이즈는 500Kb 이내로 첨부 가능합니다. ")
        return false
      }
      return true
    }

    const checkExt = (file) => {
      const fileName = file.name
      const extList = ['jpg', 'jpeg', 'png', 'gif']
      const extIdx = fileName.lastIndexOf(".")
      const ext = fileName.substring(extIdx + 1, fileName.length).toLowerCase()

      if (extList.indexOf(ext) === -1) {
        alert("이미지 파일만 첨부 가능합니다.")
        return false
      }
      return true
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

    const agreeTerm = ref(false)
    const agreeTermMsg = ref('')

    const router = useRouter()

    const sendJoinData = (template) => {
      if (!validParams(template)) return

      isLoading.value = true;
      const formData = new FormData()
      formData.append('id', id.value)
      formData.append('password', password.value)
      formData.append('name', name.value)
      formData.append('nickname', nickname.value)
      formData.append('birth', birth)
      formData.append('memberImgFile', memberImgFile)
      formData.append('gender', gender.value)
      formData.append('email', email.value)
      formData.append('phone', phone.value)


      axios.post(URL_MEMBER, formData, {
        header: {
          'Content-Type': 'multipart/form-data'
        }
      }).then((resp) => {
        console.log(URL_MEMBER + " 요청 성공 status : " + resp.status)
        alert("회원가입이 완료 되었습니다.")
        isLoading.value = false
        router.replace('/member/login').then(() => {
        })
      }).catch((err) => {
        console.log(URL_MEMBER + " 요청 실패")
        onError.httpErrorException(err)
        isLoading.value = false
      })
    }

    const validParams = (template) => {
      if (id.value.length === 0 || checkValues.id === false) {
        template.$refs.focusId.focus()
        return false;
      } else if (password.value.length === 0 || checkValues.password === false) {
        template.$refs.focusPw.focus()
        return false;
      } else if (passwordConfirm.value.length === 0 || checkValues.passwordConfirm === false) {
        template.$refs.focusPwConfirm.focus()
        return false;
      } else if (name.value.length === 0) {
        template.$refs.focusName.focus()
        return false;
      } else if (nickname.value.length === 0 || checkValues.nickname === false) {
        template.$refs.focusNickname.focus()
        return false;
      } else if (year.value.length === 0 || month.value.length === 0 || day.value.length === 0 || checkValues.birth === false) {
        template.$refs.focusYear.focus()
        return false;
      } else if (email.value.length === 0) {
        template.$refs.focusEmail.focus()
        return false;
      } else if (agreeTerm.value === false) {
        template.$refs.focusAgreeTerms.focus()
        agreeTermMsg.value = '이용약관에 동의하여 주세요.'
        return false;
      }
      console.log("all parameters are valid")
      return true
    }

    const popupVal_Policy = ref(false)
    const togglePopup_Policy = () => {
      popupVal_Policy.value = !popupVal_Policy.value
    }

    const popupVal_Rule = ref(false)
    const togglePopup_Rule = () => {
      popupVal_Rule.value = !popupVal_Rule.value
    }

    return {
      getImgUrl,
      isLoading,
      fullPage,

      id,
      idMsgColor,
      idValidateMsg,
      validateId,
      checkDuplicateId,
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
      checkDuplicateNickname,
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
      agreeTerm,
      agreeTermMsg,
      URL_MEMBER,
      sendJoinData,
      popupVal_Policy,
      togglePopup_Policy,
      popupVal_Rule,
      togglePopup_Rule,
    }
  }
}
</script>

<style scoped>
.memberJ-container {
  min-width: 1300px;
  margin: auto;
  text-align: center;
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: #f2f2f2;
  padding-top: 50px;
  padding-bottom: 40px;
  position: relative;
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
  margin-bottom: 20px;
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
  display: block;
  margin: 0 auto;
  text-align: left;
  width: 460px;
  /*border: 1px solid;*/
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