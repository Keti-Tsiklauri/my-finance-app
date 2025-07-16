"use client";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";

type NavLink = {
  id: string;
  text: string;
  image: string;
  activeImage: string;
  path: string;
  alt: string;
};

function NavItem({
  link,
  isActive,
  onClick,
  showText,
  isDesktop,
}: {
  link: NavLink;
  isActive: boolean;
  onClick: () => void;
  showText: boolean;
  isDesktop: boolean;
}) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          onClick();
        }
      }}
      className={`cursor-pointer flex ${
        isDesktop
          ? "flex-row items-center px-8 py-4 gap-4 w-[276px] h-[56px] rounded-r-[12px]"
          : "flex-col items-center justify-center pt-2 pb-3 gap-1 mx-auto rounded-md"
      } relative ${isActive ? "bg-[#F8F4F0]" : ""} ${
        !isDesktop
          ? showText
            ? "w-[104px] h-[66px]"
            : "w-[68.6px] h-[44px]"
          : ""
      }`}
    >
      {isDesktop && isActive && (
        <div className="absolute left-0 top-0 h-full w-[4px] bg-[#277C78] rounded-r" />
      )}
      {!isDesktop && isActive && (
        <div className="absolute bottom-0 left-0 right-0 h-[4px] bg-[#277C78] rounded-t-md" />
      )}
      <Image
        src={`/${isActive ? link.activeImage : link.image}`}
        alt={link.alt}
        width={24}
        height={24}
      />
      {showText && (
        <p
          className={`h-[24px] font-sans font-bold text-[16px] leading-[150%] capitalize ${
            isActive ? "text-[#201F24]" : "text-[#B3B3B3]"
          }`}
        >
          {link.text}
        </p>
      )}
    </div>
  );
}

export default function Navigation() {
  const router = useRouter();
  const pathname = usePathname();

  const NavLinks = useMemo<NavLink[]>(
    () => [
      {
        id: "0",
        text: "overview",
        image: "images/navigation/home.svg",
        activeImage: "images/navigation/home-active.svg",
        path: "/",
        alt: "home",
      },
      {
        id: "1",
        text: "transactions",
        image: "images/navigation/transactions.svg",
        activeImage: "images/navigation/transactions-active.svg",
        path: "/transactions",
        alt: "transactions",
      },
      {
        id: "2",
        text: "budgets",
        image: "images/navigation/budgets.svg",
        activeImage: "images/navigation/budgets-active.svg",
        path: "/budgets",
        alt: "budgets",
      },
      {
        id: "3",
        text: "pots",
        image: "images/navigation/pots.svg",
        activeImage: "images/navigation/pots-active.svg",
        path: "/pots",
        alt: "pots",
      },
      {
        id: "4",
        text: "recurring bills",
        image: "images/navigation/bills.svg",
        activeImage: "images/navigation/bills-active.svg",
        path: "/recurring-bills",
        alt: "bills",
      },
    ],
    []
  );

  const handleClick = useCallback(
    (path: string) => {
      router.push(path);
    },
    [router]
  );

  return (
    <>
      {/* Mobile & Tablet Bottom Nav */}
      <nav
        aria-label="Mobile and Tablet Navigation"
        className="lg:hidden fixed bottom-0 left-0 right-0 z-50 flex justify-between items-center px-4 pt-2 bg-[#201F24] h-[52px] md:h-[74px]  "
      >
        {NavLinks.map((link) => (
          <NavItem
            key={link.id}
            link={link}
            isActive={pathname === link.path}
            onClick={() => handleClick(link.path)}
            showText={false} // hide text on mobile/tablet bottom nav
            isDesktop={false}
          />
        ))}
      </nav>

      {/* Desktop Left Sidebar */}
      <nav
        aria-label="Desktop Navigation"
        className="hidden lg:flex flex-col items-start p-0 pb-6 gap-6 w-[300px] h-[1024px] bg-[#201F24] rounded-r-[16px]"
      >
        {/* Logo */}
        <div className="flex flex-col justify-center items-start px-8 py-10 gap-2 w-full h-[101.76px]">
          <Image
            src="/images/navigation/logo.svg"
            alt="Logo"
            width={120}
            height={20}
          />
        </div>

        {NavLinks.map((link) => (
          <NavItem
            key={link.id}
            link={link}
            isActive={pathname === link.path}
            onClick={() => handleClick(link.path)}
            showText={true}
            isDesktop={true}
          />
        ))}
      </nav>
    </>
  );
}
