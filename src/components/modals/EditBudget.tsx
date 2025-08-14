"use client";
import { useContext, useState } from "react";
import Image from "next/image";
import AddButton from "../add-button/AddButton";
import Theme from "./Theme";
import AmountPicker from "./AmountPicker";
import InfoBox from "./InfoBox";
import { GlobalContext } from "../context/GlobalContext";

type EditBudgetProps = {
  category: string;
  currentMaximum: number;
  currentTheme: string;
  currentText: string;
  onClose: () => void;
};

export default function EditBudget({
  category: initialCategory,
  currentMaximum,
  currentTheme,
  currentText,
  onClose,
}: EditBudgetProps) {
  const { data, setData } = useContext(GlobalContext);

  // Make category editable
  const [category, setCategory] = useState(initialCategory);
  const [theme, setTheme] = useState({
    theme: currentTheme,
    text: currentText,
  });

  const [amount, setAmount] = useState(String(currentMaximum));

  const handleSaveChanges = () => {
    if (!data || !category || !amount) return;

    const updatedBudgets = data.budgets.map((b) =>
      b.category === initialCategory
        ? { ...b, category, maximum: Number(amount), theme: theme.theme }
        : b
    );

    const updatedData = { ...data, budgets: updatedBudgets };
    setData(updatedData);
    localStorage.setItem("finance-data", JSON.stringify(updatedData));
    onClose();
  };

  return (
    <div className="flex flex-col mx-auto w-[335px] md:w-[560px] h-[450px] md:h-[510px] bg-white rounded-[12px] p-[24px_20px] gap-3 md:gap-5">
      {/* Header */}
      <div className="flex justify-between md:w-[496px] w-[295px]">
        <p className="h-[38px] font-['Public_Sans'] font-bold text-[32px] leading-[120%] text-[#201F24]">
          Edit Budget
        </p>
        <Image
          src="./images/modals/close.svg"
          alt="close button"
          width={25}
          height={25}
          className="cursor-pointer"
          onClick={onClose}
        />
      </div>

      <p className="font-['Public_Sans'] font-normal text-[14px] leading-[150%] text-[#696868]">
        Update the budget settings for this category.
      </p>

      {/* Editable category */}
      <InfoBox
        label="budget category"
        content={category}
        onChange={setCategory}
      />

      {/* Maximum amount */}
      <AmountPicker
        text="maximum spending"
        value={amount}
        onChange={setAmount}
      />

      {/* Theme */}
      <Theme selectedColor={theme} text="theme" onChange={setTheme} />

      {/* Save button */}
      <div
        className="md:w-[496px] w-[295px] mt-auto"
        onClick={handleSaveChanges}
      >
        <AddButton text="save changes" width="w-[295px] md:w-[496px]" />
      </div>
    </div>
  );
}
