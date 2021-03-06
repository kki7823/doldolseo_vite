<template>
  <!-- 메인 컨테이너 -->
  <section class="common-iuContainer--main">
    <loading :active="isLoading"
             :is-full-page="true"
             :opacity="1.0">
    </loading>
    <!-- 제목 -->
    <div class="common-iuTop--title">
      글쓰기
    </div>
    <table class="common-iuContainer--writeform">
      <!-- 카테고리 : select -->
      <tr class="common-tbl__item">
        <td>
          <b>카테고리</b>
        </td>
        <td>
          <select class="writeform__component"
                  v-model="category"
                  ref="focusCategory">
            <option v-for="(category, idx) in categoryMenu"
                    :value="(idx)">{{ category }}
            </option>
          </select>
        </td>
      </tr>

      <tr class="common-tbl__item">
        <td>
          제목
        </td>
        <td>
          <input type="text"
                 style="width: 600px"
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
          <doldolseo-text-editor v-if="content !== '' "
                                 ref="focusContent"
                                 :content-before-updating="content"
                                 :image-url="URL_CREW_POST_IMAGE"
          />
        </td>
      </tr>

    </table>

    <!-- 저장 버튼 -->
    <div class="crewIU-container--bottom">
      <button class="crew-button"
              type="button"
              @click="updateCrewPostData(this)">
        저장
      </button>

    </div>
  </section>
</template>

<script>
import {onMounted, inject, ref, computed} from "vue";
import DoldolseoTextEditor from "../common/DoldolseoEditor.vue";
import {axios} from "@bundled-es-modules/axios";
import {useRouter} from "vue-router";
import onError from "../../module/onError";
import Loading from 'vue3-loading-overlay';
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css';

export default {
  name: "DoldolseoCrewPostUpdate",
  components: {DoldolseoTextEditor, Loading},
  props: {
    crewPostNo: {
      type: String,
      require: true
    },
  },
  setup(props) {
    const isLoading = ref(false)

    const URL_GET_CREW_POST = inject('doldolseoCrewPost') + '/' + props.crewPostNo
    const categoryMenu = inject('crew_categoryMenu')
    const router = useRouter()
    const cookies = inject('cookies')
    const getImgUrl = inject('getImgUrl')

    onMounted(() => {
      getCrewPostData()
    })

    const crewPostNo = ref(0)
    const category = ref('')
    const title = ref('')
    const content = ref('')
    const imageUUID = ref('')
    const URL_CREW_POST_IMAGE = computed(()=>{
      if(imageUUID.value !== '')
        return inject('doldolseoCrewPost') + '/images/' + imageUUID.value
      else
        return null
    })

    const getCrewPostData = () => {
      axios({
        method: 'get',
        url: URL_GET_CREW_POST,
        params: {
          doHit: 'no'
        },
      }).then((resp) => {
        console.log(URL_GET_CREW_POST + " 요청 성공")
        crewPostNo.value = resp.data.crewPost.crewPostNo
        category.value = resp.data.crewPost.category
        title.value = resp.data.crewPost.title
        content.value = resp.data.crewPost.content
        imageUUID.value = resp.data.crewPost.imageUUID
      }).catch((err) => {
        console.log(URL_GET_CREW_POST + " 요청 실패")
        onError.httpErrorException(err)
      })
    }

    const updateCrewPostData = (template) => {
      if (!validParams(template)) return

      isLoading.value = true

      const formData = new FormData()
      formData.append('category', category.value)
      formData.append('title', title.value)
      formData.append('content', DoldolseoTextEditor.content.value)

      axios.put(URL_GET_CREW_POST, formData,{
        headers: {
          Authorization: 'Bearer ' + cookies.get('token')
        }
      }).then((resp) => {
        console.log(URL_GET_CREW_POST + ": 게시글 수정" + resp.status)
        alert("게시글이 수정 되었습니다.")
        isLoading.value = false
        router.replace('/crew/post/' + crewPostNo.value).then(() => {
        })
      }).catch((err) => {
        console.log(URL_GET_CREW_POST + ": 게시글 수정 실패")
        isLoading.value = false
        onError.httpErrorException(err)
      })
    }

    const validParams = (template) => {
      if (title.value.length === 0) {
        alert("제목을 입력해 주세요")
        template.$refs.focusTitle.focus()
        return false;
      } else if (DoldolseoTextEditor.content.value.length === 0) {
        alert("내용을 작성하여 주세요")
        template.$refs.focusContent.focus()
        return false;
      }
      console.log("all parameters are valid")
      return true
    }

    return {
      isLoading,
      getImgUrl,

      categoryMenu,
      category,
      title,
      content,
      URL_CREW_POST_IMAGE,
      imageUUID,
      updateCrewPostData,
    }
  }
}
</script>

<style scoped>
.common-iuContainer--main {
  max-width: 1400px;
  margin: 30px auto;
  /*font-size: 0;*/
}

.common-iuTop--title {
  width: 90%;
  max-width: 1400px;
  text-align: left;
  font-family: 'Jua', sans-serif;
  color: #FF8000;
  font-size: 50px;
  margin: 0 auto;
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
  min-width: 100px;
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

.common-tbl__item textarea {
  border: 1px #CDCECF solid;
  padding: 8px;
  resize: none;
}

.crewIU-container--bottom {
  width: 90%;
  text-align: right;
  margin: 20px auto 0;
  position: relative;
  /*border: 1px solid;*/
}

.crew-button {
  width: 130px;
  height: 40px;
  font-family: 'Jua', sans-serif;
  font-size: 23px;
  border-radius: 6px;
  border: none;
  padding: 6px 8px 4px 8px;
  cursor: pointer;
  background-color: #FF8000;
  color: white;
}

.crew-member--photo > img {
  width: inherit;
  height: inherit;
  object-fit: cover;
  position: absolute;
  right: 0;
}

</style>