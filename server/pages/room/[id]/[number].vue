<template>
    <div class="wrapper">
        <div class="dialog" :class="{show: dialog}">
            waiting for room host to confirm
        </div>
        <template v-if="phase=='setup'">
            <SetupGame @complete="phase='gaming'"></SetupGame>
        </template>
        <template v-if="phase=='gaming'">
            <JudgeGame v-model="gameInfo"></JudgeGame>
        </template>
    </div>
</template>
<script setup>
import { ref } from 'vue';

const dialog = ref(false);
const phase = ref('none');
const gameInfo = reactive({})

// $fetch('/api/check-judge')
//     .then(data => {
//         dialog.value = data.isJudge;
//         phase.value = data.phase;
//         gameInfo = data.gameInfo;
//     })
//     .catch(error => {
//         console.error('Error checking judge status:', error);
//         alert(error.message);
//         useRouter().push('./');
//     });

const updateGameInfo = () => {
    fetch('/api/game-info')
        .then(response => response.json())
        .then(data => {
            dialog.value = data.isJudge;
            phase.value = data.phase;
            gameInfo = data.gameInfo;
            updateGameInfo();
        })
        .catch(error => {
            console.error('Error checking judge status:', error);
            alert(error.message);
            useRouter().push('./');
        });
};

updateGameInfo(); // Start the long polling process
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