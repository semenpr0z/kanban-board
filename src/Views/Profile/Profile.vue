<script>
import DataPhoneNumber from './components/DataPhoneNumber.vue'
import DataEmail from './components/DataEmail.vue'
import DataPassword from './components/PasswordData.vue'

import { useUserStore } from '@/stores/userStore.js';
export default {
    components: {
        DataPhoneNumber,
        DataEmail,
        DataPassword
    },
    setup() {
        const userStore = useUserStore()

        console.log(userStore.user)

        return {
            userStore
        }
    },
}
</script>

<template>
    <div v-if="!userStore.userInfoPending" class="profile-info">
        <h1>Профиль</h1>
        <!-- <div class="row-text">
            <span class="p-1 text">Имя: </span>
            <p class="p-1 text-muted text">{{ userStore.user.displayName }}</p>
        </div> -->
        <div class="profile-wrapper">
            <div class="data-wrapper">
                <DataEmail />
                <DataPassword />
            </div>
        </div>

        <!-- <div class="row-text">
            <span class="p-1 text">Дата регистрации: </span>
            <p class="p-1 text-muted text">{{ new Date(userStore.user.metadata.creationTime).toLocaleDateString() }}</p>
        </div>
        <div class="row-text">
            {{ userStore.user }}
        </div> -->
    </div>
    <div v-else class="pending">
        <div class="spinner-border text-light" role="status"></div>
    </div>
</template>

<style lang='scss' scoped>
.profile-info {
    padding: 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;

    .profile-wrapper {
        display: flex;

        .data-wrapper{
            min-width: 280px;
            display: flex;
            flex-direction: column;
            gap: 10px;
        }
    }
}


.pending {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

@media (max-width: 350px) {
    .profile-info{
        .profile-wrapper{
            .data-wrapper{
                min-width: 100%;
            }
        }
    }
}
</style>