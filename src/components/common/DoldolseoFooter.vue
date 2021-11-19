<template>
  <div class="footer_container">
    <div class="footer_content">
      Copyright © DOLDOLSEO All Right Reserved <br/>
      KKI BJY LY / 2021-07-06 - 2021-08-19 <br/><br/><br/>

      <a href="${pageContext.request.contextPath}/memberP">이용약관 </a> | <a
        href="${pageContext.request.contextPath}/memberR">개인정보이용동의서</a>
      <br>
      개인정보관리 책임자 : 백정연 (jyjy@naver.com)
    </div>
  </div>
</template>

<script>
export default {
  name: "DoldolseoFooter"
}
</script>

<style scoped>
.footer_container {
  background-color: #495c75;
  margin-top: 40px;
  width: 100%;
}

.footer_content {
  color: white;
  text-align: center;
  padding-top: 80px;
  padding-bottom: 40px;
}

.footer_content a {
  text-decoration: none;
  color: white;
}
</style>