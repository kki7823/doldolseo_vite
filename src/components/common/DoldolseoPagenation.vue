<template>
  <table class="pagination">
    <tr>
      <td @click="setPage(0)"> &lt;&lt;</td>
      <td v-if="startBlockPage === 1"
          @click="setPage(startBlockPage-2)">
        &lt;
      </td>
      <td v-for="idx in endBlockPage-startBlockPage"
          @click="setPage(idx-1)">
        {{ idx }}
      </td>
      <td v-if="endBlockPage !== totalPages"
          @click="setPage(endBlockPage)">
        &gt;
      </td>
      <td @click="setPage(totalPages-1)">
        &gt;&gt;
      </td>
    </tr>
  </table>
</template>

<script>
export default {
  name: "DoldolseoPagenation",
  props: {
    setPage: {
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
    return {
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