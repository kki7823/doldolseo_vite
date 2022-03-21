<template>
  <span class="common-getNickname">{{ nickName }}
    <loading :active="isLoading"
             :is-full-page="false"
             :opacity="0.7">
    </loading>
  </span>
</template>

<script>
import {inject, onMounted, ref} from "vue";
import {axios} from "@bundled-es-modules/axios";
import Loading from 'vue3-loading-overlay';
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css';

export default {
  name: "DoldolseoGetNickname",
  components: {Loading},
  props: {
    id: {
      type: String,
      require: true
    }
  },
  setup(props) {
    const URL_MEMBER = inject('doldolseoMember')
    const isLoading = ref(false)

    const nickName = ref('')

    onMounted(() => {
      const URL_MEMBER_NICKNAME = URL_MEMBER + '/nickname/' + props.id

      isLoading.value = true
      axios.get(URL_MEMBER_NICKNAME)
          .then((resp) => {
            nickName.value = resp.data
            isLoading.value = false
          }).catch((err) => {
        isLoading.value = false
        const httpErrorCode = err.response.status
        if(httpErrorCode === 401){
          nickName.value = 'ERROR'
        }
      })
    })
    return {
      isLoading,
      nickName,
    }
  }
}
</script>

<style scoped>
.common-getNickname {
  position: relative;
}
</style>