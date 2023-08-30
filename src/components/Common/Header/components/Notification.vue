<script>
import { useUserStore } from "@/stores/userStore.js";
import NotificationItem from "@/components/UI/NotificationItem.vue";

export default {
  data() {
    return {
      isOpened: false,
      checkedAll: false,
    };
  },
  setup() {
    const userStore = useUserStore();
    return {
      userStore,
    };
  },
  components: { NotificationItem },
  methods: {
    toggleNotificationsList() {
      this.isOpened = !this.isOpened;
    },
    checkNotifications() {
      const checkedIds = this.userStore.notifications
        .filter((notification) => notification.checked)
        .map((notification) => notification.id);
      console.log(`Id прочитанных уведомлений: ${checkedIds}`);

      this.userStore.notifications = this.userStore.notifications.filter(
        (notification) => !notification.checked
      );
    },
    checkingAll() {
      if (!this.checkedAll) {
        this.userStore.notifications.forEach((notification) => {
          notification.checked = true;
        });
      }else{
        this.userStore.notifications.forEach((notification) => {
          notification.checked = false;
        });
      }
    },
  },
};
</script>

<template>
  <div class="position-relative">
    <button
      :title="this.userStore.notifications.length ? `Уведомлений: ${this.userStore.notifications.length}`: `Нет уведомлений`"
      type="button"
      class="btn btn-sm position-relative"
      @click="toggleNotificationsList"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill=""
        class="bi bi-bell-fill"
        viewBox="0 0 16 16"
      >
        <path
          d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z"
        />
      </svg>
      <span
        class="position-absolute top-10 start-100 translate-middle badge rounded-pill bg-danger"
        v-if="userStore.notifications.length && !isOpened"
      >
        {{ userStore.notifications.length }}
        <span class="visually-hidden">Непрочитанные уведомления</span>
      </span>
    </button>
    <div
      class="notifications-list list-group"
      v-if="userStore.notifications.length && isOpened"
    >
      <NotificationItem
        v-for="notification in userStore.notifications"
        :notificationId="notification.id"
      />
      <div class="list-group-item d-flex justify-content-between">
        <button class="btn btn-primary btn-sm" @click="checkNotifications">
          Прочитать
        </button>
        <div class="d-flex gap-3 align-items-center">
          <label class="form-check-label" for="flexCheckDefault">
            Отметить все
          </label>
          <input
            class="form-check-input me-1"
            type="checkbox"
            value=""
            id="flexCheckDefault"
            v-model="checkedAll"
            @input="checkingAll"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.btn {
  .badge {
    top: 7px;
    left: 80% !important;
  }
}
.notifications-list {
  position: absolute;
  right: 0;
  top: 120%;
  z-index: 10;
  width: 320px;
}

.bi-bell-fill {
  transition: all 0.3s ease;
  fill: var(--textColor);
}
</style>
