type GetPokemons = {
    count: number,
    next: string | null,
    previous: string | null,
    results: Array<{
        name: string,
        url: string
    }>
}

type GetPokemon = {
    name: string,
    weight: number,
    height: number,
    types: Array<{
        type: {
            name: string,
            url: string
        }
    }>,
    stats: Array<{
        base_stat: number,
        effort: number,
        stat: {
            name: string,
            url: string
        }
    }>
}

type GetPokemonSpecies = {
    flavor_text_entries: Array<{
        flavor_text: string
        language: {
            name: string,
            url: string
        }
    }>
}