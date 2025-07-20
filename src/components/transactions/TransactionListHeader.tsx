"use client";

export default function TransactionListHeader() {
  const transactionDetails = [
    {
      label: "Recipient / Sender",
      className:
        "w-[272px] h-[18px] text-[12px] leading-[18px] text-[#696868] font-normal flex-none order-0 flex-grow xxl:w-[428px] xxl:h-[40px]",
    },
    {
      label: "Category",
      className:
        "w-[80px] h-[18px] text-[12px] leading-[18px] text-[#696868] font-normal flex-none order-1 flex-grow-0 xxl:w-[120px]",
    },
    {
      label: "Transaction Date",
      className:
        "w-[88px] h-[18px] text-[12px] leading-[18px] text-[#696868] font-normal flex-none order-2 flex-grow-0 xxl:w-[120px] xxl:h-[18px]",
    },
    {
      label: "Amount",
      className:
        "w-[88px] h-[18px] text-[12px] leading-[18px] text-right text-[#696868] font-normal flex-none order-3 flex-grow-0 xxl:w-[200px]",
    },
  ];

  return (
    <div
      className="box-border flex flex-row items-center gap-[32px]
        border-b border-[#F2F2F2]
        flex-none flex-grow-0 self-stretch
        order-2 p-y-[12px] px-0 w-[624px] h-[60px]
        md:order-2 md:py-[12px] md:px-0 md:w-[624px] md:h-[60px]
        xxl:order-1 xxl:px-[16px] xxl:w-[996px] xxl:h-[42px]
        mx-auto"
    >
      {transactionDetails.map((item, index) => (
        <div key={index} className={item.className}>
          <p className="h-[18px] text-[12px] leading-[18px] font-normal text-[#696868]">
            {item.label}
          </p>
        </div>
      ))}
    </div>
  );
}
