<template>
    <div class="wrapper">
        <label for="teamName">Team Name:</label>
        <input type="text" id="teamName" v-model="teamName" required>

        <label for="playerName">Player Name:</label>
        <input type="text" id="playerName" v-model="playerName" required>

        <label for="gameRule">Game Rule:</label>
        <select id="gameRule" v-model="gameRule">
            <option value="single">Single</option>
            <option value="double">Double</option>
        </select>

        <label for="gameSet">Game Set:</label>
        <input type="number" id="gameSet" v-model="gameSet" required>

        <button @click="startGame">Start Game</button>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const teamName = ref('');
const playerName = ref('');
const gameRule = ref('single');
const gameSet = ref(1);

// Handle form submission
const startGame = () => {
    // Perform necessary actions with the entered data
    $fetch('/api/start-game', {
        method: 'POST',
        body: {
            teamName: teamName.value,
            playerName: playerName.value,
            gameRule: gameRule.value,
            gameSet: gameSet.value
        }
    })
};

</script>

<style>

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