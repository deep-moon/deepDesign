import React, {
  ChangeEvent,
  KeyboardEvent,
  ReactElement,
  useEffect,
  useState,
  useRef,
} from "react";
import Input, { InputProps } from "../Input/input";
import Icon from "../Icon/icon";
import useDebounce from "../../hooks/useDebounce";
import useClickOutSide from "../../hooks/useClickOutside";
import classNames from "classnames";
import Transition from "../Transition/transition";
interface DataSourceObject {
  value: string;
}
export type DataSourceType<T = {}> = T & DataSourceObject;

export interface AutoCompleteProps
  extends Omit<InputProps, "onSelect" | "onChange"> {
  /**
   * 返回输入建议的方法，可以拿到当前的输入，然后返回同步的数组或者是异步的 Promise
   * type DataSourceType<T = {}> = T & DataSourceObject
   */
  fetchSuggestions: (
    str: string
  ) => DataSourceType[] | Promise<DataSourceType[]>;
  /** 点击选中建议项时触发的回调*/
  onSelect?: (item: DataSourceType) => void;
  /** 文本框发生改变的时候触发的事件*/
  onChange?: (value: string) => void;
  /**支持自定义渲染下拉项，返回 ReactElement */
  renderOption?: (item: DataSourceType) => ReactElement;
}

export const AutoComplete: React.FC<AutoCompleteProps> = (props) => {
  const {
    fetchSuggestions,
    onChange,
    onSelect,
    renderOption,
    value,
    ...restProps
  } = props;
  const [inputValue, setInputValue] = useState(value);
  const [suggestions, setSuggestions] = useState<DataSourceType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [highlightIndex, setHighlightIndex] = useState<number>(-1);

  const triggerSearchRef = useRef<boolean>(false);
  const debounceValue = useDebounce(inputValue, 300);

  const componentRef = useRef<HTMLDivElement>(null);
  useClickOutSide(componentRef, () => {
    setSuggestions([]);
  });
  useEffect(() => {
    setSuggestions([]);
    if (debounceValue && triggerSearchRef.current) {
      const results = fetchSuggestions(debounceValue);
      if (results instanceof Promise) {
        setLoading(true);
        results.then((data) => {
          alert(data);
          setLoading(false);
          setSuggestions(data);
        });
      } else {
        setSuggestions(results);
      }
    }
    setHighlightIndex(-1);
  }, [debounceValue]);

  const handleHighlight = (index: number) => {
    if (index < 0) {
      index = 0;
    }
    if (index >= suggestions.length) {
      index = suggestions.length - 1;
    }
    setHighlightIndex(index);
  };
  const handleKeydown = (e: KeyboardEvent<HTMLInputElement>) => {
    console.log(e);
    switch (e.key) {
      case "Enter":
        if (suggestions[highlightIndex]) {
          setInputValue(suggestions[highlightIndex].value);
        }
        break;
      case "ArrowUp":
        handleHighlight(highlightIndex - 1);
        break;
      case "ArrowDown":
        handleHighlight(highlightIndex + 1);
        break;
      case "Escape":
        setSuggestions([]);
        break;
      default:
        break;
    }
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setInputValue(value);
    triggerSearchRef.current = true;
    if (onChange) {
      onChange(value);
    }
  };

  const handleSelect = (item: DataSourceType) => {
    setInputValue(item.value);
    setSuggestions([]);
    if (onSelect) {
      onSelect(item);
    }
    triggerSearchRef.current = false;
  };
  const generateDropdown = () => {
    return (
      <Transition
        in={suggestions.length > 0 || loading}
        timeout={300}
        animation={"zoom-in-top"}
      >
        <ul className="deep-suggestion-list">
          {loading && (
            <div className="suggestion-loading-icon">
              <Icon icon="spinner" spin />
            </div>
          )}
          {suggestions.map((item, index) => {
            const classes = classNames("suggestion-item", {
              "is-active": index === highlightIndex,
            });
            return (
              <li
                className={classes}
                key={index}
                onClick={() => handleSelect(item)}
                data-testid={"suggestion-item"}
              >
                {renderOption ? renderOption(item) : item.value}
              </li>
            );
          })}
        </ul>
      </Transition>
    );
  };
  return (
    <div className="deep-auto-complete" ref={componentRef}>
      <Input
        {...restProps}
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeydown}
      />
      {generateDropdown()}
    </div>
  );
};

export default AutoComplete;
