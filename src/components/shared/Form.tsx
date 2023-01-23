import { Dispatch, type FC, SetStateAction, type SyntheticEvent } from "react";
import { type ChildrenType } from "../../interfaces/interfaces";
import AddButton from "./buttons/AddButton";
import CancelButton from "./buttons/CancelButton";

interface PropsInterface extends ChildrenType {
  className?: string;
  onSubmit?: (e: SyntheticEvent) => void;
  setShowDrawer: Dispatch<SetStateAction<boolean>>;
  submitBtnVisible?: boolean;
  disabled?: boolean;
}

const Form: FC<PropsInterface> = ({
  children,
  className,
  onSubmit,
  submitBtnVisible = true,
  disabled,
  setShowDrawer,
}) => {
  const onCancel = () => {
    setShowDrawer(false);
  };
  return (
    <form onSubmit={onSubmit} className={className}>
      {children}
      {submitBtnVisible && (
        <div className="flex w-full justify-end">
          <CancelButton className="text-md mr-4 mt-12" onClick={onCancel} />
          <AddButton
            disabled={disabled}
            onlyText
            type="submit"
            className="text-md mr-6 mt-12"
          >
            Confirm
          </AddButton>
        </div>
      )}
    </form>
  );
};

export default Form;
