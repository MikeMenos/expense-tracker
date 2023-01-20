import { type FC } from "react";
import EditButton from "../shared/buttons/EditButton";

interface PropsInterface {
  title: string;
  budget: number;
}

const GoalCard: FC<PropsInterface> = ({ title, budget }) => {
  return (
    <>
      <div className="flex items-center justify-between px-1">
        <p>{title}</p>
        <EditButton onlyIcon />
      </div>
    </>
  );
};

export default GoalCard;
