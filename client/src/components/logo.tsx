import Image from "next/image";
import Link from "next/link";

export const Logo = () => {
  return (
    <Link href="/" className="mx-auto">
      <Image
        src="/logo.svg"
        width="100"
        height="100"
        alt='Logo da empresa "Share Eat". Escrito na cor branca o texto "Share Eat"'
      />
    </Link>
  );
};
