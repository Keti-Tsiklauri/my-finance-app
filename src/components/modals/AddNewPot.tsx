"use client";
import { useState, useContext } from "react";
import Image from "next/image";
import { capitalizeEachWord } from "../helperFunctions/capitalizeEachWord";
import AddButton from "../add-button/AddButton";
import Theme from "./Theme";
import AmountPicker from "./AmountPicker";
import { GlobalContext } from "../context/GlobalContext";
type AddNewPotProps = {
  text: string;
  description: string;
  onClose: () => void;
  selectedCategory: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
};
export default function AddNewPot({
  text,
  description,
  onClose,
  selectedCategory,
  setSelectedCategory,
}: AddNewPotProps) {
  const [theme, setTheme] = useState({ theme: "#277C78", text: "green" });
  const [amount, setAmount] = useState("");
  const [potName, setPotName] = useState("");

  const { data, setData } = useContext(GlobalContext);

  const handleAddPot = () => {
    if (!data || !potName.trim() || !amount) return;

    const formattedName = capitalizeEachWord(potName.trim());

    const existingIndex = data.pots.findIndex(
      (p) => p.name.toLowerCase() === formattedName.toLowerCase()
    );

    let updatedPots;

    if (existingIndex !== -1) {
      // Pot exists → update target
      updatedPots = [...data.pots];
      updatedPots[existingIndex].target += Number(amount);
    } else {
      // Pot doesn't exist → add new at top
      const newPot = {
        name: formattedName,
        target: Number(amount),
        total: 0,
        theme: theme.theme,
      };
      updatedPots = [newPot, ...data.pots];
    }

    const updatedData = { ...data, pots: updatedPots };
    setData(updatedData);
    localStorage.setItem("finance-data", JSON.stringify(updatedData));
    onClose();
  };

  return (
    <div className="flex flex-col mx-auto mt-5 w-[335px] md:w-[560px] bg-white rounded-[12px] p-[24px_20px] gap-3 md:gap-5">
      {/* Header */}
      <div className="flex justify-between w-full">
        <p className="font-['Public_Sans'] font-bold text-[32px] text-[#201F24]">
          {text}
        </p>
        <Image
          src="/images/modals/close.svg"
          alt="close button"
          width={25}
          height={25}
          className="cursor-pointer"
          onClick={onClose}
        />
      </div>

      <p className="text-[14px] text-[#696868]">{description}</p>

      {/* Pot Name Input */}
      <div>
        <p className="text-[12px] font-bold text-[#696868]">
          {capitalizeEachWord("pot name")}
        </p>
        <div className="flex items-center px-5 py-3 border border-[#98908B] rounded-[8px] w-full">
          <input
            type="text"
            placeholder="Concert Ticket"
            value={potName}
            onChange={(e) => setPotName(e.target.value)}
            className="w-full bg-transparent text-[14px] text-[#201F24] placeholder-[#98908B] outline-none"
          />
        </div>
      </div>

      {/* Amount Picker */}
      <AmountPicker
        text="maximum spending"
        value={amount}
        onChange={setAmount}
      />

      {/* Theme Picker */}
      <Theme selectedColor={theme} text="theme" onChange={setTheme} />

      {/* Add Button */}
      <div className="w-full mt-auto" onClick={handleAddPot}>
        <AddButton text="add pot" width="w-full" />
      </div>
    </div>
  );
}
