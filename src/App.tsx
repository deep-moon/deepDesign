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
import Icon from "./components/Icon/icon";
import Transition from "./components/Transition/transition";
import { library, Library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
library.add(fas);

function App() {
  const [show, setShow] = useState<boolean>(false);
  return (
    <div className="App">
      <Icon icon={"angle-down"} theme={"danger"} size={"10x"} />
      <Menu
        // mode={"vertical"}
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
      <Button size="lg" onClick={() => setShow(!show)}>
        Toggle
      </Button>
      <Transition in={show} timeout={300} animation={"zoom-in-top"}>
        <p>
          <p>123123asdhgdhsa</p>
          <p>123123asdhgdhsa</p>
          <p>123123asdhgdhsa</p>
          <p>123123asdhgdhsa</p>
        </p>
      </Transition>
      <Transition in={show} timeout={300} animation={"zoom-in-top"} wrapper>
        <Button size="lg" btnType="primary">
          a large button
        </Button>
      </Transition>
    </div>
  );
}

export default App;
