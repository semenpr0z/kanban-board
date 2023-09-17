import { defineStore } from "pinia";
import { v4 as uuidv4 } from "uuid";

// Загрузка данных из кэша
function loadFromCache() {
  const cachedData = localStorage.getItem("profileTasks");
  return cachedData
    ? JSON.parse(cachedData)
    : [
        {
          workSpaceName: "Личное рабочее пространство",
          columns: [
            {
              headerName: "1 этап",
              id: uuidv4(),
              tasks: [{ name: "Задача 1", text: "", id: uuidv4() }],
            },
          ],
          id: uuidv4(),
        },
      ];
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
    workSpaceName: "Рабочее пространство",
    idOfWorkSpace: "",
  }),
  actions: {
    createTask(workSpaceId, columnId, taskName) {
      // Находим рабочее пространство по ID
      const workspace = this.profileTasks.find((ws) => ws.id === workSpaceId);

      if (workspace) {
        // Находим колонку в рабочем пространстве по ID
        const column = workspace.columns.find((col) => col.id === columnId);

        if (column) {
          const newTask = { name: taskName, text: "", id: uuidv4() };
          column.tasks.push(newTask);
          saveToCache(this.profileTasks); // Сохранение данных в кэш после изменения
        }
      }
    },
    createColumn(workSpaceId, columnName) {
      const newColumn = {
        headerName: columnName,
        id: uuidv4(),
        tasks: [],
      };

      // Находим рабочее пространство по ID
      const workspaceIndex = this.profileTasks.findIndex(
        (workspace) => workspace.id === workSpaceId
      );

      if (workspaceIndex !== -1) {
        // Если рабочее пространство с указанным ID найдено, добавляем новую колонку в него
        this.profileTasks[workspaceIndex].columns.push(newColumn);
        console.log(this.profileTasks);
        saveToCache(this.profileTasks); // Сохранение данных в кэш после изменения
      } else {
        console.error("Рабочее пространство не найдено");
      }
    },
    renameColumn(workSpaceId, columnId, newColumnName) {
      // Находим рабочее пространство по ID
      const workspace = this.profileTasks.find((ws) => ws.id === workSpaceId);

      if (workspace) {
        // Находим колонку в рабочем пространстве по ID
        const column = workspace.columns.find((col) => col.id === columnId);

        if (column) {
          column.headerName = newColumnName;
          saveToCache(this.profileTasks);
        }
      }
    },
    confirmationOfDeletingFunction(idOfWorkSpace, columnId) {
      this.confirmationOfDeleting = !this.confirmationOfDeleting;
      if (!this.confirmationOfDeleting) {
        this.selectedColumnId = "";
        this.idOfWorkSpace = "";
      } else {
        this.selectedColumnId = columnId;
        this.idOfWorkSpace = idOfWorkSpace;
      }
    },
    deleteColumn() {
      const workspaceIndex = this.profileTasks.findIndex(
        (workspace) => workspace.id === this.idOfWorkSpace
      );

      if (workspaceIndex !== -1) {
        const columnIndex = this.profileTasks[workspaceIndex].columns.findIndex(
          (column) => column.id === this.selectedColumnId
        );

        if (columnIndex !== -1) {
          // Проверяем, что есть хотя бы две колонки
          if (this.profileTasks[workspaceIndex].columns.length > 1) {
            // Если есть предыдущая колонка, переносим задачи в нее
            if (columnIndex > 0) {
              const previousColumn =
                this.profileTasks[workspaceIndex].columns[columnIndex - 1];
              previousColumn.tasks = previousColumn.tasks.concat(
                this.profileTasks[workspaceIndex].columns[columnIndex].tasks
              );
            }
            // Удаляем колонку
            this.profileTasks[workspaceIndex].columns.splice(columnIndex, 1);
            saveToCache(this.profileTasks); // Сохраняем изменения в кэше
            this.confirmationOfDeletingFunction();
          } else {
            // Если есть только одна колонка, не удаляем ее
            console.warn("Нельзя удалить последнюю колонку.");
          }
        }
      }
    },
    saveTasksToCache() {
      saveToCache(this.profileTasks);
    },
    renameWorkSpace(workSpaceId, newWorkSpaceName) {
      const workspace = this.profileTasks.find((ws) => ws.id === workSpaceId);
    
      if (workspace) {
        workspace.workSpaceName = newWorkSpaceName;
        saveToCache(this.profileTasks); // Сохраняем изменения в кэше
      }
    },
    cleanWorkspace() {
      this.profileTasks = [
        {
          workSpaceName: "Личное рабочее пространство",
          columns: [
            
          ],
          id: uuidv4(),
        },
      ];
      saveToCache(this.profileTasks);
    },
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
