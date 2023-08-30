<script>
import Column from "./Column.vue";

export default {
  data(){
    return{
      columnsList: [
        {
          headerName: '1 этап',
          id: 1
        },
        {
          headerName: '2 этап',
          id: 2
        },
        {
          headerName: '3 этап',
          id: 3
        },
        {
          headerName: '4 этап',
          id: 4
        },
        {
          headerName: '5 этап',
          id: 5
        },
        {
          headerName: '6 этап',
          id: 6
        },
        {
          headerName: '7 этап',
          id: 7
        },
        {
          headerName: '8 этап',
          id: 8
        },
        {
          headerName: '9 этап',
          id: 9
        }
      ]
    }
  },
  components: {
    Column,
  },
};
</script>

<template>
  <ul class="board rounded">
    <Column v-for="column in columnsList"/>
  </ul>
</template>

<style lang="scss" scoped>
.board {
  padding: 10px 0;
  display: flex;
  overflow-y: auto;
  gap: 15px;
}
</style>
