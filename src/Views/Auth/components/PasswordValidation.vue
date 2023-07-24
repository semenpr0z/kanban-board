<script>
export default {
    data() {
        return {
            shouldAnimate: false
        }
    },
    props: {
        passwordOptions: {
            type: Array,
            required: false,
        }
    }
}
</script>

<template>
    <ul class="list-group invalid-list">
        <span>Требования к паролю</span>
        <li class="list-group-item" v-for="(option, index) in passwordOptions" :key="index">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" :fill="!option.status ? 'green' : 'red'"
                class="bi bi-check-circle-fill" viewBox="0 0 16 16">
                <path
                    d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
            </svg>
            <span :class="!option.status ? 'text-success' : 'text-danger'">{{ option.name }}</span>
        </li>
    </ul>
</template>

<style lang='scss' scoped>
.invalid-list {

    .list-group-item {
        display: flex;
        align-items: center;
        gap: 10px;
        
        .bi{
            min-width: 16px;
            min-height: 16px;
        }
    }
}
</style>