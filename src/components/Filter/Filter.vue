<script lang="ts" setup>
import FormInput from '@/components/FormInput/FormInput.vue';
import { SORT_TYPES } from '@/constants/config';
import { REGEX } from '@/constants/regex';
import {
    ErrorPokemonFilter,
    PokemonFilter,
} from '@/interface/pokemon.interface';
import { usePokemonType } from '@/store/usePokemonType';
import { storeToRefs } from 'pinia';
import { PropType, reactive, ref } from 'vue';

defineProps({
    loading: {
        type: Boolean,
        default: false,
    },
});
const emit = defineEmits(['onSearch']);

const filter = defineModel({
    type: Object as PropType<PokemonFilter>,
    required: true,
});

const sortTypes = reactive(SORT_TYPES);
const pokemonTypeStore = usePokemonType();
const { types } = storeToRefs(pokemonTypeStore);

const errorFilter = reactive<ErrorPokemonFilter>({
    total: '',
    speed: '',
    hp: '',
    attack: '',
    defense: '',
    spAtk: '',
    spDef: '',
});

const search = () => {
    let valid = true;
    let errorKey: keyof ErrorPokemonFilter;
    for (errorKey in errorFilter) {
        errorFilter[errorKey] = '';
    }
    // Total
    if (filter.value.minTotal === '' && filter.value.maxTotal !== '') {
        errorFilter.total = 'Please enter total from';
        valid = false;
    }
    if (+filter.value.minTotal > +filter.value.maxTotal) {
        errorFilter.total = 'The min total must be smaller than the max total';
        valid = false;
    }
    // HP
    if (filter.value.minHp === '' && filter.value.maxHp !== '') {
        errorFilter.hp = 'Please enter speed from';
        valid = false;
    }
    if (+filter.value.minHp > +filter.value.maxHp) {
        errorFilter.hp = 'The min HP must be smaller than the max HP';
        valid = false;
    }
    // Attack
    if (filter.value.minAttack === '' && filter.value.maxAttack !== '') {
        errorFilter.attack = 'Please enter attack from';
        valid = false;
    }
    if (+filter.value.minAttack > +filter.value.maxAttack) {
        errorFilter.attack =
            'The min attack must be smaller than the max attack';
        valid = false;
    }
    // Defense
    if (filter.value.minDefense === '' && filter.value.maxDefense !== '') {
        errorFilter.defense = 'Please enter defense from';
        valid = false;
    }
    if (+filter.value.minDefense > +filter.value.maxDefense) {
        errorFilter.defense =
            'The min defense must be smaller than the max defense';
        valid = false;
    }
    // Special Attack
    if (filter.value.minSpAtk === '' && filter.value.maxSpAtk !== '') {
        errorFilter.spAtk = 'Please enter special attack from';
        valid = false;
    }
    if (+filter.value.minSpAtk > +filter.value.maxSpAtk) {
        errorFilter.spAtk =
            'The min special attack must be smaller than the max special attack';
        valid = false;
    }
    // Special Defense
    if (filter.value.minSpDef === '' && filter.value.maxSpDef !== '') {
        errorFilter.spDef = 'Please enter special defense from';
        valid = false;
    }
    if (+filter.value.minSpDef > +filter.value.maxSpDef) {
        errorFilter.spDef =
            'The min special defense must be smaller than the max special defense';
        valid = false;
    }
    // Speed
    if (filter.value.minSpeed === '' && filter.value.maxSpeed !== '') {
        errorFilter.speed = 'Please enter speed from';
        valid = false;
    }
    if (+filter.value.minSpeed > +filter.value.maxSpeed) {
        errorFilter.speed = 'The min speed must be smaller than the max speed';
        valid = false;
    }
    if (valid) {
        collapse.value = false;
        emit('onSearch');
    }
};

const resetFilter = () => {
    let filterKey: keyof PokemonFilter;
    for (filterKey in filter.value) {
        filter.value[filterKey] = '';
    }
    search();
    collapse.value = false;
};

const collapse = ref<boolean>(false);
const toggleCollapse = () => {
    collapse.value = !collapse.value;
};

const onlyNumberFormatter = (value: string) => {
    return value.replace(REGEX.NUMBER, '');
};
</script>

<template>
    <div :class="{ show: collapse }" class="pokemon-filter">
        <div class="pokemon-filter__title" @click="toggleCollapse">
            <img alt="Pokeball" src="@/assets/images/pokeball.svg" />
            Filter
        </div>
        <div class="pokemon-filter__body">
            <form action="#" @submit.prevent="search">
                <div class="pokemon-filter__row">
                    <div class="pokemon-filter__col">
                        <div class="form-group">
                            <div class="pokemon-filter__label">Sort type</div>
                            <select
                                v-model="filter.sortType"
                                class="custom-select"
                                name="sortType"
                            >
                                <option value="">-- Select sort type --</option>
                                <option
                                    v-for="sortTypeItem in sortTypes"
                                    :key="sortTypeItem.key"
                                    :value="sortTypeItem.value"
                                >
                                    {{ sortTypeItem.name }}
                                </option>
                            </select>
                        </div>
                    </div>
                    <div class="pokemon-filter__col">
                        <div class="form-group">
                            <div class="pokemon-filter__label">
                                Pokemon Type
                            </div>
                            <select
                                v-model="filter.type"
                                class="custom-select"
                                name="type"
                            >
                                <option value="">-- Select type --</option>
                                <option
                                    v-for="type in types"
                                    :key="type.id"
                                    :value="type.id"
                                >
                                    {{ type.name }}
                                </option>
                            </select>
                        </div>
                    </div>
                    <div class="pokemon-filter__col">
                        <div class="form-group">
                            <div class="pokemon-filter__label">Total from</div>
                            <FormInput
                                v-model="filter.minTotal"
                                :formatter="onlyNumberFormatter"
                            ></FormInput>
                        </div>
                        <div class="pokemon-filter__error">
                            {{ errorFilter.total }}
                        </div>
                    </div>
                    <div class="pokemon-filter__col">
                        <div class="form-group">
                            <div class="pokemon-filter__label">To</div>
                            <FormInput
                                v-model="filter.maxTotal"
                                :formatter="onlyNumberFormatter"
                            ></FormInput>
                        </div>
                    </div>
                    <div class="pokemon-filter__col">
                        <div class="form-group">
                            <div class="pokemon-filter__label">HP from</div>
                            <FormInput
                                v-model="filter.minHp"
                                :formatter="onlyNumberFormatter"
                            ></FormInput>
                        </div>
                        <div class="pokemon-filter__error">
                            {{ errorFilter.hp }}
                        </div>
                    </div>
                    <div class="pokemon-filter__col">
                        <div class="form-group">
                            <div class="pokemon-filter__label">To</div>
                            <FormInput
                                v-model="filter.maxHp"
                                :formatter="onlyNumberFormatter"
                            ></FormInput>
                        </div>
                    </div>
                    <div class="pokemon-filter__col">
                        <div class="form-group">
                            <div class="pokemon-filter__label">Attack from</div>
                            <FormInput
                                v-model="filter.minAttack"
                                :formatter="onlyNumberFormatter"
                            ></FormInput>
                        </div>
                        <div class="pokemon-filter__error">
                            {{ errorFilter.attack }}
                        </div>
                    </div>
                    <div class="pokemon-filter__col">
                        <div class="form-group">
                            <div class="pokemon-filter__label">To</div>
                            <FormInput
                                v-model="filter.maxAttack"
                                :formatter="onlyNumberFormatter"
                            ></FormInput>
                        </div>
                    </div>
                    <div class="pokemon-filter__col">
                        <div class="form-group">
                            <div class="pokemon-filter__label">
                                Defense from
                            </div>
                            <FormInput
                                v-model="filter.minDefense"
                                :formatter="onlyNumberFormatter"
                            ></FormInput>
                        </div>
                        <div class="pokemon-filter__error">
                            {{ errorFilter.defense }}
                        </div>
                    </div>
                    <div class="pokemon-filter__col">
                        <div class="form-group">
                            <div class="pokemon-filter__label">To</div>
                            <FormInput
                                v-model="filter.maxDefense"
                                :formatter="onlyNumberFormatter"
                            ></FormInput>
                        </div>
                    </div>
                    <div class="pokemon-filter__col">
                        <div class="form-group">
                            <div class="pokemon-filter__label">
                                Special attack from
                            </div>
                            <FormInput
                                v-model="filter.minSpAtk"
                                :formatter="onlyNumberFormatter"
                            ></FormInput>
                        </div>
                        <div class="pokemon-filter__error">
                            {{ errorFilter.spAtk }}
                        </div>
                    </div>
                    <div class="pokemon-filter__col">
                        <div class="form-group">
                            <div class="pokemon-filter__label">To</div>
                            <FormInput
                                v-model="filter.maxSpAtk"
                                :formatter="onlyNumberFormatter"
                            ></FormInput>
                        </div>
                    </div>
                    <div class="pokemon-filter__col">
                        <div class="form-group">
                            <div class="pokemon-filter__label">
                                Special defense from
                            </div>
                            <FormInput
                                v-model="filter.minSpDef"
                                :formatter="onlyNumberFormatter"
                            ></FormInput>
                        </div>
                        <div class="pokemon-filter__error">
                            {{ errorFilter.spDef }}
                        </div>
                    </div>
                    <div class="pokemon-filter__col">
                        <div class="form-group">
                            <div class="pokemon-filter__label">To</div>
                            <FormInput
                                v-model="filter.maxSpDef"
                                :formatter="onlyNumberFormatter"
                            ></FormInput>
                        </div>
                    </div>
                    <div class="pokemon-filter__col">
                        <div class="form-group">
                            <div class="pokemon-filter__label">Speed from</div>
                            <FormInput
                                v-model="filter.minSpeed"
                                :formatter="onlyNumberFormatter"
                            ></FormInput>
                        </div>
                        <div class="pokemon-filter__error">
                            {{ errorFilter.speed }}
                        </div>
                    </div>
                    <div class="pokemon-filter__col">
                        <div class="form-group">
                            <div class="pokemon-filter__label">To</div>
                            <FormInput
                                v-model="filter.maxSpeed"
                                :formatter="onlyNumberFormatter"
                            ></FormInput>
                        </div>
                    </div>
                </div>
                <div class="pokemon-filter__button text-center">
                    <button
                        :disabled="loading"
                        class="reset"
                        type="button"
                        @click="resetFilter"
                    >
                        Reset
                    </button>
                    <button :disabled="loading" type="submit">Search</button>
                </div>
            </form>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import 'Filter';
</style>
