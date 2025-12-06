/**
 * 비밀번호 유효성 검사 유틸리티
 */

/**
 * 비밀번호가 최소 길이 요구사항을 만족하는지 확인
 */
const MIN_PASSWORD_LENGTH = 8;

/**
 * 비밀번호에 숫자가 포함되어 있는지 확인하는 정규식
 */
const HAS_NUMBER_REGEX = /\d/;

/**
 * 비밀번호 유효성 검사
 * - 최소 8자 이상
 * - 숫자 포함
 *
 * @param password - 검사할 비밀번호
 * @returns 비밀번호가 유효한 경우 true, 그렇지 않으면 false
 */
export function isValidPassword(password: string | null | undefined): boolean {
	if (typeof password !== "string") {
		return false;
	}

	return password.length >= MIN_PASSWORD_LENGTH && HAS_NUMBER_REGEX.test(password);
}

