import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

function ActivitiesIcon(props: SvgProps) {
    return (
        <Svg
            viewBox="0 0 24 24"
            fill="none"
            {...props}
        >
            <Path
                d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 100-16 8 8 0 000 16zm-5-7h2a3 3 0 106 0h2a5 5 0 01-10 0zm1-2a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm8 0a1.5 1.5 0 110-3 1.5 1.5 0 010 3z"
                fill="#A4A7F3"
            />
        </Svg>
    );
}

export default ActivitiesIcon;
