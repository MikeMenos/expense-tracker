import { CSSObjectWithLabel } from "react-select";

const selectorStyles = () => {
  return {
    container: (baseStyles: CSSObjectWithLabel) => ({
      ...baseStyles,
      marginTop: "1.5rem",
    }),
    menu: (baseStyles: CSSObjectWithLabel) => ({
      ...baseStyles,
      backgroundColor: "#192439",
    }),
    valueContainer: (baseStyles: CSSObjectWithLabel) => ({
      ...baseStyles,
      backgroundColor: "#192439",
      borderBottomLeftRadius: "0.375rem",
      borderTopLeftRadius: "0.375rem",
    }),
    indicatorsContainer: (baseStyles: CSSObjectWithLabel) => ({
      ...baseStyles,
      backgroundColor: "#192439",
      borderBottomRightRadius: "0.375rem",
      borderTopRightRadius: "0.375rem",
    }),
    singleValue: (baseStyles: CSSObjectWithLabel) => ({
      ...baseStyles,
      color: "white",
    }),
    control: (baseStyles: CSSObjectWithLabel) => ({
      ...baseStyles,
      backgroundColor: "transparent",
      border: "none",
    }),
    placeholder: (baseStyles: CSSObjectWithLabel) => ({
      ...baseStyles,
      color: "lightGray",
      opacity: "0.6",
    }),
    option: (
      baseStyles: CSSObjectWithLabel,
      { isSelected, isFocused }: { isSelected: boolean; isFocused: boolean }
    ) => ({
      ...baseStyles,
      backgroundColor: isSelected ? "#353A8E" : isFocused ? "none" : "inherit",
      "&:hover": {
        backgroundColor: "#13192A",
      },
      fontWeight: "600",
    }),
  };
};

export default selectorStyles;
