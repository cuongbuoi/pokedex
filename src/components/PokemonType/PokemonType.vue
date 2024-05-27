<script lang="ts" setup>
import { Pokemon } from '@/interface/pokemon.interface';
import { usePokemonType } from '@/store/usePokemonType';
import { storeToRefs } from 'pinia';
import { computed, PropType } from 'vue';

const props = defineProps({
    data: {
        type: Object as PropType<Pokemon>,
        required: true,
    },
});

const pokemonTypeStore = usePokemonType();
const { types } = storeToRefs(pokemonTypeStore);

const getTypeById = (id: number) => {
    return types.value.find((i) => i.id === id) || null;
};

const typeOne = computed(() => getTypeById(props.data.type_1));
const typeTwo = computed(() => getTypeById(props.data.type_2));
</script>

<template>
    <div v-if="typeOne" class="pokemon-type">
        <img :alt="typeOne.name" :src="typeOne.icon" />
        {{ typeOne.name }}
    </div>
    <div v-if="typeTwo" class="pokemon-type">
        <img :alt="typeTwo.name" :src="typeTwo.icon" />
        {{ typeTwo.name }}
    </div>
</template>

<style lang="scss" scoped>
@import 'PokemonType';
</style>
