// 타이포그래피 객체 먼저 정의
import darkColor from "./colors";

const typography = {
	title: {
		"80": {
			fontFamily: "Outfit Variable",
			fontSize: "80px",
			fontWeight: "700",
		},
		"60": {
			fontFamily: "Outfit Variable",
			fontSize: "60px",
			fontWeight: "700",
		},
		"44": {
			fontFamily: "Outfit Variable",
			fontSize: "44px",
			fontWeight: "700",
		},
		"40": {
			fontFamily: "Outfit Variable",
			fontSize: "40px",
			fontWeight: "700",
		},
		"36": {
			fontFamily: "Outfit Variable",
			fontSize: "36px",
			fontWeight: "700",
		},
		"32": {
			fontFamily: "Outfit Variable",
			fontSize: "36px",
			fontWeight: "700",
		},
		"28": {
			fontFamily: "Outfit Variable",
			fontSize: "28px",
			fontWeight: "700",
		},
		"24": {
			fontFamily: "Outfit Variable",
			fontSize: "24px",
			fontWeight: "700",
		},
		"20": {
			fontFamily: "Outfit Variable",
			fontSize: "20px",
			fontWeight: "700",
		},
		"18": {
			fontFamily: "Outfit Variable",
			fontSize: "18px",
			fontWeight: "700",
		},
		"16": {
			fontFamily: "Outfit Variable",
			fontSize: "16px",
			fontWeight: "700",
		},
		"14": {
			fontFamily: "Outfit Variable",
			fontSize: "14px",
			fontWeight: "700",
		},
		"12": {
			fontFamily: "Outfit Variable",
			fontSize: "12px",
			fontWeight: "700",
		},
	},
	paragraph: {
		"24": {
			fontFamily: "Outfit Variable",
			fontSize: "24px",
			fontWeight: "400",
			color: `${darkColor.white}bf`,
		},
		"20": {
			fontFamily: "Outfit Variable",
			fontSize: "20px",
			fontWeight: "400",
			color: `${darkColor.white}bf`,
		},
		"18": {
			fontFamily: "Outfit Variable",
			fontSize: "18px",
			fontWeight: "400",
			color: `${darkColor.white}bf`,
		},
		"16": {
			fontFamily: "Outfit Variable",
			fontSize: "16px",
			fontWeight: "400",
			color: `${darkColor.white}bf`,
		},
		"14": {
			fontFamily: "Outfit Variable",
			fontSize: "14px",
			fontWeight: "400",
			color: `${darkColor.white}bf`,
		},
		"12": {
			fontFamily: "Outfit Variable",
			fontSize: "12px",
			fontWeight: "400",
			color: `${darkColor.white}bf`,
		},
	},
} as const;

// 타이포그래피 타입 정의 추가
export type TypographyClassName = keyof typeof typography;

// 타이포그래피 클래스 사용을 위한 유틸리티 함수
export const typographyClass = (className: TypographyClassName): string => {
	return className;
};

export default typography;
