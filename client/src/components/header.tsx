"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Icons } from "./icons";

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

        <Image
          className="mx-auto"
          src="/logo.svg"
          width="100"
          height="100"
          alt='Logo da empresa "Share Eat". Escrito na cor branca o texto "Share Eat"'
        />
      </div>
    </div>
  );
};
