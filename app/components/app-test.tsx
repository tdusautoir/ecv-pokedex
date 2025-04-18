import { Text, TextProps, StyleSheet } from 'react-native';

export type AppTextProps = TextProps & {
    lightColor?: string;
    darkColor?: string;
    variant?: 'default' | 'title' | 'semibold' | 'subtitle' | 'link';
};

export function AppText({
    style,
    lightColor,
    darkColor,
    variant = 'default',
    ...props
}: AppTextProps) {
    return (
        <Text
            style={[
                { fontFamily: 'Poppins_400Regular' },
                variant === 'default' ? styles.default : undefined,
                variant === 'title' ? styles.title : undefined,
                variant === 'semibold' ? styles.semibold : undefined,
                variant === 'subtitle' ? styles.subtitle : undefined,
                variant === 'link' ? styles.link : undefined,
                style,
            ]}
            {...props}
        />
    );
}

const styles = StyleSheet.create({
    default: {
        fontSize: 10,
        lineHeight: 16,
        fontFamily: 'Poppins_400Regular',
    },
    semibold: {
        fontSize: 10,
        lineHeight: 16,
        fontWeight: '600',
        fontFamily: 'Poppins_600SemiBold',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        lineHeight: 32,
        fontFamily: 'Poppins_800ExtraBold',
    },
    subtitle: {
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: 'Poppins_600SemiBold',
    },
    link: {
        lineHeight: 30,
        fontSize: 16,
        color: '#0a7ea4',
        fontFamily: 'Poppins_400Regular',
    },
});
