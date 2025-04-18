import React from "react";
import { Svg, Path, SvgProps } from "react-native-svg";

type PokeballProps = SvgProps & {
    color?: string;
    width?: number;
    height?: number;
}

const PokeballIcon = ({ color = "#fff", width = 24, height = 24, ...props }: PokeballProps) => {
    return (
        <Svg width={width} height={height} viewBox="0 0 24 24" fill="none" style={props.style}>
            <Path d="M14.8572 12C14.8572 13.578 13.578 14.8571 12.0001 14.8571C10.4221 14.8571 9.14292 13.578 9.14292 12C9.14292 10.422 10.4221 9.14286 12.0001 9.14286C13.578 9.14286 14.8572 10.422 14.8572 12Z" fill={color} />
            <Path fillRule="evenodd" clipRule="evenodd" d="M12.0001 24C18.0454 24 23.0467 19.5296 23.8785 13.7143H16.8503C16.1443 15.7118 14.2393 17.1429 12.0001 17.1429C9.76083 17.1429 7.85584 15.7118 7.14984 13.7143H0.121582C0.953404 19.5296 5.95468 24 12.0001 24ZM7.14984 10.2857H0.121582C0.953404 4.47035 5.95468 0 12.0001 0C18.0454 0 23.0467 4.47035 23.8785 10.2857H16.8503C16.1443 8.28824 14.2393 6.85714 12.0001 6.85714C9.76083 6.85714 7.85584 8.28824 7.14984 10.2857ZM14.8572 12C14.8572 13.578 13.578 14.8571 12.0001 14.8571C10.4221 14.8571 9.14292 13.578 9.14292 12C9.14292 10.422 10.4221 9.14286 12.0001 9.14286C13.578 9.14286 14.8572 10.422 14.8572 12Z" fill={color} />
        </Svg>
    )
}

export default PokeballIcon;