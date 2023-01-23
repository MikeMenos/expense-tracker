import { useState } from "react";
import AddButton from "../shared/buttons/AddButton";
import GoalCard from "./GoalCard";
import GoalsForm from "./GoalsForm";
import AppDrawer from "../shared/AppDrawer";
import { trpc } from "../../utils/trpc";
import { errorToast, successToast } from "../shared/toast/toasts";
import { useQueryClient } from "@tanstack/react-query";
import Loader from "../shared/Loader";

const Goals = () => {
  const queryClient = useQueryClient();
  const [record, setRecord] = useState<object>({});
  const [showDrawer, setShowDrawer] = useState<boolean>(false);
  const { data, isFetching } = trpc.goal.list.useQuery();

  const goals = data?.goals.flatMap((title) => title) ?? [];

  const { mutate: createOrEdit } = trpc.goal.createOrEdit.useMutation({
    onSuccess: ({ id }) => {
      successToast(`Goal was ${id !== "" ? "updated" : "added"} successfully!`);
      onClose();
      queryClient.invalidateQueries();
    },
    onError: ({ message }) => {
      errorToast(message);
    },
  });

  const { mutate: remove } = trpc.goal.delete.useMutation({
    onSuccess: () => {
      void queryClient.invalidateQueries().then(() => {
        successToast(`Goal was deleted successfully!`);
      });
    },
    onError: () => {
      errorToast("Oops, something went wrong!");
    },
  });

  const onAdd = () => {
    setShowDrawer(true);
  };

  const onClose = () => {
    setShowDrawer(false);
    setRecord({});
  };

  if (isFetching)
    return (
      <div className="rounded-xl bg-secondary px-10 py-8">
        <Loader width={50} height={50} />
      </div>
    );

  return (
    <>
      <div className="rounded-xl bg-secondary px-10 py-8">
        <div className="flex items-center justify-between">
          <h2>Goals</h2>
          <AddButton onlyIcon size="1.7rem" onClick={onAdd} />
        </div>
        {goals.length === 0 && (
          <p className="mt-4 text-center text-sm font-semibold">No Goals set</p>
        )}
        <div className="flex flex-grow gap-4 overflow-x-auto">
          {goals.map(
            ({
              title,
              budget,
              gathered,
              id,
            }: {
              title: string;
              budget: number;
              gathered: number;
              id: string;
            }) => (
              <GoalCard
                key={id}
                id={id}
                title={title}
                budget={budget}
                gathered={gathered}
                setRecord={setRecord}
                setShowDrawer={setShowDrawer}
                remove={remove}
              />
            )
          )}
        </div>
      </div>
      <AppDrawer show={showDrawer} onClose={onClose}>
        <GoalsForm
          createOrEdit={createOrEdit}
          record={record}
          setRecord={setRecord}
          onClose={onClose}
        />
      </AppDrawer>
    </>
  );
};

export default Goals;
