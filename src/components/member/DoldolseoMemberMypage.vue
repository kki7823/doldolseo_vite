<template>
  <div class="mypageD-mypagecontainer">
    <doldolseo-member-mypage-nav/>

    <!-- 마이페이지 상세 -->
    <div class="mypageD-container">
      <div class="mypageD-titlecontainer">
        <span class="mypageD-titlecontainer__span--big">내 정보</span>
        <span class="mypageD_span"> (*) : 수정 가능</span>
      </div>

      <!-- 개인 정보 수정-->
      <div class="mypageD-infocontainer">
        <div class="mypageD-userbox">

          <div class="mypageD-imgbox">
            <span class="mypageD-imgbox__span--move">사진 *(선택)</span>
            <img class="mypageD-imgbox__img--small"
                 :src="memberImgUrl"
                 alt="profile"
            />
            <label for="img" class="mypageD-imgbox__label--big">업로드</label>
            <input type="file"
                   class="mypageD-imgbox__input--disapear"
                   id="img"
                   accept="image/*"
                   @change="setMemberImg"
            />
          </div>

          <div class="mypageD-infobox">
            <span class="mypageD-infocontainer__span--move">아이디</span>
            <input type="text"
                   class="mypageD-infocontainer__input--big"
                   :value="id"
                   readonly="readonly"
            />
          </div>
          <div class="mypageD-infobox">
            <span class="mypageD-infocontainer__span--move">이름</span>
            <input type="text"
                   class="mypageD-infocontainer__input--big"
                   :value="name"
                   readonly="readonly"
            />
          </div>

          <div class="mypageD-infobox">
            <span class="mypageD-infocontainer__span--move">닉네임</span>
            <input type="text"
                   class="mypageD-infocontainer__input--big"
                   :value="nickname"
                   readonly="readonly"
            />
          </div>

          <div class="mypageD-infobox">
            <span class="mypageD-infocontainer__span--move">이메일 *</span>
            <input type="email"
                   class="mypageD-infocontainer__input--big"
                   v-model="email"
            />
          </div>
        </div>

        <div class="mypageD-userbox2">
          <div class="mypageD-userbox2--margin">
            <div class="mypageD-infobox--top">
              <div class="mypageD-infobox">
                <span class="mypageD-infobox__span--move">비밀번호 *</span>
                <input type="password"
                       class="mypageD-infocontainer__input--big"
                       v-model="password"
                       ref="focusPw"
                       placeholder="●●●●●●●●●"
                />
              </div>

              <div class="mypageD-infobox">
                  <span class="mypageD-infobox__span--move"
                        id="mypageD-infobox__span--move">
                    비밀번호 확인
                  </span>
                <input type="password"
                       class="mypageD-infocontainer__input--big"
                       v-model="passwordConfirm"
                       ref="focusPwConfirm"
                       placeholder="●●●●●●●●●"
                />
              </div>
            </div>

            <div class="mypageD-infobox--down">
              <div class="mypageD-infobox">
                <span class="mypageD-infobox__span--down">생년월일</span>
                <div class="mypageD-infobox__inputbox">
                  <input type="text"
                         name="yy"
                         class="mypageD-infobox__input-big"
                         :value="birth_yy"
                         readonly="readonly"
                  />
                  <input type="text"
                         name="mm"
                         class="mypageD-infobox__input-big"
                         :value="birth_mm"
                         readonly="readonly"
                  />
                  <input type="text"
                         name="dd"
                         class="mypageD-infobox__input-big"
                         :value="birth_dd"
                         readonly="readonly"
                  />
                  <input type="hidden"
                         name="birth"
                         value=""
                  />
                </div>
              </div>

              <div class="mypageD-infobox">
                <span class="mypageD-infobox__span--down">성별 *</span>
                <select class="mypageD-infocontainer__span--big"
                        v-model="gender">
                  <option value="M" selected="selected">남자</option>
                  <option value="F">여자</option>
                </select>
              </div>

              <div class="mypageD-infobox">
                <span class="mypageD-infobox__span--down">전화번호 *(선택)</span>
                <input type="tel"
                       class="mypageD-infocontainer__input--big"
                       v-model="phone"
                       pattern="[0-9]{11}"
                />
              </div>
            </div>

            <div class="mypageD-buttonbox">
              <input type="button"
                     value="수정 완료"
                     class="mypageD-buttonbox__button--blue"
                     @click="updateData(this)"
              />
              <input type="button"
                     value="회원 탈퇴"
                     class="mypageD-buttonbox__button--gray"
                     @click="deleteData(this)"
              />
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- // 마이페이지 상세 -->

</template>

<script>
import DoldolseoMemberMypageNav from "./DoldolseoMemberMypageNav.vue";
import {inject, ref} from "vue";
import {axios} from "@bundled-es-modules/axios";
import {useCookies} from "vue3-cookies";
import {useRouter} from "vue-router";
import login from "../../module/login";

export default {
  name: "DoldolseoMemberMypage",
  components: {DoldolseoMemberMypageNav},
  setup() {
    const URL_MEMBER_IMAGES = inject('doldolseoMember') + '/images/'
    const router = useRouter()

    const id = localStorage.getItem('id')
    const password = ref(null)
    const passwordConfirm = ref(null)
    const name = localStorage.getItem('name')
    const nickname = localStorage.getItem('nickname')
    const memberImg = localStorage.getItem('memberImg')
    const birth = localStorage.getItem('birth')
    const gender = ref(localStorage.getItem('gender'))
    const email = ref(localStorage.getItem('email'))
    const phone = ref(localStorage.getItem('phone'))
    const isCrewLeader = localStorage.getItem('isCrewLeader')
    let birth_yy = ''
    let birth_mm = ''
    let birth_dd = ''
    if (birth !== null) {
      birth_yy = birth.split('-')[0]
      birth_mm = birth.split('-')[1]
      birth_dd = birth.split('-')[2].substring(0, 2)
    }

    const memberImgUrl = ref(URL_MEMBER_IMAGES + memberImg)
    let memberImgFile = null

    const setMemberImg = (e) => {
      memberImgFile = e.target.files[0]
      memberImgUrl.value = URL.createObjectURL(memberImgFile)
    }


    const validatePwd = () => {
      const pwd = password.value
      const pattern1 = /[0-9]/
      const pattern2 = /[a-zA-Z]/
      const pattern3 = /[~!@\#$%<>^&*]/
      if (pattern1.test(pwd) && pattern2.test(pwd) && pattern3.test(pwd) && pwd.length > 7 && pwd.length <= 20) {
        return true
      } else {
        alert("비밀번호는 8~20자 영문, 숫자, 특수문자만 허용됩니다.")
        return false
      }
    }

    const confirmPwd = () => {
      if (password.value === passwordConfirm.value) {
        return true
      } else {
        alert("비밀번호와 확인값이 일치하지 않습니다.")
        return false
      }
    }

    const URL_MEMBER = inject('doldolseoMember')
    const {cookies} = useCookies()

    const updateData = (template) => {
      if (password.value !== null) {
        if (!validatePwd()) {
          template.$refs.focusPw.focus()
          return
        }

        if (!confirmPwd()) {
          template.$refs.focusPwConfirm.focus()
          return
        }
      }

      const formData = new FormData()
      if (password.value !== null) {
        formData.append('password', password.value)
      }
      if (memberImgFile !== null) {
        formData.append('memberImgFile', memberImgFile)
      }
      formData.append('gender', gender.value)
      formData.append('email', email.value)
      formData.append('phone', phone.value)

      axios.put(URL_MEMBER + '/' + id, formData, {
        headers: {
          Authorization: 'Bearer ' + cookies.get('token'),
          'Content-Type': 'multipart/form-data',
        },
      }).then((resp) => {
        console.log(URL_MEMBER + '/' + id + " 요청 성공 status : " + resp.status)
        console.log(resp.data)
        localStorage.setItem('gender', resp.data.gender)
        localStorage.setItem('email', resp.data.email)
        localStorage.setItem('phone', resp.data.phone)
        localStorage.setItem('memberImg', resp.data.memberImg)
        template.$forceUpdate()
        location.reload();
        alert('회원정보 수정이 완료 되었습니다.')
      }).catch(() => {
        console.log(URL_MEMBER + '/' + id + " 요청 실패")
      })
    }

    const deleteData = () => {
      if (isCrewLeader) {
        alert("크루장인 경우, 탈퇴가 불가합니다. 크루장을 위임해주시길 바랍니다.");
      } else {
        if (!confirm("탈퇴하시면 복구할 수 없습니다. 정말로 탈퇴하시겠습니까?")) {
          return false;
        } else {
          axios.delete(URL_MEMBER + '/' + id, {
            headers: {
              Authorization: 'Bearer ' + cookies.get('token'),
            },
          }).then((resp) => {
            console.log(URL_MEMBER + '/' + id + " 요청 성공 status : " + resp.status)
            localStorage.setItem('loginState', 'resign')
            localStorage.removeItem('id')
            localStorage.removeItem('nickname')
            localStorage.removeItem('memberImg')
            localStorage.removeItem('birth')
            localStorage.removeItem('gender')
            localStorage.removeItem('email')
            localStorage.removeItem('phone')
            localStorage.removeItem('isCrewLeader')
            cookies.remove('token')
            login.refreshKey++

            router.replace('/main').then(() => {
              alert("탈퇴처리가 완료되었습니다. 이용해주셔서 감사합니다.")
              location.reload()
            })
          }).catch(() => {
            console.log(URL_MEMBER + '/' + id + " 요청 실패")
          })
        }
      }
    }

    return {
      id,
      password,
      passwordConfirm,
      name,
      nickname,
      birth_yy,
      birth_mm,
      birth_dd,
      gender,
      email,
      phone,
      memberImgUrl,
      setMemberImg,
      updateData,
      deleteData,
    }
  }
}

</script>

<style scoped>
.mypageD-titlecontainer__span--big, .mypageD-crewcontainer__span--big, .mypageD-boardcontainer__span--big, .mypageD-boardcontainer__span--big {
  font-family: 'Jua', sans-serif;
}

.mypageD-mypagecontainer {
  width: 1300px;
  margin: 0 auto;
  position: relative;
  height: 730px;
  /*border: 1px solid;*/
}

.mypageD-container {
  width: 1070px;
  display: inline-block;
  position: absolute;
  top: 40px;
  right: 0;
}

.mypageD-titlecontainer {
  width: 100%;
  height: 85px;
  border-top: 2px solid #cacdd1;
  border-left: 2px solid #cacdd1;
  border-right: 2px solid #cacdd1;
  border-radius: 20px 20px 0 0;
}

.memberL-header__div .headerM-weatherBox__text {
  line-height: 17px;
}

.mypageD-titlecontainer__span--big {
  font-size: 34px;
  font-weight: bold;
  display: inline-block;
  margin: 23px 10px 0 26px;
}

.mypageD_span {
  font-family: 'Jua', sans-serif;
}

.mypageD-infocontainer {
  height: 540px;
  border: 2px solid #cacdd1;
  width: 100%;
  border-radius: 0 0 20px 20px;
}

.mypageD-userbox {
  width: 500px;
  height: 530px;
  display: inline-block;
  margin-left: 13px;
  /*border: 1px solid;*/
}


.mypageD-imgbox {
  height: 220px;
  width: 440px;
  margin: 0 auto 25px;
  border-bottom: 2px solid #cacdd1;
  position: relative;
  /*border: 1px solid;*/
}

.mypageD-imgbox__span--move {
  font-size: 15px;
  font-weight: 600;
  position: absolute;
  left: 1%;
  top: 45%;
}

.mypageD-imgbox__img--small {
  width: 120px;
  height: 120px;
  border-radius: 60px;
  border: 3px solid #dadce0;
  position: absolute;
  right: 30%;
  top: 22%;
}

.mypageD-imgbox__label--big {
  color: #ffffff;
  background-color: #1b3067;
  height: 45px;
  width: 100px;
  line-height: 45px;
  text-align: center;
  font-size: 18px;
  border-radius: 5px;
  font-family: 'Jua', sans-serif;
  cursor: pointer;
  position: absolute;
  right: 1%;
  top: 40%;
}

.mypageD-imgbox__input--disapear {
  width: 0;
  height: 0;
  overflow: hidden;
  border: 0;
}

.mypageD-infobox {
  height: 60px;
  width: 440px;
  margin: 0 auto;
  position: relative;
  /*border: 1px solid;*/
}

.mypageD-infocontainer__span--move {
  width: 140px;
  font-size: 15px;
  display: inline-block;
  font-weight: 600;
  position: absolute;
  left: 1%;
  top: 35%;
  /*background-color: red;*/
}

.mypageD-userbox2 {
  width: 540px;
  height: 530px;
  border-left: 2px solid #dadce0;
  float: right;
  /*border: 1px solid;*/
}

.mypageD-userbox2--margin {
  margin-top: 50px;
}

.mypageD-infobox__span--move {
  width: 140px;
  font-size: 15px;
  font-weight: 600;
  position: absolute;
  left: 1%;
  top: 35%;
  /*background-color: red;*/
}


.mypageD-infobox__span--down {
  width: 140px;
  font-size: 15px;
  font-weight: 600;
  position: absolute;
  top: 35%;
  left: 1%;
  /*background-color: deeppink;*/
}

.mypageD-infobox--top {
  width: 440px;
  border-bottom: 2px solid #bcbcbc;
  padding-bottom: 20px;
  margin: 0 auto;
  /*border: 1px solid;*/
}

.mypageD-infobox--down {
  margin-top: 20px;
}

.mypageD-infocontainer__input--big {
  height: 30px;
  width: 250px;
  border: 2px solid #dadce0;
  font-size: 15px;
  border-radius: 4px;
  position: absolute;
  right: 1%;
  top: 21%;
}

.mypageD-infocontainer__input--big:focus, .mypageD-infobox__input-big:focus {
  border: 2px solid #0080c0;
  outline: none;
  box-shadow: 1px 1px 1px gray;
}

.mypageD-infobox__inputbox {
  position: absolute;
  right: 1%;
  top: 20%;
}

.mypageD-infobox__inputbox .mypageD-infobox__input-big {
  margin-left: 5px;
}

.mypageD-infobox__input-big {
  width: 75px;
  height: 30px;
  border: 2px solid #dadce0;
  font-size: 15px;
  border-radius: 4px;
}

.mypageD-infobox__select-small {
  width: 89px;
  height: 36px;
  border: 2px solid #dadce0;
  font-size: 15px;
  border-radius: 4px;
}

.mypageD-infobox__select-small:focus, .mypageD-infocontainer__span--big:focus {
  border: 2px solid #0080c0;
  outline: none;
  box-shadow: 1px 1px 1px gray;
}

.mypageD-infocontainer__span--big {
  height: 35px;
  width: 259px;
  border: 2px solid #dadce0;
  font-size: 15px;
  border-radius: 4px;
  position: absolute;
  right: 1%;
  top: 20%;
}

.mypageD-buttonbox {
  margin: 25px auto;
  text-align: center;
}

.mypageD-buttonbox input {
  margin: 10px;
}

.mypageD-buttonbox__button--blue {
  margin: 20px auto;
  width: 170px;
  height: 50px;
  color: #ffffff;
  background-color: #1b3067;
  border: none;
  border-radius: 5px;
  font-size: 19px;
  font-family: 'Jua', sans-serif;
  cursor: pointer;
}

.mypageD-buttonbox__button--gray {
  margin: 20px auto;
  width: 170px;
  height: 50px;
  color: #ffffff;
  background-color: #909090;
  border: none;
  border-radius: 5px;
  font-size: 19px;
  font-family: 'Jua', sans-serif;
  cursor: pointer;
}

.mypageD-crewcontainer {
  width: 900px;
  margin: 70px 0 70px 0;
  border: 2px solid #dadce0;
  border-radius: 15px;
}

.mypageD-crewcontainer__span--big {
  font-size: 34px;
  font-weight: bold;
  display: inline-block;
  margin: 10px 0 10px 26px;
  font-family: 'Jua', sans-serif;
}

.mypageD-crewlistbox__span--none {
  font-size: 20px;
  font-weight: bold;
  display: inline-block;
  position: absolute;
  top: 60px;
  left: 300px;
}

.mypageD-crewlistbox {
  height: 150px;
  border-top: 2px solid #dadce0;
  position: relative;
}

.mypageD-crewlistbox__span--big {
  display: inline-block;
  margin-left: 100px;
  vertical-align: 60px;
  font-size: 18px;
  font-weight: 600;
}

.mypageD-crewlistbox__a--big {
  margin: 0 0 0 130px;
}

.mypageD-crewlistbox__img--big {
  width: 110px;
  height: 110px;
  border: 3px solid #dadce0;
  margin: 15px auto;
  border-radius: 60px;
}

.mypageD-crewlistbox__button--blue {
  width: 150px;
  height: 50px;
  text-align: center;
  border: none;
  border-radius: 5px;
  background-color: #0080c0;
  color: white;
  position: absolute;
  top: 50px;
  right: 140px;
  font-size: 16px;
  font-family: 'Jua', sans-serif;
  cursor: pointer;
}

.mypageD-boardcontainer {
  width: 900px;
  height: 280px;
  margin-bottom: 100px;
}

.mypageD-crewpostcontainer {
  width: 900px;
  height: 280px;
  margin-bottom: 80px;
}

.mypageD-crewcommentcontainer {
  width: 900px;
  height: 280px;
}

.mypageD-commentcontainer {
  width: 900px;
  height: 280px;
  margin-bottom: 80px;
}

.mypageD-boardcontainer__span--big {
  font-size: 34px;
  font-weight: bold;
  display: inline-block;
  margin: 10px 0 10px 26px;
}

.mypageD-boardbox {
  width: 100%;
  height: 230px;
}

.mypageD-boardbox__table--big {
  width: 100%;
  border-collapse: collapse;
  text-align: center;
  font-size: 14px;
}

.mypageD-boardbox__tr--blue {
  width: 100%;
  height: 35px;
  background-color: #5882fa;
  color: #a9e2f3;
}


.mypageD-boardbox__td--num {
  width: 15%;
}

.mypageD-boardbox__td--title {
  width: 60%;
}

.mypageD-boardbox__tr--white {
  height: 35px;
}

.mypageD-boardbox__td--none {
  font-weight: 600;
  border-bottom: 2px solid #dadce0;
}

.mypageD-boardbox__td--white {
  border-bottom: 2px solid #dadce0;
}

.mypageD-boardbox__a--white:link {
  font-weight: 600;
  text-decoration: none;
  color: black;
}

.mypageD-boardbox__a--white:visited {
  text-decoration: none;
  color: black;
}

.mypageD-boardbox__a--white:hover {
  text-decoration: none;
  color: black;
}

.mypageD-boardpage {
  text-align: center;
  list-style-type: none;
  margin: 20px auto;
  font-size: 0;
}

.mypageD-boardpage__li--link {
  display: inline-block;
  width: 30px;
  height: 22px;
  border-top: 2px solid #dadce0;
  border-bottom: 2px solid #dadce0;
  border-left: 1px solid #dadce0;
  border-right: 1px solid #dadce0;
  font-size: 16px;
  margin: 0 auto;
}

.mypageD-boardpage__a--num:link {
  text-decoration: none;
  color: black;
  font-weight: 600;
}

.mypageD-boardpage__a--num:visited {
  text-decoration: none;
  color: black;
}

.mypageD-boardpage__a--num:hover {
  text-decoration: none;
  color: black;
}

.mypageD-footer {
  clear: both;
}
</style>