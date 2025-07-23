import Image from "next/image";

export default function SearchTransaction() {
  return (
    <div className="relative w-[215px] md:w-[160px] xxl:w-[320px] h-[45px]">
      <input
        type="search"
        placeholder="Search Transaction"
        className="w-full h-full pl-[16px] pr-[40px] font-['Public_Sans'] not-italic font-normal text-[14px] leading-[150%] text-[#98908B] bg-white border border-[#98908B] rounded-[8px] outline-none"
      />
      <Image
        src="/images/transactions/search.svg"
        alt="search"
        width={16}
        height={16}
        className="absolute right-[16px] top-1/2 transform -translate-y-1/2 pointer-events-none"
      />
    </div>
  );
}
