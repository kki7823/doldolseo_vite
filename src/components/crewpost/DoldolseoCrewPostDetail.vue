<template>
  <section class="crew-mainContainer">
    <doldolseo-crew-nav/>
    <!-- 상단 제목,드릴다운 : 공통 -->
    <div class="crew-topContainer">
      <!-- 제목 -->
      <div class="common-top__title">
        크루 활동
      </div>
      <!-- 게시판 드릴다운 -->
      <span class="common-top__drilldownbox">
        <router-link :to="{name: 'crewList'}"
                     style="color: #ff8000">
          크루 게시판
        </router-link>
        <span> > </span>
        <router-link :to="{name: 'crewPostList'}"
                     style="color: #6E6E6E">
          크루 활동
        </router-link>
      </span>
    </div>

    <!-- 크루활동 게시판 네비 바 : 전체/맛집/쇼핑/문화/자유 -->
    <div class="cBoard-nav">
      <span @click="category=0">전체</span>
      <span v-for="(categoryNo, idx) in categoryMenu"
            @click="category=idx">
        {{ categoryNo }}
      </span>
    </div>

    <!-- 글 수정 및 삭제 버튼 -->
    <div v-if="writerId === idLogedIn"
         class="cBoardD-btnbox-edit">
      <router-link :to="{name: 'crewPostUpdate', params:{ crewPostNo: crewPostNo, }}">
        <button class="crew-button"
                style="margin-right: 10px;">수정 하기
        </button>
      </router-link>
      <button class="crew-button"
              @click="deleteCrewPostData()">
        글 삭제
      </button>
    </div>
    <div v-else style="height: 50px">
    </div>
    <!-- 상세 글 목록  -->
    <table class="cBoardD-tablelayout">
      <!-- 글상단 : 프로필 박스 + 댓글 및 조회수 -->
      <tr class="common-tbl__item">
        <td>
          <!-- 프로필 박스 : 회원사진, 닉네임, 작성날짜-->
          <div class="profilebox">
            <!-- 회원사진 -->
            <div class="profilebox--photo">
              <img :src="URL_MEMBER_IMAGES+writerId"
                   alt="profile">
            </div>
            <!-- 닉네임 + 작성날짜 컨테이너 -->
            <div class="profilebox--container--sub">
              <!-- 닉네임 -->
              <div class="profilebox--nickname">
                {{ writerId }}
              </div>
              <!-- 작성날짜 -->
              <div class="profilebox--wdate">
                {{ wdate[0] + '-' + wdate[1] + '-' + wdate[2] }}
              </div>
            </div>
          </div>

          <!-- 댓글 수 , 조회수 표시 -->
          <div class="iconbox">
            <div class="iconbox__comment">
              <!-- 댓글 아이콘 - bootstrap-->
              <svg xmlns="http://www.w3.org/2000/svg"
                   width="30"
                   height="30"
                   fill="#FF8000"
                   class="bi bi-chat-square-text-fill"
                   viewBox="0 0 16 16">
                <path
                    d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.5a1 1 0 0 0-.8.4l-1.9 2.533a1 1 0 0 1-1.6 0L5.3 12.4a1 1 0 0 0-.8-.4H2a2 2 0 0 1-2-2V2zm3.5 1a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9zm0 2.5a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9zm0 2.5a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5z"
                />
              </svg>
            </div>
            <div class="iconbox__commentcount">
              {{numOfComments}}
            </div>

            <div class="iconbox__hit">
              <!-- 조회수 아이콘 - bootstrap-->
              <svg xmlns="http://www.w3.org/2000/svg"
                   width="30"
                   height="30"
                   fill="#FF8000"
                   class="bi bi-hand-index-fill"
                   viewBox="0 0 16 16">
                <path
                    d="M8.5 4.466V1.75a1.75 1.75 0 1 0-3.5 0v5.34l-1.2.24a1.5 1.5 0 0 0-1.196 1.636l.345 3.106a2.5 2.5 0 0 0 .405 1.11l1.433 2.15A1.5 1.5 0 0 0 6.035 16h6.385a1.5 1.5 0 0 0 1.302-.756l1.395-2.441a3.5 3.5 0 0 0 .444-1.389l.271-2.715a2 2 0 0 0-1.99-2.199h-.581a5.114 5.114 0 0 0-.195-.248c-.191-.229-.51-.568-.88-.716-.364-.146-.846-.132-1.158-.108l-.132.012a1.26 1.26 0 0 0-.56-.642 2.632 2.632 0 0 0-.738-.288c-.31-.062-.739-.058-1.05-.046l-.048.002z"
                />
              </svg>
            </div>
            <div class="iconbox__hitcount">
              {{ hit }}
            </div>
          </div>
        </td>
      </tr>

      <!-- 글 제목 -->
      <tr class="common-tbl__item">
        <td style="position: relative">
          <span class="cBoard__title">
            {{ title }}
          </span>
          <div class="cBoardD-box--crewWith">
            <button class="cBoardD-btn-crewWith"
                    @click="isClicked_membersWith = !isClicked_membersWith">
              <!-- 함께한 크루원 아이콘 -->
              <svg xmlns="http://www.w3.org/2000/svg"
                   width="22"
                   height="22"
                   fill="currentColor"
                   class="bi bi-people-fill"
                   viewBox="0 0 16 16">
                <path
                    d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"
                />
                <path fill-rule="evenodd"
                      d="M5.216 14A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216z"
                />
                <path
                    d="M4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"
                />
              </svg>
            </button>

            <!-- 함께한 크루원 리스트 -->
            <div v-if="isClicked_membersWith"
                 class="cBoardD-box-crewMemberList">
              <!-- 추가된 크루원 -->
              <div v-for="member in taggedMembers"
                   class="crew-withMember--idbox">
                <div class="crew-member--photo">
                  <img :src="URL_MEMBER_IMAGES+member.memberId"
                       alt="profile"
                  />
                </div>
                <div class="cBoard__nickName">
                  {{ member.memberId }}
                  <span v-if="writerId === idLogedIn"
                        class='common-deleteMark--x'
                        @click="deleteMemberData(member.memberId)">&Cross;
                  </span>
                </div>
              </div>
              <div v-if="writerId === idLogedIn"
                   class="crew-withMember--idbox">
                <select @change="addMemberData(seletedCrewMember)"
                        v-model="seletedCrewMember"
                        style="width: 200px">
                  <option selected="selected"
                          :value="undefined">
                    함께한 크루원 추가
                  </option>
                  <option v-for="crewMember in crewMembers"
                          :value="crewMember.memberId">
                    {{ crewMember.memberId }}
                  </option>
                </select>
              </div>
            </div>
          </div>
        </td>
      </tr>

      <!-- 글 내용 -->
      <tr class="common-tbl__item">
        <td>
          <div class="common-contents"
               v-html="content"
          />
        </td>
      </tr>
      <loading :active="isLoading"
               :is-full-page="false"
               :opacity="1.0">
      </loading>
    </table>

    <!-- 댓글 창-->
    <div class="cBoardD-comment__banner">
      <div class="common-top__title"
           style="font-size: 35px; color: #FF8000">
        COMMENT
      </div>

    </div>
    <hr class="line--horizon" style="width:1000px ">

    <!-- 댓글 구현 -->
    <doldolseo-crew-post-comment :crew-post-no="crewPostNo"/>

  </section>
</template>

<script>
import DoldolseoCrewNav from "../crew/DoldolseoCrewNav.vue";
import DoldolseoCrewPostComment from "./DoldolseoCrewPostComment.vue";
import {inject, onMounted, provide, ref} from "vue";
import {axios} from "@bundled-es-modules/axios";
import {useRouter} from "vue-router";
import onError from "../../module/onError";
import Loading from 'vue3-loading-overlay';
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css';

export default {
  name: "DoldolseoCrewPostDetail",
  components: {DoldolseoCrewPostComment, DoldolseoCrewNav, Loading},
  props: {
    crewPostNo: {
      type: String,
      require: true
    }
  },
  setup(props) {
    const isLoading = ref(false)
    const toggleLoading = ()=>{
      isLoading.value = !isLoading.value
    }

    const cookies = inject('cookies')
    const URL_MEMBER_IMAGES = inject('doldolseoMember')+'/images/'
    const URL_GET_CREW_POST = inject('doldolseoCrewPost') + '/' + props.crewPostNo
    const URL_CREW = inject('doldolseoCrew')
    const URL_CREWPOST = inject('doldolseoCrewPost')
    const categoryMenu = inject('crew_categoryMenu')
    const router = useRouter();

    const crewPostNo = ref(0)
    const title = ref('')
    const wdate = ref([])
    const content = ref('')
    const writerId = ref('')
    const imageUUID = ref('')
    const hit = ref('')
    const taggedMembers = ref([])

    const numOfComments = ref(0)
    provide('numOfComments',numOfComments)

    const isClicked_membersWith = ref(false)
    const idLogedIn = ref(localStorage.getItem('id'))

    onMounted(() => {
      getCrewPostAndMembers()
    })

    const crewMembers = ref([])

    const getCrewPostAndMembers = async () => {
      // 크루 게시글 상세 정보 , 크루원정보 request
      try {
        await toggleLoading()

        const respCrewPost = await axios({
          method: 'get',
          url: URL_GET_CREW_POST,
          headers: {
            Authorization: 'Bearer ' + cookies.get('token'),
          },
          params: {
            doHit: 'yes'
          }
        })

        crewPostNo.value = respCrewPost.data.crewPost.crewPostNo
        title.value = respCrewPost.data.crewPost.title
        content.value = respCrewPost.data.crewPost.content
        writerId.value = respCrewPost.data.crewPost.writerId
        imageUUID.value = respCrewPost.data.crewPost.imageUUID
        wdate.value = respCrewPost.data.crewPost.wdate
        hit.value = respCrewPost.data.crewPost.hit
        taggedMembers.value = respCrewPost.data.taggedMemberList

        const crewNo = respCrewPost.data.crewPost.crewNo

        const respCrewMember = await axios({
          method: 'get',
          url: URL_CREW + '/' + crewNo + '/members',
          headers: {
            Authorization: 'Bearer ' + cookies.get('token'),
          },
          params: {
            exceptSelf: "y",
          }
        })

        crewMembers.value = respCrewMember.data
        await toggleLoading()

        const removeAlreadyAddedMember = (crewMembers) => {
          for (let i = 0; i < crewMembers.length; i++) {
            for (let j = 0; j < taggedMembers.value.length; j++)
              if (taggedMembers.value[j].memberId === crewMembers[i].memberId) {
                crewMembers.splice(i, 1)
              }
          }
        }

        await removeAlreadyAddedMember(crewMembers.value)
      } catch (err) {
        onError.httpErrorException(err)
      }
    }

    const deleteCrewPostData = () => {
      if (!confirm("게시글을 삭제 하시겠습니까?")) return

      axios({
        method: 'delete',
        url: URL_GET_CREW_POST,
        headers: {
          Authorization: 'Bearer ' + cookies.get('token'),
        },
      }).then((resp) => {
        console.log(URL_GET_CREW_POST + ": 게시글 삭제" + resp.status)
        alert("게시글이 삭제 되었습니다.")
        router.replace('/crew/post/').then(() => {
        })
      }).catch((err) => {
        console.log(URL_GET_CREW_POST + ": 게시글 삭제 실패")
        onError.httpErrorException(err)
      })
    }

    const seletedCrewMember = ref('')

    const addMemberData = (memberId) => {
      if (memberId === '' || memberId === undefined) return

      axios({
        method: 'post',
        url: URL_CREWPOST + '/' + crewPostNo.value + '/member',
        headers: {
          Authorization: 'Bearer ' + cookies.get('token'),
        },
        params: {
          memberId: memberId
        },
      }).then((resp) => {
        console.log(URL_CREWPOST + '/' + crewPostNo.value + '/member' + " 요청 성공" + resp.status)
        getCrewPostAndMembers()
      }).catch((err) => {
        console.log(URL_CREWPOST + '/' + crewPostNo.value + '/member' + " 요청 실패")
        onError.httpErrorException(err)
      })
    }

    const deleteMemberData = (memberId) => {
      axios({
        method: 'delete',
        url: URL_CREWPOST + '/' + crewPostNo.value + '/member',
        headers: {
          Authorization: 'Bearer ' + cookies.get('token'),
        },
        params: {
          memberId: memberId
        },
      }).then((resp) => {
        console.log(URL_CREWPOST + '/' + crewPostNo.value + '/member', +" 요청 성공" + resp.status)
        getCrewPostAndMembers()
      }).catch((err) => {
        console.log(URL_CREWPOST + '/' + crewPostNo.value + '/member', +" 요청 실패")
        onError.httpErrorException(err)
      })
    }

    return {
      isLoading,
      URL_MEMBER_IMAGES,
      categoryMenu,
      idLogedIn,

      title,
      content,
      writerId,
      wdate,
      hit,
      taggedMembers,
      isClicked_membersWith,
      crewMembers,

      numOfComments,
      deleteCrewPostData,

      seletedCrewMember,
      addMemberData,
      deleteMemberData,
    }
  }
}
</script>

<style scoped>
.crew-mainContainer {
  height: 100%;
  width: 100%;
  max-width: 1400px;
  min-height: 1100px;
  text-align: center;
  margin: 0 auto 30px;
  font-size: 0;
  /*border: 1pt solid;*/
}

.crew-topContainer {
  width: 1246px;
  height: 100px;
  margin: 10px auto 0;
  position: relative;
  border-bottom: 1px #CDCECF solid;
}

.common-top__title {
  text-align: left;
  font-family: 'Jua', sans-serif;
  color: #FAAC58;
  font-size: 50px;
  position: relative;
}

.common-top__drilldownbox {
  float: left;
  font-family: 'Nanum Gothic', sans-serif;
  font-size: 20px;
}

.common-top__drilldownbox a {
  color: #F78181;
}

.cBoard-nav {
  max-width: 1246px;
  height: 30px;
  margin: 0 auto;
  font-family: "Nanum Gothic Coding", sans-serif;
  font-size: 18px;
  border-bottom: 1px solid #CDCECF;
  text-align: right;
  line-height: 32px;
}

.cBoard-nav > span {
  color: #A4A4A4;
  margin-left: 10px;
}

.cBoard-nav > span:hover {
  color: #A9E2F3;
}

.cBoardD-btnbox-edit {
  text-align: right;
  width: 1000px;
  margin: 50px auto 0;
  /*border: 1px solid;*/
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
}

.cBoardD-tablelayout {
  width: 1000px;
  text-align: right;
  margin: 10px auto 0;
  position: relative;
}

.common-contents {
  width: 100%;
}

.common-contents :deep(img) {
  max-width: 100%;
}

.common-tbl__item {
  font-family: 'Nanum Gothic Coding', monospace;
  font-size: 15px;
  color: black;
  text-align: left;
  border: 1px #CDCECF solid;
}

.common-tbl__item > td {
  padding: 10px 20px 10px 20px;
}

.common-tbl__item input[type=text] {
  border: 1px #CDCECF solid;
  padding: 8px;
}

.common-tbl__item select {
  width: 150px;
  border: 1px #CDCECF solid;
  padding: 8px;
}

.common-tbl__item input[type=checkbox] {
  position: relative;
  top: 2px;
}

.common-tbl__item textarea {
  border: 1px #CDCECF solid;
  padding: 8px;
  resize: none;
}

.profilebox {
  display: inline-block;
  float: left;
  width: 230px;
  height: 90px;
  /*border: 1pt solid;*/
}

.profilebox--photo {
  width: 80px;
  height: 80px;
  float: left;
  margin: 3px;
  overflow: hidden;
  border-radius: 50px;
  border: 1pt solid #E6E6E6;
  /*box-shadow: 1px 1px #CDCECF;*/
}

.profilebox--photo > img {
  width: inherit;
  height: inherit;
  object-fit: cover;
}

/* 프로필 박스 : 닉네임 + 작성시간 */
.profilebox--container--sub {
  display: inline-block;
  width: 130px;
  height: 80px;
  margin: 3px;
  text-align: left;
  /*border: 1pt solid;*/
}

.profilebox--nickname {
  margin: 3px;
  height: 33px;
  line-height: 40px;
  font-size: 23px;
  font-family: 'Jua', sans-serif;
  padding-top: 2px;
  /*border: 1pt solid;*/
}

.profilebox--wdate {
  margin: 3px;
  height: 33px;
  line-height: 25px;
  font-size: 18px;
  font-family: 'Nanum Gothic', sans-serif;
  color: #A4A4A4;
  /*border: 1pt solid;*/
}

.iconbox {
  display: inline-block;
  min-width: 100px;
  max-width: 240px;
  /*width: 240px;*/
  height: 60px;
  float: right;
  margin-top: 14px;
  position: relative;
  left: 10px;
  top: 5px;
  /*border: 1pt solid;*/
}

.iconbox__comment {
  width: 50px;
  height: 50px;
  display: inline-block;
  text-align: center;
  margin: 4px;
  /*border: 1pt solid;*/
}

.iconbox__comment > svg {
  margin: 10px;
}

.iconbox__commentcount {
  display: inline-block;
  vertical-align: top;
  margin-top: 21px;
  position: relative;
  right: 7px;
  font-family: 'Jua', sans-serif;
  font-size: 20px;
  line-height: 20px;
  /*border: 1pt solid;*/
}

.iconbox__hit {
  width: 50px;
  height: 50px;
  display: inline-block;
  text-align: center;
  margin: 4px;
  /*border: 1pt solid;*/
}

.iconbox__hit > svg {
  margin: 10px;
}

.iconbox__hitcount {
  display: inline-block;
  vertical-align: top;
  margin-top: 21px;
  position: relative;
  right: 7px;
  font-family: 'Jua', sans-serif;
  font-size: 20px;
  line-height: 20px;
  /*border: 1pt solid;*/
}

.cBoard__title {
  font-family: 'Jua', sans-serif;
  font-size: 29px;
}


.cBoardD-box--crewWith {
  display: inline-block;
  position: absolute;
  right: 0;
}

.cBoardD-btn-crewWith {
  color: #6E6E6E;
  background-color: unset;
  font-family: 'Jua', sans-serif;
  font-size: 19px;
  border-radius: 0;
  border: none;
  padding: 6px 8px 4px 8px;
  margin-right: 15px;
}

.cBoardD-box-crewMemberList {
  border: 1px solid #F2F2F2;
  background-color: #F2F2F2;
  border-radius: 10px;
  position: absolute;
  width: 210px;
  padding: 0 10px 10px 10px;
  box-shadow: 1px 2px #CDCECF;
  text-align: left;
  z-index: 99;
}

.crew-withMember--idbox {
  text-align: left;
  display: inline-block;
  padding: 6px 5px 4px 5px;
  box-shadow: 1px 1px #F2F2F2;
  color: black;
  line-height: 15px;
  background-color: #F2F2F2;
  width: 200px;
  border-bottom: 1px solid #CDCECF;
}

.cBoard__nickName {
  display: inline-block;
  position: relative;
  bottom: 18px;
  /*border: 1px solid;*/
  max-width: 100px;
  left: 10px;
}

.crew-member--photo {
  width: 45px;
  height: 45px;
  margin: 0 auto;
  overflow: hidden;
  border-radius: 50px;
  border: 1pt solid #E6E6E6;
  display: inline-block;
  position: relative;
}

.crew-member--photo > img {
  width: inherit;
  height: inherit;
  object-fit: cover;
  position: absolute;
  right: 0;
}

.cBoard-content {
  font-size: 16px;
  font-family: 'Nanum Gothic', sans-serif;
}

.cBoardD-comment__banner {
  display: inline-block;
  margin: 40px auto 0;
  width: 1000px;
  height: 50px;
  line-height: 65px;
  /*border: 1pt solid;*/
}

.line--horizon {
  background-color: #CDCECF;
  border: 0;
  height: 2px
}

.cBoardD-tablelayout {
  width: 1000px;
  text-align: right;
  margin: 10px auto 0;
}

.common-deleteMark--x {
  color: #CDCECF;
  font-size: 20px;
  position: relative;
  top: 3px;
  cursor: pointer;
  /*border: 1px solid;*/
}
</style>