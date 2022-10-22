import {
  fireEvent,
  render,
  screen,
  within,
  waitFor,
} from "@testing-library/react";

import Menu, { MenuProps } from "./menu";
import MenuItem from "./menuItem";
import SubMenu from "./subMenu";

jest.mock("../Icon/icon", () => {
  return () => {
    return <i className="fa" />;
  };
});
const testProps: MenuProps = {
  defaultIndex: "0",
  // className: "test",
  onSelect: jest.fn(),
};
const testVerProps: MenuProps = {
  defaultIndex: "0",
  mode: "vertical",
};
const generateMenu = (props: MenuProps) => {
  return (
    <Menu {...props}>
      <MenuItem>active</MenuItem>
      <MenuItem disabled={true}>disabled</MenuItem>
      <MenuItem>test</MenuItem>
      <SubMenu title="submenu">
        <MenuItem>testSubmenu</MenuItem>
      </SubMenu>
    </Menu>
  );
};
let menuElement: HTMLElement,
  activeElement: HTMLElement,
  disabledElement: HTMLElement;

const createStyleFile = () => {
  const cssFile: string = `
  .deep-submenu{
    display: none;
  }
  .deep-submenu.menu-opened {
    display: block;
  }
  `;
  const style = document.createElement("style");
  // style.type = 'text/css'
  style.innerHTML = cssFile;
  return style;
};
describe("test Menu and MenuItem component in default mode", () => {
  beforeEach(() => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    render(generateMenu(testProps));
    menuElement = screen.getByTestId("test-menu");
    menuElement.append(createStyleFile());
    activeElement = screen.getByText("active");
    disabledElement = screen.getByText("disabled");
  });
  it("should render correct Menu and MenuItem based on default props", () => {
    expect(menuElement).toBeInTheDocument();
    expect(menuElement).toHaveClass("deep-menu");
    expect(
      within(menuElement).queryAllByTestId("test-menu-item").length
    ).toEqual(3);
    expect(activeElement).toHaveClass("menu-item is-active");
    expect(disabledElement).toHaveClass("menu-item is-disabled");
  });
  it("click items should change active and call the right callback", () => {
    const thirdElement = screen.getByText("test");
    fireEvent.click(thirdElement);
    expect(thirdElement).toHaveClass("is-active");
    expect(activeElement).not.toHaveClass("is-active");
    expect(testProps.onSelect).toHaveBeenCalledWith("2");
    fireEvent.click(disabledElement);
    expect(disabledElement).not.toHaveClass("is-active");
    expect(testProps.onSelect).not.toHaveBeenCalledWith("1");
  });

  it("should show dropdown items when hover on subMenu", async () => {
    expect(screen.queryByText("testSubmenu")).not.toBeInTheDocument();
    const submenuElement = screen.getByText("submenu");
    fireEvent.mouseEnter(submenuElement);
    await waitFor(() => {
      expect(screen.queryByText("testSubmenu")).toBeVisible();
    });
    fireEvent.click(screen.getByText("testSubmenu"));
    expect(testProps.onSelect).toBeCalledWith("3-0");
    fireEvent.mouseLeave(submenuElement);
    await waitFor(() => {
      expect(screen.queryByText("testSubmenu")).not.toBeVisible();
    });
  });
});
describe("test Menu and MenuItem component in vertical mode", () => {
  beforeEach(() => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    render(generateMenu(testVerProps));
    menuElement = screen.getByTestId("test-menu");
    menuElement.append(createStyleFile());
  });
  it("should render vertical mode when mode is set to vertical", () => {
    expect(menuElement).toHaveClass("menu-vertical");
  });
  it("should show dropdown items when click on subMenu for vertical mode", () => {
    expect(screen.queryByText("testSubmenu")).not.toBeInTheDocument();
    const submenuElement = screen.getByText("submenu");
    fireEvent.click(submenuElement);
    expect(screen.queryByText("testSubmenu")).toBeVisible();
  });
});
