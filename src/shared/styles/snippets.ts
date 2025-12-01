// 공용 Tailwind 클래스 스니펫
// 디자인 시스템 수준에서 반복되는 className 문자열을 상수로 제공합니다.
// cn()과 함께 조합하여 사용하세요.

// 레이아웃
export const flexRowBetweenMd =
	"flex flex-col justify-between gap-8 md:flex-row";
export const halfWidthMd = "md:w-[48.57%]";
export const contentPadding = "pt-[50px] lg:pt-[100px]";

export const beforeBackgroundImage =
	"relative before:bg-cover before:bg-center before:content-[''] before:absolute before:top-[0] before:pointer-events-none before:inset-0 before:size-full";
export const pageBackground =
	"before:min-h-screen before:bg-[url('/images/common/bg_content.png')] before:mix-blend-overlay  before:translate-y-[-15%]";

// 타이포/여백 패턴
export const headingEyebrow = "title-16 mb-1.5 lg:title-18 lg:mb-3";
export const headingTitle = "title-36 mt-4 lg:title-44  lg:mb-8";
export const paragraphLead = "paragraph-16 lg:paragraph-18";
export const sectionTitle = "title-28 mb-4 lg:title-40 lg:mb-8";

// 폼/메시지
export const errorTextSm = "text-sm text-alert";
export const successTextSm = "text-sm text-emerald-400";
export const gridTwoCol = "grid grid-cols-2 gap-4";

// 아이콘 배지
export const iconBadgeLarge =
	"flex size-15 shrink-0 items-center justify-center rounded-md bg-blue-20/15 p-3.5";

// 페이지네이션 화살표
export const responsiveArrow = "w-1.5 md:w-2 lg:w-2.5";
export const responsiveArrowBack = "w-1.5 rotate-180 md:w-2 lg:w-2.5";

// 카드 리스트 간격(이미 사용 중인 추상화)
export const cardMaxWidth = "m-auto w-full max-w-360 lg:max-w-480";
export const cardWrapperSpace = "space-y-8 md:space-y-10";
export const cardListGrid =
	"flex flex-wrap gap-y-9 lg:gap-y-19.5 [@media(max-width:1473px)]:justify-center";
