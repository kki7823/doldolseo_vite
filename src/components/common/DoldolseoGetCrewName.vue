<template>
  <span class="common-getCrewName">{{ crewName }}</span>
  <loading :active="isLoading"
           :is-full-page="false"
           :opacity="0.7">
  </loading>
</template>

<script>
import {inject, onMounted, ref} from "vue";
import {axios} from "@bundled-es-modules/axios";
import Loading from 'vue3-loading-overlay';
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css';
import onError from "../../module/onError";

export default {
  name: "DoldolseoGetCrewName",
  components: {Loading},
  props: {
    crewNo: {
      type: Number,
      require: true
    }
  },
  setup(props) {
    const URL_CREW = inject('doldolseoCrew')
    const isLoading = ref(false)

    const crewName = ref('')

    onMounted(() => {
      const URL_CREW_NAME = URL_CREW + '/' + props.crewNo + '/name'

      isLoading.value = true
      axios.get(URL_CREW_NAME)
          .then((resp) => {
            crewName.value = resp.data
            isLoading.value = false
          }).catch((err) => {
        onError.httpErrorException(err)
      })
    })
    return {
      crewName,
    }
  }
}
</script>

<style scoped>
.common-getCrewName {
  position: relative;
}
</style>