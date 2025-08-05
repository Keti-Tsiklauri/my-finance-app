"use client";
import { useContext, useState } from "react";
import Image from "next/image";
import AddButton from "../add-button/AddButton";
import Theme from "./Theme";
import AmountPicker from "./AmountPicker";
import InfoBox from "./InfoBox";
import { capitalizeEachWord } from "../helperFunctions/capitalizeEachWord";
import { GlobalContext, GlobalDataProvider } from "../context/GlobalContext";

export default function AddNewBudget({
  text,
  description,
  selectedCategory,
  setSelectedCategory,
  onClose,
}: {
  text: string;
  description: string;
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
  onClose: () => void;
}) {
  const [theme, setTheme] = useState({ theme: "#277C78", text: "green" });
  const [amount, setAmount] = useState("");

  const { data, setData } = useContext(GlobalContext); // ✅ global data

  const handleAddBudget = () => {
    if (!data || !selectedCategory || !amount) return;

    // Check if budget for selectedCategory already exists
    const existingBudgetIndex = data.budgets.findIndex(
      (b) => b.category === selectedCategory
    );

    let updatedBudgets;

    if (existingBudgetIndex !== -1) {
      // Update the existing budget's maximum by adding the new amount
      updatedBudgets = [...data.budgets];
      const existingBudget = updatedBudgets[existingBudgetIndex];

      updatedBudgets[existingBudgetIndex] = {
        ...existingBudget,
        maximum: existingBudget.maximum + Number(amount),
        // Keep existing theme, ignore the current theme picker value
      };
    } else {
      // Create new budget
      const newBudget = {
        category: selectedCategory,
        maximum: Number(amount),
        theme: theme.theme,
      };
      updatedBudgets = [...data.budgets, newBudget];
    }

    const updatedData = { ...data, budgets: updatedBudgets };
    setData(updatedData);
    localStorage.setItem("finance-data", JSON.stringify(updatedData));
    onClose();
  };
  const budgetExists = data?.budgets.some(
    (b) => b.category === selectedCategory
  );

  return (
    <div className="flex flex-col mx-auto w-[335px] md:w-[560px] h-[450px] md:h-[510px] bg-white rounded-[12px] p-[24px_20px] gap-3 md:gap-5">
      <div className="flex justify-between md:w-[496px] w-[295px]">
        <p className="h-[38px] font-['Public_Sans'] font-bold text-[32px] leading-[120%] text-[#201F24]">
          {text}
        </p>
        <Image
          src="images/modals/close.svg"
          alt="close button"
          width={25}
          height={25}
          className="cursor-pointer"
          onClick={onClose}
        />
      </div>

      <p className="font-['Public_Sans'] font-normal text-[14px] leading-[150%] text-[#696868]">
        {description}
      </p>

      <InfoBox
        label="budget category"
        content={selectedCategory}
        onChange={setSelectedCategory}
      />

      <AmountPicker
        text="maximum spending"
        value={amount}
        onChange={setAmount}
      />

      {/* Only show theme picker if budget does NOT exist */}
      {!budgetExists && (
        <Theme selectedColor={theme} text="theme" onChange={setTheme} />
      )}

      <div className="md:w-[496px] w-[295px] mt-auto" onClick={handleAddBudget}>
        <AddButton text="add budget" width="w-[295px] md:w-[496px]" />
      </div>
    </div>
  );
}
