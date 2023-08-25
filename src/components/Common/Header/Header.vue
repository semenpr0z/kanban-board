<script>
import Profile from "./components/Profile.vue";
import AuthButton from "./components/AuthButton.vue";
import { useUserStore } from "@/stores/userStore.js";
import { useSettingsStore } from "@/stores/settingsStore.js";

import router from "@/router.js";

export default {
  data() {
    return {};
  },
  components: { Profile, AuthButton },
  setup() {
    const userStore = useUserStore();
    const settingsStore = useSettingsStore();

    return {
      userStore,
      settingsStore,
    };
  },
  methods: {
    openAuth() {
      router.push("/auth");
    },
  },
};
</script>

<template>
  <header class="header" :class="{'dark': settingsStore.colorTheme}" >
    <router-link to="/" class="link"
      ><span class="logotype">Kanban Board</span></router-link
    >
    <Profile v-if="userStore.user" />
    <AuthButton v-else @click="openAuth" />
  </header>
</template>

<style lang="scss" scoped>
.header {
  padding: 7px 16px;
  background-color: var(--darkBlue);
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  transition: background-color 0.3s ease;

  .link {
    text-decoration: none;
  }
  .logotype {
    color: var(--White);
  }
}

.dark{
  background-color: var(--bs-gray-800);
}

@media (max-width: 500px) {
  .header {
    justify-content: flex-end;
    .link {
      display: none;
    }
  }
}
</style>
