<script>
import ThreeDotsBtn from "@/components/UI/threeDotsBtn.vue";
import Board from "./components/Board.vue";
import Modal from "@/components/UI/Modal.vue";

import { useTasksStore } from "@/stores/tasksStore.js";

export default {
  data() {
    return {
      visibleModal: false,
    };
  },
  components: {
    Board,
    ThreeDotsBtn,
    Modal,
  },
  methods: {},
  setup() {
    const tasksStore = useTasksStore();

    return {
      tasksStore,
    };
  },
};
</script>

<template>
  <div class="workspace">
    <div class="workspace__top">
      <h1>Рабочее пространство</h1>
      <ThreeDotsBtn size="big" />
    </div>
    <div class="workspace__middle">
      <Board />
      <Modal v-if="tasksStore.confirmationOfDeleting" @closeModal="tasksStore.confirmationOfDeletingFunction()" nameModal="Подтвердите действие">
        <div class="modal-body">
            <p>Вы уверены, что хотите удалить колонку?</p>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" @click="tasksStore.confirmationOfDeletingFunction()">Нет</button>
          <button class="btn btn-primary" @click="tasksStore.deleteColumn()">Да</button>
        </div>
      </Modal>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.workspace {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  max-width: 100%;

  &__top {
    border-bottom: 1px solid var(--borderColor);
    display: flex;
    justify-content: space-between;
    align-items: center;

    h1 {
      margin: 0;
      padding: 10px 0;
    }
  }

  &__middle {
    min-height: calc(100% - 69px);
  }
}
</style>
