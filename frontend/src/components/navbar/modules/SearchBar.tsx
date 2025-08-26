import Link from "next/link";
import { SearchIcon } from "lucide-react";
import { Button } from "../../ui/button";
import { Command, CommandInput } from "../../ui/command";

export default function SearchBar() {
  return (
    <div className="flex items-center space-x-2">
      <Command
        className="rounded-lg border shadow-sm md:min-w-[450px] sm:min-w-[300px] border 
               hover:border-hidden focus-within:border-hidden focus-within:ring-2 focus-within:ring-primary/50 hover:ring-2 hover:ring-primary/50  hover:bg-background/40 transition-all backdrop-blur supports-[backdrop-filter]:bg-background/10 caret-primary"
      >
        <CommandInput placeholder="Find anything..." />
      </Command>
      <Link href="#" className="mr-6 flex items-center space-x-2">
        <Button
          variant="secondary"
          size="icon"
          className="size-10 border hover:border-hidden shadow-sm p-3 hidden md:flex
             hover:ring-2 hover:bg-transparent/60
             transition-all cursor-pointer backdrop-blur supports-[backdrop-filter]:bg-background/10  hover:text-primary hover:ring-primary/50"
        >
          <SearchIcon className="h-6 w-6" />
        </Button>
      </Link>
    </div>
  );
}
