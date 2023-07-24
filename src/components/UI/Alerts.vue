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
    <div class="alerts">
        <transition-group name="slide-right" tag="div" class="alerts-container">
            <div class="alert alert-info" v-for="(alert, index) in userStore.userAlerts" :key="index">
                <h5 class="alert-heading">{{ alert.header }}</h5>
                <p class="mb-0">{{ alert.mainText }}</p>
                <button type="button" class="btn-close btn-close-black" aria-label="Close"
                    @click="userStore.deleteAlert(index)"></button>
            </div>
        </transition-group>
    </div>
</template>

<style lang='scss' scoped>
.alerts {
    right: 16px;
    top: 70px;
    position: absolute;
    z-index: 3;

    .alert {
        position: relative;

        .btn-close {
            position: absolute;
            top: 5px;
            right: 5px;
        }
    }

}

.slide-right-enter-active,
.slide-right-leave-active {
  transition: transform 0.5s;
}

.slide-right-enter,
.slide-right-leave-to {
  transform: translateX(100%);
}
</style>