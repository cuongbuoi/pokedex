import { PokemonType } from '@/interface/pokemon.interface';
import { getPokemonTypes } from '@/services/pokemon.service';
import { defineStore } from 'pinia';

export const usePokemonType = defineStore('pokemon-type', {
    state: () => ({
        types: [] as PokemonType[],
        fetched: false as boolean,
    }),
    actions: {
        async fetchPokemonTypes() {
            if (!this.fetched) {
                try {
                    const {
                        data: { data: types },
                    } = await getPokemonTypes();
                    this.fetched = true;
                    this.types = types.map((i) => {
                        return {
                            ...i,
                            icon: require('@/assets/images/types/Pokemon_Type_Icon_' +
                                i.name +
                                '.svg'),
                        };
                    });
                } catch {
                    this.types = [];
                    this.fetched = false;
                }
            }
        },
    },
});
