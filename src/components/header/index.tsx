import { Dog } from "lucide-react";
import Link from "next/link";

export function Header() {
  return (
    <header className="fixed top-0 z-10 w-full bg-background/95 backdrop-blur-sm supports-backdrop-filter:bg-background/60">
      <Link
        href="/"
        className="flex items-center gap-4 bg-[#2e2c30] w-fit p-3 rounded-b-lg"
      >
        <div className="size-8 bg-background-brand rounded flex items-center justify-center">
          <Dog />
        </div>
        <span className="text-label-large-size font-bold text-content-brand">
          MUNDO PET
        </span>
      </Link>
    </header>
  );
}
