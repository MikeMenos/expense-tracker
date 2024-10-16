import {
  type SyntheticEvent,
  type FC,
  type SetStateAction,
  type Dispatch,
} from "react";
import Form from "../shared/Form";
import Input from "../shared/Input";
import { type Row } from "react-table";
import { capitalizeFirstLetter } from "../../utils/capitalizeFirstLetter";

interface PropsInterface {
  record: Row["original"];
  setRecord: Dispatch<SetStateAction<object>>;
  onClose: VoidFunction;
  createOrEdit?: any;
  isLoading?: boolean;
}

const CategoriesForm: FC<PropsInterface> = ({
  record,
  setRecord,
  createOrEdit,
  onClose,
  isLoading,
}) => {
  // @ts-ignore
  const { name, id = undefined } = record;

  const onInputChange = (e: SyntheticEvent) => {
    const { value, name } = e.target as HTMLInputElement;
    setRecord((state) => ({
      ...state,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    // @ts-ignore
    createOrEdit({
      name: capitalizeFirstLetter(name),
      id: id ?? undefined,
    });
  };
  return (
    <>
      <Form
        onSubmit={handleSubmit}
        className="drawer-form"
        onClose={onClose}
        isLoading={isLoading}
      >
        <div className="mt-20 w-full">
          <Input
            placeholder="Category"
            // @ts-ignore
            value={record?.name ?? ""}
            type="text"
            onChange={onInputChange}
            className="mt-10 w-full rounded-xl bg-secondary p-2 outline-none"
            name="name"
            required
          />
        </div>
      </Form>
    </>
  );
};

export default CategoriesForm;
