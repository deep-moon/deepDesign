import React from "react";
import Menu from "./menu";
import SubMenu from "./subMenu";
import MenuItem from "./menuItem";
import { ComponentMeta, ComponentStory } from "@storybook/react";

const MenuMeta: ComponentMeta<typeof Menu> = {
  id: "Menu",
  title: "Menu组件",
  component: Menu,
  subcomponents: {
    SubMenu: SubMenu,
    MenuItem: MenuItem,
  },
  // argTypes: {
  //   defaultIndex: {
  //     control: "color",
  //     description: "test",
  //   },
  // },
};
export default MenuMeta;

const Template: ComponentStory<typeof Menu> = (args) => (
  <Menu {...args}>
    <MenuItem>0</MenuItem>
    <MenuItem>1</MenuItem>
    <MenuItem disabled>2</MenuItem>
    <SubMenu title="submenu">
      <MenuItem>submenu1</MenuItem>
      <MenuItem>submenu2</MenuItem>
    </SubMenu>
  </Menu>
);
export const DefaultMenu = Template.bind({});
DefaultMenu.storyName = "默认Menu";

export const VerticalMenu = Template.bind({});
VerticalMenu.args = {
  defaultIndex: "1",
  mode: "vertical",
};
VerticalMenu.storyName = "纵向Menu";
// VerticalMenu.parameters = {
//   backgrounds: {
//     values: [
//       {
//         name: "red",
//         value: "red",
//       },
//     ],
//   },
// };
// Default.args = {
//   children: "Default",
// };
