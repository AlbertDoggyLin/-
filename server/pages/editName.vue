<template>
    <div class="wrapper">
        <input type="text" v-model="name">
        <button @click="saveName">save</button>
    </div>
</template>

<script setup>
import {inject} from 'vue'
definePageMeta({
    middleware: ['auth']
})
const name = ref(inject('userInfo').name);
const saveName = ()=>{
    useFetch('/api/auth/google/set_user', {
        method: 'POST',
        body: {
            access_token: useCookie('google_access_token'),
            name: name.value
        }
    })
}
</script>

<style scoped>
</style>