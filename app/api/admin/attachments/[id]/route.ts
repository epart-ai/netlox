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
		// read attachment row first
		const { data: row, error: readErr } = await admin.from('attachments').select('*').eq('id', id).single()
		if (readErr) return NextResponse.json({ error: readErr.message }, { status: 400 })
		// best-effort delete file from storage using public URL path
		const publicUrl: string = row.file_url || ''
		const prefix = `${SUPABASE_URL}/storage/v1/object/public/attachments/`
		if (publicUrl.startsWith(prefix)) {
			const path = publicUrl.slice(prefix.length)
			await admin.storage.from('attachments').remove([path])
		}
		const { error } = await admin.from('attachments').delete().eq('id', id)
		if (error) return NextResponse.json({ error: error.message }, { status: 400 })
		return NextResponse.json({ ok: true })
	} catch (err) {
		const message = err instanceof Error ? err.message : 'Unknown error'
		return NextResponse.json({ error: message }, { status: 500 })
	}
}


