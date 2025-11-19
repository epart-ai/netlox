-- Email 설정 테이블 생성
CREATE TABLE IF NOT EXISTS email_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    smtp_host TEXT,
    smtp_port TEXT,
    smtp_user TEXT,
    smtp_pass TEXT,
    contact_recipient_email TEXT,
    contact_from_email TEXT,
    smtp_secure TEXT CHECK (smtp_secure IS NULL OR smtp_secure IN ('true', 'false')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- updated_at 자동 업데이트 트리거 함수
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 트리거 생성
CREATE TRIGGER update_email_settings_updated_at
    BEFORE UPDATE ON email_settings
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- 관리자만 접근 가능하도록 RLS 정책 설정 (선택사항)
-- 실제 서비스에서는 RLS를 활성화하고 적절한 정책을 설정하는 것을 권장합니다.
-- ALTER TABLE email_settings ENABLE ROW LEVEL SECURITY;
-- 
-- CREATE POLICY "Only service role can access email_settings"
--     ON email_settings
--     FOR ALL
--     USING (auth.role() = 'service_role');

COMMENT ON TABLE email_settings IS '이메일 발송 설정 (SMTP 및 수신자 설정)';
COMMENT ON COLUMN email_settings.smtp_host IS 'SMTP 서버 호스트';
COMMENT ON COLUMN email_settings.smtp_port IS 'SMTP 포트 (예: 465, 587)';
COMMENT ON COLUMN email_settings.smtp_user IS 'SMTP 인증 사용자 (이메일 주소)';
COMMENT ON COLUMN email_settings.smtp_pass IS 'SMTP 인증 비밀번호';
COMMENT ON COLUMN email_settings.contact_recipient_email IS '문의 메일 수신 이메일 (여러 개일 경우 쉼표로 구분)';
COMMENT ON COLUMN email_settings.contact_from_email IS '발신자 표시용 이메일 (선택사항)';
COMMENT ON COLUMN email_settings.smtp_secure IS 'SSL 사용 여부 (true/false, NULL이면 포트 기반 자동 결정)';

