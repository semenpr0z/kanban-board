<script>
import Profile from "./components/Profile.vue";
import AuthButton from "./components/AuthButton.vue";
import Notification from "./components/Notification.vue";
import { useUserStore } from "@/stores/userStore.js";

import router from "@/router.js";

export default {
  data() {
    return {
      // routes: router.options.routes
    };
  },
  components: { Profile, AuthButton, Notification },
  setup() {
    const userStore = useUserStore();

    const routes = router.options.routes

    return {
      userStore, routes
    };
  },
  methods: {
    openAuth() {
      router.push("/auth");
    },
  },
  computed: {
    navRoutes() {
      // Фильтруем маршруты на основе метаданных
      return this.routes.filter(route => route.meta.showInNav);
    },
  },
};
</script>

<template>
  <header class="header">
    <router-link to="/" class="link">
      <span class="logotype">
        PulseWave
      </span>
    </router-link>
    <nav class="navbar">
      <router-link v-for="route in navRoutes" :to="route.path" class="link navbar__item">
        {{ route.name }}
      </router-link>
    </nav>
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
  height: 50px;
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
    color: var(--headerTextColor  );
  }

  .navbar {
    display: flex;
    gap: 30px;

    &__item {
      color: var(--headerTextColor);
      position: relative;

      &:hover {
        &::after {
          content: "";
          /* Создаем псевдоэлемент */
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 2px;
          /* Толщина подчеркивания */
          background-color: var(--textColor);
          /* Цвет подчеркивания */
          transform: scaleX(0);
          /* Изначально сжатое */
          transform-origin: center;
          transition: transform 0.3s ease-in-out;
          /* Плавное изменение ширины */
        }
      }

      /* Этот стиль обеспечит анимацию при снятии наведения */
      &::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 2px;
        background-color: var(--textColor);
        transform: scaleX(0);
        /* Изначально сжатое */
        transform-origin: center;
        transition: transform 0.3s ease-in-out;
        /* Плавное изменение ширины */
      }

      &:hover::after {
        transform: scaleX(1);
        /* При наведении развернуть псевдоэлемент */
      }
    }
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
