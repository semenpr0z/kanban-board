<script>
import ThreeDotsBtn from '@/components/UI/threeDotsBtn.vue';
import Board from './components/Board.vue';

export default {
    data() {
        return {

        }
    },
    components: {
        Board,
        ThreeDotsBtn
    }
}
</script>

<template>
    <div class="workspace">
        <div class="workspace__top">
            <h1>Рабочее пространство</h1>
            <ThreeDotsBtn size="big" />
        </div>
        <div class="workspace__middle">
            <Board />
        </div>
    </div>
</template>

<style lang='scss' scoped>
.workspace {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    max-width: 100%;

    &__top {
        border-bottom: 1px solid var(--borderColor);
        display: flex;
        justify-content: space-between;
        align-items: center;

        h1 {
            margin: 0;
            padding: 10px 0;
        }
    }

    &__middle {
        min-height: calc(100% - 69px)
    }
}
</style>