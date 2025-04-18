import { AppText } from "@/app/components/app-test";
import { usePokemonColor } from "@/app/context/pokemonContext";

const Subtitle = ({ children }: { children: React.ReactNode }) => {
    const color = usePokemonColor();
    return <AppText style={{
        color,
        fontSize: 14,
        textAlign: 'center',
        fontFamily: 'Poppins_600SemiBold'
    }}>{children}</AppText>
}
export default Subtitle;