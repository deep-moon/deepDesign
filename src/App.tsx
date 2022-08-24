/*
 * @Author: deep moon
 * @Date: 2022-08-23 17:21:01
 * @LastEditTime: 2022-08-23 18:25:01
 * @LastEditors: deep moon
 * @Description:
 * @FilePath: /deepDesign/src/App.tsx
 */
import React from "react";
import "./App.css";
import Button, { ButtonType, ButtonSize } from "./components/Button/button";

function App() {
  return (
    <div className="App">
      <Button autoFocus>123</Button>
      <Button disabled>123</Button>
      <Button
        btnType={ButtonType.Primary}
        size={ButtonSize.Large}
        onClick={() => alert("111")}
      >
        111
      </Button>
      <Button btnType={ButtonType.Danger} size={ButtonSize.Large}>
        111
      </Button>
      <Button size={ButtonSize.Large} disabled>
        large disable
      </Button>
      <Button size={ButtonSize.Small}>small</Button>
      <Button btnType={ButtonType.Link} href={"#"}>
        link
      </Button>
      <Button btnType={ButtonType.Link} href={"#"} disabled>
        link
      </Button>
    </div>
  );
}

export default App;
