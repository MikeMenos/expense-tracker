import {
  type SyntheticEvent,
  type FC,
  type SetStateAction,
  type Dispatch,
} from "react";
import Form from "../shared/Form";
import Input from "../shared/Input";
import { type Row } from "react-table";

interface PropsInterface {
  record: Row["original"];
  setRecord: Dispatch<SetStateAction<object>>;
  createOrEdit?: any;
}

const CategoriesForm: FC<PropsInterface> = ({
  record,
  setRecord,
  createOrEdit,
}) => {
  // @ts-ignore
  const { name, id = "" } = record;

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
    createOrEdit({ name, id });
  };
  return (
    <>
      <Form onSubmit={handleSubmit} className="drawer-form">
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
