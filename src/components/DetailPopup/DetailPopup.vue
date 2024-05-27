<script lang="ts" setup>
import PokemonItem from '@/components/PokemonItem/PokemonItem.vue';
import { API_URL } from '@/constants/config';
import { Pokemon } from '@/interface/pokemon.interface';
import { PropType, watch } from 'vue';

defineProps({
    data: {
        type: Object as unknown as PropType<Pokemon | null>,
        default: null,
    },
});

const modal = defineModel({ default: false });

const emit = defineEmits(['hidden']);
const hideModal = () => {
    modal.value = false;
    emit('hidden');
};

watch(modal, (value) => {
    if (value) {
        document.body.style.overflowY = 'hidden';
    } else {
        document.body.style.overflowY = '';
    }
});
</script>

<template>
    <transition name="fade">
        <div v-if="modal" class="modal-backdrop" @click="hideModal"></div>
    </transition>
    <transition name="scale">
        <div v-if="modal" class="modal">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button @click="hideModal">&times;</button>
                    </div>
                    <div v-if="data" class="modal-body">
                        <PokemonItem :data="data" detail>
                            <template #image>
                                <div class="pokemon-image">
                                    <img
                                        :alt="data.name"
                                        :src="
                                            API_URL +
                                            '/api/pokemon-api/pokemons/' +
                                            data?.id +
                                            '/sprite'
                                        "
                                    />
                                </div>
                            </template>
                        </PokemonItem>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<style lang="scss" scoped>
@import 'DetailPopup';
</style>
