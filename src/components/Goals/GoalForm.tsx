import Input from "../shared/Input";
import type { Dispatch, FC, SetStateAction, SyntheticEvent } from "react";
import Form from "../shared/Form";

interface PropsInterface {
  record: object;
  setRecord: Dispatch<SetStateAction<object>>;
  createOrEdit: any;
}

const GoalForm: FC<PropsInterface> = ({ record, setRecord, createOrEdit }) => {
  const { title, id = "", budget, gathered } = record as any;
  const onInputChange = (e: SyntheticEvent) => {
    const { value, name, type } = e.target as HTMLInputElement;

    if (type === "number") {
      setRecord((state) => ({
        ...state,
        [name]: parseFloat(value),
      }));
    } else {
      setRecord((state) => ({
        ...state,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    // @ts-ignore
    createOrEdit({ title, id, budget, gathered });
  };

  return (
    <Form onSubmit={handleSubmit} className="drawer-form w-full">
      <div className="mt-20 w-full">
        <Input
          placeholder="Goal Title"
          // @ts-ignore
          value={record?.title ?? ""}
          type="text"
          name="title"
          required
          onChange={onInputChange}
          className="mt-6 w-full rounded-xl bg-secondary p-2 outline-none"
        />
        <Input
          placeholder="Budget (€)"
          // @ts-ignore
          value={record?.budget ?? ""}
          type="number"
          name="budget"
          required
          onChange={onInputChange}
          className="mt-6 w-full rounded-xl bg-secondary p-2 outline-none"
        />
        <Input
          placeholder="Amount Gathered (€)"
          // @ts-ignore
          value={record?.gathered ?? ""}
          type="number"
          name="gathered"
          required
          onChange={onInputChange}
          className="mt-6 w-full rounded-xl bg-secondary p-2 outline-none"
        />
      </div>
    </Form>
  );
};

export default GoalForm;
