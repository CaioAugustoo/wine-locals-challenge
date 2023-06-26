"use client";

import { Icons, Logo } from "@/src/components";
import { usePathname, useRouter } from "next/navigation";

export const Header = () => {
  const pathname = usePathname();
  const { back } = useRouter();

  const isInHomePage = pathname === "/";

  return (
    <header className="pt-4">
      <div className="flex items-center gap-2">
        {!isInHomePage && (
          <nav>
            <button onClick={back}>
              <Icons.arrowLeft />
            </button>
          </nav>
        )}
        <Logo />
      </div>
    </header>
  );
};
