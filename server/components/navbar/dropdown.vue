<script setup>
const wrapper = ref(null);
defineExpose({
    wrapper,
})
const logout = ()=>{
    try{
        useCookie('google_access_token').value = null;
        location.reload();
    }catch(e){
        console.log(e);
    }
}
</script>

<template>
    <div class="wrapper" tabindex="0" ref="wrapper">
        <button><NuxtLink to="/editName">改名</NuxtLink></button>
        <button @click="logout">登出</button>
    </div>
</template>

<style scoped>
.wrapper{
    display: flex;
    right: 0;
    top: 0;
    position: absolute;
    justify-content: flex-start;
    flex-direction: column;
    align-items: center;
    gap: 5px;
    background-color: bisque;
}

.name{
    background-color: bisque;
}

.name:hover{
    background-color:rgb(147, 125, 92);
}
</style>