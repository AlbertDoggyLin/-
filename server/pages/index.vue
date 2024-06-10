<template>
    <div class="app">
      <navbar class="navbar"/>
      <div class="main"></div>
    </div>
</template>

<script setup>
import navbar from '~/components/navbar/navbar.vue';
</script>

<style scoped>
.app{
  height: 100dvh;
  width: 100dvw;
  margin: 0;
  border: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start
}

.navbar{
  height: 70px;
  width: 100%;
}

.main{
  height: 100%;
  width: 100%;
}
</style>