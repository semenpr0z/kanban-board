<script>
export default {
}
</script>

<template>
    <li class="task rounded shadow-sm">
        задача
    </li>
</template>

<style lang='scss' scoped>
.task{
    background-color: var(--alternativeTextColor);
    padding: 10px;
    cursor: pointer;

    &:hover{
        filter: brightness(95%);
    }
}
</style>