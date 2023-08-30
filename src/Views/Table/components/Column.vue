<script>
import Task from "./Task.vue";
import threeDotBtn from "@/components/UI/threeDotsBtn.vue";
export default {
  components: {
    Task,
    threeDotBtn,
  },
};
</script>

<template>
  <div class="column rounded shadow-sm">
    <header class="column__header">
      <h5>Столбик</h5>
      <threeDotBtn size="mini"/>
    </header>
    <ul class="column__list">
      <Task />
      <Task />
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.column {
  min-width: 250px;
  max-width: 250px;
  background-color: var(--columnColor);
  color: var(--textColor);
  padding: 10px;

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 0 5px;
    height: 30px;

    h5 {
      margin: 0;
    }
  }

  &__list {
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
}
</style>
