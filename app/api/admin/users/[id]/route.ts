import { type NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

import { ensureAdminFromBearer } from '../../_lib/auth'

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
	const auth = await ensureAdminFromBearer(request)
	if (!auth.ok) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
	const { id } = params
	const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
	const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY
	if (!SUPABASE_URL || !SERVICE_ROLE_KEY) return NextResponse.json({ error: 'Server not configured' }, { status: 500 })
	const admin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY)
	try {
		const { error } = await admin.auth.admin.deleteUser(id)
		if (error) return NextResponse.json({ error: error.message }, { status: 400 })
		return NextResponse.json({ ok: true })
	} catch (err) {
		const message = err instanceof Error ? err.message : 'Unknown error'
		return NextResponse.json({ error: message }, { status: 500 })
	}
}


