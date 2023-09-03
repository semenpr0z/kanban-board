<script>
import Header from "@/components/Common/Header/Header.vue";
import Footer from "@/components/Common/Footer.vue";

import { useUserStore } from "@/stores/userStore.js";
import { useSettingsStore } from "@/stores/settingsStore.js";

import Alerts from "./components/UI/Alerts.vue";
export default {
  data() {
    return {
      settings: {
        suppressScrollY: false,
        suppressScrollX: false,
        wheelPropagation: false
      }
    };
  },
  components: { Header, Footer, Alerts },
  setup() {
    const userStore = useUserStore();
    const settingsStore = useSettingsStore();

    userStore.initializeUserFromLocalStorage();
    settingsStore.checkTheme();

    return {
      userStore,
      settingsStore,
    };
  },
  computed: {
    colorTheme() {
      if (this.settingsStore.colorTheme) {
        return "dark-theme";
      } else {
        return "light-theme";
      }
    },
  },
};
</script>

<template>
  <div :class="colorTheme">
    <Header />
    <Alerts />
    <main class="main">
        <div class="container rounded">
          <router-view></router-view>
        </div>
    </main>
    <Footer />
  </div>
</template>

<style lang="scss">
@import "@/assets/main.scss";

.main {
  width: 100%;
  height: 100%;
  min-height: calc(100vh - 50px);
  max-height: calc(100vh - 50px);
  background-color: var(--bgColor);
  transition: background-color 0.3s ease;
  padding: 25px 0;
  color: var(--textColor);
  display: flex;
  flex-direction: column;
  box-sizing: border-box;

  .container {
    position: relative;
    background-color: var(--containerColor);
    transition: background-color 0.3s ease;
    padding: 12px;
    flex-grow: 1;
    display: flex;
    overflow: auto;
  }
}

.dark {
  background-color: var(--bs-gray-600);

  &-container {
    color: var(--White) !important;
    background-color: var(--bs-gray-900) !important;
  }
}
</style>
