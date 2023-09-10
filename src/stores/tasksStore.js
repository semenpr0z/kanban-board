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
    confirmationOfDeleting: false,
    idOfColumnForDelete: "",
    draggableTask: null,
    columnIdForDrug: null,
  }),
  actions: {
    createTask(columnId, taskName) {
      const column = this.profileTasks.find((column) => column.id === columnId);

      if (column) {
        const newTask = { name: taskName, text: "", id: uuidv4() };
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
    renameColumn(columnId, newColumnName) {
      const column = this.profileTasks.find((column) => column.id === columnId);

      if (column) {
        column.headerName = newColumnName;
        saveToCache(this.profileTasks);
      }
    },
    confirmationOfDeletingFunction(columnId) {
      this.confirmationOfDeleting = !this.confirmationOfDeleting;
      if (!this.confirmationOfDeleting) {
        this.idOfColumnForDelete = "";
      } else {
        this.idOfColumnForDelete = columnId;
      }
    },
    deleteColumn() {
      const columnIndex = this.profileTasks.findIndex(
        (column) => column.id === this.idOfColumnForDelete
      );

      if (columnIndex !== -1) {
        // Проверяем, что есть хотя бы две колонки
        if (this.profileTasks.length > 1) {
          // Если есть предыдущая колонка, переносим задачи в нее
          if (columnIndex > 0) {
            const previousColumn = this.profileTasks[columnIndex - 1];
            previousColumn.tasks = previousColumn.tasks.concat(
              this.profileTasks[columnIndex].tasks
            );
          }
          // Удаляем колонку
          this.profileTasks.splice(columnIndex, 1);
          saveToCache(this.profileTasks); // Сохраняем изменения в кэше
          this.confirmationOfDeletingFunction();
        } else {
          // Если есть только одна колонка, не удаляем ее
          console.warn("Нельзя удалить последнюю колонку.");
        }
      }
    },
    saveTasksToCache(){
      saveToCache(this.profileTasks)
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

// [
//   {
//     headerName: "1 этап",
//     id: uuidv4(),
//     tasksId: ["sadasasdsad", "sasdasadsad"],
//   },
//   {
//     headerName: "2 этап",
//     id: uuidv4(),
//     tasksId: ["sadasasdsad", "sasdasadsad", "sasdasasssdsad"],
//   },
// ]
// [
//   {
//     taskName: "Задача 1",
//     id: uuidv4(),
//     text: "ssss",
//     columPriority: 1
//   },
//   {
//     taskName: "Задача 1",
//     id: uuidv4(),
//     text: "ssss",
//     columPriority: 2
//   }
// ];
