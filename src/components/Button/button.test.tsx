/*
 * @Author: deep moon
 * @Date: 2022-09-22 16:00:55
 * @LastEditTime: 2022-09-22 16:35:07
 * @LastEditors: deep moon
 * @Description:
 * @FilePath: \deepDesign\src\components\Button\button.test.tsx
 */
import { render, screen, fireEvent } from "@testing-library/react";
import Button, { ButtonProps, ButtonSize, ButtonType } from "./button";
const defaultProps = {
  onClick: jest.fn(),
};
const testProps: ButtonProps = {
  btnType: ButtonType.Primary,
  size: ButtonSize.Small,
  className: "test",
};

const disabledProps: ButtonProps = {
  disabled: true,
  onClick: jest.fn(),
};

// test("first react test case", () => {
//   render(<Button>hello</Button>);
//   const element = screen.queryByText("hello");
//   expect(element).toBeTruthy();
//   expect(element).toBeInTheDocument();
// });

describe("test Button component", () => {
  it("should render the correct default button", () => {
    render(<Button {...defaultProps}>hello</Button>);
    const element = screen.getByText("hello") as HTMLButtonElement;
    expect(element).toBeInTheDocument();
    expect(element.tagName).toEqual("BUTTON");
    expect(element).toHaveClass("btn btn-default");
    fireEvent.click(element);
    expect(defaultProps.onClick).toHaveBeenCalled();
    expect(element.disabled).toBeFalsy();
  });

  it("should render the correct component based on different props", () => {
    render(<Button {...testProps}>hello</Button>);
    const element = screen.getByText("hello");
    expect(element).toBeInTheDocument();
    expect(element).toHaveClass("btn btn-primary btn-sm test");
  });

  it("should render a link when btnType equals link and href is provided", () => {
    render(
      <Button btnType={ButtonType.Link} href={"www.baidu.com"}>
        Link
      </Button>
    );
    const element = screen.getByText("Link");
    expect(element).toBeInTheDocument();
    expect(element.tagName).toEqual("A");
    expect(element).toHaveClass("btn btn-link");
    expect(element).toHaveAttribute("href");
  });

  it("should render disabled button when disabled set to true", () => {
    render(<Button {...disabledProps}>disabled</Button>);
    const element = screen.getByText("disabled") as HTMLButtonElement;
    expect(element).toBeInTheDocument();
    expect(element.disabled).toBeTruthy();
    fireEvent.click(element);
    expect(disabledProps.onClick).not.toHaveBeenCalled();
  });
});
