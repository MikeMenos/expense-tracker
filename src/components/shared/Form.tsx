import { type FC, type SyntheticEvent } from "react";
import { type ChildrenType } from "../../interfaces/interfaces";
import AddButton from "./buttons/AddButton";

interface PropsInterface extends ChildrenType {
  className?: string;
  onSubmit: (e: SyntheticEvent) => void;
  submitBtnVisible?: boolean;
}

const Form: FC<PropsInterface> = ({
  children,
  className,
  onSubmit,
  submitBtnVisible = true,
}) => {
  return (
    <form onSubmit={onSubmit} className={className}>
      {children}
      {submitBtnVisible && (
        <AddButton
          onlyText
          type="submit"
          className="text-md ml-auto mr-6 mt-12"
        >
          Confirm
        </AddButton>
      )}
    </form>
  );
};

export default Form;
