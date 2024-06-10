<script setup>
import dropdown from './dropdown.vue';
const route = useRoute();
try{
    const google_access_token = useCookie('google_access_token');
    const res = await useFetch('/api/auth/google/get_user', {
        method: 'POST',
        body: {
            access_token: google_access_token
        }
    });
    if(res.status.value=='success'){
        await useAsyncData('userInfo', ()=>res.data.value)
    }
}
catch(e){
    console.log(e);
}
const nuxtApp = useNuxtApp();
const userInfo = useNuxtData('userInfo');
const showDropDown = ref(false);
</script>

<template>
    <div class="wrapper">
        <NuxtLink to="/">回到主頁</NuxtLink>
        <button v-if="userInfo?.email" class="name" @click="showDropDown=true">
            {{ userInfo.name }}
            <dropdown v-show="showDropDown" @blur="showDropDown=false"></dropdown>
        </button>
        <NuxtLink v-else :to="'/login?redirect_uri='+route.fullPath">登入</NuxtLink>
    </div>
</template>

<style scoped>
.wrapper{
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.name{
    background-color: bisque;
}

.name:hover{
    background-color:rgb(147, 125, 92);
}
</style>