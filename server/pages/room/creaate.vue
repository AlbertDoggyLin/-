<template>
    <div class="wrapper">
        <label for="roomName">Room Name:</label>
        <input type="text" id="roomName" v-model="roomName">

        <label for="courtNumber">Court Number:</label>
        <input type="number" id="courtNumber" v-model="courtNumber">
    </div>
</template>

<script setup>
import { ref } from 'vue';
const roomName = ref('');
const courtNumber = ref(1);

const create = ()=>{
    $fetch('/api/room/create', {
        method: 'POST',
        body: {
            roomName: roomName.value,
            courtNumber: courtNumber.value
        }
    }).then((res)=>{
        if(res.status=='success'){
            useRouter().push('/room/'+res.roomId);
        }
        else{
            alert('創建失敗');
        }
    });
}
</script>

<style scoped>
.wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
}

label {
    margin-bottom: 10px;
}

input {
    padding: 5px;
    margin-bottom: 20px;
}

button {
    padding: 10px 20px;
    background-color: #007bff;
    color: #fff;
    border: none;
    cursor: pointer;
}

button:hover {
    background-color: #0056b3;
}
</style>