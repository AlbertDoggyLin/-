<template>
    <div class="wrapper">
        <div class="game-info">
            {{ game }}
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