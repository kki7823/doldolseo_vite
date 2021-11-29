<template>
  <div class="miniprofile">
    <!-- Before Login -->
    <div class="miniprofileBox__guest">
      <button class="button1"
              type="button"
              @click="router.push({name: 'memberLogin'})">LOGIN
      </button>
      <button class="button2"
              type="button"
              @click="router.push({name: 'memberJoin'})">JOIN
      </button>
    </div>
  </div>


</template>

<script>
import {useRouter} from "vue-router";

export default {
  name: "DoldolseoHeaderProfile",
  setup(){
    const router = useRouter()

    return{
      router
    }
  }
}
</script>

<style scoped>
.miniprofileBox {
  width: 290px;
  height: 100px;
  position: relative;
  right: 0;
  border: 3px solid #1b3067;
  border-radius: 10px;
  background-color: #1b3067;
}

.miniprofile {
  display: inline-block;
  padding-top: 18px;
  font-family: "pooding", sans-serif;
  font-size: 1.2em;
  color: white;
  position: absolute;
  right: 20px;
  top: 2px;
  /*border: 1px solid;*/
}

.miniprofile__span--nickname {
  display: inline-block;
  max-width: 160px;
  text-align: right;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.miniprofile__span--white {
  vertical-align: top;
}

.miniprofile__photo {
  display: inline-block;
  width: 85px;
  height: 85px;
  border-radius: 70%;
  margin-top: 8px;
  margin-left: 8px;
  overflow: hidden;
  position: absolute;
  left: 0;
}

.miniprofile__photo > img {
  width: inherit;
  height: inherit;
  object-fit: cover;
}

.miniprofile__info {
  display: inline-block;
  width: 180px;
  text-align: center;
  font-size: 1.2em;
  position: absolute;
  right: 0;
  top: 14px;
  font-family: "pooding", sans-serif;
  /*border: 1px solid black;*/
}

.miniprofile__button {
  display: inline-block;
  width: 180px;
  position: absolute;
  bottom: 8px;
  right: 0;
  /*border: 1px solid;*/
}

.miniprofile__button > button {
  background-color: #4b8de9;
  color: white;
  font-family: 'jua', sans-serif;
  font-size: 17px;
  border: 3px solid #1b3067;
  border-radius: 10px;
  cursor: pointer;
}

.miniprofileBox__guest {
  width: 290px;
  height: 100px;
  position: relative;
  right: 0;
  border: 3px solid #1b3067;
  border-radius: 10px;
  background-color: #1b3067;
}

.button1 {
  position: absolute;
  width: 110px;
  height: 40px;
  bottom: 30px;
  left: 30px;
  background-color: #4b8de9;
  color: white;
  font-family: 'jua', sans-serif;
  font-size: 1.4em;
  border: 3px solid #4b8de9;
  border-radius: 10px;
  cursor: pointer;
}

.button2 {
  position: absolute;
  width: 110px;
  height: 40px;
  bottom: 30px;
  right: 20px;
  background-color: #4b8de9;
  color: white;
  font-family: 'jua', sans-serif;
  font-size: 1.4em;
  border: 3px solid #4b8de9;
  border-radius: 10px;
  cursor: pointer;
}
</style>