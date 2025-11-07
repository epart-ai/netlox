// 타이포그래피 객체 먼저 정의
import darkColor from "./colors";

const typography = {
	subTitle: {
		"18": {
			fontFamily: "Outfit Variable",
			fontSize: "18px",
			fontWeight: "700",
			color: darkColor.blue["60"],
		},
		"16": {
			fontFamily: "Outfit Variable",
			fontSize: "16px",
			fontWeight: "700",
			color: darkColor.blue["60"],
		},
		"14": {
			fontFamily: "Outfit Variable",
			fontSize: "14px",
			fontWeight: "700",
			color: darkColor.blue["60"],
		},
	},
	title: {
		"80": {
			fontFamily: "Outfit Variable",
			fontSize: "80px",
			fontWeight: "700",
			color: darkColor.white,
		},
		"60": {
			fontFamily: "Outfit Variable",
			fontSize: "60px",
			fontWeight: "700",
			color: darkColor.white,
		},
		"44": {
			fontFamily: "Outfit Variable",
			fontSize: "44px",
			fontWeight: "700",
			color: darkColor.white,
		},
		"40": {
			fontFamily: "Outfit Variable",
			fontSize: "40px",
			fontWeight: "700",
			color: darkColor.white,
		},
		"36": {
			fontFamily: "Outfit Variable",
			fontSize: "36px",
			fontWeight: "700",
			color: darkColor.white,
		},
		"28": {
			fontFamily: "Outfit Variable",
			fontSize: "28px",
			fontWeight: "700",
			color: darkColor.white,
		},
		"24": {
			fontFamily: "Outfit Variable",
			fontSize: "24px",
			fontWeight: "700",
			color: darkColor.white,
		},
		"18": {
			fontFamily: "Outfit Variable",
			fontSize: "18px",
			fontWeight: "700",
			color: darkColor.white,
		},
		"16": {
			fontFamily: "Outfit Variable",
			fontSize: "16px",
			fontWeight: "700",
			color: darkColor.white,
		},
		"14": {
			fontFamily: "Outfit Variable",
			fontSize: "14px",
			fontWeight: "700",
			color: darkColor.white,
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
	},
} as const;

// 타이포그래피 타입 정의 추가
export type TypographyClassName = keyof typeof typography;

// 타이포그래피 클래스 사용을 위한 유틸리티 함수
export const typographyClass = (className: TypographyClassName): string => {
	return className;
};

export default typography;
