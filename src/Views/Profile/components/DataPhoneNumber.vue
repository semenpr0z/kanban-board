<script>
import { useUserStore } from '@/stores/userStore.js';
import { vMaska } from "maska"

export default {
    directives: {
        maska: vMaska
    },
    data() {
        return {
            input: false,
            phoneNumber: '',
        };
    },
    methods: {
        showInput() {
            this.input = !this.input;
        },
        savePhoneNumber() {
            this.userStore.updatePhoneNumber(this.phoneNumber);
            this.showInput();
        },
        async verifyPhoneNumber() {
            await this.userStore.verifyPhoneNumber(this.phoneNumber);
        },
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
        <span class="p-1 text">Телефон:</span>
        <div v-if="userStore.user.phoneNumber" class="wrapper">
            <p class="p-1 text-muted text">{{ userStore.user.phoneNumber }}</p>
        </div>
        <div v-else>
            <div class="wrapper" v-if="!input">
                <p class="p-1 text-muted text">Не указан</p>
                <button class="btn btn-outline-warning" @click="showInput">Указать</button>
            </div>
            <div class="wrapper" v-else>
                <input type="text" class="form-control" id="phone" v-model="phoneNumber" v-maska
                    data-maska="+7 (###) ###-##-##" placeholder="Введите номер телефона">
                <!-- <button class="btn btn-outline-warning" @click="savePhoneNumber">Сохранить</button> -->
                <button class="btn btn-outline-primary" @click="verifyPhoneNumber">Верифицировать номер</button>
            </div>
        </div>
    </div>
</template>

<style lang='scss' scoped>
.row-text {
    display: flex;
    align-items: center;
    gap: 10px;

    .text {
        padding: 0;
        margin: 0;
    }

    .wrapper {
        display: flex;
        gap: 10px;
        align-items: center;
    }
}
</style>