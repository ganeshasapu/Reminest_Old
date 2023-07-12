import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

function PlayButtonIcon(props: SvgProps) {
    return (
        <Svg viewBox="0 0 31 40" fill="none" {...props}>
            <Path
                d="M30.369 21.226L2.997 39.474A1.291 1.291 0 01.99 38.4V1.905A1.291 1.291 0 012.997.83L30.37 19.078a1.291 1.291 0 010 2.148z"
                fill="#fff"
                fillOpacity={0.5}
            />
        </Svg>
    );
}

export default PlayButtonIcon;
