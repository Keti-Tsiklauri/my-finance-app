import Header from "@/components/shared/headers/Header";
import PotsTypes from "@/components/pots-types/PotsTypes";

export default function Pots() {
  return (
    <div>
      <Header type="pot" />
      <div className="mt-4">
        <PotsTypes />
      </div>
    </div>
  );
}
