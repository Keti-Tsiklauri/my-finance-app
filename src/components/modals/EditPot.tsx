"use client";
import { useState, useContext } from "react";
import Image from "next/image";
import { capitalizeEachWord } from "../helperFunctions/capitalizeEachWord";
import AddButton from "../add-button/AddButton";
import Theme from "./Theme";
import AmountPicker from "./AmountPicker";
import { GlobalContext } from "../context/GlobalContext";

type EditPotProps = {
  potName: string;
  currentTarget: number;
  currentTheme: string;
  currentText: string; // <- add this
  onClose: () => void;
};

export default function EditPot({
  potName: initialName,
  currentTarget,
  currentTheme,
  currentText,
  onClose,
}: EditPotProps) {
  const { data, setData } = useContext(GlobalContext);

  const [potName, setPotName] = useState(initialName);
  const [amount, setAmount] = useState(String(currentTarget));
  const [theme, setTheme] = useState({
    theme: currentTheme,
    text: currentText, // <- ensures text shows
  });

  const handleSaveChanges = () => {
    if (!data || !potName.trim() || !amount) return;

    const formattedName = capitalizeEachWord(potName.trim());

    const updatedPots = data.pots.map((p) =>
      p.name === initialName
        ? {
            ...p,
            name: formattedName,
            target: Number(amount),
            theme: theme.theme,
          }
        : p
    );

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
          Edit Pot
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

      <p className="text-[14px] text-[#696868]">
        Update the settings for this pot.
      </p>

      {/* Pot Name */}
      <div>
        <p className="text-[12px] font-bold text-[#696868]">
          {capitalizeEachWord("pot name")}
        </p>
        <div className="flex items-center px-5 py-3 border border-[#98908B] rounded-[8px] w-full">
          <input
            type="text"
            value={potName}
            onChange={(e) => setPotName(e.target.value)}
            className="w-full bg-transparent text-[14px] text-[#201F24] outline-none"
          />
        </div>
      </div>

      {/* Amount Picker */}
      <AmountPicker text="target amount" value={amount} onChange={setAmount} />

      {/* Theme Picker */}
      <Theme selectedColor={theme} text="theme" onChange={setTheme} />

      {/* Save Button */}
      <div className="w-full mt-auto" onClick={handleSaveChanges}>
        <AddButton text="save changes" width="w-full" />
      </div>
    </div>
  );
}
