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
import DateInput from "../shared/DateInput";

interface PropsInterface {
  record: Row["original"];
  setRecord: Dispatch<SetStateAction<object>>;
  onClose: VoidFunction;
  createOrEdit?: any;
}

const TransactionsForm: FC<PropsInterface> = ({
  record,
  setRecord,
  createOrEdit,
  onClose,
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
        [name]: !value || value === "0" ? "" : parseInt(value),
      }));
    } else {
      setRecord((state) => ({
        ...state,
        [name]: value,
      }));
    }
  };

  const onDateChange = (newDate: Date) => {
    setRecord((state) => ({
      ...state,
      createdAt: newDate,
    }));
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
    <Form onSubmit={handleSubmit} className="drawer-form" onClose={onClose}>
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
          placeholder="Select Category"
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
        <DateInput
          // @ts-ignore
          onChange={onDateChange}
          // @ts-ignore
          value={record?.createdAt ?? ""}
          className="mt-10 w-full rounded-xl bg-secondary p-2 outline-none"
          placeholder="Date (MM/DD/YYYY)"
          name="createdAt"
        />
      </div>
    </Form>
  );
};

export default TransactionsForm;
