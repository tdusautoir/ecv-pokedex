import { StyleProp, View, ViewStyle } from "react-native";

export default function Separator({ style }: { style?: StyleProp<ViewStyle> }) {
    return <View style={[{
        width: 1,
        backgroundColor: '#e0e0e0',
    }, style]} />
}