import Header from "@/components/shared/headers/Header";
import PotsTypes from "@/components/pots-types/PotsTypes";

export default function Pots() {
  return (
    <div>
      <Header text="Pots" />
      <div className="mt-4">
        <PotsTypes />
      </div>
    </div>
  );
}
