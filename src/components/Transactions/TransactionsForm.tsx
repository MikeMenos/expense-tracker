import {
  type SyntheticEvent,
  type FC,
  type SetStateAction,
  type Dispatch,
} from "react";
import Form from "../shared/Form";
import Input from "../shared/Input";
import { type Row } from "react-table";
import CategoriesSelector from "../shared/selectors/CategoriesSelector";
import { capitalizeFirstLetter } from "../../utils/capitalizeFirstLetter";

interface PropsInterface {
  record: Row["original"];
  setRecord: Dispatch<SetStateAction<object>>;
  setShowDrawer: Dispatch<SetStateAction<boolean>>;
  createOrEdit?: any;
}

const TransactionsForm: FC<PropsInterface> = ({
  record,
  setRecord,
  createOrEdit,
  setShowDrawer,
}) => {
  // @ts-ignore
  const { receiver, id = "", amount, createdAt = new Date() } = record;

  const onSelectorChange = (
    options: { label: string; value: string },
    { name }: { name: string }
  ) => {
    setRecord((state) => ({
      ...state,
      [name]: options,
    }));
  };

  const onInputChange = (e: SyntheticEvent) => {
    const { value, name, type } = e.target as HTMLInputElement;

    if (type === "number") {
      setRecord((state) => ({
        ...state,
        [name]: parseInt(value),
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
    const category = record?.category?.value || record?.category;
    createOrEdit({
      receiver: capitalizeFirstLetter(receiver),
      id,
      category,
      amount,
      createdAt,
    });
  };

  return (
    <Form
      onSubmit={handleSubmit}
      className="drawer-form"
      setShowDrawer={setShowDrawer}
    >
      <div className="mt-20 w-full">
        <Input
          placeholder="Receiver"
          // @ts-ignore
          value={record?.receiver ?? ""}
          type="text"
          onChange={onInputChange}
          className="mt-10 w-full rounded-xl bg-secondary p-2 outline-none"
          name="receiver"
          required
        />
        <CategoriesSelector
          value={
            // @ts-ignore
            typeof record?.category === "object"
              ? // @ts-ignore
                record?.category
              : // @ts-ignore
              typeof record?.category === "string" && record?.category
              ? {
                  // @ts-ignore
                  label: record?.category,

                  // @ts-ignore
                  value: record?.category,
                }
              : ""
          }
          onChange={onSelectorChange}
          name="category"
          required
          placeholder="Select..."
          className="mt-6"
        />
        <Input
          placeholder="Amount (€)"
          // @ts-ignore
          value={record?.amount ?? ""}
          type="number"
          onChange={onInputChange}
          className="mt-10 w-full rounded-xl bg-secondary p-2 outline-none"
          name="amount"
          required
        />
        <Input
          placeholder="Date"
          // @ts-ignore
          value={record?.createdAt ?? new Date()}
          type="date"
          onChange={onInputChange}
          className="mt-10 w-full rounded-xl bg-secondary p-2 outline-none"
          name="createdAt"
        />
      </div>
    </Form>
  );
};

export default TransactionsForm;
