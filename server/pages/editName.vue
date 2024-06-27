<template>
    <div>
        <input type="text" v-model="name">
        <button @click="saveName">save</button>
        {{ userInfo }}
    </div>
</template>

<script setup>
import AppData from './AppData';

definePageMeta({
    middleware: ['auth']
})
const userInfo = reactive(AppData.getInstance().userInfo);
const name = ref(userInfo.name);
const saveName = async ()=>{
    const res = await $fetch('/api/auth/google/set_user', {
        method: 'POST',
        body: {
            access_token: useCookie('google_access_token'),
            name: name.value
        }
    })
    if(res.status.value=='success'){
        userInfo.name = name.value;
    }
}
</script>

<style scoped>
</style>