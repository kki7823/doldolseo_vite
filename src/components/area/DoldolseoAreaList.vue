<template>
  <section class="areaList-container">
    <!-- 지역별 배경사진 -->
    <div class="areaList-img">
      <img :src="imgPath+ '/areaBanner/areaImage_1.png'" alt="img"/>
    </div>

    <!-- 게시판 드릴 다운 메뉴 -->
    <div class="areaL-drilldownBox">
            <span class="drilldownbox">
                        <a href="${pageContext.request.contextPath}/areaL?sigungu=1}" style="color: #5882FA">지역게시판</a>
                <span> > </span>
                        <a href="${pageContext.request.contextPath}/areaL?sigungu=${sigungu}"
                           style="color: #0080c0">#드릴다운#</a>
                <span> > </span>
                        <a href="${pageContext.request.contextPath}/areaL?sigungu=${sigungu}&contentType=${contentType}">#드릴다운#</a>
            </span>
    </div>

    <!--네비(카테고리/검색창)-->
    <div class="areaList-nav">
      <!--네비_카테고리-->
      <div class="areaList-nav__cat">
        <ul>
          <li><a href="${pageContext.request.contextPath}/areaL?sigungu=${sigungu}">전체</a></li>
          <li><a href="${pageContext.request.contextPath}/areaL?sigungu=${sigungu}&contentType=1">축제&행사</a>
          </li>
          <li><a href="${pageContext.request.contextPath}/areaL?sigungu=${sigungu}&contentType=2">음식</a></li>
          <li><a href="${pageContext.request.contextPath}/areaL?sigungu=${sigungu}&contentType=3">쇼핑</a></li>
          <li><a href="${pageContext.request.contextPath}/areaL?sigungu=${sigungu}&contentType=4">문화&관광</a>
          </li>
          <li><a href="${pageContext.request.contextPath}/areaL?sigungu=${sigungu}&contentType=0">기타</a></li>
        </ul>
      </div>

      <!--네비_검색창-->
      <div class="areaList-nav__search">
        <form :action="areaRestPath" method="get">
          <input type="hidden" name="sigungu" value="${sigungu}">
          <input class="areaList-nav__search__input" name="searchKeyword" type="text"/>
          <button class="areaList-nav__search__btn" type="submit">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="18" fill="white" class="bi bi-search"
                 viewBox="0 0 16 16">
              <path
                  d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"></path>
            </svg>
          </button>
        </form>
      </div>
    </div>

    <!-- 지역 게시글 목록 -->
    <!--    <div class="areaList-dataContainer">-->
    <!--      <div class="areaList-dataBox">-->

    <!--        <c:forEach items="${areaList.content}" var="areaList" varStatus="status">-->
    <!--          &lt;!&ndash; 항목 &ndash;&gt;-->
    <!--          <div class="areaList-data">-->
    <!--            <div class="areaList-dataImg" style="display: inline-block;margin: 20px;">-->

    <!--              &lt;!&ndash; 상세보기로 이동 &ndash;&gt;-->
    <!--              <a href="javascript:encodeAndLink('${areaList.name}');">-->

    <!--                &lt;!&ndash; url 예약문자 처리  &ndash;&gt;-->
    <!--                <script>-->
    <!--                  function encodeAndLink(name) {-->
    <!--                    name = encodeURIComponent(name);-->
    <!--                    location.href = '${pageContext.request.contextPath}/areaD?name=' + name;-->
    <!--                  }-->
    <!--                </script>-->

    <!--                &lt;!&ndash; 이미지 default 처리 &ndash;&gt;-->
    <!--                <c:choose>-->
    <!--                  <c:when test="${areaList.image1 ne null}">-->
    <!--                    <img src="${areaList.image1}" width="250" height="250" alt="area image">-->
    <!--                  </c:when>-->
    <!--                  <c:otherwise>-->
    <!--                    <img src="${pageContext.request.contextPath}/_image/area/areaListData/default.png" width="250" height="250"-->
    <!--                         alt="area image">-->
    <!--                  </c:otherwise>-->
    <!--                </c:choose>-->

    <!--              </a>-->
    <!--            </div>-->

    <!--            <div class="areaList-dataName" style="margin: 0 auto;">-->
    <!--              <b>${areaList.name}</b>-->
    <!--            </div>-->
    <!--          </div>-->
    <!--        </c:forEach>-->
    <!--        <div class="clear-both"></div>-->
    <!--      </div>-->

    <!-- 페이징 처리 -->
    <!--      <div class="areaList-dataPage">-->
    <!--        <table class="pagination">-->
    <!--          <tr>-->
    <!--            &lt;!&ndash; 첫 페이지로 이동 &ndash;&gt;-->
    <!--            <td>-->
    <!--              <a href="${pageContext.request.contextPath}/areaL?sigungu=${sigungu}&contentType=${contentType}&page=0">-->
    <!--                << </a>-->
    <!--            </td>-->

    <!--            &lt;!&ndash; 이전 페이지로 이동 : 첫 페이지 제외 &ndash;&gt;-->
    <!--            <c:if test="${startBlockPage ne 1}">-->
    <!--              <td>-->
    <!--                <a href="${pageContext.request.contextPath}/areaL?sigungu=${sigungu}&contentType=${contentType}&page=${startBlockPage-2}">-->
    <!--                  < </a>-->
    <!--              </td>-->
    <!--            </c:if>-->

    <!--            &lt;!&ndash; 페이징 블록 1 ~ 10 &ndash;&gt;-->
    <!--            <c:forEach begin="${startBlockPage}" end="${endBlockPage}" var="idx">-->
    <!--              <td>-->
    <!--                <a href="${pageContext.request.contextPath}/areaL?sigungu=${sigungu}&contentType=${contentType}&page=${idx-1}">${idx}</a>-->
    <!--                &lt;!&ndash; 이거 현재 URL 로 반영되게 바꿀것 &ndash;&gt;-->
    <!--              </td>-->
    <!--            </c:forEach>-->

    <!--            &lt;!&ndash; 다음 페이지로 이동 : 마지막 페이지 제외 &ndash;&gt;-->
    <!--            <c:if test="${endBlockPage ne areaList.totalPages}">-->
    <!--              <td>-->
    <!--                <a href="${pageContext.request.contextPath}/areaL?sigungu=${sigungu}&contentType=${contentType}&page=${endBlockPage}">-->
    <!--                  > </a>-->
    <!--              </td>-->
    <!--            </c:if>-->

    <!--            &lt;!&ndash; 마지막 페이지로 이동 &ndash;&gt;-->
    <!--            <td>-->
    <!--              <a href="${pageContext.request.contextPath}/areaL?sigungu=${sigungu}&contentType=${contentType}&page=${areaList.totalPages-1}">-->
    <!--                >> </a>-->
    <!--            </td>-->
    <!--          </tr>-->
    <!--        </table>-->
    <!--      </div>-->
    <!--    </div>-->
  </section>
</template>

<script>
import {inject} from "vue";

export default {
  name: "DoldolseoAreaList",
  setup() {
    const imgPath = inject('contextPath') + '_image/area'
    const areaRestPath = inject('doldolseoArea')

    return {
      imgPath,
      areaRestPath,
    }
  }
}
</script>

<style scoped>
.areaList-container {
  background-color: white;
  width: 100%;
  margin: 0 auto;
  /*border: 1px solid;*/
}

.areaList-img {
  margin-top: 50px;
  text-align: center;
  /*border: 1px solid;*/
}

.areaList-img img {
  width: 1300px;
  height: 550px;
}

.areaL-drilldownBox {
  /*border: 1px solid;*/
  width: 350px;
  height: 30px;
  margin-top: 30px;
}

.drilldownbox {
  float: left;
  font-family: 'Nanum Gothic', sans-serif;
  font-size: 20px;
}

.areaList-nav {
  width: 100%;
  height: 80px;
  margin: 0 auto;
  position: relative;
  /*border: 1px solid;*/
}

.areaList-nav__cat {
  display: inline-block;
  width: 540px;
  height: 50px;
  position: absolute;
  left: 0;
  top: 14px;
  background-color: #E0EEFF;
  border-radius: 20px;
  box-shadow: 1px 2px 5px #CDCECF;
}

.areaList-nav__cat ul li {
  list-style: none;
  float: left;
  font-family: 'jua', sans-serif;
  font-size: 20px;
  margin-left: 28px;
}

.areaList-nav__cat a {
  color: #647C97;
}

.areaList-nav__search {
  font-size: 0;
  display: inline-block;
  width: 310px;
  height: 50px;
  position: absolute;
  right: 0;
  top: 14px;
  text-align: center;
  border-radius: 20px;
  border: 1px solid #E0EEFF;
  background-color: #E0EEFF;
}

.areaList-nav__search__input {
  margin-top: 10px;
  width: 220px;
  height: 25px;
  border: 2px solid #00addd;
}

.areaList-nav__search__btn {
  vertical-align: bottom;
  text-align: center;
  width: 36px;
  height: 31px;
  border: 2px solid #00addd;
  background-color: #00addd;
}

.areaList-dataContainer {
  border-radius: 20px;
  width: 1500px;
  height: 1285px;
  border: 1px solid #E0EEFF;
  background-color: #E0EEFF;
  color: #647C97;
}

.areaList-dataBox {
  width: 1175px;
  height: 1175px;
  margin: 50px auto 0;
  text-align: left;
  /*border: 1px solid;*/
}

.areaList-data {
  float: left;
  display: inline-block;
  width: 290px;
  height: 380px;
  text-align: center;
  border: 1pt solid #E0EEFF;
  /*border: 1px solid;*/
}

.clear-both {
  clear: both;
}

.areaList-dataImg {
  width: 250px;
  height: 250px;
}

.areaList-dataName {
  margin-top: 20px;
  font-family: nanumB;
  font-size: 18px;
  padding-left: 20px;
  padding-right: 20px;
  /*border: 1px solid;*/

}


.areaList-dataPage {
  padding-top: 10px;
  color: #2a5470;
  font-family: 'jua', sans-serif;
  font-size: 20px;
  text-align: center;
}
</style>