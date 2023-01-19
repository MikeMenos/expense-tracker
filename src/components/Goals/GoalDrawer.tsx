import AppDrawer from "../shared/AppDrawer";
import Input from "../shared/Input";
import type { Dispatch, FC, SetStateAction, SyntheticEvent } from "react";

interface PropsInterface {
  title: string;
  budget: number;
  setGoals: Dispatch<SetStateAction<any>>;
  showCardDrawer: boolean;
}

const GoalDrawer: FC<PropsInterface> = ({
  title,
  budget,
  setGoals,
  showCardDrawer,
}) => {
  const onInputChange = (e: SyntheticEvent) => {
    const { value, name, type } = e.target as HTMLInputElement;

    if (type === "number") {
      setGoals((state: { title: string; budget: number }) => ({
        ...state,
        [name]: parseInt(value),
      }));
    } else {
      setGoals((state: { title: string; budget: number }) => ({
        ...state,
        [name]: value,
      }));
    }
  };

  return (
    <AppDrawer show={showCardDrawer}>
      <div className="mt-20 w-full">
        <Input
          placeholder="Goal Title"
          value={title ?? ""}
          type="text"
          name="title"
          required
          onChange={onInputChange}
        />
        <Input
          placeholder="Budget"
          value={budget ?? ""}
          type="number"
          name="budget"
          required
          onChange={onInputChange}
        />
      </div>
    </AppDrawer>
  );
};

export default GoalDrawer;
