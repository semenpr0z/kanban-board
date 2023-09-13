<script>
import Task from "./Task.vue";
import threeDotBtn from "@/components/UI/threeDotsBtn.vue";
import Modal from "@/components/UI/Modal.vue";

import draggable from "vuedraggable";

import { useTasksStore } from "@/stores/tasksStore.js";

export default {
  data() {
    return {
      openModal: false,
      creationTask: false,
      taskName: "",
      invalidInput: false,
      renamingColumn: false,
      cloneNameColumn: "",
      taskIdForDrugging: null,
      columnWillIncrease: false,
      isDragging: false,
    };
  },
  components: {
    Task,
    threeDotBtn,
    Modal,
    draggable,
  },
  props: {
    column: {
      type: Object,
      default: {
        headerName: "",
        id: 0,
        tasks: [],
      },
    },
    // idColumn: {
    //   type: String,
    //   required: true,
    // },
    coordinats: {
      type: Object,
      required: false,
    },
  },
  setup() {
    const tasksStore = useTasksStore();

    return {
      tasksStore,
    };
  },
  methods: {
    startStopCreationTask() {
      this.creationTask = !this.creationTask;
    },
    createTask(e) {
      e.preventDefault();
      if (!this.taskName.length) {
        this.invalidInput = true;
      } else {
        this.tasksStore.createTask(this.column.id, this.taskName);
        this.startStopCreationTask();
      }
    },
    startStopRenameColumn() {
      this.cloneNameColumn = this.column.headerName;
      this.renamingColumn = !this.renamingColumn;
      console.log(this.cloneNameColumn);
    },
    renameColumn(e) {
      e.preventDefault();
      console.log(!this.cloneNameColumn.length);
      if (!this.cloneNameColumn.length) {
        this.invalidInput = true;
      } else {
        this.tasksStore.renameColumn(this.column.id, this.cloneNameColumn);
        this.startStopRenameColumn();
      }
    },
    changeTasks() {
      // console.log(this.tasksStore.profileTasks)
      this.tasksStore.saveTasksToCache();
    },
  },
  watch: {
    taskName() {
      this.invalidInput = false;
    },
    cloneNameColumn() {
      this.invalidInput = false;
    },
  },
  emits: ["start-watching-coordinats"],
};
</script>

<template>
  <div class="wrapper">
    <div class="column rounded shadow-sm">
      <header class="column__header">
        <h6 v-if="!renamingColumn">{{ column.headerName }}</h6>
        <form class="renaming" @submit.prevent v-else>
          <input
            type="text"
            class="form-control form-control-sm"
            v-model="cloneNameColumn"
          />
          <button
            type="button"
            class="btn-close"
            aria-label="Close"
            @click="startStopRenameColumn"
          ></button>
          <button
            class="btn btn-sm btn-primary"
            type="submit"
            @click="renameColumn"
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
        <div class="dropdown" v-if="!renamingColumn">
          <threeDotBtn
            size="mini"
            class=""
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          />
          <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li>
              <button
                type="button"
                class="dropdown-item"
                @click="startStopRenameColumn"
              >
                Переименовать колонку
              </button>
            </li>
            <li>
              <button
                type="button"
                class="dropdown-item"
                @click="tasksStore.confirmationOfDeletingFunction(column.id)"
              >
                Удалить колонку
              </button>
            </li>
          </ul>
        </div>
      </header>
      <main>
        <draggable
          tag="ul"
          :list="column.tasks"
          group="tasks"
          @change="changeTasks"
          itemKey="task"
          class="column__list"
        >
          <template #item="{ element, index }">
            <Task :task="element" :key="index" />
          </template>
        </draggable>
      </main>

      <button
        class="column__add-btn btn btn-sm"
        @click="startStopCreationTask"
        v-if="!creationTask"
      >
        Добавить задачу
      </button>
      <form class="column__creation-task" v-else>
        <textarea
          @keyup.enter="createTask"
          class="form-control form-control-sm"
          :class="invalidInput ? 'is-invalid' : ''"
          v-model="taskName"
          placeholder="Введите заголовок задачи"
        ></textarea>
        <div class="buttons">
          <button
            class="btn btn-sm btn-primary"
            type="submit"
            @click="createTask"
          >
            Создать задачу
          </button>
          <button
            type="button"
            class="btn-close"
            aria-label="Close"
            @click="startStopCreationTask"
          ></button>
        </div>
      </form>
    </div>
  </div>
</template>

<style lang="scss" scoped>

.wrapper {
  position: relative;

  .column {
    min-width: 250px;
    max-width: 250px;
    max-height: 100%;
    height: max-content;
    background-color: var(--columnColor);
    color: var(--textColor);
    padding: 10px;
    display: flex;
    flex-direction: column;

    &__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 0 5px;
      height: 30px;
      position: relative;

      h5 {
        margin: 0;
      }

      .renaming {
        display: flex;
        gap: 5px;
        width: 100%;
        align-items: center;
        padding: 0 5px;
        margin-bottom: 5px;

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

    &__list {
      list-style: none;
      padding: 0;
      display: flex;
      flex-direction: column;
      padding: 5px;
      gap: 5px;
      flex-grow: 1;
      /* Занимает всё доступное вертикальное пространство */
      overflow-y: auto;
      /* Добавляем вертикальные полосы прокрутки, если содержимое превышает доступное пространство */

      .virtual-task {
        padding: 10px;
        background-color: var(--transparentHover);
      }
    }

    &__add-btn {
      margin-top: 10px;
      text-align: left;
      width: fit-content;
      color: var(--textColor);

      &:hover {
        background-color: var(--transparentHover);
      }
    }

    &__creation-task {
      margin-top: 10px;
      display: flex;
      gap: 5px;
      flex-direction: column;
      align-items: flex-start;
      padding: 0 5px;

      .buttons {
        display: flex;
        align-items: center;
        gap: 5px;
      }
    }
  }
}
</style>
