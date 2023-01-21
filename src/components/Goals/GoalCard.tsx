import { type Dispatch, type FC, type SetStateAction } from "react";
import EditButton from "../shared/buttons/EditButton";
import DeleteButton from "../shared/buttons/DeleteButton";

interface PropsInterface {
  title: string;
  budget: number;
  id: string;
  setRecord: Dispatch<SetStateAction<object>>;
  setShowDrawer: Dispatch<SetStateAction<boolean>>;
  remove: any;
}

const GoalCard: FC<PropsInterface> = ({
  title,
  budget,
  id,
  setRecord,
  setShowDrawer,
  remove,
}) => {
  const onEdit = (title: string, budget: number, id: string) => {
    setRecord({ title, budget, id });
    setShowDrawer(true);
  };

  const onDelete = (id: string) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    void remove({ id });
  };

  return (
    <div className="my-4 flex h-[200px] min-w-[250px] flex-col justify-around rounded-lg bg-purple px-4 shadow-xl">
      <div className="flex items-center justify-between px-1">
        <p className="text-lg font-semibold">{title}</p>
        <div className="flex gap-4">
          <EditButton
            size="1.3rem"
            onlyIcon
            onClick={() => onEdit(title, budget, id)}
          />
          <DeleteButton size="1.3rem" onlyIcon onClick={() => onDelete(id)} />
        </div>
      </div>
      <div>
        <p className="text-lg font-semibold">BUDGET:</p>
        <p className="mt-2 font-bold">{budget}€</p>
      </div>
    </div>
  );
};

export default GoalCard;
