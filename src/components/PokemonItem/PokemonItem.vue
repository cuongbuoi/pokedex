<script lang="ts" setup>
import PokemonType from '@/components/PokemonType/PokemonType.vue';
import ProgressBar from '@/components/ProgressBar/ProgressBar.vue';
import { Pokemon } from '@/interface/pokemon.interface';
import { computed, PropType } from 'vue';

const props = defineProps({
    data: {
        type: Object as PropType<Pokemon>,
        required: true,
    },
    detail: {
        type: Boolean,
        default: false,
    },
});

const specs = computed(() => {
    return [
        {
            label: 'HP',
            value: props.data?.hp,
        },
        {
            label: 'Attack',
            value: props.data?.attack,
        },
        {
            label: 'Defense',
            value: props.data?.defense,
        },
        {
            label: 'Special Attack',
            value: props.data?.sp_atk,
        },
        {
            label: 'Special Defense',
            value: props.data?.sp_def,
        },
        {
            label: 'Speed',
            value: props.data?.speed,
        },
    ];
});
</script>

<template>
    <div :class="{ detail }" class="pokemon-item">
        <div class="pokemon-item__number">
            {{ data.number.toString().padStart(4, '0') }}
        </div>
        <slot v-if="$slots.image" name="image"></slot>
        <div v-else class="pokemon-item__image"></div>
        <div class="pokemon-item__name text-center">
            {{ data.name }}
        </div>
        <div class="pokemon-item__type">
            <PokemonType :data="data"></PokemonType>
        </div>
        <div class="pokemon-item__specs">
            <div
                v-for="spec in specs"
                :key="spec.label"
                class="pokemon-item__specs-item"
            >
                <div class="pokemon-item__specs-item-name">
                    <span>{{ spec.label }}</span>
                    <span>{{ spec.value }}</span>
                </div>
                <ProgressBar :value="spec.value"></ProgressBar>
            </div>
        </div>
        <div class="pokemon-item__total">
            <span class="text-uppercase">Total</span>
            <span>{{ data.total }}</span>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import 'PokemonItem';
</style>
