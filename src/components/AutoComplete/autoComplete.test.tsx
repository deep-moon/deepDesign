import React from "react";
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { config } from "react-transition-group";
import AutoComplete, {
  AutoCompleteProps,
  DataSourceType,
} from "./autoComplete";

// 关闭动画的异步
config.disabled = true;
jest.mock("../Icon/icon", () => {
  return (props: any) => <span>{props.icon}</span>;
});

const testArray = [
  {
    value: "a",
    number: 1,
  },
  {
    value: "ab",
    number: 111,
  },
  {
    value: "abc",
    number: 111,
  },
  {
    value: "abcd",
    number: 1111,
  },
];

const renderOption = (item: DataSourceType) => {
  const itemWithNumber = item as DataSourceType<{ number: number }>;
  return (
    <div>
      {itemWithNumber.value}:{itemWithNumber.number}
    </div>
  );
};

const testProps: AutoCompleteProps = {
  fetchSuggestions: (query) =>
    testArray.filter((item) => item.value.includes(query)),
  onSelect: jest.fn(),
  placeholder: "auto-complete",
};

let inputNode: HTMLInputElement;
describe("test AutoComplete component", () => {
  beforeEach(() => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    render(<AutoComplete {...testProps}></AutoComplete>);
    inputNode = screen.getByPlaceholderText(
      "auto-complete"
    ) as HTMLInputElement;
  });
  it("test basic AutoComplete behavior", async () => {
    // input change
    fireEvent.change(inputNode, { target: { value: "a" } });
    await waitFor(() => {
      expect(screen.getByText("a")).toBeInTheDocument();
    });

    //  should have four suggest items
    expect(screen.queryAllByTestId("suggestion-item").length).toEqual(4);
    //click the first item
    fireEvent.click(screen.getByText("abcd"));
    expect(testProps.onSelect).toHaveBeenCalledWith({
      value: "abcd",
      number: 1111,
    });
    expect(screen.queryByText("abcd")).not.toBeInTheDocument();
    //fill the input
    expect(inputNode.value).toEqual("abcd");
  });
  it("should provide keyboard support", async () => {
    // input change
    fireEvent.change(inputNode, { target: { value: "a" } });
    await waitFor(() => {
      expect(screen.getByText("a")).toBeInTheDocument();
    });

    const first = screen.getByText("a");
    const second = screen.getByText("ab");

    // arrow down
    fireEvent.keyDown(inputNode, {
      key: "ArrowDown",
    });
    expect(first).toHaveClass("is-active");
    // arrow down
    fireEvent.keyDown(inputNode, {
      key: "ArrowDown",
    });
    expect(second).toHaveClass("is-active");
    // arrow up
    fireEvent.keyDown(inputNode, {
      key: "ArrowUp",
    });
    expect(first).toHaveClass("is-active");
    // press enter
    fireEvent.keyDown(inputNode, {
      key: "Enter",
    });
    expect(inputNode.value).toEqual("a");
  });
  it("click outside should hide the dropdown", async () => {
    // input change
    fireEvent.change(inputNode, { target: { value: "a" } });
    await waitFor(() => {
      expect(screen.getByText("a")).toBeInTheDocument();
    });
    fireEvent.click(document);
    expect(screen.queryByText("a")).not.toBeInTheDocument();
  });
  it("renderOption should generate the right template", async () => {
    cleanup();
    render(
      <AutoComplete {...testProps} renderOption={renderOption}></AutoComplete>
    );
    inputNode = screen.getByPlaceholderText("auto-complete");
    // input change
    fireEvent.change(inputNode, { target: { value: "a" } });
    await waitFor(() => {
      expect(screen.getByText("a:1")).toBeInTheDocument();
    });
  });
  it("async fetchSuggestions should works fine", async () => {
    cleanup();
    // 这里不放在外层的原因，是会重置mock
    const testPropsWithPromise: AutoCompleteProps = {
      onSelect: jest.fn(),
      fetchSuggestions: jest.fn((query) => {
        return Promise.resolve(
          testArray.filter((item) => item.value.includes(query))
        );
      }),
      placeholder: "auto-complete-3",
    };
    render(<AutoComplete {...testPropsWithPromise}></AutoComplete>);
    inputNode = screen.getByPlaceholderText(
      "auto-complete-3"
    ) as HTMLInputElement;
    // input change
    fireEvent.change(inputNode, { target: { value: "a" } });
    await waitFor(() => {
      expect(testPropsWithPromise.fetchSuggestions).toHaveBeenCalled();
    });
    await waitFor(() => {
      expect(screen.getByText("ab")).toBeInTheDocument();
    });
  });
});
