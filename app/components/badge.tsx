import { AppText } from "./app-test";
import { StyleSheet } from "react-native";

export default function Badge({ children, color }: { children: React.ReactNode, color: string }) {
    return <AppText style={[styles.badge, { backgroundColor: color }]}>{children}</AppText>
}

const styles = StyleSheet.create({
    badge: {
        paddingTop: 2,
        paddingRight: 8,
        paddingLeft: 8,
        paddingBottom: 2,
        fontSize: 10,
        fontFamily: 'Poppins_600SemiBold',
        lineHeight: 16,
        color: 'white',
        textTransform: 'capitalize',
        borderRadius: 10,
    }
})