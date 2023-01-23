import { type FC, useState } from "react";
import ReactSelect from "react-select";
import { type SelectorPropsInterface } from "../../../interfaces/interfaces";
import buildSelectorOptions from "../../../utils/buildSelectorOptions";
import { trpc } from "../../../utils/trpc";
import selectorStyles from "../../../utils/selectorStyles";

const CategoriesSelector: FC<SelectorPropsInterface> = ({
  value,
  name,
  onChange,
  required,
  placeholder,
  className,
}) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const { data, isFetching } = trpc.category.list.useQuery();

  const categories = data?.categories.flatMap((name) => name) ?? [];

  const options = categories.map(buildSelectorOptions);

  const formattedPlaceholder = required ? placeholder + "*" : placeholder;

  return (
    <div className="flex w-full flex-col py-4">
      <label
        htmlFor={placeholder}
        className={`absolute font-bold transition-all duration-500 ease-in-out ${
          isFocused || value
            ? "-translate-y-1 opacity-100"
            : "translate-y-6 opacity-0"
        }`}
      >
        {formattedPlaceholder}
      </label>
      <ReactSelect
        className={className}
        options={options}
        isLoading={isFetching}
        value={value}
        name={name}
        onChange={onChange}
        styles={{
          ...selectorStyles(),
        }}
        required={required}
        placeholder={isFocused ? "" : formattedPlaceholder}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </div>
  );
};

export default CategoriesSelector;
