<script>
import { useUserStore } from '@/stores/userStore.js';

export default {
    setup() {
        const userStore = useUserStore()

        return {
            userStore
        }
    },
}
</script>

<template>
    <button class="btn btn-danger btn-sm">
        <span v-if="!userStore.userInfoPending">Войти</span>

        <div v-else class="spinner-border spinner-border-sm" role="status"></div>

    </button>
</template>

<style lang='scss' scoped>
.btn {
    display: flex;
    gap: 5px;
    align-items: center;
}
</style>