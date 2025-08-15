"use client";

import { useState, useContext, useRef, useEffect } from "react";
import { GlobalContext } from "../context/GlobalContext";
import AddButton from "../add-button/AddButton";
import Image from "next/image";
import { formatDollarWithDot } from "../helperFunctions/formatAmount";

type WithdrawProps = {
  potIndex: number;
  onClose: () => void;
};

export default function Withdraw({ potIndex, onClose }: WithdrawProps) {
  const { data, setData } = useContext(GlobalContext);
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  if (!data) return null;

  const pot = data.pots[potIndex];

  const handleWithdraw = () => {
    const withdrawAmount = Number(amount);

    if (isNaN(withdrawAmount) || withdrawAmount <= 0) {
      setError("Please enter a valid amount");
      return;
    }
    if (withdrawAmount > pot.total) {
      setError("You cannot withdraw more than the total saved");
      return;
    }

    const updatedPots = data.pots.map((p, i) =>
      i === potIndex ? { ...p, total: p.total - withdrawAmount } : p
    );

    const updatedData = { ...data, pots: updatedPots };
    setData(updatedData);
    localStorage.setItem("finance-data", JSON.stringify(updatedData));
    onClose();
  };

  return (
    <div className="bg-white rounded-[12px] p-6 w-[320px] md:w-[400px]">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold"> {`Withdraw from '${pot.name}'`}</h2>
        <Image
          src="./images/modals/close.svg"
          alt="close button"
          width={25}
          height={25}
          onClick={onClose}
          className="cursor-pointer"
        />
      </div>

      <p className="text-sm text-gray-600 mb-4">
        You currently have {formatDollarWithDot(pot.total)} saved.
      </p>

      <input
        ref={inputRef}
        type="number"
        value={amount}
        onChange={(e) => {
          const value = e.target.value;

          // ✅ Remove negative sign if typed
          if (Number(value) < 0) return;

          setAmount(value);
          if (error) setError("");
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleWithdraw();

          // Optional: prevent typing '-' directly
          if (e.key === "-") e.preventDefault();
        }}
        placeholder="Enter amount"
        min="0" // ✅ ensures value cannot go below 0 on some browsers
        className="border border-gray-300 rounded-lg p-2 w-full mb-3"
      />

      {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

      <AddButton text="Withdraw" width="w-full" onClick={handleWithdraw} />
    </div>
  );
}
