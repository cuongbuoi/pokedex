<script lang="ts" setup>
const props = defineProps({
    formatter: {
        type: Function,
        default: () => {},
    },
});

const value = defineModel({
    type: String,
    default: '',
});

const onInput = () => {
    value.value = props.formatter(value.value);
};
</script>

<template>
    <input v-model="value" class="form-control" type="text" @input="onInput" />
</template>

<style lang="scss" scoped></style>
