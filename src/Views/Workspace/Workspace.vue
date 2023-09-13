<script>
import ThreeDotsBtn from "@/components/UI/threeDotsBtn.vue";
import Board from "./components/Board.vue";
import Modal from "@/components/UI/Modal.vue";

import { useTasksStore } from "@/stores/tasksStore.js";

export default {
  data() {
    return {
      visibleModal: false,
      cloneNameWorkSpace: "",
      renamingWorkSpace: false,
      invalidInput: false,
    };
  },
  components: {
    Board,
    ThreeDotsBtn,
    Modal,
  },
  methods: {
    startStopRenameWorkSpace() {
      this.cloneNameWorkSpace = this.tasksStore.workSpaceName;
      this.renamingWorkSpace = !this.renamingWorkSpace;
    },
    renameWorkSpace(e) {
      e.preventDefault();
      if (!this.cloneNameWorkSpace.length) {
        this.invalidInput = true;
      } else {
        this.tasksStore.renameWorkSpace(this.cloneNameWorkSpace);
        this.startStopRenameWorkSpace();
      }
    },
    cleanWorkspace() {
      this.tasksStore.cleanWorkspace();
      console.log("cleaned");
    },
  },
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
      <h1 v-if="!renamingWorkSpace">{{ tasksStore.workSpaceName }}</h1>
      <form class="renaming" @submit.prevent v-else>
        <input
          type="text"
          class="form-control form-control-lg"
          v-model="cloneNameWorkSpace"
        />
        <button
          type="button"
          class="btn-close"
          aria-label="Close"
          @click="startStopRenameWorkSpace"
        ></button>
        <button
          class="btn  btn-primary"
          type="submit"
          @click="renameWorkSpace"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-check-circle"
            viewBox="0 0 16 16"
          >
            <path
              d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
            />
            <path
              d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"
            />
          </svg>
        </button>
      </form>
      <div class="dropdown">
        <ThreeDotsBtn
          size="big"
          id="dropdownMenuButton1"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        />
        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
          <li>
            <button
              type="button"
              class="dropdown-item"
              @click="startStopRenameWorkSpace"
            >
              Переименовать рабочее пространство
            </button>
          </li>
          <li>
            <button type="button" class="dropdown-item" @click="cleanWorkspace">
              Очистить рабочее пространство
            </button>
          </li>
        </ul>
      </div>
    </div>
    <div class="workspace__middle">
      <Board />
      <Modal
        v-if="tasksStore.confirmationOfDeleting"
        @closeModal="tasksStore.confirmationOfDeletingFunction()"
        nameModal="Подтвердите действие"
      >
        <div class="modal-body">
          <p>Вы уверены, что хотите удалить колонку?</p>
        </div>
        <div class="modal-footer">
          <button
            class="btn btn-secondary"
            @click="tasksStore.confirmationOfDeletingFunction()"
          >
            Нет
          </button>
          <button class="btn btn-primary" @click="tasksStore.deleteColumn()">
            Да
          </button>
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

    .renaming {
      display: flex;
      gap: 5px;
      width: 100%;
      align-items: center;
      padding: 0 5px;
      height: 68px;

      input {
        width: 70%;
      }

      .btn {
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }

  &__middle {
    min-height: calc(100% - 69px);
  }
}
</style>
