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

interface PropsInterface {
  setShow: Dispatch<SetStateAction<boolean>>;
  queryClient: QueryClient;
  record: Row["original"];
  setRecord: Dispatch<SetStateAction<object>>;
}

const ExpenseCategoriesForm: FC<PropsInterface> = ({
  setShow,
  queryClient,
  record,
  setRecord,
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

  const { mutateAsync } = trpc.category.createOrEdit.useMutation({
    onSuccess: () => {
      setRecord({});
      setShow(false);
      void queryClient.refetchQueries();
    },
  });

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    mutateAsync({ category, id });
  };
  return (
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
      <button>Submit</button>
    </Form>
  );
};

export default ExpenseCategoriesForm;
