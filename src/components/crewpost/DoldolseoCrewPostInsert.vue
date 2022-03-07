<template>
  <!-- 메인 컨테이너 -->
  <section class="common-iuContainer--main">
    <loading :active="isLoading"
             :is-full-page="true"
             :opacity="0.7">
    </loading>
    <!-- 제목 -->
    <div class="common-iuTop--title">
      글쓰기
    </div>
    <table class="common-iuContainer--writeform">
      <!-- 카테고리 : select -->
      <tr class="common-tbl__item">
        <td style="width: 170px">
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
        <td style="width: 170px">
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
        <td style="width: 170px">
          내용
        </td>
        <td>
          <doldolseo-text-editor ref="focusContent"
                                 :image-url="URL_CREW_POST_IMAGE"
          />
        </td>
      </tr>

      <!-- 내 크루 목록 -->
      <tr class="common-tbl__item">
        <td style="width: 170px">
          내 크루 목록
        </td>
        <td>
          <select v-model="selectedCrew"
                  @change="selectedMemberSet.clear()"
                  ref="focusSelectCrew">
            <option v-for="crew in crews"
                    :value="crew">
              {{ crew.crewName }}
            </option>
          </select>
        </td>
      </tr>

      <!-- 함께한 크루원 추가 -->
      <tr class="common-tbl__item">
        <td style="width: 170px">
          함께한 크루원
        </td>
        <td>
          <select v-model="selectedMember"
                  @change="pushMember(selectedMember.memberId)">
            <option value="">선택안함</option>
            <option v-for="crewMember in crewMembers"
                    :value="crewMember">
              {{ crewMember.memberId }}
            </option>
          </select>
          <div v-if="selectedMemberSet.size !== 0"
               class="crew-box--addedMember">
            <div v-for="selectedMember in selectedMemberSet"
                 class='crew-addedMember--idbox'>
              <div class='crew-member--photo'>
                <img :src="getImgUrl('/member/default_member.png')"
                     alt="member_img"
                />
              </div>
              <div class="crew-addedMember--id">
                {{ selectedMember }}
              </div>
              <span class='common-deleteMark--x'
                    @click="selectedMemberSet.delete(selectedMember)">
                &Cross;
              </span>
            </div>

          </div>
        </td>
      </tr>
    </table>

    <!-- 저장 버튼 -->
    <div id="crewIU-container--bottom">
      <button class="crew-button"
              type="button"
              @click="sendCrewPostData(this)">
        저장
      </button>

    </div>
  </section>
</template>

<script>
import {inject, onMounted, ref, watchEffect} from "vue";
import DoldolseoTextEditor from "../common/DoldolseoEditor.vue";
import {v4 as uuidv4} from "uuid";
import {axios} from "@bundled-es-modules/axios";
import {useRouter} from "vue-router";
import {useCookies} from "vue3-cookies";
import onError from "../../module/onError";
import Loading from 'vue3-loading-overlay';
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css';

export default {
  name: "DoldolseoCrewPostInsert",
  components: {DoldolseoTextEditor, Loading},
  setup() {
    const isLoading = ref(false)
    const router = useRouter()
    const {cookies} = useCookies()
    const getImgUrl = inject('getImgUrl')

    const URL_CREW = inject('doldolseoCrew')
    const URL_CREW_POST = inject('doldolseoCrewPost')
    const IMAGE_UUID = uuidv4()
    const URL_CREW_POST_IMAGE = inject('doldolseoCrewPost') + '/images/' + IMAGE_UUID
    const title = ref('')
    const category = ref('')
    const categoryMenu = inject('crew_categoryMenu')
    const selectedCrew = ref({})
    const crews = ref({})
    const selectedMember = ref({})
    const crewMembers = ref({})
    const selectedMemberSet = ref(new Set([]))

    const pushMember = (member) => {
      if (member != null) {
        selectedMemberSet.value.add(member)
      }
    }

    onMounted(() => {
      getCrewData()
    })

    const getCrewData = () => {
      axios({
        method: 'get',
        url: URL_CREW,
        headers: {
          Authorization: 'Bearer ' + cookies.get('token'),
        },
        params: {
          page: 0,
          memberId: localStorage.getItem('id')
        }
      }).then((resp) => {
        console.log(URL_CREW + " 요청 성공" + resp.status)
        crews.value = resp.data.crewList
      }).catch((err) => {
        console.log(URL_CREW + " 요청 실패")
        onError.httpErrorException(err)
      })
    }

    watchEffect(() => {
      if (selectedCrew.value.crewNo !== undefined) {
        axios({
          method: 'get',
          url: URL_CREW + '/' + selectedCrew.value.crewNo + '/members',
          headers: {
            Authorization: 'Bearer ' + cookies.get('token'),
          },
          params: {
            exceptSelf: "y",
          },
        }).then((resp) => {
          console.log(URL_CREW + '/' + selectedCrew.value.crewNo + '/members' + " 요청 성공" + resp.status)
          crewMembers.value = resp.data
        }).catch((err) => {
          console.log(URL_CREW + '/' + selectedCrew.value.crewNo + '/members' + " 요청 실패")
          onError.httpErrorException(err)
        })
      }
    })

    const sendCrewPostData = (template) => {
      if (!validParams(template)) return

      const formData = new FormData()
      formData.append('crewNo', selectedCrew.value.crewNo)
      formData.append('writerId', localStorage.getItem('id'))
      formData.append('category', category.value)
      formData.append('title', title.value)
      formData.append('content', DoldolseoTextEditor.content.value)
      formData.append('imageUUID', IMAGE_UUID)
      formData.append('taggedMembers', JSON.stringify([...selectedMemberSet.value]))

      isLoading.value = true
      axios.post(URL_CREW_POST, formData, {
        headers: {
          Authorization: 'Bearer ' + cookies.get('token'),
        },
      }).then((resp) => {
        console.log(URL_CREW_POST + ": 게시글 저장" + resp.status)
        isLoading.value = false

        router.replace('/crew/post').then(() => {
        })
      }).catch((err) => {
        console.log(URL_CREW_POST + ": 게시글 저장 실패")
        onError.httpErrorException(err)

        isLoading.value = false
      })
    }

    const validParams = (template) => {
      if (category.value.length === 0) {
        alert("카테고리를 선택하여 주세요")
        template.$refs.focusCategory.focus()
        return false;

      } else if (title.value.length === 0) {
        alert("제목을 입력해 주세요")
        template.$refs.focusTitle.focus()
        return false;

      } else if (DoldolseoTextEditor.content.value.length === 0) {
        alert("내용을 작성하여 주세요")
        template.$refs.focusContent.focus()
        return false;

      } else if (Object.keys(selectedCrew.value).length === 0) {
        alert("크루를 선택하여 주세요")
        template.$refs.focusSelectCrew.focus()
        return false;
      }
      console.log("all parameters are valid")
      return true
    }

    return {
      isLoading,
      getImgUrl,

      URL_CREW_POST_IMAGE,
      title,
      category,
      categoryMenu,
      selectedCrew,
      crews,
      selectedMember,
      crewMembers,
      selectedMemberSet,
      pushMember,
      sendCrewPostData,
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
  text-align: left;
  font-family: 'Jua', sans-serif;
  color: #FF8000;
  font-size: 50px;
  max-width: 1400px;
  margin: 0 auto;
}

.common-iuContainer--writeform {
  margin: 0 auto;
  text-align: left;
  max-width: 1400px;
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

.common-tbl__item textarea {
  border: 1px #CDCECF solid;
  padding: 8px;
  resize: none;
}

.crew-box--addedMember {
  margin: 20px 0 0 0;
}

#crewIU-container--bottom {
  max-width: 1400px;
  text-align: right;
  margin: 20px auto 0;
  position: relative;
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

.crew-addedMember--idbox {
  text-align: left;
  display: inline-block;
  padding: 6px 15px 4px 15px;
  border-radius: 20px;
  box-shadow: 1px 1px #F2F2F2;
  background-color: #6E6E6E;
  color: white;
  line-height: 15px;
  margin-right: 6px;
}

.crew-addedMember--id {
  display: inline-block;
  position: relative;
  bottom: 18px;
  left: 5px;
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

.common-deleteMark--x {
  color: #CDCECF;
  font-size: 20px;
  position: relative;
  bottom: 16px;
  cursor: pointer;
  /*border: 1px solid;*/
}

</style>