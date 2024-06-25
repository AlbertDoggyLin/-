<script setup>
const wrapper = ref(null);
const logout = ()=>{
    try{
        useCookie('google_access_token').value = null;
        location.reload();
        wrapper.value.focus();
        wrapper.value.blur();
    }catch(e){
        console.log(e);
    }
}

const editName = ()=>{
    useRouter().push('/editName');
    wrapper.value.focus();
    wrapper.value.blur();
    console.log(document.activeElement);
}
</script>

<template>
    <div class="wrapper" tabindex="0" ref="wrapper">
        <button @click="editName">改名</button>
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