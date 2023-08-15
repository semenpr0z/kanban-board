<script>
import TranslateDataService from '@/services/dataServices/TranslateDataService.js'

export default {
    data(){
        return{
            textForTranslate: '',
            textAfterTranslate: ''
        }
    },
    methods: {
        async translate(){
            let text = await TranslateDataService.translate(this.textForTranslate)
            console.log(text)
        }   
    }
}
</script>

<template>
    <div>
        <input type="text" v-model="textForTranslate">
        <button @click="translate">Перевести</button>
        <p>{{ textAfterTranslate }}</p>
    </div>
</template>

<style lang='scss' scoped>
</style>