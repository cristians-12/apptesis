import { DimensionValue } from "react-native";
import Svg, { Path } from "react-native-svg";

interface Props {
    width?: number;
    fill?: string;
}

export default function CloseIcon({ width, fill }: Props) {
    return (
        <>
            <Svg width={width ?? '15'} height={width ?? '15'} viewBox="0 0 15 15" fill={fill} >
                <Path d="M5.09228 7.18701L0.362547 2.45728L2.55542 0.264401L7.28516 4.99414L12.0149 0.264401L14.2078 2.45728L9.47803 7.18701L14.2078 11.9167L12.0149 14.1096L7.28516 9.37989L2.55542 14.1096L0.362547 11.9167L5.09228 7.18701Z" fill="#141922" />
            </Svg>
        </>
    )
}