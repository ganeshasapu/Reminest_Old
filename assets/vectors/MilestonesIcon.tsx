import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

function MilestonesIcon(props: SvgProps) {
    return (
        <Svg
            viewBox="0 0 24 24"
            fill="none"
            {...props}
        >
            <Path
                d="M9 1v2h6V1h2v2h4a1 1 0 011 1v16a1 1 0 01-1 1H3a1 1 0 01-1-1V4a1 1 0 011-1h4V1h2zm11 7H4v11h16V8zm-4.964 2.136l1.414 1.414-4.95 4.95-3.536-3.536L9.38 11.55l2.121 2.122 3.536-3.536z"
                fill="#0A84FF"
            />
        </Svg>
    );
}

export default MilestonesIcon;
