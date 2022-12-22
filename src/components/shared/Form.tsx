import { type FC, type SyntheticEvent } from "react";
import { type ChildrenType } from "../../interfaces/interfaces";

interface PropsInterface extends ChildrenType {
  className?: string;
  onSubmit: (e: SyntheticEvent) => void;
}

const Form: FC<PropsInterface> = ({ children, className, onSubmit }) => {
  return (
    <form onSubmit={onSubmit} className={className}>
      {children}
    </form>
  );
};

export default Form;
