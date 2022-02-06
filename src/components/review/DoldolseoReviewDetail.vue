<template>
  <!-- 메인 컨테이너 -->
  <div class="review-container--main">
    <!-- 네비게이션 -->
    <nav class="review-container__navi">
      <doldolseo-review-nav/>
    </nav>

    <!-- 섹션 -->
    <section class="reviewD-container">
      <!-- 게시판 드릴다운 및 글쓰기 버튼 -->
      <div class="review-container--top">
        <!-- 제목 -->
        <div class="common-top__title">
          지역게시판
        </div>
        <!-- 게시판 드릴다운 -->
        <span class="common-top__drilldownbox">
                    <a href="#" style="color: #F78181;">후기게시판</a>
                    <span> > </span>
                    <a href="#">전체</a>
                </span>
      </div>

      <!-- 수정 삭제 구현 -- 권한  -->
      <!--      <c:if test="${member.id eq review.member.id}">-->
      <div class="review-btnBox--reviewEdit">
        <router-link :to="{name: 'reviewUpdate', params:{ reviewNo: reviewNo, }}">
          <button class="review-button"
                  type="button">
            수정 하기
          </button>
        </router-link>
        <button class="review-button"
                type="button"
                @click="deleteReviewData()"
                style="margin-left: 10px">
          글 삭제
        </button>
      </div>
      <!--      </c:if>-->

      <!-- 상세 글 목록 -->
      <table class="cBoard-tablelayout">
        <!-- 글상단 : 프로필 박스 + 댓글 및 조회수 -->
        <tr class="common-tbl__item">
          <td>
            <!-- 프로필 박스 : 회원사진, 닉네임, 작성날짜-->
            <div class="profilebox">
              <!-- 회원사진 나중에 -->
              <div class="profilebox--photo">
                <img :src="URL_MEMBER_IMG+'kki7823.jpeg'"
                     alt="member_profile"
                />
              </div>
              <!-- 닉네임 + 작성날짜 컨테이너 -->
              <div class="profilebox--container--sub">
                <!-- 닉네임 -->
                <div class="profilebox--nickname">
                  경경
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
                     fill="#F78181"
                     viewBox="0 0 16 16">
                  <path
                      d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.5a1 1 0 0 0-.8.4l-1.9 2.533a1 1 0 0 1-1.6 0L5.3 12.4a1 1 0 0 0-.8-.4H2a2 2 0 0 1-2-2V2zm3.5 1a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9zm0 2.5a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9zm0 2.5a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5z"
                  />
                </svg>
              </div>
              <div class="iconbox__commentcount">
                123
              </div>

              <div class="iconbox__hit">
                <!-- 조회수 아이콘 - bootstrap-->
                <svg xmlns="http://www.w3.org/2000/svg"
                     width="30"
                     height="30"
                     fill="#F78181"
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
          <td>
            <span id="reviewD__title">{{ title }}</span>
          </td>
        </tr>

        <!-- 여행 코스 -->
        <tr class="common-tbl__item"
            v-if="isCourseUploaded === 'y' ">
          <td>
            <div id="reviewD-coursebox">
              <img :src="URL_REVIEW_IMG + imageUUID+'/course.png'"
                   :alt="URL_REVIEW_IMG + imageUUID+'/course.png'">
            </div>
          </td>
        </tr>

        <!-- 글 내용 -->
        <tr class="common-tbl__item">
          <td>
            <div v-html="content"/>
          </td>
        </tr>
      </table>


      <!-- 댓글 창-->
      <div id="reviewD-comment__banner">
        <div class="common-top__title" style="font-size: 35px;">
          COMMENT
        </div>

        <hr class="line--horizon">
      </div>
      <!-- here -->
      <doldolseo-review-comment
          :review-no="reviewNo"
      />

    </section>
  </div>
</template>

<script>
import DoldolseoReviewNav from "./DoldolseoReviewNav.vue";
import {axios} from "@bundled-es-modules/axios";
import {inject, onMounted, ref} from "vue";
import DoldolseoReviewComment from "./DoldolseoReviewComment.vue";
import {useRouter} from "vue-router";

export default {
  name: "DoldolseoReviewDetail",
  components: {DoldolseoReviewComment, DoldolseoReviewNav},
  props: {
    reviewNo: {
      type: String,
      require: true
    }
  },
  setup(props) {
    const URL_REVIEW = inject('doldolseoReview')
    const URL_REVIEW_IMG = inject('doldolseoReview') + '/images/'
    const URL_GET_REVIEW = URL_REVIEW + '/' + props.reviewNo
    const URL_MEMBER_IMG = inject('doldolseoMember') + '/images/'
    const wdate = ref([])
    const title = ref('')
    const content = ref('')
    const id = ref('')
    const imageUUID = ref('')
    const isCourseUploaded = ref('n')
    const hit = ref('')
    const router = useRouter()

    onMounted(() => {
      axios({
        method: 'get',
        url: URL_GET_REVIEW,
        params: {
          mode: 'write'
        },
      }).then((resp) => {
        console.log(URL_GET_REVIEW + " 요청 성공")
        wdate.value = resp.data.wdate
        title.value = resp.data.title
        content.value = resp.data.content
        imageUUID.value = resp.data.imageUUID
        hit.value = resp.data.hit
        isCourseUploaded.value = resp.data.isCourseUploaded

      }).catch(() => {
        console.log(URL_GET_REVIEW + " 요청 실패")
      })
    })

    const deleteReviewData = () => {
      if (!confirm("게시글을 삭제 하시겠습니까?")) return

      axios.delete(URL_GET_REVIEW).then((resp) => {
        console.log(URL_GET_REVIEW + ": 게시글 삭제" + resp.status)
        alert("게시글이 삭제 되었습니다.")
        router.replace('/review').then(() => {
        })
      }).catch(() => {
        console.log(URL_GET_REVIEW + ": 게시글 삭제 실패")
      })
    }

    return {
      URL_MEMBER_IMG,
      URL_REVIEW_IMG,
      title,
      content,
      wdate,
      imageUUID,
      hit,
      isCourseUploaded,

      deleteReviewData,
    }
  },

}
</script>

<style scoped>
.review-container--main {
  height: 100%;
  width: 100%;
  max-width: 1400px;
  min-height: 1100px;
  text-align: center;
  margin: 0 auto;
  font-size: 0;
  /*border: 1px solid;*/
}

.review-container__navi {
  display: inline-block;
  vertical-align: top;
  height: 100%;
  max-height: 1100px;
}

.reviewD-container {
  display: inline-block;
  width: 80%;
  height: inherit;
  margin: 0 auto 0 30px;
  /*border: 1px solid;*/
}

.review-container--top {
  width: 100%;
  height: 100px;
  margin: 40px auto 0;
}

.cBoard-tablelayout {
  width: 100%;
  text-align: right;
  margin: 10px auto 0;
}

.review-btnBox--reviewEdit {
  width: 100%;
  margin: 0 auto;
  text-align: right;
  /*border: 1px solid;*/
}

.review-button {
  color: white;
  background-color: #F78181;
  font-family: 'Jua', sans-serif;
  font-size: 19px;
  border-radius: 6px;
  border: none;
  padding: 6px 8px 4px 8px;
  cursor: pointer;
}

.cBoard-tablelayout tr {
  /*border: 1pt solid;*/
}

#reviewD__title {
  font-family: 'Jua', sans-serif;
  font-size: 29px;
}

#reviewD-coursebox {
  width: 1000px;
  /*width: 100%;*/
  margin: 0 auto;
  overflow: hidden;
  border: 1pt solid lightgray;

}

#reviewD-coursebox > img {
  width: inherit;
  height: inherit;
  object-fit: cover;
}

#reviewD-content {
  font-size: 16px;
  font-family: 'Nanum Gothic', sans-serif;
}

#reviewD-comment__banner {
  display: inline-block;
  margin: 40px auto 0;
  width: 100%;
  height: 50px;
  line-height: 65px;
  /*border: 1pt solid;*/
}

#reviewD-comment__banner hr {
  width: 100%;
}

.common-top__drilldownbox {
  float: left;
  font-family: 'Nanum Gothic', sans-serif;
  font-size: 20px;
}

.common-top__drilldownbox a {
  color: #F78181;
}

.common-top__title {
  text-align: left;
  font-family: 'Jua', sans-serif;
  color: #F6CECE;
  font-size: 50px;
  position: relative;
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

/* 프로필 박스 : 회원사진 */
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
  width: 240px;
  height: 60px;
  float: right;
  margin-top: 14px;
  position: relative;
  left: 40px;
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
</style>