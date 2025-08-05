export default function EditDelete({
  text,
  width,
}: {
  text: string;
  width: string;
}) {
  function capitalizeFirstLetter(str: string) {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return (
    <div
      className={` ${width} flex flex-col items-start p-[12px_20px] gap-[12px] relative  h-[91px] max-h-[300px] bg-white shadow-[0px_4px_24px_rgba(0,0,0,0.25)] rounded-[8px]`}
    >
      <p className="cursor-pointer hover:text-[#C94736] whitespace-nowrap">
        Edit {capitalizeFirstLetter(text)}
      </p>
      <p className="cursor-pointer hover:text-[#C94736] whitespace-nowrap">
        Delete {capitalizeFirstLetter(text)}
      </p>
    </div>
  );
}
