import { createRouter, createWebHistory } from "vue-router";
import MainPage from "@/Views/MainPage/MainPage.vue";
import Workspace from "@/Views/Workspace/Workspace.vue";
import Profile from "@/Views/Profile/Profile.vue";
import Page404 from "@/Views/Page404/Page404.vue";
import Auth from "@/Views/Auth/AuthPage.vue";
import Settings from "@/Views/Settings/Settings.vue";
// import Translater from '@/Views/Translater/Translater.vue'
import { useUserStore } from "@/stores/userStore.js";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Главная",
      component: MainPage,
      meta: { showInNav: true },
    },
    {
      path: "/workspace",
      name: "Рабочее пространство",
      component: Workspace,
      meta: { showInNav: true },
    },
    {
      path: "/profile",
      name: "Profile",
      component: Profile,
      children: {
        path: "/",
      },
      meta: { showInNav: false },
    },
    {
      path: "/:pathMatch(.*)*",
      name: "404",
      component: Page404,
      meta: { showInNav: false },
    },
    {
      path: "/auth",
      name: "auth",
      component: Auth,
      beforeEnter: (to, from, next) => {
        const userStore = useUserStore();
        const isAuthenticated = userStore.user !== null; // Проверяем, авторизован ли пользователь
        if (isAuthenticated) {
          // Пользователь уже авторизован, редирект на главную страницу
          next("/");
        } else {
          // Пользователь не авторизован, разрешаем доступ к странице авторизации
          next();
        }
      },
      meta: { showInNav: false },
    },
    {
      path: "/settings",
      name: "Settings",
      component: Settings,
      meta: { showInNav: false },
    },
    // {
    //   path: '/translate',
    //   name: 'translater',
    //   component: Translater
    // }
  ],
});

export default router;
