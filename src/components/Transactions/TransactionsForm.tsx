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

interface PropsInterface {
  record: Row["original"];
  setRecord: Dispatch<SetStateAction<object>>;
  createOrEdit?: any;
}

const TransactionsForm: FC<PropsInterface> = ({
  record,
  setRecord,
  createOrEdit,
}) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
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
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const category = record?.category?.value || record?.category;
    createOrEdit({ receiver, id, category, amount, createdAt });
  };

  return (
    <>
      <Form onSubmit={handleSubmit} className="drawer-form">
        <div className="mt-20 w-full">
          <Input
            placeholder="Receiver"
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            value={record?.receiver ?? ""}
            type="text"
            onChange={onInputChange}
            className="mt-6 w-full rounded-md bg-secondary p-2 outline-none"
            name="receiver"
            required
          />
          <CategoriesSelector
            value={
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              typeof record?.category === "object"
                ? // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  record?.category
                : // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                typeof record?.category === "string" && record?.category
                ? {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    label: record?.category,
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    value: record?.category,
                  }
                : ""
            }
            onChange={onSelectorChange}
            name="category"
            required
            placeholder="Select..."
          />
          <Input
            placeholder="Amount (€)"
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            value={record?.amount ?? ""}
            type="number"
            onChange={onInputChange}
            className="mt-6 w-full rounded-md bg-secondary p-2 outline-none"
            name="amount"
            required
          />
          <Input
            placeholder="Date"
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            value={record?.createdAt ?? new Date()}
            type="date"
            onChange={onInputChange}
            className="mt-6 w-full rounded-md bg-secondary p-2 outline-none"
            name="createdAt"
          />
        </div>
      </Form>
    </>
  );
};

export default TransactionsForm;
