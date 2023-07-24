<script>
import LogInForm from './LogInForm.vue'
import RegistrationForm from './RegistrationForm.vue';

export default {
    data() {
        return {
            loginForm: true
        };
    },
    methods: {
        changeForm() {
            this.loginForm = !this.loginForm;
        },
    },
    components: { LogInForm, RegistrationForm }
}

</script>

<template>
    <form class="auth-form rounded">
        <ul class="nav nav-pills nav-fill">
            <li class="nav-item">
                <button :class="['nav-link', { 'active': loginForm }]" :disabled="loginForm"
                    @click="changeForm">Войти</button>
            </li>
            <li class="nav-item">
                <button :class="['nav-link', { 'active': !loginForm }]" :disabled="!loginForm"
                    @click="changeForm">Зарегистрироваться</button>
            </li>
        </ul>
        <LogInForm v-if="loginForm" />
        <RegistrationForm v-else />
    </form>
</template>

<style lang='scss' scoped>
.auth-form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    background-color: var(--White);
    margin: 0 auto;
    max-width: 512px;
    width: 100%;
    padding: 24px;
}
</style>