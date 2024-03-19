import { useCallback } from "react";
import { ISuggestionsCommonProps } from "../../../types";

interface ISuggestionItemProps extends ISuggestionsCommonProps {
  value: string;
  index: number;
}

export const SuggestionItem = ({
  activeItemIndex,
  value,
  chooseSuggestion,
  setFocusedItem,
  index,
  searchString,
}: ISuggestionItemProps) => {
  const handleClickSuggestion = () => {
    chooseSuggestion(value);
  };

  const handleMouseEnterOnSuggestion = () => {
    setFocusedItem(index);
  };

  const renderSuggestionValue = useCallback(() => {
    if (!searchString) {
      return value;
    }

    const regexp = new RegExp(`(${searchString})`, "gi");

    return value.split(regexp).map((part, index) => {
      if (regexp.test(part)) return <mark key={index}>{part}</mark>;
      return part;
    });
  }, [searchString, value]);

  const className = `suggestion-item ${activeItemIndex === index ? "active" : ""}`;

  return (
    <li
      className={className}
      onClick={handleClickSuggestion}
      onMouseEnter={handleMouseEnterOnSuggestion}
      role="option"
    >
      {renderSuggestionValue()}
    </li>
  );
};
