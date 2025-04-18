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
    types: Array<{
        type: {
            name: string,
            url: string
        }
    }>
}