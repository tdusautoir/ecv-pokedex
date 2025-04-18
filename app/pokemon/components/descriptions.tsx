import { AppText } from "@/app/components/app-test";
import { usePokemonColor } from "@/app/context/pokemonContext";
import { useQuery } from "@tanstack/react-query";
import { ActivityIndicator, View } from "react-native";

export default function Description({ pokemonId }: { pokemonId: string }) {
    const color = usePokemonColor();
    const { data, isPending } = useQuery<GetPokemonSpecies>({
        queryKey: [`pokemon-${pokemonId}-description`],
        queryFn: async () => {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`);
            const result = await response.json();
            return result;
        }
    })

    if (!data) return null;

    if (isPending) {
        return (<View style={{ alignItems: 'center', marginVertical: 10 }}>
            <ActivityIndicator size="small" color={color} />
        </View>)
    }

    return <AppText style={{ fontSize: 10, lineHeight: 16 }}>
        {data.flavor_text_entries[0].flavor_text.replace(/[\n\f\r]/g, ' ').replace(/\s+/g, ' ').trim()}
    </AppText>;
}