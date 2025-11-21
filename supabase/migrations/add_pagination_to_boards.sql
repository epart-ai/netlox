-- boards 테이블에 페이징 관련 컬럼 추가
ALTER TABLE boards
ADD COLUMN IF NOT EXISTS use_pagination BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS posts_per_page INTEGER DEFAULT 10;

-- 기존 데이터에 기본값 설정 (이미 NULL이 아닌 경우는 그대로 유지)
UPDATE boards
SET 
    use_pagination = COALESCE(use_pagination, false),
    posts_per_page = COALESCE(posts_per_page, 10)
WHERE use_pagination IS NULL OR posts_per_page IS NULL;

-- 컬럼에 NOT NULL 제약 조건 추가 (기본값이 있으므로 안전)
ALTER TABLE boards
ALTER COLUMN use_pagination SET NOT NULL,
ALTER COLUMN posts_per_page SET NOT NULL;

-- 컬럼 설명 추가
COMMENT ON COLUMN boards.use_pagination IS '페이징 사용 여부';
COMMENT ON COLUMN boards.posts_per_page IS '한 페이지당 표시할 게시물 수';

