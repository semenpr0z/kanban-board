<script>
import Modal from '@/components/UI/Modal.vue';
import { useUserStore } from '@/stores/userStore.js';
import { isValidPassword } from '@/services/validators/passwordValidator.js'

import PasswordValidation from '../../Auth/components/PasswordValidation.vue';

export default {
    data() {
        return {
            input: false,
            currentPassword: '',
            newPassword: '',
            nextStep: false,
            validPassword: false
        }
    },
    setup() {
        const userStore = useUserStore()


        return {
            userStore
        }
    },
    methods: {
        openCloseModal() {
            console.log('ok')
            this.input = !this.input
        },
        async toNextStep() {
            const passwordChecked = await this.userStore.checkPassword(this.currentPassword);
            if (passwordChecked) {
                this.nextStep = !this.nextStep
            } else {
                alert('Error')
            }

        },
        savePassword() {
            this.openCloseModal()
            this.nextStep = !this.nextStep

        }
    },
    components: {
        Modal, PasswordValidation
    },
    computed: {
        validationOptionsPassword() {
            if (isValidPassword(this.newPassword).find(option => option.status == true)) {
                this.validPassword = true
            } else {
                this.validPassword = false
            }
            return isValidPassword(this.newPassword)
        }
    }
}
</script>

<template>
    <div class="row-text">
        <span class="p-1 text">Пароль: </span>
        <button class="btn btn-primary btn-change" @click="openCloseModal">
            <span class="text-desktop">Изменить</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                class="bi bi-pencil-fill icon-mobile" viewBox="0 0 16 16">
                <path
                    d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
            </svg>
        </button>
        <Modal v-if="input" @close-modal="openCloseModal">
            <div class="modal-header">
                <span>Изменить пароль</span>
                <button type="button" class="btn-close btn-close-black" aria-label="Close" @click="openCloseModal"></button>
            </div>
            <div class="modal-body" >
                <label v-if="!nextStep">
                    <span>Введите текущий пароль:</span>
                    <input type="password" class="form-control" v-model="currentPassword">
                </label>

                <label v-else>
                    <span>Введите новый пароль:</span>
                    <input type="password" class="form-control" v-model="newPassword">
                    <PasswordValidation :passwordOptions="validationOptionsPassword" />
                </label>
            </div>
            <div class="modal-footer">
                <button class="btn btn-secondary" @click="openCloseModal">Закрыть</button>
                <button v-if="!nextStep" class="btn btn-primary" @click="toNextStep"
                    :disabled="!currentPassword.length">Далее</button>
                <button v-else class="btn btn-primary" @click="savePassword" :disabled="validPassword">Сохранить</button>
            </div>
        </Modal>
    </div>
</template>

<style lang='scss' scoped>
.row-text {
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;
    max-width: 500px;

    .btn {
        min-width: 110px;

        .icon-mobile {
            display: none;
        }
    }

    .btn-change {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 5px;
    }

    .text {
        padding: 0;
        margin: 0;
    }

    .modal {

        &-body {
            display: flex;
            flex-direction: column;
            gap: 10px;
            transition: min-height 0.5s ease;

            label {
                display: flex;
                flex-direction: column;
                gap: 10px;
            }

        }

        
    }
}


@media (max-width: 500px) {
    .row-text {
        .input-with-icon {
            svg {
                display: none;
            }
        }

        .btn {
            min-width: auto;
            height: 38px;

            .text-desktop {
                display: none;
            }

            .icon-mobile {
                display: block;
            }
        }
    }
}
</style>