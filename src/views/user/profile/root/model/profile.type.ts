export type UserProfile = {
	id: string;
	fullname: string | null;
	companyname: string | null;
	etc1: string | null;
	etc2: string | null;
	etc3: string | null;
	etc4: string | null;
	etc5: string | null;
	created_at?: string | null;
};

export type ProfileInput = Partial<Omit<UserProfile, "id" | "created_at">>;
