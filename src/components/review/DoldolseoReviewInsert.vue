<template>
  <!-- 메인 컨테이너 -->
  <section class="common-iuContainer--main">

    <!-- 제목 -->
    <div class="common-iuTop--title" style="color:#F4B7B4 ">
      글쓰기
    </div>

    <!-- 글쓰기 폼 지역/제목/내용/코스추가/코스/ -->
    <form id="reviewIU-form" enctype="multipart/form-data">
      <table class="common-iuContainer--writeform">

        <!-- id : hidden -->
        <input name="member.id" type="hidden" value="${member.id}"/><!-- 추후 세션처리 -->

        <!-- 지역 : select -->
        <tr class="common-tbl__item">
          <td style="width: 170px">
            <b>지역</b>
          </td>
          <td>
            <select name="areaNo" class="writeform__component">
              <option value="1">강남</option>
              <option value="2">강북</option>
              <option value="3">광화문</option>
              <option value="4">명동</option>
              <option value="5">여의도</option>
              <option value="6">잠실</option>
              <option value="7">홍대</option>
              <option value="0">기타</option>
            </select>
          </td>
        </tr>

        <!-- 제목 : text -->
        <tr class="common-tbl__item">
          <td style="width: 170px">
            제목
          </td>
          <td>
            <input name="title" class="reviewIU--input_title" type="text"/>
          </td>
        </tr>

        <tr class="common-tbl__item">
          <td style="width: 170px">
            내용
          </td>
          <td>
            <doldolseo-editor/>
          </td>
        </tr>

        <!-- 코스 그리기 추가 : select (선택시 코스 이름, 코스그리기 항목 추가) -->
        <tr class="common-tbl__item" id="reviewI-selectBox">
          <td style="width: 170px">
            여행 코스 추가
          </td>
          <td>
            <select id="reviewI-select--course">
              <option value="no">추가 안함</option>
              <option value="yes">추가</option>
            </select>
          </td>
        </tr>
      </table>

      <!-- 저장 버튼 -->
      <div id="reviewIU-container--bottom">
        <button type="button" onclick="uploadCanvasData('${pageContext.request.contextPath}');"
                id="reviewIU-btn--submit"
                class="button--exceptionboot" style="width: 130px; height: 40px; font-size: 23px">
          저장
        </button>
      </div>
    </form>
  </section>
</template>

<script>

import DoldolseoEditor from "../common/DoldolseoEditor.vue";

export default {
  name: "DoldolseoReviewInsert",
  components: {DoldolseoEditor},
  setup() {

    return {}
  },
}
</script>

<style scoped>
.common-iuContainer--main {
  margin: 30px auto;
  /*font-size: 0;*/
}

.common-iuTop--title {
  text-align: left;
  font-family: 'Jua', sans-serif;
  color: #A9E2F3;
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

.common-deleteMark--x {
  color: #CDCECF;
  font-size: 20px;
  /*border: 1px solid;*/
}


.reviewIU--input_title{
  width: 98%;
  min-width: 1000px;
}

#writeform__item--course {
}

#reviewIU-container--bottom {
  width: 90%;
  text-align: right;
  margin: 20px auto 0;
  position: relative;
}

#secret {
  width: 30px;
  height: 32px;
  position: absolute;
  overflow: hidden;
  right: 100px;
  bottom: 3px;
}

#secret > img {
  width: inherit;
  height: inherit;
  object-fit: cover;
}

</style>