// Cache keys and tags for domain-level caching
export const CACHE_TAG = {
  USER: "user",
  AUTH: "auth",
  MARKETING: "marketing",
} as const;

export const CACHE_KEY = {
  userById: (id: string) => ["user", id] as const,
} as const;
