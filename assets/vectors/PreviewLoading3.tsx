import { Svg, Circle, Rect } from "react-native-svg";
import { SvgProps } from "react-native-svg";

export default function PreviewLoading3(props: SvgProps) {
    return (
        <Svg
            fill="none"
            viewBox="0 0 33 4"
            {...props}
        >
            <Circle cx="2" cy="2" r="2" fill="#FFAB5B" opacity="0.3"></Circle>
            <Circle cx="10" cy="2" r="2" fill="#FFAB5B" opacity="0.3"></Circle>
            <Rect width="17" height="4" x="16" fill="#FFAB5B" rx="2"></Rect>
        </Svg>
    );
}
