<script>
import { useSettingsStore } from '@/stores/settingsStore.js';

export default {
    setup() {
        const settingsStore = useSettingsStore()

        return {
            settingsStore
        }
    },
};
</script>

<template>
  <div class="settings">
    <h1>Настройки</h1>
    <div class="form-check form-switch">
      <input
        class="form-check-input"
        type="checkbox"
        id="flexSwitchCheckDefault"
        @input="settingsStore.updateTheme"
        v-model="settingsStore.colorTheme"
      />
      <label class="form-check-label" for="flexSwitchCheckDefault">Темная тема</label>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.settings {
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
