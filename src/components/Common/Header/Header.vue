<script>
import Profile from "./components/Profile.vue";
import AuthButton from "./components/AuthButton.vue";
import Notification from "./components/Notification.vue";
import { useUserStore } from "@/stores/userStore.js";

import router from "@/router.js";

export default {
  data() {
    return {};
  },
  components: { Profile, AuthButton, Notification },
  setup() {
    const userStore = useUserStore();

    return {
      userStore,
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
  <header class="header">
    <router-link to="/" class="link"
      ><span class="logotype">Kanban Board</span></router-link
    >
    <div class="wrapper">
      <Notification v-if="userStore.user" />
      <Profile v-if="userStore.user" />
      <AuthButton v-else @click="openAuth" />
    </div>
  </header>
</template>

<style lang="scss" scoped>
.header {
  padding: 7px 16px;
  background-color: var(--headerColor);
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  transition: background-color 0.3s ease;

  .wrapper {
    display: flex;
    gap: 15px;
    align-items: center;
  }
  .link {
    text-decoration: none;
  }
  .logotype {
    color: var(--White);
  }
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
