import React from "react";
import Button from "./button";
import { ComponentMeta, ComponentStory } from "@storybook/react";
// import mdx from "./button.mdx";

const buttonMeta: ComponentMeta<typeof Button> = {
  title: "Button组件",
  id: "Button",
  component: Button,
  // parameters: {
  //   docs: {
  //     page: mdx,
  //   },
  // },
};
export default buttonMeta;

const Template: ComponentStory<typeof Button> = (args) => (
  <Button {...args}></Button>
);
export const Default = Template.bind({});
Default.args = {
  children: "Default",
};
// decorators 使用
// Default.decorators = [
//   (Story) => (
//     <div style={{ margin: "10px 10px" }}>
//       <Story></Story>
//     </div>
//   ),
// ];
// export const Default: ComponentStory<typeof Button> = (args) => (
//   <Button {...args}>Default</Button>
// );
// Default.storyName = "默认按钮";
export const Small = Template.bind({});
Small.args = {
  size: "sm",
  children: "Small",
};
export const Large = Template.bind({});
Large.args = {
  size: "lg",
  children: "Large",
};
export const Primary = Template.bind({});
Primary.args = {
  btnType: "primary",
  children: "Primary",
};
export const Danger = Template.bind({});
Danger.args = {
  btnType: "danger",
  children: "Danger",
};
export const Link = Template.bind({});
Link.args = {
  btnType: "link",
  children: "www.baidu.com",
  href: "www.baidu.com",
};
