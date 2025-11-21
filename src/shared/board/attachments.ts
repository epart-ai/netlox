import type { Attachment } from "@/shared/board/types/board";
import { createClient } from "@/shared/supabase/client";

export const attachmentsService = {
	async listByPost(postId: string): Promise<Attachment[]> {
		const supabase = createClient();
		const { data, error } = await supabase
			.from("attachments")
			.select("*")
			.eq("post_id", postId)
			.order("created_at", { ascending: true });
		if (error) throw new Error(error.message);
		return data || [];
	},
};
