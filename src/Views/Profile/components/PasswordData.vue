<script>
import { useUserStore } from '@/stores/userStore.js';
export default {
    data() {
        return {
            input: false,
            currentPassword: 'Qwerty1234!'
        }
    },
    setup() {
        const userStore = useUserStore()


        return {
            userStore
        }
    },
    methods: {
        openModal() {
            this.input = !this.input
        }
    }
}
</script>

<template>
    <div class="row-text">
        <span class="p-1 text">Пароль: </span>
        <div class="row-text">
            <input type="password" class="form-control" v-model="currentPassword" :disabled="!input">
            <button class="btn btn-primary btn-change" @click="openInput" v-if="!input">
                <span class="text-desktop" @click="openModal">Изменить</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                    class="bi bi-pencil-fill icon-mobile" viewBox="0 0 16 16">
                    <path
                        d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                </svg>
            </button>
            <button v-else class="btn btn-success" @click="openInput">
                <span class="text-desktop">Сохранить</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                    class="bi bi-pencil-fill icon-mobile" viewBox="0 0 16 16">
                    <path
                        d="M8.5 1.5A1.5 1.5 0 0 1 10 0h4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h6c-.314.418-.5.937-.5 1.5v7.793L4.854 6.646a.5.5 0 1 0-.708.708l3.5 3.5a.5.5 0 0 0 .708 0l3.5-3.5a.5.5 0 0 0-.708-.708L8.5 9.293V1.5z" />
                </svg>
            </button>
        </div>
        <button class="btn btn-outline-warning" v-if="!userStore.user.emailVerified"
            @click="userStore.sendEmailVerification()">Подтвердить Email</button>
        <div class="modal-backdrop show" :style="input ? 'display: block;' : ''"></div>
        <div class="modal fade show" :style="input ? 'display: block;' : ''">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content"> ddd</div>
            </div>
        </div>
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

    .modal-backdrop{
        display: none;
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