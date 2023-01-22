import { type Dispatch, type FC, type SetStateAction } from "react";
import EditButton from "../shared/buttons/EditButton";
import DeleteButton from "../shared/buttons/DeleteButton";
import Wave from "react-wavify";

interface PropsInterface {
  title: string;
  budget: number;
  gathered: number;
  id: string;
  setRecord: Dispatch<SetStateAction<object>>;
  setShowDrawer: Dispatch<SetStateAction<boolean>>;
  remove: any;
}

const GoalCard: FC<PropsInterface> = ({
  title,
  budget,
  gathered,
  id,
  setRecord,
  setShowDrawer,
  remove,
}) => {
  const onEdit = (title: string, budget: number, id: string) => {
    setRecord({ title, budget, id, gathered });
    setShowDrawer(true);
  };

  const onDelete = (id: string) => {
    // @ts-ignore
    void remove({ id });
  };

  const height = ((gathered / budget) * 100 * 150) / 100;

  return (
    <div className="relative mb-4 mt-8 flex h-[195px] min-w-[250px] flex-col justify-between rounded-xl bg-main shadow-xl">
      <div className="flex items-center justify-between rounded-t-xl bg-purple px-4 py-2">
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
      <p className="absolute top-1/2 left-[47%] text-center text-sm font-semibold opacity-50">
        {((gathered / budget) * 100).toFixed(0)}%
      </p>
      <div className="px-4">
        <div className="top-15 absolute right-2 flex items-center gap-2">
          <p className="font-semibold">Budget:</p>
          <p className="text-xl font-bold">{budget}€</p>
        </div>
        <div className="absolute bottom-4 flex items-center gap-2">
          <p className="font-semibold">Gathered:</p>
          <p className="text-xl font-bold">{gathered}€</p>
        </div>
      </div>
      <Wave
        fill="#5e9e90"
        paused={false}
        options={{
          height: 150 - height,
          amplitude: 150 - height === 150 ? 0 : 4,
          speed: 0.5,
          points: 6,
        }}
      />
    </div>
  );
};

export default GoalCard;
