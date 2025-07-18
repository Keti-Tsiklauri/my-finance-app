type AddButtonProps = {
  text: string;
};

export default function AddButton({ text }: AddButtonProps) {
  return (
    <div className="cursor-pointer  flex flex-row justify-center items-center p-4 gap-4 w-[155px] h-[45px] bg-[#201F24] rounded-lg flex-none order-0 flex-grow-0">
      <p className=" h-[21px] font-publicSans font-bold text-[14px] leading-[150%] text-white flex-none order-0 flex-grow-0">
        {text}
      </p>
    </div>
  );
}
