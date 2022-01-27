<template>
  <!-- 메인 컨테이너 -->
  <section class="common-iuContainer--main">

    <!-- 제목 -->
    <div class="common-iuTop--title">
      글쓰기
    </div>

    <!-- 글쓰기 폼 지역/제목/내용/코스추가/코스/ -->
    <table class="common-iuContainer--writeform">
      <!-- 지역 : select -->
      <tr class="common-tbl__item">
        <td>
          <b>지역</b>
        </td>
        <td>
          <select class="writeform__component"
                  v-model="areaNo">
            <option v-for="(area, idx) in areaMenu"
                    :value="idx===0 ? 99 : idx">
              {{ area }}
            </option>
          </select>
        </td>
      </tr>

      <!-- 제목 : text -->
      <tr class="common-tbl__item">
        <td>
          제목
        </td>
        <td>
          <input class="reviewIU--input_title"
                 type="text"
                 ref="focusTitle"
                 v-model="title"
          />
        </td>
      </tr>

      <tr class="common-tbl__item">
        <td>
          내용
        </td>
        <td>
          <doldolseo-editor ref="focusContent"
                            :image-url="URL_REVIEW_IMAGE"
          />
        </td>
      </tr>
      <!-- 코스 그리기 추가 : select (선택시 코스 이름, 코스그리기 항목 추가) -->
      <tr class="common-tbl__item">
        <td>
          여행 코스 추가
        </td>
        <td>
          <select @input="isSelected = !isSelected;">
            <option>추가 안함</option>
            <option>추가</option>
          </select>
        </td>
      </tr>
      <tr v-show="isSelected"
          class='common-tbl__item'>
        <td>코스 이름</td>
        <td>
          <div class="reviewIU--box_courseTitle">
            <input v-model="courseTitle"
                   type='text'
            />
            <button type='button'
                    class='review-button--course'
                    @click="courseMaker.addTitle(courseTitle)">
              적용
            </button>
          </div>
        </td>
      </tr>
      <tr v-show="isSelected"
          class='common-tbl__item'>
        <td>
          코스 그리기
        </td>
        <td>
          <div class="reviewIU--box-canvasinput">
            <input id='placeName'
                   type='text'
                   v-model="placeName"
            />
            <input type='radio'
                   :value=1
                   checked='checked'
                   v-model="placeType"
            />
            음식점
            <input
                type='radio'
                :value=2
                v-model="placeType"
            />
            쇼핑
            <input
                type='radio'
                :value=3
                v-model="placeType"
            />
            문화
            <button type='button'
                    class="review-button--course"
                    @click="courseMaker.drawNodeAndLine(placeName, placeType)">
              여행지 추가
            </button>
            <button type='button'
                    class="review-button--course"
                    @click="courseMaker.clearNode()">
              초기화
            </button>
          </div>
          <canvas id='canvas'
                  width="1052"
                  height="550"
                  ref="canvas"
          />
          <div class="reviewIU--buttonbox-couresave">
            <button class="review-button--course"
                    @click="uploadCourse()">
              코스 저장
            </button>
          </div>
        </td>
      </tr>
    </table>

    <!-- 저장 버튼 -->
    <div class="reviewIU-container--bottom">
      <button type="button"
              @click="sendReviewData(this)"
              class="review-button">
        저장
      </button>
    </div>
  </section>
</template>

<script>
import DoldolseoEditor from "../common/DoldolseoEditor.vue";
import DoldolseoCourseMaker from "./DoldolseoCourseMaker.vue";
import courseMaker from "../../module/courseMaker";
import {inject, onMounted, ref} from "vue";
import {axios} from "@bundled-es-modules/axios";
import {v4 as uuidv4} from "uuid";
import {useRouter} from "vue-router";


export default {
  name: "DoldolseoReviewInsert",
  components: {DoldolseoCourseMaker, DoldolseoEditor},
  setup() {
    const router = useRouter()
    const isSelected = ref(false)
    const areaMenu = inject('areaMenu')
    const areaNo = ref(99)
    const title = ref('')
    const courseTitle = ref('')
    const placeName = ref('')
    const placeType = ref(1)
    const canvas = ref(null)
    const isCourseUploaded = ref('n')

    const uploadCourse = () => {
      courseMaker.uploadCourse(URL_REVIEW_COURSE);
      isCourseUploaded.value = 'y';
    }

    const IMAGE_UUID = uuidv4()
    const URL_REVIEW_IMAGE = inject('doldolseoReview') + '/images/' + IMAGE_UUID
    const URL_REVIEW_COURSE = inject('doldolseoReview') + '/course/' + IMAGE_UUID

    onMounted(() => {
          courseMaker.canvas.value = canvas.value
          courseMaker.drawDefaultNode()
        }
    )

    const URL_REVIEW = inject('doldolseoReview')
    const sendReviewData = (template) => {
      if (!validParams(template)) return

      if (!confirm("저장되지 않는 코스는 게시글에 첨부 되지 않습니다. \n 저장 하시겠습니까?.")) return

      const formData = new FormData()
      // formData.append('id', localStorage.getItem('id'))
      formData.append('id', 'kki7823')
      formData.append('title', title.value)
      formData.append('content', DoldolseoEditor.content.value)
      formData.append('areaNo', areaNo.value)
      formData.append('imageUUID', IMAGE_UUID)
      formData.append('isCourseUploaded', isCourseUploaded.value)

      axios.post(URL_REVIEW, formData, {
        header: {
          // 'Content-Type': 'multipart/form-data'
        }
      }).then((resp) => {
        console.log(URL_REVIEW + ": 게시글 저장" + resp.status)
        router.replace('/review').then(() => {
        })
      }).catch(() => {
        console.log(URL_REVIEW + ": 게시글 저장 실패")
      })
    }

    const validParams = (template) => {
      if (title.value.length === 0) {
        alert("제목을 입력해 주세요")
        template.$refs.focusTitle.focus()
        return false;
      } else if (DoldolseoEditor.content.value.length === 0) {
        alert("내용을 작성하여 주세요")
        template.$refs.focusContent.focus()
        return false;
      }
      console.log("all parameters are valid")
      return true
    }


    return {
      canvas,
      courseMaker,
      isSelected,
      URL_REVIEW_IMAGE,
      uploadCourse,
      areaMenu,
      areaNo,
      title,
      courseTitle,
      placeName,
      placeType,
      sendReviewData,
    }
  },
}
</script>

<style scoped>
.common-iuContainer--main {
  margin: 30px auto;
  width: 100%;
  max-width: 1400px;
  height: 100%;
  /*font-size: 0;*/
}

.common-iuTop--title {
  text-align: left;
  font-family: 'Jua', sans-serif;
  color: #F4B7B4;
  font-size: 50px;
  margin: 0 auto;
  width: 90%;
}

.common-iuContainer--writeform {
  margin: 0 auto;
  text-align: left;
  width: 90%;
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
  vertical-align: middle;
  min-width: 110px;
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

.reviewIU--input_title {
  min-width: 1034px;
}

.reviewIU-container--bottom {
  width: 90%;
  text-align: right;
  margin: 20px auto 0;
  position: relative;
}

.reviewIU-container--bottom button {
  width: 130px;
  height: 40px;
  font-size: 23px
}

#canvas {
  border: 1px solid rgba(0, 0, 0, .06);
}

.reviewIU--box-canvasinput {
  margin-bottom: 10px;
}

.reviewIU--box_courseTitle {
  position: relative;
}

.reviewIU--box_courseTitle input {
  width: 400px;
}


.reviewIU--box_courseTitle button {
  position: absolute;
  left: 425px;
  top: 3px;
}

.review-button {
  color: white;
  background-color: #F78181;
  font-family: 'Jua', sans-serif;
  font-size: 19px;
  border-radius: 6px;
  border: none;
  padding: 5px 8px 3px 8px;
  cursor: pointer;
  vertical-align: baseline;
  margin-left: 5px;
}

.review-button {
  color: white;
  background-color: #F78181;
  font-family: 'Jua', sans-serif;
  font-size: 19px;
  border-radius: 6px;
  border: none;
  padding: 5px 8px 3px 8px;
  cursor: pointer;
  vertical-align: baseline;
  margin-left: 5px;
}

.review-button--course {
  color: white;
  background-color: #909090;
  font-family: 'Jua', sans-serif;
  font-size: 16px;
  border: none;
  padding: 5px 8px 3px 8px;
  cursor: pointer;
  vertical-align: baseline;
  margin-left: 5px;
}

.reviewIU--buttonbox-couresave {
  /*border: 1px solid;*/
  margin-top: 7px;
  margin-bottom: 3px;
  text-align: right;
  width: 1055px;
}

.reviewIU--buttonbox-couresave button {
  font-size: 15px;
}


</style>