// 타이포그래피 객체 먼저 정의

import darkColor from "./colors";

const typography = {
    subTitle: {
        pc: {
            fontFamily: "Outfit",
            fontSize: "18px",
            fontWeight: "700",
            color: darkColor.text.subTitle,
        },
        tablet: {
            fontFamily: "Outfit",
            fontSize: "16px",
            fontWeight: "700",
            color: darkColor.text.subTitle,
        },
        mobile: {
            fontFamily: "Outfit",
            fontSize: "14px",
            fontWeight: "700",
            color: darkColor.text.subTitle,
        },
    },
    title: {
        pc: {
            fontFamily: "Outfit",
            fontSize: "44px",
            fontWeight: "700",
            color: darkColor.text.title,
        },
        tablet: {
            fontFamily: "Outfit",
            fontSize: "36px",
            fontWeight: "700",
            color: darkColor.text.title,
        },
        mobile: {
            fontFamily: "Outfit",
            fontSize: "24px",
            fontWeight: "700",
            color: darkColor.text.subTitle,
        },
    },
    paragraph: {
        pc: {
            fontFamily: "Outfit",
            fontSize: "18px",
            fontWeight: "400",
            color: darkColor.text.paragraph,
        },
        tablet: {
            fontFamily: "Outfit",
            fontSize: "16px",
            fontWeight: "400",
            color: darkColor.text.paragraph,
        },
        mobile: {
            fontFamily: "Outfit",
            fontSize: "14px",
            fontWeight: "400",
            color: darkColor.text.paragraph,
        },
    },
    ptbTitle: {
        pc: {
            fontFamily: "Outfit",
            fontSize: "60px",
            fontWeight: "700",
            color: darkColor.text.title,
        },
        tablet: {
            fontFamily: "Outfit",
            fontSize: "40px",
            fontWeight: "700",
            color: darkColor.text.title,
        },
        mobile: {
            fontFamily: "Outfit",
            fontSize: "28px",
            fontWeight: "700",
            color: darkColor.text.title,
        },
    },
    ptbParagraph: {
        pc: {
            fontFamily: "Outfit",
            fontSize: "20px",
            fontWeight: "400",
            color: darkColor.text.paragraph,
        },
        tablet: {
            fontFamily: "Outfit",
            fontSize: "16px",
            fontWeight: "400",
            color: darkColor.text.paragraph,
        },
        mobile: {
            fontFamily: "Outfit",
            fontSize: "14px",
            fontWeight: "700",
            color: darkColor.text.paragraph,
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
