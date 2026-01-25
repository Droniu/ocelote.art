"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4 text-white p-8">
      <h1 className="text-2xl font-bold">Coś poszło nie tak</h1>
      <p className="text-center text-gray-400 max-w-md">
        Przepraszamy, wystąpił błąd podczas ładowania strony.
      </p>
      <button
        onClick={reset}
        className="px-6 py-2 bg-accent hover:opacity-80 transition-opacity rounded-lg font-semibold"
      >
        Spróbuj ponownie
      </button>
    </div>
  );
}
