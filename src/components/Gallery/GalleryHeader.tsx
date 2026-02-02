import Link from "next/link";

interface GalleryHeaderProps {
  title: string;
  photoCount: number;
  description: string | null;
}

export function GalleryHeader({
  title,
  photoCount,
  description,
}: GalleryHeaderProps) {
  return (
    <header className="px-4 py-8 md:px-8 lg:px-16">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors mb-4"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        Powrót do portfolio
      </Link>
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2">
        {title}
      </h1>
      <p className="text-gray-400">
        {photoCount} {photoCount === 1 ? "zdjęcie" : photoCount < 5 ? "zdjęcia" : "zdjęć"}
      </p>
      {description && (
        <p className="mt-4 text-gray-300 max-w-2xl">{description}</p>
      )}
    </header>
  );
}
