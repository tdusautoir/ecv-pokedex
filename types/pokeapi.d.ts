type GetPokemons = {
    count: number,
    next: string | null,
    previous: string | null,
    results: Array<{
        name: string,
        url: string
    }>
}

type GetPokemonsFilters = 'name' | 'number' | undefined;