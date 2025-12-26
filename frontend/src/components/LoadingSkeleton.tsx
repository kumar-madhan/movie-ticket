'use client';

export default function LoadingSkeleton() {
  return (
    <div className="animate-pulse space-y-3">
      <div className="h-48 bg-zinc-800 rounded"></div>
      <div className="h-4 bg-zinc-800 rounded w-3/4"></div>
      <div className="h-4 bg-zinc-800 rounded w-1/2"></div>
    </div>
  );
}
