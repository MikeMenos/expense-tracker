import { type ChangeEvent, type FC, useEffect, useState } from "react";
import { type InputInterface } from "../../interfaces/interfaces";
import dayjs from "dayjs";

interface DateInputInterface
  extends Omit<InputInterface, "value" | "onChange"> {
  value: string;
  onChange: (date: Date) => void;
}

const DateInput: FC<DateInputInterface> = ({
  placeholder,
  required,
  className,
  value,
  onChange,
  style,
  name,
}) => {
  const [date, setDate] = useState("");

  const [isFocused, setIsFocused] = useState<boolean>(false);

  const formattedPlaceholder = required ? placeholder + "*" : placeholder;

  useEffect(() => {
    if (value) {
      const newDate = dayjs(value).format("YYYY-MM-DD");
      setDate(newDate);
    } else {
      setDate("");
    }
  }, [value]);

  const onDateChange = (input: ChangeEvent<HTMLInputElement>) => {
    const newDate = input.target.value;
    setDate(newDate);
    const dateDayJsObject = dayjs(newDate, "YYYY-MM-DD");
    const dateObject = dateDayJsObject.toDate();
    onChange(dateObject);
  };

  return (
    <div className="flex w-full flex-col">
      <label
        htmlFor={placeholder}
        className={`absolute font-bold transition-all duration-500 ease-in-out ${
          isFocused || value
            ? "translate-y-2 opacity-100"
            : "translate-y-6 opacity-0"
        }`}
      >
        {formattedPlaceholder}
      </label>
      <input
        type="date"
        name={name}
        placeholder={isFocused ? "" : formattedPlaceholder}
        value={date ?? ""}
        onChange={onDateChange}
        className={className}
        style={style}
        required={required}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </div>
  );
};

export default DateInput;
