<template>
  <table class="pagination">
    <tr>
      <td @click="page=0"> &lt;&lt;</td>
      <td v-if="startBlockPage === 1"
          @click="page = startBlockPage-2">
        &lt;
      </td>
      <td v-for="idx in endBlockPage-startBlockPage+1"
          @click="page = idx-1">
        {{ idx }}
      </td>
      <td v-if="endBlockPage !== totalPages"
          @click="page = endBlockPage">
        &gt;
      </td>
      <td @click="page=totalPages-1">
        &gt;&gt;
      </td>
    </tr>
  </table>
</template>

<script>
import {ref} from "vue";

export default {
  name: "DoldolseoPagenation",
  props: {
    page: {
      type: Number,
      require: true
    },
    startBlockPage: {
      type: Number,
      require: true
    },
    endBlockPage: {
      type: Number,
      require: true
    },
    totalPages: {
      type: Number,
      require: true
    },
  },
  setup(props) {
    const page = ref(props.page)
    const startBlockPage = ref(props.startBlockPage)
    const endBlockPage = ref(props.endBlockPage)
    const totalPages = ref(props.totalPages)

    return {
      page,
      startBlockPage,
      endBlockPage,
      totalPages,
    }
  }
}
</script>

<style scoped>
.pagination {
  display: inline-block;
}

.pagination td {
  border: 1px #CDCECF solid;
  font-family: 'Nanum Gothic Coding', sans-serif;
  font-size: 15px;
  font-weight: bold;
  padding: 4px 14px 4px 14px;
  cursor: pointer;
}
</style>