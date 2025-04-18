import { AppText } from "@/app/components/app-test";
import Separator from "@/app/components/separator";
import { Feather } from "@expo/vector-icons";
import { View } from "react-native";

export default function About({
    weight,
    height
}: {
    weight: number,
    height: number
}) {
    return (
        <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: 1, justifyContent: 'center', gap: 8 }}>
                <AppText style={{ textAlign: 'center', paddingVertical: 8 }}>{weight} kg</AppText>
                <AppText style={{ textAlign: 'center', fontSize: 8, color: "#666666" }}>Weight</AppText>
            </View>
            <Separator />
            <View style={{ flex: 1, justifyContent: 'center', gap: 8 }}>
                <AppText style={{ textAlign: 'center', paddingVertical: 8 }}>{height} m</AppText>
                <AppText style={{ textAlign: 'center', fontSize: 8, color: '#666666' }}>Height</AppText>
            </View>
        </View>
    )
}