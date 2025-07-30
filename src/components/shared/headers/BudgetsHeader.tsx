"use client";
import { useState } from "react";
import AddButton from "../../add-button/AddButton";
import AddNewBudget from "@/components/modals/AddNewBudget";

export default function BudgetsHeader({ text }: { text: string }) {
  const [showModal, setShowModal] = useState(false);

  // ✅ Keep category outside modal so it persists
  const [selectedCategory, setSelectedCategory] = useState("entertainment");

  return (
    <>
      <div className="w-[343px] md:w-[700px] xxl:w-[1180px] mx-auto flex justify-between">
        <p className="h-[38px] font-publicSans font-bold text-[32px] leading-[120%] text-[#201F24] w-[128px]">
          {text}
        </p>
        <div onClick={() => setShowModal(true)}>
          <AddButton text={`+ add new ${text}`} width="w-[155px]" />
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <AddNewBudget
            text="add new budget"
            description="Choose a category to set a spending budget. These categories can help you monitor spending."
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            onClose={() => setShowModal(false)}
          />
        </div>
      )}
    </>
  );
}
