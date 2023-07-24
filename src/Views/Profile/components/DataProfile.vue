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
    <div>
        <div class="row-text">
            <span class="p-1 text">Имя: </span>
            <p class="p-1 text-muted text">{{ userStore.user.displayName }}</p>
        </div>
    </div>
</template>

<style lang='scss' scoped>
</style>