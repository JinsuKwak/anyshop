import Link from "next/link";
import { SearchIcon } from "lucide-react";
import { Button } from "../../ui/button";
import { Command, CommandInput } from "../../ui/command";

export default function SearchBar() {
  return (
    <div className="flex items-center space-x-2">
      <Command
        className="rounded-lg border shadow-sm md:min-w-[450px] sm:min-w-[300px] border bg-[var(--color-secondary)] 
               border-[var(--color-border)] focus-within:ring-2 focus-within:ring-[var(--color-ring)] hover:ring-2 hover:ring-[var(--color-ring)] transition-all"
      >
        <CommandInput placeholder="Type a command or search..." />
      </Command>
      <Link href="#" className="mr-6 flex items-center space-x-2">
        <Button
          variant="secondary"
          size="icon"
          className="size-10 border shadow-sm p-3 hidden md:flex
             hover:ring-2 hover:ring-[var(--color-ring)]
             transition-all cursor-pointer"
        >
          <SearchIcon className="h-6 w-6" />
        </Button>
      </Link>
    </div>
  );
}
