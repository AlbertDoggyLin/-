<template>
      <div class="wrapper">
        <div class="room-display">
          <button v-for="(id) in rooms">{{id}}</button>
        </div>
        <input type="text" v-model="roomNumber"/>
        <button @click="enter">進入球場</button>
        <button @click="$router.push('/room/create')">創建新球場</button>
      </div>
</template>

<script setup>
import { ref } from 'vue';
const roomNumber = ref('');

const rooms = ref([]);
$fetch('/api/room').then((res)=>{
  rooms.value = res.data;
});

const enter = ()=>{
  $fetch('/api/room/'+roomNumber.value).then((res)=>{
    if(res.status=='success'){
      useRouter().push('/room/'+roomNumber.value);
    }
    else{
      alert('找不到球場');
    }
  });
}
</script>

<style scoped>

.wrapper{
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap:20px;
}

.wrapper> *{
  width: 60%;
  min-width: 200px;
  padding: 10px;
}

button{
  border: 0;
  cursor: pointer;
  background-color: bisque;
}

button:hover{
  background-color: rgb(147, 125, 92);
}

button:active{
  background-color: rgb(128, 108, 80);
}
</style>