<script lang="ts" setup>
import DetailPopup from '@/components/DetailPopup/DetailPopup';
import EmptyData from '@/components/EmptyData/EmptyData.vue';
import Filter from '@/components/Filter/Filter';
import PokemonItem from '@/components/PokemonItem/PokemonItem';
import Spinner from '@/components/Spinner/Spinner.vue';
import { SORT_TYPES } from '@/constants/config';
import { Pokemon, PokemonFilter } from '@/interface/pokemon.interface';
import { getPokemons } from '@/services/pokemon.service';
import { usePokemonType } from '@/store/usePokemonType';
import { reactive, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const loading = ref<boolean>(false);
const loadingLoadMore = ref<boolean>(false);
const pokemons = ref<Pokemon[]>([]);
const paging = reactive({
    currentPage: 1,
    perPage: 10,
    total: 0,
});
const filter = reactive<PokemonFilter>({
    type: route.query.type || '',
    sortType: route.query.sortType || '',
    minTotal: route.query.minTotal || '',
    maxTotal: route.query.maxTotal || '',
    minSpeed: route.query.minSpeed || '',
    maxSpeed: route.query.maxSpeed || '',
    minHp: route.query.minHp || '',
    maxHp: route.query.maxHp || '',
    minAttack: route.query.minAttack || '',
    maxAttack: route.query.maxAttack || '',
    minDefense: route.query.minDefense || '',
    maxDefense: route.query.maxDefense || '',
    minSpAtk: route.query.minSpAtk || '',
    maxSpAtk: route.query.maxSpAtk || '',
    minSpDef: route.query.minSpDef || '',
    maxSpDef: route.query.maxSpDef || '',
});

const pokemonTypeStore = usePokemonType();
const { fetchPokemonTypes } = pokemonTypeStore;

const setLoading = (loadMore: boolean, value: boolean): void => {
    if (loadMore) {
        loadingLoadMore.value = value;
    } else {
        loading.value = value;
    }
};

const fetchPokemonList = async (loadMore = false): Promise<void> => {
    try {
        setLoading(loadMore, true);
        const sortKey = filter.sortType === SORT_TYPES.DESC.value ? '-' : '';
        const {
            data: { data, meta },
        } = await getPokemons({
            page: {
                number: paging.currentPage,
                size: paging.perPage,
            },
            filter: {
                type: filter.type,
                min_total: filter.minTotal,
                max_total: filter.maxTotal,
                min_speed: filter.minSpeed,
                max_speed: filter.maxSpeed,
                min_hp: filter.minHp,
                max_hp: filter.maxHp,
                min_attack: filter.minAttack,
                max_attack: filter.maxAttack,
                min_defense: filter.minDefense,
                max_defense: filter.maxDefense,
                min_sp_atk: filter.minSpAtk,
                max_sp_atk: filter.maxSpAtk,
                min_sp_def: filter.minSpDef,
                max_sp_def: filter.maxSpDef,
            },
            sort: sortKey + 'number',
        });
        if (loadMore) {
            pokemons.value.push(...data);
        } else {
            pokemons.value = data;
        }
        paging.perPage = meta.per_page;
        paging.total = meta.total;

        const maxPage = Math.ceil(paging.total / paging.perPage);
        showLoadMore.value = paging.currentPage < maxPage;
    } catch (e) {
        console.log(e);
    } finally {
        setLoading(loadMore, false);
    }
};

watch(
    () => route.query,
    () => {
        fetchPokemonTypes();
        fetchPokemonList();
    },
    {
        immediate: true,
    }
);

const showLoadMore = ref<boolean>(true);
const loadMore = (): void => {
    paging.currentPage++;
    fetchPokemonList(true);
};

const queryBuilder = (query: any): object => {
    let queryObject: any = {};
    Object.keys(query).forEach((i) => {
        if (query[i].toString()) {
            queryObject[i] = query[i];
        }
    });
    return queryObject;
};

const doFilter = (): void => {
    paging.currentPage = 1;
    const queryString = queryBuilder(filter);
    const query = {
        ...queryString,
    };
    router.push({
        query,
    });
};

const currentItem = ref<Pokemon | null>(null);
const modalDetail = ref<boolean>(false);
const openModalDetail = (item: Pokemon): void => {
    currentItem.value = item;
    modalDetail.value = true;
};

const resetCurrentItem = (): void => {
    currentItem.value = null;
};
</script>

<template>
    <div class="pokemon-wrapper">
        <div class="container">
            <img alt="Pokedex" class="logo" src="@/assets/images/logo.svg" />
            <Filter
                v-model="filter"
                :loading="loading"
                @onSearch="doFilter"
            ></Filter>
            <Spinner v-if="loading"></Spinner>
            <template v-else>
                <div v-if="pokemons.length" class="pokemon-list">
                    <PokemonItem
                        v-for="pokemon in pokemons"
                        :key="'pokemon-' + pokemon.id"
                        :data="pokemon"
                        @click="openModalDetail(pokemon)"
                    ></PokemonItem>
                </div>
                <EmptyData v-else></EmptyData>
                <div v-if="showLoadMore" class="load-more-wrapper text-center">
                    <button
                        :disabled="loadingLoadMore"
                        class="btn-load-more"
                        @click="loadMore"
                    >
                        More pokemons
                    </button>
                </div>
            </template>
        </div>
    </div>
    <DetailPopup
        v-model="modalDetail"
        :data="currentItem"
        @hidden="resetCurrentItem"
    ></DetailPopup>
</template>

<style lang="scss" scoped>
@import 'Home';
</style>
