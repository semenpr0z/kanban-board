<script>
export default {
    props: {
        task: {
            type: Object,
            default: {
                name: '',
                text: '',
                id: 0
            }
        }
    }
}
</script>

<template>
    <li class="task rounded shadow-sm" :title="'Задача: ' + task.name" >
        <div class="task__header">
            <span>{{ task.name }}</span>
            <button class="btn task__btn-change" title="Изменить">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"  class="bi bi-pencil"
                    viewBox="0 0 16 16">
                    <path
                        d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                </svg>
            </button>
        </div>
        <div class="task__bottom" v-if="task.text">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-card-text"
                viewBox="0 0 16 16">
                <path
                    d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z" />
                <path
                    d="M3 5.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 8zm0 2.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5z" />
            </svg>
        </div>
    </li>
</template>

<style lang='scss' scoped>
.task {
    background-color: var(--alternativeTextColor);

    padding: 10px;
    cursor: pointer;

    &__header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    &__btn-change {
        padding: 5px;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;

        svg{
            fill: var(--textColor);
        }

        &:hover {
            background-color: var(--transparentHover);
        }
    }

    &:hover {
        filter: brightness(95%);
    }

    &:hover &__btn-change {
        opacity: 1;
    }
}</style>