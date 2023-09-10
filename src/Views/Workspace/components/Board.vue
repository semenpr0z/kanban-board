<script>
import Column from "./Column.vue";
import Task from "./Task.vue";
import { useTasksStore } from "@/stores/tasksStore.js";
import draggable from "vuedraggable";

export default {
  data() {
    return {
      creatingColumn: false,
      headerName: '',
      invalidInput: false,
    }
  },
  components: {
    Column, Task, draggable
  },
  setup() {
    const tasksStore = useTasksStore();


    return {
      tasksStore
    };
  },
  methods: {
    startStopCreationColumn() {
      this.creatingColumn = !this.creatingColumn
      this.invalidInput = false
    },
    createColumn(e) {
      e.preventDefault()

      if (!this.headerName.length) {
        this.invalidInput = true
      } else {
        this.tasksStore.createColumn(this.headerName);
        this.startStopCreationColumn();
        this.invalidInput = false;
        this.headerName = '';
      }
    },
    handleDragOver(event) {
      event.preventDefault();

      const boardElement = document.querySelector('.board'); // Получаем элемент задачи
      const rect = boardElement.getBoundingClientRect(); // Получаем его координаты


      this.mouseCoordinats.posX = event.clientX - rect.left;
      this.mouseCoordinats.posY = event.clientY - rect.top;
    },

  },
  watch: {
    headerName() {
      this.invalidInput = false
    }
  }
};
</script>

<template>
  <ul class="board rounded">
    <Column v-for="(column, index) in tasksStore.profileTasks" :column="column" :idColumn="column.id" :key="column.id" />
    <div class="rounded board__add-column" :class="creatingColumn ? 'opened' : ''">
      <span class="not-activated" v-if="!creatingColumn" @click="startStopCreationColumn">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus"
          viewBox="0 0 16 16">
          <path
            d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
        </svg>
        Добавить колонку
      </span>
      <form class="activated" v-else>
        <input type="text" class="form-control" :class="invalidInput ? 'is-invalid' : ''" placeholder="Назовите колонку"
          v-model="headerName">
        <div class="buttons">
          <button class="btn btn-sm btn-primary" @click="createColumn">
            Создать колонку
          </button>
          <button type="button" class="btn-close " aria-label="Close" @click="startStopCreationColumn"></button>
        </div>
      </form>
    </div>
  </ul>
</template>

<style lang="scss" scoped>
.board {
  padding: 10px 0;
  display: flex;
  overflow-y: auto;
  gap: 12px;
  height: 100%;
  position: relative;

  &__add-column {
    cursor: pointer;
    padding: 10px;
    min-width: 250px;
    max-width: 250px;
    background-color: #A6C5E229;
    height: 44px;
    transition: all 0.3s ease;
    overflow: hidden;


    &:hover {
      background-color: #a6c5e20b;
    }

    .not-activated {
      display: flex;
      align-items: center;
      gap: 5px;
    }

    .activated {
      display: flex;
      flex-direction: column;
      gap: 10px;

      .buttons {
        display: flex;
        align-items: center;
        gap: 5px;
      }
    }
  }

  .opened {
    background-color: var(--columnColor);
    cursor: default;
    height: 99px;

    &:hover {}
  }
}
</style>
