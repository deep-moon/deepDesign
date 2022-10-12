/*
 * @Author: deep moon
 * @Date: 2022-08-23 17:21:01
 * @LastEditTime: 2022-09-22 17:34:54
 * @LastEditors: deep moon
 * @Description:
 * @FilePath: \deepDesign\src\App.tsx
 */
import "./App.css";
import Button from "./components/Button/button";
import Menu from "./components/Menu/menu";
import MenuItem from "./components/Menu/menuItem";
import SubMenu from "./components/Menu/subMenu";

function App() {
  return (
    <div className="App">
      <Menu
        // mode={"horizontal"}
        onSelect={(index) => console.log(index)}
        // defaultOpenSubMenus={["3"]}
      >
        <MenuItem>0</MenuItem>
        <MenuItem>1</MenuItem>
        <MenuItem disabled>2</MenuItem>
        <SubMenu title="submenu">
          <MenuItem>submenu</MenuItem>
        </SubMenu>
      </Menu>
      <Button autoFocus>123</Button>
      <Button disabled>123</Button>
      <Button btnType={"primary"} size={"lg"} onClick={() => alert("111")}>
        111
      </Button>
      <Button btnType={"danger"} size={"lg"}>
        111
      </Button>
      <Button size={"lg"} disabled>
        large disable
      </Button>
      <Button size={"sm"}>small</Button>
      <Button btnType={"link"} href={"#"}>
        link
      </Button>
      <Button btnType={"link"} href={"#"} disabled>
        link
      </Button>
    </div>
  );
}

export default App;
