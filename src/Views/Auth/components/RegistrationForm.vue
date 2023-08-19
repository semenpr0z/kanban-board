<script>
import { isValidEmail } from '@/services/validators/emailValidator.js'
import { isValidPassword } from '@/services/validators/passwordValidator.js'
import { isValidRussianName } from '@/services/validators/nameValidator.js'
import PasswordValidation from './PasswordValidation.vue';

import { useUserStore } from '@/stores/userStore'

export default {
    data() {
        return {
            data: {
                email: "",
                password: "",
                name: "",
                approval: false
            },
            repeatPassword: '',
            validEmail: true,
            validPassword: true,
            validRepeatPassword: true,
            emailInputTouched: false,
            passwordInputTouched: false,
            passwordRepeatTouched: false,
        };
    },
    setup() {
        const userStore = useUserStore()

        return { userStore }
    },
    methods: {
        createUser(event) {
            event.preventDefault()
            console.log(this.data)
            this.userStore.register(this.data)
        },
        validateEmail() {
            if (this.data.email.length) {
                this.emailInputTouched = true;
                if (!isValidEmail(this.data.email)) {
                    this.validEmail = false;
                }
                else {
                    this.validEmail = true;
                }
            }
            else {
                this.emailInputTouched = false;
            }
        },
        validatePassword() {
            if (this.data.password.length) {
                this.passwordInputTouched = true
            } else {
                this.passwordInputTouched = false
            }
        },
        validateRepeatPassword() {
            if (this.repeatPassword.length) {
                this.passwordRepeatTouched = true;
                if (this.data.password === this.repeatPassword) {
                    this.validRepeatPassword = false
                } else {
                    this.validRepeatPassword = true
                }
            } else {
                this.passwordRepeatTouched = false
            }
        }
    },
    components: { PasswordValidation },
    computed: {
        validRegistrationForm() {
            if (isValidRussianName(this.data.name) && this.validEmail && (this.data.password.length && this.validPassword) && (this.data.password === this.repeatPassword) && this.data.approval) {
                return true
            } else {
                return false
            }
        },
        validationOptionsPassword() {
            if (isValidPassword(this.data.password).find(option => option.status == true)) {
                this.validPassword = false
            } else {
                this.validPassword = true
            }
            return isValidPassword(this.data.password)
        }
    }
}
</script>

<template>
    <div class="form registration-form">
        <div class="form-group">
            <label for="name">Ваше имя</label>
            <input type="text" class="form-control" id="name" placeholder="Например: Иван" v-model="data.name">
        </div>
        <div class="form-group">
            <label for="email">Введите ваш email</label>
            <input type="email" class="form-control" id="email" placeholder="example@example.ru" v-model="data.email"
                :class="{ 'is-invalid': !validEmail && emailInputTouched }" @input="validateEmail">
        </div>
        <div class="form-group">
            <label for="password">Пароль</label>
            <input type="password" class="form-control" id="password" placeholder="qwerty" v-model="data.password"
                @input="validatePassword" :class="{ 'is-invalid': passwordInputTouched && !validPassword }">
            <Transition name="slide-down" appear mode="out-in">
                <PasswordValidation :passwordOptions="validationOptionsPassword" />
            </Transition>
        </div>
        <div class="form-group">
            <label for="passwordTwice">Повторите пароль</label>
            <input type="password" class="form-control" id="passwordTwice" placeholder="" v-model="repeatPassword"
                @input="validateRepeatPassword">
        </div>
        <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="approval" v-model="data.approval">
            <label class="form-check-label" for="approval">
                Я согласен на обработку своих персональных данных
            </label>
        </div>
        <button type="submit" class="btn btn-success" @click="createUser" :disabled="!validRegistrationForm">
            <span>Зарегистрироваться</span>
            <span v-if="userStore.userAuthPending" class="spinner-border spinner-border-sm" role="status"
                aria-hidden="true"></span>
        </button>
    </div>
</template>

<style lang='scss' scoped>
.form {
    display: flex;
    flex-direction: column;
    gap: 10px;

    .form-group {
        display: flex;
        flex-direction: column;
        gap: 5px;
    }

    .btn{
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 5px;
    }
}
</style>