import * as React from "react";
import Svg, { G, Path, Defs, LinearGradient, Stop, SvgProps } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: filter */

function LogoBackgroundFaded(props: SvgProps) {
    return (
        <Svg
            viewBox="0 0 283 312"
            fill="none"
            {...props}
        >
            <G filter="url(#filter0_d_146_399)">
                <Path
                    d="M252.756 99.377l-48.642 36.731a107.151 107.151 0 016.909 35.673 68.96 68.96 0 01-11.753 38.5c-7.665 11.399-18.562 20.289-31.316 25.546a70.376 70.376 0 01-40.338 3.992 70.036 70.036 0 01-35.783-18.905l-47.125 35.562c17.324 19.447 40.204 33.2 65.597 39.427a129.737 129.737 0 0076.554-4.565c24.459-9.201 45.515-25.574 60.366-46.941 14.852-21.367 22.796-46.715 22.775-72.672a173.683 173.683 0 00-17.244-72.348z"
                    fill="url(#paint0_linear_146_399)"
                />
                <Path
                    d="M20.704 216.195A127.894 127.894 0 0113 172.292V27.524h47.97v25.068l2.428-2.521c16.31-16.995 43.032-37.474 77.684-37.474 30.503 0 60.838 16.429 85.528 46.311L181.8 93.124c-12.952-15.408-27.371-23.877-40.718-23.877-15.661 0-32.959 11.981-47.491 32.828-14.532 20.847-24.155 48.605-24.155 70.217 0 2.266 0 4.39.282 6.458l-49.014 37.445z"
                    fill="url(#paint1_linear_146_399)"
                />
            </G>
            <Defs>
                <LinearGradient
                    id="paint0_linear_146_399"
                    x1={157.354}
                    y1={99.3766}
                    x2={157.354}
                    y2={299.636}
                    gradientUnits="userSpaceOnUse"
                >
                    <Stop stopColor="#302929" />
                    <Stop offset={1} stopColor="#584B4B" stopOpacity={0} />
                </LinearGradient>
                <LinearGradient
                    id="paint1_linear_146_399"
                    x1={119.805}
                    y1={12.5974}
                    x2={119.805}
                    y2={216.195}
                    gradientUnits="userSpaceOnUse"
                >
                    <Stop stopColor="#302929" />
                    <Stop offset={1} stopColor="#584B4B" stopOpacity={0} />
                </LinearGradient>
            </Defs>
        </Svg>
    );
}

export default LogoBackgroundFaded;
