"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import { createClient } from "@/shared/supabase/client";

export const dynamic = "force-dynamic";

type AdminUser = {
	id: string;
	email: string | null;
	app_metadata?: {
		role?: string;
	};
	created_at: string;
};

const PER_PAGE = 20;

export default function AdminUsersPage() {
	const [users, setUsers] = useState<AdminUser[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [query, setQuery] = useState("");
	const [page, setPage] = useState(1);
	const [total, setTotal] = useState(0);

	const authHeader = useCallback(async (): Promise<Record<string, string>> => {
		const supabase = createClient();
		const {
			data: { session },
		} = await supabase.auth.getSession();
		return session?.access_token
			? { Authorization: `Bearer ${session.access_token}` }
			: {};
	}, []);

	const loadUsers = useCallback(
		async (nextPage: number, keyword: string) => {
			try {
				setLoading(true);
				setError("");
				const headers = await authHeader();
				const response = await fetch(
					`/api/admin/users?page=${nextPage}&perPage=${PER_PAGE}&query=${encodeURIComponent(keyword)}`,
					{ headers },
				);
				const result = await response.json();
				if (!response.ok) {
					throw new Error(result.error || "불러오기 실패");
				}
				setUsers(result.users ?? []);
				setTotal(result.total ?? 0);
			} catch (err) {
				const message =
					err instanceof Error
						? err.message
						: "사용자 목록을 불러오지 못했습니다.";
				setError(message);
			} finally {
				setLoading(false);
			}
		},
		[authHeader],
	);

	useEffect(() => {
		loadUsers(1, "");
	}, [loadUsers]);

	useEffect(() => {
		loadUsers(page, query);
	}, [loadUsers, page, query]);

	const handleSearch = () => {
		setPage(1);
		loadUsers(1, query);
	};

	const updateRole = async (userId: string, role: string) => {
		try {
			const headers = {
				"Content-Type": "application/json",
				...(await authHeader()),
			};
			const response = await fetch("/api/admin/users", {
				method: "POST",
				headers,
				body: JSON.stringify({ userId, role }),
			});
			const result = await response.json();
			if (!response.ok) throw new Error(result.error || "권한 변경 실패");
			loadUsers(page, query);
		} catch (err) {
			const message =
				err instanceof Error ? err.message : "권한 변경에 실패했습니다.";
			alert(message);
		}
	};

	const deleteUser = async (userId: string) => {
		if (!confirm("이 사용자를 삭제하시겠습니까?")) return;
		try {
			const headers = await authHeader();
			const response = await fetch(`/api/admin/users/${userId}`, {
				method: "DELETE",
				headers,
			});
			const result = await response.json();
			if (!response.ok) throw new Error(result.error || "삭제 실패");
			loadUsers(page, query);
		} catch (err) {
			const message =
				err instanceof Error ? err.message : "삭제에 실패했습니다.";
			alert(message);
		}
	};

	const totalPages = Math.max(1, Math.ceil(total / PER_PAGE));

	const paginationButtons = useMemo(
		() =>
			Array.from({ length: totalPages }, (_, index) => index + 1).map(
				(pageNumber) => (
					<button
						type="button"
						key={pageNumber}
						onClick={() => setPage(pageNumber)}
						className={`rounded border border-slate-700 px-3 py-1 text-slate-200 ${
							pageNumber === page ? "bg-blue-600 text-white" : ""
						}`}
					>
						{pageNumber}
					</button>
				),
			),
		[page, totalPages],
	);

	return (
		<div className="mx-auto max-w-7xl px-6 py-8">
			<div className="rounded-lg border border-slate-800 bg-slate-900 p-6 shadow">
				<h1 className="mb-6 text-2xl font-bold text-white">사용자 관리</h1>

				<div className="mb-6 flex items-center gap-3">
					<input
						value={query}
						onChange={(event) => setQuery(event.target.value)}
						placeholder="이메일 검색"
						className="w-64 rounded border border-slate-700 bg-slate-800 px-3 py-2 text-slate-100 placeholder-slate-500"
					/>
					<button
						type="button"
						onClick={handleSearch}
						className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
					>
						검색
					</button>
				</div>

				{loading ? (
					<p className="text-slate-300">불러오는 중...</p>
				) : error ? (
					<p className="text-red-400">{error}</p>
				) : (
					<div className="overflow-x-auto">
						<table className="min-w-full divide-y divide-slate-800">
							<thead className="bg-slate-800/60">
								<tr>
									<th className="px-4 py-2 text-left text-xs font-semibold uppercase text-slate-200">
										이메일
									</th>
									<th className="px-4 py-2 text-left text-xs font-semibold uppercase text-slate-200">
										역할
									</th>
									<th className="px-4 py-2 text-left text-xs font-semibold uppercase text-slate-200">
										생성일
									</th>
									<th className="px-4 py-2 text-left text-xs font-semibold uppercase text-slate-200">
										관리
									</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-slate-800">
								{users.map((user) => (
									<tr key={user.id} className="hover:bg-slate-800/40">
										<td className="px-4 py-2 text-sm text-slate-200">
											{user.email}
										</td>
										<td className="px-4 py-2 text-sm">
											<select
												value={user.app_metadata?.role ?? ""}
												onChange={(event) =>
													updateRole(user.id, event.target.value)
												}
												className="rounded border border-slate-700 bg-slate-800 px-2 py-1 text-slate-100"
											>
												<option value="">일반</option>
												<option value="admin">관리자</option>
											</select>
										</td>
										<td className="px-4 py-2 text-sm text-slate-300">
											{new Date(user.created_at).toLocaleString("ko-KR")}
										</td>
										<td className="px-4 py-2 text-sm">
											<button
												type="button"
												onClick={() => deleteUser(user.id)}
												className="text-red-400 hover:text-red-300 hover:underline"
											>
												삭제
											</button>
										</td>
									</tr>
								))}
								{users.length === 0 && (
									<tr>
										<td
											colSpan={4}
											className="px-4 py-8 text-center text-slate-400"
										>
											검색 결과가 없습니다.
										</td>
									</tr>
								)}
							</tbody>
						</table>
					</div>
				)}

				{totalPages > 1 && (
					<div className="mt-6 flex justify-center gap-2">
						<button
							type="button"
							onClick={() => setPage((prev) => Math.max(1, prev - 1))}
							disabled={page === 1}
							className="rounded border border-slate-700 px-3 py-1 text-slate-200 disabled:opacity-50"
						>
							이전
						</button>
						{paginationButtons}
						<button
							type="button"
							onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
							disabled={page === totalPages}
							className="rounded border border-slate-700 px-3 py-1 text-slate-200 disabled:opacity-50"
						>
							다음
						</button>
					</div>
				)}
			</div>
		</div>
	);
}
