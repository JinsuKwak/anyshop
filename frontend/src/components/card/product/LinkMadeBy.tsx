import Link from "next/link";

interface LinkMadeByProps {
  made_by?: string;
  by?: boolean;
}

function LinkMadeBy({ made_by, by = false }: LinkMadeByProps) {
  if (!made_by) return null;

  return (
    <Link
      href={`/search?q=${encodeURIComponent(made_by)}`}
      className="hover:underline truncate w-full"
      onClick={(e) => e.stopPropagation()}
    >
      {by ? `by ${made_by}` : made_by}
    </Link>
  );
}

export default LinkMadeBy;
