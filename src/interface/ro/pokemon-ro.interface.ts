import { Pokemon, PokemonType } from '@/interface/pokemon.interface';

export interface PokemonRo {
    data: Pokemon[];
    links: {
        first: string;
        last: string;
        prev?: string;
        next?: string;
    };
    meta: {
        per_page: number;
        current_page: number;
        from: number;
        to: number;
        total: number;
    };
    status: number;
    success: boolean;
}

export interface PokemonTypeRo {
    data: PokemonType[];
    status: number;
    success: boolean;
}
