import { defineStore } from "pinia";
import { v4 as uuidv4 } from "uuid";

// Загрузка данных из кэша
function loadFromCache() {
  const cachedData = localStorage.getItem("profileTasks");
  return cachedData ? JSON.parse(cachedData) : [];
}

// Сохранение данных в кэш
function saveToCache(data) {
  localStorage.setItem("profileTasks", JSON.stringify(data));
}

export const useTasksStore = defineStore("tasksStore", {
  state: () => ({
    profileTasks: loadFromCache(), // Загрузка данных из кэша при создании хранилища
  }),
  actions: {
    createTask(columnId, taskName) {
      const column = this.profileTasks.find((column) => column.id === columnId);

      if (column) {
        const newTask = { name: taskName, text: "" };
        column.tasks.push(newTask);
        saveToCache(this.profileTasks); // Сохранение данных в кэш после изменения
      }
    },
    createColumn(columnName) {
      this.profileTasks.push({
        headerName: columnName,
        id: uuidv4(),
        tasks: [],
      });
      console.log(this.profileTasks);
      saveToCache(this.profileTasks); // Сохранение данных в кэш после изменения
    },
    renameColumn(columnId, newColumnName){
      const column = this.profileTasks.find((column) => column.id === columnId);

      if (column) {
        column.headerName = newColumnName;
        saveToCache(this.profileTasks);
      }
    }
  },
});

// [
//   {
//     headerName: "1 этап",
//     id: uuidv4(),
//     tasks: [{ name: "Задача 1", text: "adasdas" }],
//   },
//   {
//     headerName: "2 этап",
//     id: uuidv4(),
//     tasks: [{ name: "Задача 1", text: "" }],
//   },
//   {
//     headerName: "3 этап",
//     id: uuidv4(),
//     tasks: [],
//   },
//   {
//     headerName: "4 этап",
//     id: uuidv4(),
//     tasks: [],
//   },
// ],
