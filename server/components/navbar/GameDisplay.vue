<template>
    <div class="wrapper">
        <div class="game-info">
            <h2>Game Set Info</h2>
            <p>Game Set ID: {{ game.setId }}</p>
            <p>Player 1: {{ game.player1 }}</p>
            <p>Player 2: {{ game.player2 }}</p>
            <p>Score: {{ game.score }}</p>
        </div>
        
    </div>
</template>
<script setup>
defineProps({
    game: {
        type: Object,
        required: true
    }
})
</script>