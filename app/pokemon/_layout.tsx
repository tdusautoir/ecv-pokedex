import { useQuery } from "@tanstack/react-query";
import { Stack, useLocalSearchParams } from "expo-router";
import { Text, SafeAreaView, ActivityIndicator } from "react-native";
import colors from "../lib/colors";
import { PokemonProvider } from "../context/pokemonContext";

export default function PokemonPage() {
    const { id } = useLocalSearchParams<{ id: string }>();

    const { status, data } = useQuery<GetPokemon>({
        queryKey: [`pokemons-${id}`],
        queryFn: async () => {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
            const result = await response.json();
            return result;
        }
    })

    if (status === 'pending') {
        <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <ActivityIndicator size={16} />
        </SafeAreaView>
    }

    if (status === 'error' || !data) return (
        <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Not Found</Text>
        </SafeAreaView>
    )

    const mainColor = colors.types[data.types[0].type.name as keyof typeof colors.types]

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: mainColor
        }}>
            <PokemonProvider color={mainColor}>
                <Stack screenOptions={{ headerShown: false }} />
            </PokemonProvider>
        </SafeAreaView>
    );
}