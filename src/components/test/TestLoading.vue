<template>
  <div class="vld-parent">
    <loading :active="isLoading"
             :can-cancel="true"
             :on-cancel="onCancel"
             :is-full-page="fullPage">
    </loading>
    <label><input type="checkbox" v-model="fullPage">Full page?</label>
    <button @click.prevent="doAjax">fetch Data</button>
  </div>
</template>

<script>
// Import component
// Import stylesheet
import Loading from 'vue3-loading-overlay';
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css';
import {ref} from "vue";

export default {
  name: "TestLoading",
  components: {Loading},
  setup() {
    const isLoading = ref(false);
    const fullPage = ref(true);

    const doAjax = () => {
      isLoading.value = true;
      // simulate AJAX
      setTimeout(() => {
        isLoading.value = false
      }, 5000)
    }
    const onCancel = () => {
      console.log('User cancelled the loader.');
      //because the props is single flow direction, you need to set isLoading status normally.
      isLoading.value = false;
    }
    return {
      isLoading,
      fullPage,
      doAjax,
      onCancel
    }
  },

}
</script>

<style scoped>

</style>