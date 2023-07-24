<script>
import AuthForm from './components/AuthForm.vue';

export default {
    components: { AuthForm }
}
</script>

<template>
    <div class="auth">
        <AuthForm />
    </div>
</template>

<style lang='scss' scoped>
.auth{
    padding: 24px;
}
</style>