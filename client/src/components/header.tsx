"use client";

import { Icons, Logo } from "@/src/components";
import { usePathname, useRouter } from "next/navigation";

export const Header = () => {
  const pathname = usePathname();
  const { back } = useRouter();

  const isInHomePage = pathname === "/";

  return (
    <div className="container mx-auto pt-4">
      <div className="flex items-center gap-2">
        {!isInHomePage && (
          <button onClick={back}>
            <Icons.arrowLeft />
          </button>
        )}

        <Logo />
      </div>
    </div>
  );
};
