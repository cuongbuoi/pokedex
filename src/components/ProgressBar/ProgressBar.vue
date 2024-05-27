<script lang="ts" setup>
defineProps({
    value: {
        type: Number,
        default: 0,
    },
});
</script>

<template>
    <div class="progress-bar">
        <div :style="{ width: value + '%' }" class="progress-bar__inner"></div>
    </div>
</template>

<style lang="scss" scoped>
@import 'ProgressBar';
</style>
