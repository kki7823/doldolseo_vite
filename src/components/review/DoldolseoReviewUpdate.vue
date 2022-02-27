<template>
  <!-- 메인 컨테이너 -->
  <section class="common-iuContainer--main">
    <loading :active="isLoading"
             :is-full-page="true"
             :opacity="1.0">
    </loading>
    <!-- 제목 -->
    <div class="common-iuTop--title">
      글 수정 하기
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
            <option v-for="(area, idx) in areaMenu" :value="idx===0 ? 99 : idx">{{ area }}</option>
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
          <doldolseo-editor v-if="content !== '' && URL_REVIEW_IMAGE != null"
                            ref="focusContent"
                            :content-before-updating="content"
                            :image-url="URL_REVIEW_IMAGE"
          />
        </td>
      </tr>
    </table>

    <!-- 저장 버튼 -->
    <div class="reviewIU-container--bottom">
      <button type="button"
              @click="sendReviewUpdateData(this)"
              class="review-button">
        완료
      </button>
    </div>
  </section>
</template>

<script>
import DoldolseoEditor from "../common/DoldolseoEditor.vue";
import {computed, inject, onMounted, ref} from "vue";
import {axios} from "@bundled-es-modules/axios";
import {useRouter} from "vue-router";
import Loading from 'vue3-loading-overlay';
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css';
import {useCookies} from "vue3-cookies";
import onError from "../../module/onError";

export default {
  name: "DoldolseoReviewUpdate",
  components: {DoldolseoEditor, Loading},
  props: {
    reviewNo: {
      type: String,
      require: true
    },
  },
  setup(props) {
    const isLoading = ref(false)
    const {cookies} = useCookies()
    const router = useRouter()
    const URL_REVIEW = inject('doldolseoReview')
    const URL_GET_OR_UPDATE_REVIEW = URL_REVIEW + '/' + props.reviewNo

    const reviewNo = ref(0)
    const areaNo = ref(0)
    const areaMenu = inject('areaMenu')
    const wdate = ref([])
    const title = ref('')
    const content = ref('')
    const imageUUID = ref('')
    const URL_REVIEW_IMAGE = computed(()=>{
      if(imageUUID.value !== '')
        return inject('doldolseoReview') + '/images/' + imageUUID.value
      else
        return null
    })

    onMounted(() => {
      axios({
        method: 'get',
        url: URL_GET_OR_UPDATE_REVIEW,
        params: {
          mode: 'update'
        },
      }).then((resp) => {
        console.log(URL_GET_OR_UPDATE_REVIEW + " 요청 성공")
        reviewNo.value = resp.data.reviewNo
        areaNo.value = resp.data.areaNo
        wdate.value = resp.data.wdate
        title.value = resp.data.title
        content.value = resp.data.content
        imageUUID.value = resp.data.imageUUID
      }).catch((err) => {
        console.log(URL_GET_OR_UPDATE_REVIEW + " 요청 실패")
        onError.httpErrorException(err)
      })
    })

    const sendReviewUpdateData = (template) => {
      if (!validParams(template)) return

      isLoading.value = true

      const formData = new FormData()
      formData.append('title', title.value)
      formData.append('content', DoldolseoEditor.content.value)
      formData.append('areaNo', areaNo.value)

      axios.put(URL_GET_OR_UPDATE_REVIEW, formData, {
        headers: {
          Authorization: 'Bearer ' + cookies.get('token')
        }
      }).then((resp) => {
        console.log(URL_GET_OR_UPDATE_REVIEW + ": 게시글 수정" + resp.status)
        alert("게시글이 수정 되었습니다.")
        isLoading.value = false
        router.replace('/review/' + reviewNo.value).then(() => {
        })
      }).catch((err) => {
        console.log(URL_GET_OR_UPDATE_REVIEW + ": 게시글 수정 실패")
        onError.httpErrorException(err)
        isLoading.value = false
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
      isLoading,
      URL_REVIEW_IMAGE,

      areaNo,
      areaMenu,
      title,
      content,
      imageUUID,
      sendReviewUpdateData,
    }
  }
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
</style>