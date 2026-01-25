import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4 text-white p-8">
      <h1 className="text-2xl font-bold">Nie znaleziono strony</h1>
      <p className="text-center text-gray-400 max-w-md">
        Przepraszamy, strona której szukasz nie istnieje.
      </p>
      <Link
        href="/"
        className="px-6 py-2 bg-accent hover:opacity-80 transition-opacity rounded-lg font-semibold"
      >
        Wróć na stronę główną
      </Link>
    </div>
  );
}
