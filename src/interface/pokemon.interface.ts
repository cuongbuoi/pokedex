import { LocationQueryValue } from 'vue-router';

export interface Pokemon {
    id: string;
    number: number;
    name: string;
    type_1: number;
    type_2: number;
    total: number;
    hp: number;
    attack: number;
    defense: number;
    sp_atk: number;
    sp_def: number;
    speed: number;
    generation: number;
    legendary: number;
    created_at: string;
    updated_at: string;
}

export interface PokemonType {
    id: number;
    name: string;
    icon?: string;
}

export interface PokemonFilter {
    type: LocationQueryValue[] | string;
    sortType: LocationQueryValue[] | string;
    minTotal: LocationQueryValue[] | string;
    maxTotal: LocationQueryValue[] | string;
    minSpeed: LocationQueryValue[] | string;
    maxSpeed: LocationQueryValue[] | string;
    minHp: LocationQueryValue[] | string;
    maxHp: LocationQueryValue[] | string;
    minAttack: LocationQueryValue[] | string;
    maxAttack: LocationQueryValue[] | string;
    minDefense: LocationQueryValue[] | string;
    maxDefense: LocationQueryValue[] | string;
    minSpAtk: LocationQueryValue[] | string;
    maxSpAtk: LocationQueryValue[] | string;
    minSpDef: LocationQueryValue[] | string;
    maxSpDef: LocationQueryValue[] | string;
}

export interface ErrorPokemonFilter {
    total: string;
    speed: string;
    hp: string;
    attack: string;
    defense: string;
    spAtk: string;
    spDef: string;
}
