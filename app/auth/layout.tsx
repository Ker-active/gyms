import Image from "next/image";
import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main className="h-dvh overflow-y-auto px-4 w-full flex py-10 flex-col items-center bg-off-white">
      <header>
        <Image alt="Ker Active Logo" width={73} height={73} src="/logo.svg" />
      </header>
      <section className="bg-white rounded-[8px] sm:px-[52px] flex flex-col gap-[30px] px-4 w-full shadow-auth py-[43px] max-w-[661px] mx-auto">{children}</section>
    </main>
  );
}
