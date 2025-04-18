import Feather from "@expo/vector-icons/Feather";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Image, TouchableOpacity, View, StyleSheet } from "react-native";
import colors from "../lib/colors";
import { AppText } from "../components/app-test";
import PokeballIcon from "../components/pokeball-icon";
import { getImageUrl } from "../lib/pokemons";
import Badge from "../components/badge";

const Subtitle = ({ color, children }: { children: React.ReactNode, color: string }) => (
    <AppText style={[styles.subtitle, { color }]}>{children}</AppText>
)

export default function PokemonPage() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const router = useRouter();

    const { data } = useSuspenseQuery<GetPokemon>({
        queryKey: [`pokemons-${id}`],
        queryFn: async () => {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
            const result = await response.json();
            return result;
        }
    })

    const mainColor = colors.types[data.types[0].type.name as keyof typeof colors.types];

    return (
        <View style={{ flex: 1, position: 'relative', padding: 8, backgroundColor: mainColor }}>
            <PokeballIcon width={208} height={208} color="#FFFFFF10" style={styles.backgroundIcon} />
            <View style={styles.header}>
                <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => router.back()}>
                        <Feather name={'arrow-left'} color={'white'} size={24} />
                    </TouchableOpacity>
                    <AppText style={{ textTransform: 'capitalize', color: 'white' }} variant="title">{data.name}</AppText>
                </View>
                <AppText style={{ color: 'white' }} variant="subtitle">#{id}</AppText>
            </View>
            <View style={{ alignItems: 'center' }}>
                <Image
                    style={{ width: 200, height: 200, zIndex: 1 }}
                    source={{ uri: getImageUrl(parseInt(id)) }} />
            </View>
            <View style={styles.content}>
                <View style={styles.types}>
                    {data.types.map(({ type }) => (
                        <Badge color={colors.types[type.name as keyof typeof colors.types]}>{type.name}</Badge>
                    ))}
                </View>
                <Subtitle color={mainColor}>About</Subtitle>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    header: {
        paddingTop: 20,
        paddingLeft: 20,
        paddingBottom: 24,
        paddingRight: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    backgroundIcon: {
        position: 'absolute',
        top: 8,
        right: 8
    },
    content: {
        flex: 1,
        paddingTop: 56,
        marginTop: -56,
        backgroundColor: 'white',
        borderRadius: 8,
        gap: 16
    },
    types: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 16
    },
    subtitle: {
        textAlign: 'center',
        fontFamily: 'Poppins_600SemiBold',
    }
})