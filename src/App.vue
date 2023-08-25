<script>
import Header from "@/components/Common/Header/Header.vue";
import Footer from "@/components/Common/Footer.vue";

import { useUserStore } from "@/stores/userStore.js";
import { useSettingsStore } from "@/stores/settingsStore.js";

import Alerts from "./components/UI/Alerts.vue";
export default {
  data() {
    return {};
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
};
</script>

<template>
  <div>
    <Header />
    <Alerts />
    <main :class="{ dark: settingsStore.colorTheme }">
      <div
        class="container rounded"
        :class="{ 'dark-container': settingsStore.colorTheme }"
      >
        <router-view></router-view>
      </div>
    </main>
    <Footer />
  </div>
</template>

<style lang="scss">
@import "@/assets/main.scss";

main {
  width: 100%;
  height: 100%;
  min-height: calc(100vh - 40px);
  background-color: var(--lightBlue);
  transition: background-color 0.3s ease;
  padding-top: 25px;

  .container {
    position: relative;
    background-color: var(--White);
    transition: background-color 0.3s ease;
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
