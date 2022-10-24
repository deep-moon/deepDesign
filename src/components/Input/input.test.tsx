import { render, screen, fireEvent } from "@testing-library/react";
import { Input, InputProps } from "./input";
const defaultProps: InputProps = {
  placeholder: "test-input",
  onChange: jest.fn(),
};
describe("test Input component", () => {
  it("should render the correct default Input", () => {
    render(<Input {...defaultProps} />);
    const testNode = screen.getByPlaceholderText(
      "test-input"
    ) as HTMLInputElement;
    expect(testNode).toBeInTheDocument();
    expect(testNode).toHaveClass("deep-input-inner");
    fireEvent.change(testNode, { target: { value: "123" } });
    expect(defaultProps.onChange).toHaveBeenCalled();
    expect(testNode.value).toEqual("123");
  });
  it("should render the disabled Input on disabled property", () => {
    render(<Input disabled placeholder="disabled" />);
    const testNode = screen.getByPlaceholderText(
      "disabled"
    ) as HTMLInputElement;
    expect(testNode).toBeInTheDocument();
    expect(testNode.disabled).toBeTruthy();
  });
  it("should render different Input sizes on size property", () => {
    render(<Input placeholder="size" size="lg" />);
    const testNode = screen.getByTestId("test-input");
    expect(testNode).toBeInTheDocument();
    expect(testNode).toHaveClass("input-lg");
  });
  it("should render the Input with addonBefore/addonAfter", () => {
    render(<Input addonBefore={"https://"} addonAfter={".com"} />);
    const testNode = screen.getByTestId("test-input");
    expect(testNode).toBeInTheDocument();
    expect(testNode).toHaveClass(
      "input-group-addonBefore input-group-addonAfter"
    );
    expect(screen.getByText("https://")).toBeInTheDocument();
    expect(screen.getByText(".com")).toBeInTheDocument();
  });
});
