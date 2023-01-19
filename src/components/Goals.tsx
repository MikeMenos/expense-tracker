import AddButton from "./shared/buttons/AddButton";
import { useState } from "react";

const Goals = () => {
  const [goals, setGoals] = useState<[]>([]);

  return (
    <div className="overflow-x-auto rounded-xl bg-secondary px-10 py-8">
      <div className="flex items-center justify-between">
        <h2>Goals</h2>
        <AddButton onlyIcon />
      </div>
    </div>
  );
};

export default Goals;
