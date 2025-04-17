export const getImageUrl = (id: number) => {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
}

// parse id in url like https://pokeapi.co/api/v2/pokemon/1/
export const parseIdInUrl = (url: string): number => {
    const splits = url.split('/');
    return parseInt(splits[splits.length - 2]);
}