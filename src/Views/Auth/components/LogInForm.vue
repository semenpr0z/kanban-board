<script>
import { isValidEmail } from '@/services/validators/emailValidator.js'

import { useUserStore } from '@/stores/userStore'

export default {
    data() {
        return {
            data: {
                email: '',
                password: ''
            },
            emailInputTouched: false,
            passwordInputTouched: false,
            validEmail: true,
            validPassword: true,
            validationOptionsPassword: null
        }
    },
    setup() {
        const userStore = useUserStore()

        return { userStore }
    },
    methods: {
        logIn(event) {
            event.preventDefault()
            if (this.data.email && this.data.password) {
                console.log(this.data)

                this.userStore.logIn(this.data)
            }
        },
        validateEmail() {
            if (this.data.email.length) {
                this.emailInputTouched = true;
                if (!isValidEmail(this.data.email)) {
                    this.validEmail = false
                } else {
                    this.validEmail = true
                }
            } else {
                this.emailInputTouched = false;
            }
        },
    },
    computed: {
        validLogInForm() {
            if (this.data.email && this.data.password && isValidEmail(this.data.email)) {
                return false
            } else {
                return true
            }
        },
    }
}
</script>

<template>
    <div class="form login-form">
        <div class="form-group">
            <label for="email">Email</label>
            <input type="email" class="form-control" id="email" placeholder="example@example.ru" v-model="data.email"
                :class="{ 'is-invalid': !validEmail && emailInputTouched }" @input="validateEmail">
            <span v-if="!validEmail && emailInputTouched" class="text-danger  invalid">Некорректный формат email</span>
        </div>
        <div class="form-group">
            <label for="password">Пароль</label>
            <input type="password" class="form-control" id="password" placeholder="qwerty" v-model="data.password"
                 :class="{ 'is-invalid': !validPassword && passwordInputTouched }">
        </div>
        <button type="submit" class="btn btn-success" @click="logIn" :disabled="validLogInForm">Войти</button>
    </div>
</template>

<style lang='scss' scoped>
.form {
    display: flex;
    flex-direction: column;
    gap: 10px;

    .form-group {
        position: relative;
        display: flex;
        flex-direction: column;
        gap: 5px;
        padding-bottom: 22px;

        .invalid {
            bottom: 0;
            position: absolute;
        }
    }
}
</style>