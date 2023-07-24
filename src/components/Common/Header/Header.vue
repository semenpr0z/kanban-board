<script>
import Profile from './components/Profile.vue';
import AuthButton from './components/AuthButton.vue';
import { useUserStore } from '@/stores/userStore.js';
import router from '@/router.js'

export default {
    data() {
        return {

        }
    },
    components: { Profile, AuthButton },
    setup() {
        const userStore = useUserStore()

        return {
            userStore
        }
    },
    methods: {
        openAuth(){
            router.push('/auth')
        }
    }
}
</script>

<template>
    <header class="header">
        <router-link to="/" class="link"><span class="logotype">Kanban Board</span></router-link>
        <Profile v-if="userStore.user"/>
        <AuthButton v-else @click="openAuth"/>
    </header>
</template>

<style lang='scss' scoped>
.header {
    padding: 7px 16px;
    background-color: var(--darkBlue);
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;

    .link{
        text-decoration: none;
    }
    .logotype {
        color: var(--White);
    }
}
</style>