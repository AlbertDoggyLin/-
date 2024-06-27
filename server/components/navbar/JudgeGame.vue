<template>
    <div class="wrapper">
        <div class="left-area">
            <h2>{{ game.leftTeam }}</h2>
            <p v-for="player in game.leftPlayer">{{ player }}</p>
            <p>{{ game.leftScore }}</p>
        </div>
        <div class="right-area">
            <h2>{{ game.rightTeam }}</h2>
            <p v-for="player in game.rightPlayer">{{ player }}</p>
            <p>{{ game.rightScore }}</p>
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

<style scoped>
.wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100%;
}

.left-area {
    width: 50%;
}

.right-area {
    width: 50%;
}
</style>