<script>
export default {
    mounted() {
        // Добавляем слушатель события нажатия клавиши 'Escape'
        document.addEventListener('keyup', this.onEscKey);

    },
    beforeUnmount() {
        // Удаляем слушатель события перед размонтированием компонента
        document.removeEventListener('keyup', this.onEscKey);
    },
    methods: {
        // Обработчик события нажатия клавиши 'Escape'
        onEscKey(event) {
            if (event.key === 'Escape') {
                this.$emit('closeModal'); // Вызываем метод для закрытия модального окна
            }
        }
    },
    emits: ['closeModal'],
    data() {
        return {
        };
    },
}
</script>

<template>
    <div>
        <div class="modal-backdrop show"></div>
        <transition name="modal">
            <div class="modal fade show">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <slot></slot>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<style lang='scss' scoped>
.modal {
    display: block;

    
}   
</style>