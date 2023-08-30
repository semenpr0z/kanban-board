<script>
import { useSettingsStore } from "@/stores/settingsStore.js";

export default {
  mounted() {
    // Добавляем слушатель события нажатия клавиши 'Escape'
    document.addEventListener("keyup", this.onEscKey);
  },
  beforeUnmount() {
    // Удаляем слушатель события перед размонтированием компонента
    document.removeEventListener("keyup", this.onEscKey);
  },
  methods: {
    // Обработчик события нажатия клавиши 'Escape'
    onEscKey(event) {
      if (event.key === "Escape") {
        this.closeModal(); // Вызываем метод для закрытия модального окна
      }
    },
    closeModal() {
      this.$emit("closeModal");
    },
  },
  setup() {
        const settingsStore = useSettingsStore()


        return {
            settingsStore
        }
    },
  emits: ["closeModal"],
  data() {
    return {};
  },
  props: {
    nameModal: {
        type: String,
        required: true
    }
  }
};
</script>

<template>
  <div>
    <div class="modal-backdrop show"></div>
    <transition name="modal">
      <div class="modal fade show">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <span>{{ nameModal }}</span>
              <button
                type="button"
                class="btn-close"
                :class="settingsStore.colorTheme ? 'btn-close-white' : 'btn-close-black'"
                aria-label="Close"
                @click="closeModal"
              ></button>
            </div>
            <slot></slot>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
.modal {
  display: block;

  .modal-content {
    background-color: var(--containerColor);
    color: var(--textColor);

    .btn-close {
      color: var(--textColor);
    }
  }
}
</style>
