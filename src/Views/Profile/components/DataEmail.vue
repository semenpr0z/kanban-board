<script>
import { useUserStore } from '@/stores/userStore.js';
import { isValidEmail } from '@/services/validators/emailValidator.js'

export default {
    data() {
        return {
            input: false,
            showTooltip: false
        };
    },
    methods: {
        openInput() {
            this.input = !this.input
        }
    },
    setup() {
        const userStore = useUserStore();

        return {
            userStore,
        };
    },
};
</script>

<template>
    <div class="row-text">
        <div class="name-btn">
            <span class="p-1 text">Email: </span>
            <button title="Изменить" class="btn btn-link btn-sm btn-change" @click="openInput" v-if="!input">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill"
                    viewBox="0 0 16 16">
                    <path
                        d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                </svg>
            </button>
            <button v-else title="Сохранить" class="btn btn-link btn-sm btn-change" @click="openInput">
                Сохранить
            </button>
        </div>

        <div class="input-with-icon" :title="userStore.user.emailVerified ? 'Email подтвержден' : 'Email не подтвержден'"
            @mouseover="showTooltip = true" @mouseleave="showTooltip = false">
            <input type="email" class="form-control" v-model="userStore.user.email" :disabled="!input">
            <TransitionGroup name="fade">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="green"
                    v-if="userStore.user.emailVerified && !input" class="bi bi-shield-fill-check" viewBox="0 0 16 16">
                    <path fill-rule="evenodd"
                        d="M8 0c-.69 0-1.843.265-2.928.56-1.11.3-2.229.655-2.887.87a1.54 1.54 0 0 0-1.044 1.262c-.596 4.477.787 7.795 2.465 9.99a11.777 11.777 0 0 0 2.517 2.453c.386.273.744.482 1.048.625.28.132.581.24.829.24s.548-.108.829-.24a7.159 7.159 0 0 0 1.048-.625 11.775 11.775 0 0 0 2.517-2.453c1.678-2.195 3.061-5.513 2.465-9.99a1.541 1.541 0 0 0-1.044-1.263 62.467 62.467 0 0 0-2.887-.87C9.843.266 8.69 0 8 0zm2.146 5.146a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 7.793l2.646-2.647z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#ffc107"
                    class="bi bi-shield-fill-exclamation" viewBox="0 0 16 16"
                    v-else-if="!userStore.user.emailVerified && !input && !showTooltip">
                    <path fill-rule="evenodd"
                        d="M8 0c-.69 0-1.843.265-2.928.56-1.11.3-2.229.655-2.887.87a1.54 1.54 0 0 0-1.044 1.262c-.596 4.477.787 7.795 2.465 9.99a11.777 11.777 0 0 0 2.517 2.453c.386.273.744.482 1.048.625.28.132.581.24.829.24s.548-.108.829-.24a7.159 7.159 0 0 0 1.048-.625 11.775 11.775 0 0 0 2.517-2.453c1.678-2.195 3.061-5.513 2.465-9.99a1.541 1.541 0 0 0-1.044-1.263 62.467 62.467 0 0 0-2.887-.87C9.843.266 8.69 0 8 0zm-.55 8.502L7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0zM8.002 12a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
                </svg>

                <button class="btn btn-warning btn-sm btn-confirm"
                    v-else-if="!userStore.user.emailVerified && !input && showTooltip" title="Подтвердить"
                    @click="userStore.sendEmailVerification()">
                    Подтвердить почту
                </button>
            </TransitionGroup>
        </div>
    </div>
</template>

<style lang='scss' scoped>
.row-text {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    max-width: 500px;

    .name-btn {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .input-with-icon {
        position: relative;
        width: 100%;

        svg {
            position: absolute;
            top: 50%;
            right: 10px;
            transform: translateY(-50%);
        }

        .btn-confirm {
            position: absolute;
            z-index: 3;
            top: 50%;
            right: 10px;
            transform: translateY(-50%);
        }

        .bi-shield-fill-exclamation {
            cursor: pointer;
        }

        .fade-enter-active,
        .fade-leave-active {
            transition: opacity 0.2s;
        }

        .fade-enter,
        .fade-leave-to {
            opacity: 0;
        }
    }

    // .btn {
    //     min-width: 110px;

    //     .icon-mobile {
    //         display: none;
    //     }
    // }

    // .btn-change {
    //     display: flex;
    //     align-items: center;
    //     justify-content: center;
    //     gap: 5px;
    // }


    .text {
        padding: 0;
        margin: 0;
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