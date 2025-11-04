"use client";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  return (
    <div className="p-8 sm:p-20">
      <p className="text-red-600 font-medium">문제가 발생했습니다.</p>
      <pre className="mt-2 text-xs text-muted-foreground whitespace-pre-wrap">
        {error.message}
      </pre>
    </div>
  );
}
