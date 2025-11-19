"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import type { User } from "@supabase/supabase-js";

import { isAdminUser } from "@/shared/admin/admin";
import { createClient } from "@/shared/supabase/client";
import AdminFooter from "@/widgets/admin/AdminFooter";
import AdminHeader from "@/widgets/admin/AdminHeader";

export default function AdminLayoutClient({
	children,
	user: serverUser,
	isAdmin: serverIsAdmin,
}: {
	children: React.ReactNode;
	user: User | null;
	isAdmin: boolean;
}) {
	const pathname = usePathname();
	const router = useRouter();
	const isLoginPage = pathname === "/admin/login";
	const [checked, setChecked] = useState(false);

	useEffect(() => {
		// 로그인 페이지에서는 권한 체크하지 않음
		if (isLoginPage) {
			setChecked(true);
			return;
		}

		// 클라이언트에서 user 정보를 다시 확인 (서버에서 전달된 정보가 오래되었을 수 있음)
		const checkAuth = async () => {
			const supabase = createClient();
			const {
				data: { user: clientUser },
			} = await supabase.auth.getUser();

			// 클라이언트에서 확인한 user가 있으면 그것을 사용
			const currentUser = clientUser || serverUser;
			const currentIsAdmin = currentUser
				? isAdminUser(currentUser)
				: serverIsAdmin;

			if (!currentUser || !currentIsAdmin) {
				router.replace("/admin/login");
				return;
			}

			setChecked(true);
		};

		checkAuth();
	}, [isLoginPage, serverUser, serverIsAdmin, router]);

	// 권한 체크가 완료될 때까지 렌더링하지 않음 (로그인 페이지는 제외)
	if (!isLoginPage && !checked) {
		return (
			<div className="flex min-h-screen items-center justify-center bg-slate-950">
				<p className="text-slate-300">권한을 확인하는 중...</p>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-slate-950">
			{!isLoginPage && <AdminHeader />}
			<main>{children}</main>
			{!isLoginPage && <AdminFooter />}
		</div>
	);
}
