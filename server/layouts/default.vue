<template>
    <div class="app">
        <navbar class="navbar"/>
        <slot></slot>
    </div>
</template>
<style>
body{
    margin:0;
    padding: 0;
    border: 0;
}

.app{
    width: 100dvw;
    height: 100dvh;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
}

.page{
    width: 100%;
    height: 100%;
}

.navbar{
  height: 70px;
  width: 100%;
}

a{
    text-decoration: none;
    color: black;
}
</style>