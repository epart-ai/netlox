function parseFlexibleDate(dateString: string): Date | null {
	const trimmed = dateString.trim();

	const direct = new Date(trimmed);
	if (!Number.isNaN(direct.getTime())) {
		return direct;
	}

	const korMatch = trimmed.match(
		/(\d{4})\s*년\s*(\d{1,2})\s*월\s*(\d{1,2})\s*일?/
	);
	if (korMatch) {
		const [, year, month, day] = korMatch;
		return new Date(Number(year), Number(month) - 1, Number(day));
	}

	const sepMatch = trimmed.match(
		/(\d{4})[.\-\/](\d{1,2})[.\-\/](\d{1,2})/
	);
	if (sepMatch) {
		const [, year, month, day] = sepMatch;
		return new Date(Number(year), Number(month) - 1, Number(day));
	}

	return null;
}

export function formatDate(date: string) {
	const parsed = parseFlexibleDate(date);

	if (!parsed) {
		return date;
	}

	return new Intl.DateTimeFormat("en-US", {
		year: "numeric",
		month: "long",
		day: "2-digit",
	}).format(parsed);
}
