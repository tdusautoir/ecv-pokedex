import { AppText } from "@/app/components/app-test";
import { usePokemonColor } from "@/app/context/pokemonContext";
import { View, StyleSheet } from "react-native";
import Separator from "../../components/separator";

const statNames = {
    'hp': 'HP',
    'attack': 'ATK',
    'defense': 'DEF',
    'special-attack': 'SP.ATK',
    'special-defense': 'SP.DEF',
    'speed': 'SPD'
};

export default function BaseStats({ stats }: { stats: GetPokemon['stats'] }) {
    const color = usePokemonColor();

    return (
        <View style={styles.container}>
            <View style={styles.statNames}>
                {stats.map((stat, index) => (
                    <AppText key={index} variant="semibold" style={{ color }}>{statNames[stat.stat.name as keyof typeof statNames]}</AppText>
                ))}
            </View>
            <Separator />
            <View>
                {stats.map((stat, index) => (
                    <AppText key={index}>{stat.base_stat}</AppText>
                ))}
            </View>
            <View style={styles.bars}>
                {stats.map((stat, index) => (
                    <View key={index} style={[styles.bar]}>
                        <View style={[styles.plainBar, { backgroundColor: color, width: `${stat.base_stat}%`, opacity: 1 }]}></View>
                        <View style={[styles.plainBar, { backgroundColor: color, width: `100%`, opacity: 0.2 }]}></View>
                    </View>
                ))}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        gap: 8
    },
    statNames: {
        alignItems: 'flex-end'
    },
    bars: {
        flex: 1,
    },
    bar: {
        position: 'relative',
        height: 4,
        borderRadius: 4,
        marginVertical: 6,
        overflow: 'hidden',
        width: '100%'
    },
    plainBar: {
        height: '100%',
        position: 'absolute',
        left: 0,
        bottom: 0,
        margin: 0,
        zIndex: 2
    }
})