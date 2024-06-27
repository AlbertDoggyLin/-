<template>
    <div class="wrapper">
        <h1>Room {{roomId}}</h1>
        <div class="dialog" :class="{show: dialog}">
            <span>{{ request.from }} wants to be a judge on court {{ request.courtNumber }}</span>
            <button @click="setJudge">confirm</button>
            <button @click="dialog=false">deny</button>
        </div>
        <div v-if="courts" v-for="court in courts">
            <GameDisplay :game="court"/>
        </div>
    </div>
</template>
<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();
const roomId = router.currentRoute.value.params.id;

import { ref } from 'vue';

const courts = ref([]);

// Fetch courts info using roomId
const fetchCourts = () => {
    $fetch(`/api/courts?roomId=${roomId}`)
        .then(data => {
            courts.value = data;
            fetchCourts();
        })
        .catch(error => {
            console.error('Failed to fetch courts:', error);
            if(error.message == 'room not found'){
                alert('找不到球場');
                router.push('/');
            }
            fetchCourts();
        });
}

const dialog = ref(false);
const request = ref({})

const fetchJudgeRequest = () => {
    $fetch(`/api/judgeRequest?roomId=${roomId}`)
        .then(data => {
            request.value = data;
            dialog.value = true;
            fetchJudgeRequest();
        })
        .catch(error => {
            console.error('Failed to fetch judge request:', error);
            fetchJudgeRequest();
        });
}

fetchCourts();
const setJudge = ()=>{
    $fetch('/api/judge', {
        method: 'POST',
        body: {
            roomId: roomId,
            courtNumber: request.value.courtNumber,
            userId: request.value.from
        }
    }).then((res)=>{
        if(res.status=='success'){
            dialog.value = false;
        }
        else{
            alert('設定失敗');
        }
    });
}
</script>

<style scoped>
.wrapper{
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
}

.dialog {
    display: none;
    width: 100%;
    height: 100%;
    min-width: 200px;
    box-sizing: border-box;
    z-index: 100;
    position: fixed;
    border: calc(100%-200px) solid rgba(0, 0, 0, 0.178);
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

.show {
    display: flex;
}
</style>