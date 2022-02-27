<template>
  <p v-if="numOfComments===0" class="comment-ifempty">
    첫번째 댓글을 작성해 주세요
  </p>
  <table class="cBoard-tablelayout">
    <loading :active="isLoading"
             :is-full-page="false"
             :opacity="0.7">
    </loading>
    <tr v-for="comment in comments"
        class="comment-tablelayout">
      <td>
        <div class="profilebox"
             style="margin-top: 7px">
          <div class="profilebox--photo">
            <img :src="URL_MEMBER_IMAGE+comment.id">
          </div>
          <div class="profilebox--container--sub">
            <div class="profilebox--nickname">
              {{ comment.id }}
            </div>
            <div class="profilebox--wdate">
              {{
                comment.wdate[0] + '-' +
                comment.wdate[1] + '-' +
                comment.wdate[2]
              }}
            </div>
          </div>
        </div>
        <div class="commentbox"
             :style="{border: setCommentListBorder(comment.isActiveEditMode)}">
          <button type="button"
                  class="comment__deleteUpdateButton"
                  @click="comment.isActiveEditBtnBox = !comment.isActiveEditBtnBox"
                  v-if="!comment.isActiveEditMode && idLogedIn === comment.id">
            >>
          </button>
          <div class="comment__deleteUpdateBox"
               v-if="comment.isActiveEditBtnBox">
            <div class="comment__deleteUpdatelist">
              <button type="button"
                      class="comment__updateButton"
                      @click="comment.isActiveEditMode = !comment.isActiveEditMode;
                      comment.isActiveEditBtnBox = !comment.isActiveEditBtnBox;
                      setFocus(comment.commentNo)">
                수정
              </button>
            </div>
            <div class="comment__deleteUpdatelist">
              <button type="button"
                      @click="deleteComment(comment.commentNo)">
                삭제
              </button>
            </div>
          </div>
          <textarea class="comment__textarea_edit"
                    :readonly="!comment.isActiveEditMode"
                    :id="'editArea-'+comment.commentNo"
                    v-model="comment.content">
          </textarea>
          <div class="comment-editSubbox"
               v-if="comment.isActiveEditMode">
            <button type="button"
                    @click="updateComment(comment.commentNo, comment.content);
                    comment.isActiveEditMode = !comment.isActiveEditMode">
              완료
            </button>
            <button type="button"
                    class="comment-editSub__btn--cancle"
                    @click=" comment.isActiveEditMode = !comment.isActiveEditMode">
              취소
            </button>
          </div>
        </div>
      </td>
    </tr>
  </table>

  <div v-if="loginState === 'login' && token != null "
       class="comment__input"
       @focusin="isCommentFocused=true"
       @focusout="isCommentFocused=false"
       :style="{border: setCommentInputBorder}"
       ref="focusComment">
    <textarea placeholder="댓글을 입력해 주세요"
              v-model="commentContent"></textarea>
    <div class="comment__buttonbox">
      <button type="button"
              @click="sendCommentData(this)"
              class="button--comment">
        등록
      </button>
    </div>
  </div>
  <div v-else
       class="comment__input">
        <textarea placeholder="로그인이 필요 합니다."
                  readonly="readonly"></textarea>
  </div>
</template>

<script>
import {computed, inject, onMounted, ref} from "vue";
import {axios} from "@bundled-es-modules/axios";
import {useCookies} from "vue3-cookies";
import {useRouter} from "vue-router";
import login from "../../module/login";
import Loading from 'vue3-loading-overlay';
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css';

export default {
  name: "DoldolseoReviewComment",
  components: {Loading},
  props: {
    reviewNo: {
      type: String,
      require: true
    },
  },
  setup(props) {
    const isLoading = ref(false);

    const URL_MEMBER_IMAGE = inject('doldolseoMember') + '/images/'
    const URL_REVIEW = inject('doldolseoReview')
    const URL_REVIEW_COMMENT = URL_REVIEW + '/' + props.reviewNo + '/comment'
    const {cookies} = useCookies()
    const router = useRouter()
    const loginState = ref(localStorage.getItem('loginState'))
    const token = ref(cookies.get('token'))

    const idLogedIn = ref(localStorage.getItem('id'))
    const isCommentFocused = ref(false)

    const setCommentInputBorder = computed(() => {
      if (isCommentFocused.value) {
        return '3px solid #A9E2F3'
      } else {
        return '1px #CDCECF solid'
      }
    })

    const setCommentListBorder = (isActiveEditMode) => {
      if (isActiveEditMode) {
        return '3px solid #A9E2F3'
      } else {
        return '1px #CDCECF solid'
      }
    }

    const commentContent = ref('')
    const comments = ref([])
    const numOfComments = inject('numOfComments')

    const setFocus = (commentNo) => {
      const textArea = document.getElementById('editArea-' + commentNo)
      textArea.focus()
    }

    onMounted(() => {
      getCommentData()
    })

    const getCommentData = () => {
      axios({
        method: 'get',
        url: URL_REVIEW_COMMENT,
        data: {
          review: {
            reviewNo: props.reviewNo
          }
        }
      }).then((resp) => {
        console.log(URL_REVIEW_COMMENT + "댓글 가져오기 성공" + resp.status)
        comments.value = resp.data.comments
        numOfComments.value = resp.data.numOfComments

        const isActiveEditBtnBox = {isActiveEditBtnBox: false}
        const isActiveEditMode = {isActiveEditMode: false}
        for (let i = 0; i < comments.value.length; i++) {
          Object.assign(comments.value[i], isActiveEditBtnBox)
          Object.assign(comments.value[i], isActiveEditMode)
        }

      }).catch(() => {
        console.log(URL_REVIEW_COMMENT + "댓글 가져오기 실패")
      })
    }

    const sendCommentData = (template) => {
      if (!validParams(template)) return
      isLoading.value = true

      axios({
        method: 'post',
        url: URL_REVIEW_COMMENT,
        headers: {
          Authorization: 'Bearer ' + token.value
        },
        data: {
          id: localStorage.getItem('id'),
          content: commentContent.value,
          review: {
            reviewNo: props.reviewNo,
          }
        }
      }).then((resp) => {
        console.log(URL_REVIEW_COMMENT + " 요청 성공" + resp.status)
        getCommentData()

        isLoading.value = false
      }).catch((err) => {
        console.log(URL_REVIEW_COMMENT + " 요청 실패")
        if (err.response.status === 401) {
          alert("로그인이 필요 합니다.")
          router.replace('/member/login').then(() => {
            login.removeUserInfo()
          })
        }
        isLoading.value = false
      })
    }

    const validParams = (template) => {
      if (commentContent.value.length === 0) {
        alert("내용을 작성하여 주세요")
        template.$refs.focusComment.focus()
        return false;
      }
      console.log("all parameters are valid")
      return true
    }

    const updateComment = (commentNo, content) => {
      isLoading.value = true
      axios({
        method: 'put',
        url: URL_REVIEW_COMMENT + '/' + commentNo,
        headers: {
          Authorization: 'Bearer ' + token.value
        },
        data: {
          content: content,
        }
      }).then((resp) => {
        console.log(URL_REVIEW_COMMENT + '/' + commentNo, +" 댓글 수정" + resp.status)
        getCommentData()

        isLoading.value = false
      }).catch((err) => {
        console.log(URL_REVIEW_COMMENT + '/' + commentNo, +" 댓글 수정 실패")
        if (err.response.status === 401) {
          alert("로그인이 필요 합니다.")
          router.replace('/member/login').then(() => {
            login.removeUserInfo()
          })
        }
        isLoading.value = false
      })
    }

    const deleteComment = (commentNo) => {
      isLoading.value = true

      axios({
        method: 'delete',
        url: URL_REVIEW_COMMENT + '/' + commentNo,
        headers: {
          Authorization: 'Bearer ' + token.value
        },
      }).then((resp) => {
        console.log(URL_REVIEW_COMMENT + '/' + commentNo, +" 댓글 삭제" + resp.status)
        alert("삭제 되었습니다.")
        getCommentData()

        isLoading.value = false
      }).catch((err) => {
        console.log(URL_REVIEW_COMMENT + '/' + commentNo, +" 댓글 삭제 실패")
        if (err.response.status === 401) {
          alert("로그인이 필요 합니다.")
          router.replace('/member/login').then(() => {
            login.removeUserInfo()
          })
        }
        isLoading.value = false
      })
    }

    return {
      isLoading,
      isCommentFocused,
      numOfComments,
      URL_MEMBER_IMAGE,
      idLogedIn,
      loginState,
      token,
      setCommentInputBorder,
      setCommentListBorder,
      commentContent,
      comments,
      sendCommentData,
      updateComment,
      deleteComment,
      setFocus,
    }
  }
}
</script>

<style scoped>
.comment-ifempty{
  font-size: 15px;
  font-family: 'Nanum Gothic Coding', monospace;
  color: #CDCECF ;
  text-align: left;
}

.cBoard-tablelayout {
  width: 100%;
  text-align: right;
  margin: 10px auto 0;
  position: relative;
}

.comment-tablelayout {
  border: 1px #CDCECF solid;
  font-family: 'Nanum Gothic Coding', monospace;
  font-size: 15px;
  color: black;
  text-align: left;
}

.comment-tablelayout > td {
  padding: 7px 7px 7px 7px;
  width: 100%;
  white-space: nowrap;
}

.comment-tablelayout input[type=text] {
  border: 1px #CDCECF solid;
  padding: 8px;
}

.comment-tablelayout select {
  width: 150px;
  border: 1px #CDCECF solid;
  padding: 8px;
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

.commentbox {
  display: inline-block;
  width: 78.1%;
  height: 100px;
  padding: 4px;
  border: 1px #CDCECF solid;
  border-radius: 10px;
  position: relative;
}

.comment__textarea_edit {
  width: 99%;
  height: 95px;
  font-family: 'Nanum Gothic', sans-serif;
  font-size: 15px;
  outline: none;
  border: none;
  resize: none;
}

.comment__input {
  display: inline-block;
  width: 99.7%;
  height: 140px;
  margin-top: 20px;
  margin-bottom: 20px;
  border: 1px #CDCECF solid;
}

.comment__input > textarea {
  font-family: 'Nanum Gothic', sans-serif;
  font-size: 15px;
  border: none;
  width: 99%;
  height: 100px;
  outline: none;
  resize: none;
}

.comment__buttonbox {
  text-align: right;
}

/* 클릭시 댓글 수정 삭제 활성화 */
.comment__deleteUpdateButton {
  position: absolute;
  right: 2px;
  color: #CDCECF;
  background-color: white;
  font-family: 'Jua', sans-serif;
  font-size: 16px;
  padding: 6px 8px 4px 8px;
  border: none;
  /*border: 1pt solid;*/
}

.comment__deleteUpdateButton:hover {
  color: #A9E2F3;
}

.comment__deleteUpdateBox {
  width: 90px;
  height: 54px;
  border-radius: 10px;
  font-family: 'Jua', sans-serif;
  padding: 4px;
  box-shadow: 3px 3px #E6E6E6;
  border: 1pt solid #E6E6E6;
  position: absolute;
  right: 30px;

}

.comment__deleteUpdatelist {
  list-style: none;
  margin: 3px auto 0;
  border: 1pt solid white;
  text-align: center;
  font-size: 16px;
  width: 80px;
}

.comment__deleteUpdatelist:hover {
  background-color: #F2F2F2;
}

.comment__deleteUpdatelist > button {
  font-family: 'Jua', sans-serif;
  font-size: 16px;
  background-color: unset;
  border: none;
}

.comment-editSubbox {
  width: 90px;
  position: absolute;
  text-align: center;
  bottom: 2px;
  right: 4px;

  /*border: 1pt solid;*/
}

.comment-editSubbox > button {
  background-color: white;
  color: black;
  font-family: 'Jua', sans-serif;
  font-size: 17px;
  border-radius: 5px;
  padding: 2px 4px 0 4px;
  border: 1px #CDCECF solid;
  margin-right: 4px;
}

.comment-editSubbox > button:hover {
  color: #A9E2F3;
}

.button--comment {
  background-color: white;
  color: black;
  font-family: 'Jua', sans-serif;
  font-size: 19px;
  border: none;
  border-radius: 0;
  padding: 6px 8px 4px 8px;
}

.button--comment:hover {
  color: #5882FA;
}
</style>