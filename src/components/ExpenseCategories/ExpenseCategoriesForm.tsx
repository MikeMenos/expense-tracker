import {
  type SyntheticEvent,
  useState,
  type FC,
  type SetStateAction,
  type Dispatch,
} from "react";
import { trpc } from "../../utils/trpc";
import { categorySchema } from "../../zodSchemas/categorySchema";
import Form from "../shared/Form";
import Input from "../shared/Input";

interface PropsInterface {
  setShow: Dispatch<SetStateAction<boolean>>;
}

const ExpenseCategoriesForm: FC<PropsInterface> = ({ setShow }) => {
  const [category, setCategory] = useState<string>("");
  const utils = trpc.useContext();

  const onInputChange = (e: SyntheticEvent) => {
    const { value } = e.target as HTMLInputElement;
    setCategory(value);
  };

  const { mutateAsync } = trpc.category.create.useMutation({
    onSuccess: () => {
      setCategory("");
      setShow(false);
      utils.category.list.invalidate();
    },
  });

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    try {
      categorySchema.parse({ category });
    } catch (e: unknown) {
      return;
    }

    mutateAsync({ category });
  };
  return (
    <Form
      onSubmit={handleSubmit}
      className="mx-auto flex flex-col items-center justify-center px-5 py-10"
    >
      <Input
        placeholder="Category..."
        value={category}
        type="text"
        onChange={onInputChange}
        className="border-b p-2 outline-none"
      />
      <button>Submit</button>
    </Form>
  );
};

export default ExpenseCategoriesForm;
