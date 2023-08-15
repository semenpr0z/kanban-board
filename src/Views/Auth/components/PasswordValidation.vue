<script>
import { Tooltip, Toast, Popover } from 'bootstrap';

export default {
    data() {
        return {
            opened: false,
        }
    },
    props: {
        passwordOptions: {
            type: Array,
            required: false,
        },
    },
    methods: {
        openList() {
            this.opened = !this.opened
        }
    },
    computed: {
        validationOptionsPassword() {
            if (this.passwordOptions.find(option => option.status == true)) {
                return false
            } else {
                return true
            }
        },
        optionsList() {
            if (!this.opened) {
                return []
            } else {
                return this.passwordOptions
            }
        }
    }
}
</script>

<template>
    <!-- <ul class="list-group invalid-list">
        <li class="list-group-item header list-group-item-action" @click="openList"
            :title="opened ? 'Свернуть' : 'Развернуть'">
            <span>Требования к паролю</span>
            <transition name="fade" mode="out-in">
                <span v-if="validationOptionsPassword && !opened" class="badge rounded-pill bg-success">Соответствует
                    требованиям</span>
                <span v-else-if="!validationOptionsPassword && !opened" class="badge rounded-pill bg-danger">Не
                    соответствует
                    требованиям</span>
            </transition>
            <svg :class="['arrow', opened ? 'arrow_opened' : '']" width="12" height="8" viewBox="0 0 12 8" fill="black"
                xmlns="http://www.w3.org/2000/svg">
                <path d="M1.415 0.209991L6 4.79499L10.585 0.209991L12 1.62499L6 7.62499L0 1.62499L1.415 0.209991Z"
                    fill="black" />
            </svg>

        </li>
        <transition-group name="slide" tag="ul" :class="opened ? 'opened' : ''" class="list list-group">
            <li class="list-group-item" v-for="(option, index) in optionsList" :key="index">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" :fill="!option.status ? 'green' : 'red'"
                    class="bi bi-check-circle-fill" viewBox="0 0 16 16">
                    <path
                        d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                </svg>
                <span :class="!option.status ? 'text-success' : 'text-danger'">{{ option.name }}</span>
            </li>
        </transition-group>
    </ul> -->
    <div class="accordion" id="accordionFlushExample">
        <div class="accordion-item">
            <h2 class="accordion-header" id="flush-headingOne">
                <button class="accordion-button collapsed bg-light" type="button" data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                    <span :class="!validationOptionsPassword ? 'text-danger ' : 'text-success'" class="wrapper">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                            :fill="validationOptionsPassword ? 'green' : 'red'" class="bi bi-check-circle-fill"
                            viewBox="0 0 16 16">
                            <path
                                d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                        </svg>
                        Требования к паролю
                    </span>

                </button>
            </h2>
            <ul id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne"
                data-bs-parent="#accordionFlushExample">
                <li class="accordion-body" v-for="(option, index) in passwordOptions" :key="index">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" :fill="!option.status ? 'green' : 'red'"
                        class="bi bi-check-circle-fill" viewBox="0 0 16 16">
                        <path
                            d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                    </svg>
                    <span :class="!option.status ? 'text-success' : 'text-danger'">{{ option.name }}</span>
                </li>
            </ul>
        </div>


    </div>
</template>

<style lang='scss' scoped>
.wrapper {
    display: flex;
    align-items: center;
    gap: 10px;
}

.accordion {
    position: relative;

    .accordion-collapse {
        list-style: none;
        padding-left: 0;
        margin-bottom: 0;

        .accordion-header {
            .accordion-button {}
        }

        .accordion-body {
            display: flex;
            align-items: center;
            gap: 10px;

            .bi {
                min-width: 16px;
                min-height: 16px;
            }
        }
    }

    .header {
        justify-content: space-between;
        position: relative;
        cursor: pointer;

        .profile__arrow {
            transform: rotate(0deg) scaleX(-1);
        }

        .arrow {
            transition: transform 0.3s ease;


            &_opened {
                transform: rotate(180deg) scaleX(-1);
            }
        }

        &:hover .profile__arrow_opened {
            transform: rotate(180deg) scaleX(-1);
        }
    }

    .list {
        height: 205px;
        width: 100%;
        position: absolute;
        overflow: hidden;
        top: 42px;
        z-index: 10;
        // transition: all 0.5s ease-in-out
    }

    .opened {
        height: 205px;
    }
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
    transition: transform 0.5s, opacity 0.5s;
}

.slide-enter,
.slide-leave-to {
    transform: translateY(-50px);
    opacity: 0;
}
</style>