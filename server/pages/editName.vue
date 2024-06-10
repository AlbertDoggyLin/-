<template>
    <div class="wrapper">
        <input type="text" v-model="name">
        <button @click="saveName">save</button>
        {{ useNuxtData('userInfo') }}
    </div>
</template>

<script setup>
definePageMeta({
    middleware: ['auth']
})
const name = ref(useNuxtData('userInfo')?.name);
const saveName = async ()=>{
    const res = await useFetch('/api/auth/google/set_user', {
        method: 'POST',
        body: {
            access_token: useCookie('google_access_token'),
            name: name.value
        }
    })
    if(res.status.value=='success'){
        useNuxtData('userInfo').name = name.value;
    }
}
</script>

<style scoped>
</style>