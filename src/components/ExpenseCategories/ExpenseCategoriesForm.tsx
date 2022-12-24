import {
  type SyntheticEvent,
  type FC,
  type SetStateAction,
  type Dispatch,
} from "react";
import { trpc } from "../../utils/trpc";
import Form from "../shared/Form";
import Input from "../shared/Input";
import { type QueryClient } from "@tanstack/react-query";
import { type Row } from "react-table";
import Button from "../shared/Button";
import { errorToast, successToast } from "../shared/toast/toasts";

interface PropsInterface {
  record: Row["original"];
  setRecord: Dispatch<SetStateAction<object>>;
  createOrEdit?: any;
}

const ExpenseCategoriesForm: FC<PropsInterface> = ({
  record,
  setRecord,
  createOrEdit,
}) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { category, id = "" } = record;

  const onInputChange = (e: SyntheticEvent) => {
    const { value, name } = e.target as HTMLInputElement;
    setRecord((state) => ({
      ...state,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    createOrEdit({ category, id });
  };
  return (
    <>
      <Form
        onSubmit={handleSubmit}
        className="mx-auto flex flex-col items-center justify-center px-5 py-10"
      >
        <Input
          placeholder="Category..."
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          value={record?.category}
          type="text"
          onChange={onInputChange}
          className="border-b p-2 outline-none"
          name="category"
        />
        <Button
          type="submit"
          className="text-md rounded-md bg-purple px-4 py-1 font-bold transition-colors duration-300 hover:bg-purpleHover"
        >
          Submit
        </Button>
      </Form>
    </>
  );
};

export default ExpenseCategoriesForm;
