import { defineStore } from "pinia";

export const useSettingsStore = defineStore("settingsStore", {
  state: () => ({
    colorTheme: false,
  }),
  actions: {
    checkTheme() {
      if (localStorage.getItem("theme") === "dark") {
        this.colorTheme = true;
      } else {
        this.colorTheme = false;
      }
    },
    updateTheme(){
      this.colorTheme = !this.colorTheme
      if (this.colorTheme) {
        localStorage.setItem("theme", "dark");
      } else {
        localStorage.setItem("theme", "light");
      }
    }
  },
});
