<template>
  <div class="exeption-container">
    <h2 class="exeption-title">
      웹페이지 내부 오류
    </h2>
    <h2 class="exeption-title--sub">
      죄송합니다. 웹페이지 내부에 예상치 못한 오류가 발생하였습니다.<br/>
      잠시후 다시 시도해보시기 바랍니다.
    </h2>
    <p class="exeption-content">
      오류가 지속 될 경우 담당자에게 문의 바랍니다.<br/>
      Email : kjd55399997@gmail.com<br/>
      Http Status {{errorCode}}
      <br/>
    </p>
  </div>
</template>

<script>
export default {
  name: "DoldolseoError",
    props: {
      errorCode: {
        type: String,
      }
    },
  setup(props){
    const errorCode = props.errorCode
    return{
      errorCode
    }
  }
}
</script>

<style scoped>
.exeption-container {
  width: 100%;
  height: 700px;
  padding: 50px;
  background-image: url("src/_image/etc/exception_background.png");
  background-size: cover;
}

.exeption-title {
  font-family: 'Nanum Gothic', sans-serif;
  font-weight: bold;
  font-size: 50px;
  color: #1b3067;
}

.exeption-title--sub {
  font-family: 'Nanum Gothic', sans-serif;
  font-weight: bold;
  font-size: 35px;
  color: #2b76b9;
}

.exeption-content {
  font-family: 'Nanum Gothic', sans-serif;
  font-size: 23px;
}
</style>