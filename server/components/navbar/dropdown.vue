<script setup>
</script>

<template>
    <div class="wrapper">
        <NuxtLink to="/editName"><button>改名</button></NuxtLink>
        <button>登出</button>
    </div>
</template>

<style scoped>
.wrapper{
    display: flex;
    position: absolute;
    justify-content: flex-start;
    align-items: center;
}

.name{
    background-color: bisque;
}

.name:hover{
    background-color:rgb(147, 125, 92);
}
</style>