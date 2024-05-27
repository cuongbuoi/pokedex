import { PokemonRo, PokemonTypeRo } from '@/interface/ro/pokemon-ro.interface';
import { $http } from '@/plugins/http';

export const getPokemons = (query?: object): Promise<{ data: PokemonRo }> => {
    return $http.get('/pokemons', {
        params: {
            ...query,
        },
    });
};
export const getPokemonTypes = (): Promise<{ data: PokemonTypeRo }> => {
    return $http.get('/types');
};
