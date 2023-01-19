import { useState } from "react";
import AddButton from "../shared/buttons/AddButton";
import GoalCard from "./GoalCard";

const Goals = () => {
  const [goals, setGoals] = useState<{ title: string; budget: number }[]>([]);

  return (
    <>
      <div className="overflow-x-auto rounded-xl bg-secondary px-10 py-8">
        <div className="flex items-center justify-between">
          <h2>Goals</h2>
          <AddButton onlyIcon />
        </div>
        {goals.length === 0 && (
          <p className="mt-4 text-center text-sm font-semibold">No Goals set</p>
        )}
        {/*{goals.map(({ title, budget }) => (*/}
        {/*  <GoalCard key={title} title={title} budget={budget} />*/}
        {/*))}*/}
      </div>
    </>
  );
};

export default Goals;
