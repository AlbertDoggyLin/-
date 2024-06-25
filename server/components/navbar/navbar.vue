<script setup>
import Dropdown from './dropdown.vue';
import AppData from '~/pages/AppData';
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
        AppData.getInstance().userInfo.name = res.data.value.name;
        AppData.getInstance().userInfo.email = res.data.value.email;
    }
}
catch(e){
    console.log(e);
    AppData.getInstance().userInfo.name = null;
    AppData.getInstance().userInfo.email = null;
}
const userInfo = reactive(AppData.getInstance().userInfo);
const showDropDown = ref(false);
const openDropDown = ()=>{
    showDropDown.value=true;
    console.log(showDropDown.value);
}
</script>

<template>
    <div class="wrapper">
        <NuxtLink to="/">回到主頁</NuxtLink>
        <Dropdown v-show="showDropDown" @blur="showDropDown=false"></Dropdown>
        <button v-if="userInfo.email" class="name" @click="openDropDown">
            {{ userInfo.name }}
        </button>
        <NuxtLink v-else :to="'/login?redirect_uri='+route.fullPath">登入</NuxtLink>
    </div>
</template>

<style scoped>
.wrapper{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    box-sizing: border-box;
}

.name{
    background-color: bisque;
}

.name:hover{
    background-color:rgb(147, 125, 92);
}
</style>