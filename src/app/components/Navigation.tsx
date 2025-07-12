"use client";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useCallback } from "react";

export default function Navigation() {
  const router = useRouter();
  const pathname = usePathname();

  const NavLinks = [
    {
      id: "0",
      text: "overview",
      image: "images/home.svg",
      activeImage: "images/home-active.svg",
      path: "/",
      alt: "home",
    },
    {
      id: "1",
      text: "transactions",
      image: "images/transactions.svg",
      activeImage: "images/transactions-active.svg",
      path: "/transactions",
      alt: "transactions",
    },
    {
      id: "2",
      text: "budgets",
      image: "images/budgets.svg",
      activeImage: "images/budgets-active.svg",
      path: "/budgets",
      alt: "budgets",
    },
    {
      id: "3",
      text: "pots",
      image: "images/pots.svg",
      activeImage: "images/pots-active.svg",
      path: "/pots",
      alt: "pots",
    },
    {
      id: "4",
      text: "recurring bills",
      image: "images/bills.svg",
      activeImage: "images/bills-active.svg",
      path: "/bills",
      alt: "bills",
    },
  ];

  const handleClick = useCallback(
    (path: string) => {
      router.push(path);
    },
    [router]
  );

  return (
    <div className="w-[300px] bg-[#201F24] flex flex-col items-start pb-6 gap-6 h-[1024px] rounded-r-[16px] order-0 self-stretch flex-grow-0">
      {/* Logo */}
      <div className="flex flex-col justify-center items-start px-8 py-10 gap-2 w-full h-[101.76px]">
        <Image src="/images/logo.svg" alt="Logo" width={120} height={20} />
      </div>

      {/* Navigation Links */}
      {NavLinks.map((elem) => {
        const isActive = pathname === elem.path;

        return (
          <div
            key={elem.id}
            onClick={() => handleClick(elem.path)}
            className={`cursor-pointer flex flex-row items-center px-8 py-4 gap-4 w-[276px] h-[56px] rounded-r-[12px] self-stretch flex-grow-0 relative ${
              isActive ? "bg-[#F8F4F0]" : ""
            }`}
          >
            {isActive && (
              <div className="absolute left-0 top-0 h-full w-[6px] bg-[#277C78] rounded-r" />
            )}
            <Image
              src={`/${isActive ? elem.activeImage : elem.image}`}
              alt={elem.alt}
              width={24}
              height={24}
            />
            <p
              className={`h-[24px] font-sans font-bold text-[16px] leading-[150%] capitalize ${
                isActive ? "text-[#201F24]" : "text-[#B3B3B3]"
              }`}
            >
              {elem.text}
            </p>
          </div>
        );
      })}
    </div>
  );
}
