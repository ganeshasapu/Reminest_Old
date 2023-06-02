import { Svg, Circle, Rect } from "react-native-svg";
import { SvgProps } from "react-native-svg";

export default function PreviewLoading1(props: SvgProps) {
    return (
        <Svg
            fill="none"
            viewBox="0 0 33 4"
            {...props}
        >
            <Circle cx="23" cy="2" r="2" fill="#FFAB5B" opacity="0.3"></Circle>
            <Circle cx="31" cy="2" r="2" fill="#FFAB5B" opacity="0.3"></Circle>
            <Rect width="17" height="4" fill="#FFAB5B" rx="2"></Rect>
        </Svg>
    );
}

