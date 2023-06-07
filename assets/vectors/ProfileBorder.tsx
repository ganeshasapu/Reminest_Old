import * as React from "react";
import Svg, { G, Path, Defs, SvgProps } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: filter */

function ProfileBorder(props: SvgProps) {
    return (
        <Svg
            viewBox="0 0 186 185"
            fill="none"
            {...props}
        >
            <G filter="url(#filter0_d_146_585)">
                <Path fill="#fff" d="M18 32H27V84H18z" />
                <Path
                    d="M168 89c0 41.421-33.579 75-75 75-23.02 0-43.616-10.37-57.374-26.694l6.875-5.146C54.685 146.402 72.788 155.429 93 155.429c36.687 0 66.429-29.742 66.429-66.429 0-13.395-3.965-25.865-10.786-36.299l6.875-5.146C163.405 59.428 168 73.677 168 89z"
                    fill="#FFAB5B"
                />
                <Path
                    d="M26.736 84.286C29.154 49.798 57.898 22.57 93 22.57c20.213 0 38.318 9.028 50.502 23.272l6.874-5.146C136.618 24.37 116.02 14 93 14c-39.838 0-72.421 31.06-74.854 70.286h8.59z"
                    fill="#fff"
                />
            </G>
            <Defs></Defs>
        </Svg>
    );
}

export default ProfileBorder;
