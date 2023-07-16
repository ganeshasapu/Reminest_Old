import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

function HeritageIcon(props: SvgProps) {
    return (
        <Svg
            viewBox="0 0 24 24"
            fill="none"
            {...props}
        >
            <Path
                d="M20 20a1 1 0 01-1 1H5a1 1 0 01-1-1v-9H1l10.327-9.388a1 1 0 011.346 0L23 11h-3v9zm-2-1V9.158l-6-5.455-6 5.455V19h12zm-6-2l-3.359-3.359a2.25 2.25 0 113.182-3.182l.177.177.177-.177a2.25 2.25 0 113.182 3.182L12 17.001z"
                fill="#508BFF"
            />
        </Svg>
    );
}

export default HeritageIcon;
