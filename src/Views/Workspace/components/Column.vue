<script>
import Task from "./Task.vue";
import threeDotBtn from "@/components/UI/threeDotsBtn.vue";

import { useTasksStore } from "@/stores/tasksStore.js";

export default {
  data() {
    return {
      openModal: false,
      creationTask: false,
      taskName: '',
      invalidInput: false,
      renamingColumn: false
    }
  },
  components: {
    Task,
    threeDotBtn,
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
    idColumn: {
      type: String,
      required: true
    }
  },
  setup() {
    const tasksStore = useTasksStore();


    return {
      tasksStore
    };
  },
  methods: {
    startStopCreationTask() {
      this.creationTask = !this.creationTask
    },
    createTask(e) {
      e.preventDefault()
      if (!this.taskName.length) {
        this.invalidInput = true
      } else {
        this.tasksStore.createTask(this.column.id, this.taskName);
        this.startStopCreationTask();
      }
    },

  },
  watch: {
    taskName() {
      this.invalidInput = false
    }
  },
};
</script>

<template>
  <div class="column rounded shadow-sm">
    <header class="column__header">
      <h6>{{ column.headerName }}</h6>
      <div class="dropdown">
        <threeDotBtn size="mini" class="" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false" />
        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
          <li><button type="button" class="dropdown-item">Переименовать колонку</button></li>
          <li><button type="button" class="dropdown-item">Удалить колонку</button></li>
        </ul>
      </div>
    </header>
    <ul class="column__list">
      <Task v-for="task in column.tasks" :task="task" />
    </ul>
    <button class="column__add-btn btn btn-sm" @click="startStopCreationTask" v-if="!creationTask">Добавить
      задачу</button>
    <form class="column__creation-task" v-else>
      <textarea @keyup.enter="createTask" class="form-control form-control-sm" :class="invalidInput ? 'is-invalid' : ''"
        v-model="taskName" placeholder="Введите заголовок задачи"></textarea>
      <div class="buttons">
        <button class="btn btn-sm btn-primary" type="submit" @click="createTask">
          Создать задачу
        </button>
        <button type="button" class="btn-close " aria-label="Close" @click="startStopCreationTask"></button>
      </div>
    </form>
  </div>
</template>

<style lang="scss" scoped>
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

  }

  &__list {
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    padding: 0 5px;
    gap: 5px;
    flex-grow: 1;
    /* Занимает всё доступное вертикальное пространство */
    overflow-y: auto;
    /* Добавляем вертикальные полосы прокрутки, если содержимое превышает доступное пространство */
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
</style>
