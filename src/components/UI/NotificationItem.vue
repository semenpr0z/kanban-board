<script>
import { useUserStore } from "@/stores/userStore.js";
import { formatRelativeDate } from "@/services/helpers/dateFormatting";

export default {
  setup() {
    const userStore = useUserStore();
    return {
      userStore,
    };
  },
  props: {
    notificationId: {
      type: Number,
      required: true,
    },
  },
  methods: {
    formatRelativeDate,
  },
  computed: {
    notificationIndex() {
      return this.userStore.notifications.findIndex(
        (item) => item.id === this.notificationId
      );
    },
  },
};
</script>

<template>
  <label
    class="list-group-item list-group-item-action"
    :for="`checkbox-${this.userStore.notifications[notificationIndex].id}`"
  >
    <div class="d-flex w-100 justify-content-between">
      <h5 class="mb-1">
        {{ this.userStore.notifications[notificationIndex].headerText }}
      </h5>
      <small>{{
        formatRelativeDate(
          this.userStore.notifications[notificationIndex].creationTime
        )
      }}</small>
    </div>
    <div class="d-flex w-100 justify-content-between">
      <p class="mb-1">
        {{ this.userStore.notifications[notificationIndex].mainText }}
      </p>
      <input
        class="form-check-input me-1"
        type="checkbox"
        :id="`checkbox-${this.userStore.notifications[notificationIndex].id}`"
        v-model="this.userStore.notifications[notificationIndex].checked"
      />
    </div>
  </label>
</template>

<style lang="scss" scoped></style>
