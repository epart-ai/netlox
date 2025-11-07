import type { Config } from "tailwindcss";
import type {
	CSSRuleObject,
	PluginAPI,
	RecursiveKeyValuePair,
	ResolvableTo,
} from "tailwindcss/types/config";

import colors from "./src/app/theme/colors";
import typography from "./src/app/theme/typography";

// 음수 값을 생성하는 유틸리티 함수
function generateNegativeScale(
	theme: (key: string) => Record<string, string>,
	themeKey: string,
) {
	return Object.entries(theme(themeKey)).reduce(
		(acc, [key, value]) => ({
			...acc,
			[`-${key}`]: `-${value}`,
		}),
		{} as Record<string, string>,
	);
}

// 소수점 간격을 포함한 spacing 스케일 자동 생성
function generateSpacingScale(
	options: {
		baseUnit?: number;
		maxValue?: number;
		decimalPoints?: number[];
		pixelBase?: number;
		includePixelComments?: boolean;
		outputUnit?: "rem" | "px";
	} = {},
) {
	const {
		baseUnit = 0.25,
		maxValue = 20,
		decimalPoints = [0.5],
		pixelBase = 16,
		includePixelComments = true,
		outputUnit = "rem",
	} = options;

	const spacingScale: Record<string | number, string> = {};

	const createSpacingValue = (value: number) => {
		const pxValue = Math.round(value * baseUnit * pixelBase);
		if (outputUnit === "px") {
			return `${pxValue}px`;
		}
		const remValue = `${value * baseUnit}rem`;
		return includePixelComments ? `${remValue} /* ${pxValue}px */` : remValue;
	};

	for (let i = 0; i <= maxValue; i++) {
		spacingScale[i] = createSpacingValue(i);
		if (i < maxValue) {
			decimalPoints.forEach((decimal) => {
				spacingScale[i + decimal] = createSpacingValue(i + decimal);
			});
		}
	}

	return spacingScale;
}

// 객체 순회 유틸
function processObject(
	obj: unknown,
	handlers: {
		onObject?: (path: string, key: string, value: unknown) => boolean | void;
		onLeaf?: (path: string, key: string, value: unknown) => void;
	},
	currentPath = "",
) {
	if (!obj || typeof obj !== "object") return;

	if (handlers.onObject) {
		const stopProcessing = handlers.onObject(currentPath, "", obj);
		if (stopProcessing) return;
	}

	Object.entries(obj as Record<string, unknown>).forEach(([key, value]) => {
		const newPath = currentPath ? `${currentPath}-${key}` : key;

		if (value && typeof value === "object") {
			const stopProcessing =
				handlers.onObject && handlers.onObject(currentPath, key, value);
			if (!stopProcessing) {
				processObject(value, handlers, newPath);
			}
		} else if (handlers.onLeaf) {
			handlers.onLeaf(currentPath, key, value);
		}
	});
}

// HEX -> "r g b" (space-separated) 변환 유틸
function hexToRgbTriplet(hex: string): string | null {
	const normalized = hex.trim().replace(/^#/, "");
	const isShort = normalized.length === 3;
	const isLong = normalized.length === 6;
	if (!isShort && !isLong) return null;
	const expand = (c: string) => (isShort ? c + c : c);
	const r = parseInt(expand(normalized.substring(0, isShort ? 1 : 2)), 16);
	const g = parseInt(
		expand(normalized.substring(isShort ? 1 : 2, isShort ? 2 : 4)),
		16,
	);
	const b = parseInt(
		expand(normalized.substring(isShort ? 2 : 4, isShort ? 3 : 6)),
		16,
	);
	if (Number.isNaN(r) || Number.isNaN(g) || Number.isNaN(b)) return null;
	return `${r} ${g} ${b}`;
}

// opacityValue(0~100)을 지원하는 컬러 빌더
function withOpacity(variableRgbName: string) {
	return ({ opacityValue }: { opacityValue?: string }) => {
		if (opacityValue === undefined) {
			return `rgb(var(${variableRgbName}))`;
		}
		return `rgb(var(${variableRgbName}) / ${opacityValue})`;
	};
}

function buildThemeColors(): ResolvableTo<
	RecursiveKeyValuePair<string, string>
> {
	const mappedColors: Record<string, unknown> = {};

	processObject(colors as Record<string, unknown>, {
		onLeaf: (path, key, value) => {
			if (typeof value === "string") {
				let target = mappedColors as Record<string, unknown>;
				if (path) {
					const pathParts = path.split("-");
					for (const part of pathParts) {
						const next = (target[part] as Record<string, unknown>) || {};
						target[part] = next as Record<string, unknown>;
						target = next;
					}
				}
				const varPath = path ? `${path}-${key}` : key;
				target[key] = withOpacity(`--color-${varPath}-rgb`);
			}
		},
	});

	return mappedColors as ResolvableTo<RecursiveKeyValuePair<string, string>>;
}

// 타이포그래피 플러그인
function typographyPlugin(api: PluginAPI) {
	const { addComponents } = api;
	const typographyComponents: CSSRuleObject = {};

	processObject(typography as Record<string, unknown>, {
		onObject: (path, key, value) => {
			const v = value as {
				fontFamily?: string;
				fontSize?: string;
				fontWeight?: string;
				color?: string;
			};
			if (v.fontFamily && v.fontSize) {
				const className = path ? `${path}-${key}` : key;
				typographyComponents[`.${className}`] = {
					fontFamily: v.fontFamily,
					fontSize: v.fontSize,
					fontWeight: v.fontWeight,
					color: v.color,
				} as unknown as CSSRuleObject;
				return true;
			}
			return false;
		},
	});

	addComponents(typographyComponents, {
		respectPrefix: false,
		respectImportant: true,
	});
}

// 색상 CSS 변수 플러그인
function colorVariablesPlugin(api: PluginAPI) {
	const { addBase } = api;
	const colorVars: Record<string, string> = {};

	processObject(colors as Record<string, unknown>, {
		onLeaf: (path, key, value) => {
			if (typeof value === "string") {
				const varName = path ? `--color-${path}-${key}` : `--color-${key}`;
				colorVars[varName] = value;
				// RGB 삼원값 변수도 함께 주입 (opacity 슬래시 문법 지원)
				const rgbTriplet = hexToRgbTriplet(value);
				if (rgbTriplet) {
					colorVars[`${varName}-rgb`] = rgbTriplet;
				}
			}
		},
	});

	addBase({ ":root": colorVars } as CSSRuleObject);
}

// 위치 유틸리티 플러그인
function positionUtilitiesPlugin(api: PluginAPI) {
	const { addUtilities } = api;
	const transformClasses = {
		center: { top: "50%", left: "50%", transform: "translate(-50%, -50%)" },
		"center-top": { left: "50%", top: "0", transform: "translateX(-50%)" },
		"center-bottom": {
			left: "50%",
			bottom: "0",
			transform: "translateX(-50%)",
		},
		"center-left": { top: "50%", left: "0", transform: "translateY(-50%)" },
		"center-right": {
			top: "50%",
			right: "0",
			transform: "translateY(-50%)",
		},
		"top-center": { top: "50%", transform: "translateY(-50%)" },
		"top-right": { top: "0%", right: "0" },
		"top-left": { top: "0%", left: "0" },
		bottom: { bottom: "0%" },
		"bottom-center": { bottom: "50%", transform: "translateY(50%)" },
		"bottom-right": { bottom: "0%", right: "0" },
		"bottom-left": { bottom: "0%", left: "0" },
		right: { right: "0%" },
		"right-center": { right: "50%", transform: "translateX(-50%)" },
		left: { left: "0%" },
		"left-center": { left: "50%", transform: "translateX(-50%)" },
	} as const;

	const positionTypes = ["absolute", "fixed"] as const;
	const utilities: CSSRuleObject = {};

	positionTypes.forEach((posType) => {
		Object.entries(transformClasses).forEach(([name, props]) => {
			utilities[`.${posType}-${name}`] = { position: posType, ...props };
		});
	});

	addUtilities(utilities);
}

// 3D 회전 변환 플러그인
function rotate3dPlugin(api: PluginAPI) {
	const { matchUtilities } = api;
	const angles = Array.from({ length: 36 }, (_, i) => i * 10).reduce<
		Record<string, string>
	>((acc, angle) => {
		acc[angle] = `${angle}deg`;
		return acc;
	}, {});

	matchUtilities(
		{
			"rotate-x": (value: string) =>
				({ transform: `rotateX(${value})` }) as CSSRuleObject,
		},
		{ values: angles },
	);
	matchUtilities(
		{
			"rotate-y": (value: string) =>
				({ transform: `rotateY(${value})` }) as CSSRuleObject,
		},
		{ values: angles },
	);
	matchUtilities(
		{
			"rotate-z": (value: string) =>
				({ transform: `rotateZ(${value})` }) as CSSRuleObject,
		},
		{ values: angles },
	);
}

// 래퍼 컴포넌트 플러그인 (.wrapper)
function wrapperComponentPlugin(api: PluginAPI) {
	const { addComponents } = api;
	addComponents({
		".wrapper": {
			width: "100%",
			marginLeft: "auto",
			marginRight: "auto",
			paddingLeft: "5vw",
			paddingRight: "5vw",
			"@media (min-width: 1400px)": {
				maxWidth: "72.916vw",
				paddingLeft: "0",
				paddingRight: "0",
			},
		},
	});
}

// 배경 블러 클래스(.bg-blur) 플러그인 추가
function bgBlurPlugin(api: PluginAPI) {
	const { addComponents } = api;
	addComponents({
		".bg-blur": {
			background: "#02061780",
			backdropFilter: "blur(10px) brightness(100%)",
			WebkitBackdropFilter: "blur(10px) brightness(100%)",
		},
	});
}

const config = {
	content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./src/**/*.{js,jsx,ts,tsx}"],
	darkMode: "class",
	theme: {
		extend: {
			spacing: generateSpacingScale({
				baseUnit: 0.25,
				maxValue: 24,
				decimalPoints: [0.5],
				pixelBase: 16,
				includePixelComments: false,
				outputUnit: "px",
			}),
			margin: ({
				theme,
			}: {
				theme: (path: string) => Record<string, string>;
			}) => generateNegativeScale(theme, "spacing"),
			inset: ({ theme }: { theme: (path: string) => Record<string, string> }) =>
				generateNegativeScale(theme, "spacing"),
			// wrapper는 플러그인에서 .wrapper 클래스로 제공
			maxWidth: { 440: "440px" },
			colors: buildThemeColors(),
			borderRadius: { md: "0.25rem" },
			boxShadow: {
				"1": "4px 4px 4px #00000040",
				"2": "8px 8px 8px #00000040",
				"3": "12px 12px 12px #00000040",
				"4": "16px 16px 16px #00000040",
				"5": "20px 20px 20px #00000040",
				"x-1": "4px 0 4px #00000040",
				"x-2": "8px 0 8px #00000040",
				"x-3": "12px 0 12px #00000040",
				"x-4": "16px 0 16px #00000040",
				"x-5": "20px 0 20px #00000040",
				"y-1": "0 4px 4px #00000040",
				"y-2": "0 8px 8px #00000040",
				"y-3": "0 12px 12px #00000040",
				"y-4": "0 16px 16px #00000040",
				"y-5": "0 2px #00000040",
			},
			keyframes: {
				"accordion-down": {
					from: { height: "0" },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: "0" },
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
			},
			screens: {
				sm: { min: "360px" },
				md: { min: "768px" },
				lg: { min: "1024px" },
				xl: { min: "1280px" },
			},
			rotate: {
				"x-180": "rotateX(180deg)",
				"x-90": "rotateX(90deg)",
				"x-45": "rotateX(45deg)",
				"y-180": "rotateY(180deg)",
				"y-90": "rotateY(90deg)",
				"y-45": "rotateY(45deg)",
			},
		},
	},
	plugins: [
		typographyPlugin,
		colorVariablesPlugin,
		positionUtilitiesPlugin,
		rotate3dPlugin,
		wrapperComponentPlugin,
		bgBlurPlugin,
	],
} satisfies Config;

export default config;
