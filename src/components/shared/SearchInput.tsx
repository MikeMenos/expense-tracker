import { type FC, useMemo, type ChangeEvent } from "react";
import { BiSearch } from "react-icons/bi";
import _ from "lodash";
import Input from "./Input";
import type { InputInterface } from "../../interfaces/interfaces";

interface PropsInterface extends InputInterface {
  delay?: number;
  onSearch: (arg0: string) => void;
  className: string;
}

const SearchInput: FC<PropsInterface> = ({
  onSearch,
  label,
  delay = 500,
  placeholder = " ",
  className,
}) => {
  const debouncedFunc = useMemo(() => _.debounce(onSearch, delay), [delay]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    debouncedFunc(value);
  };

  return (
    <div className="flex items-center">
      <Input
        placeholder={placeholder}
        label={label}
        onChange={onChange}
        className={className}
        icon={<BiSearch size="1.1rem" />}
      />
    </div>
  );
};

export default SearchInput;
