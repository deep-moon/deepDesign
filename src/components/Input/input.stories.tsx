import React from "react";
import Input from "./input";
import { ComponentMeta, ComponentStory } from "@storybook/react";
// import mdx from "./button.mdx";

const InputMeta: ComponentMeta<typeof Input> = {
  title: "Input",
  id: "Input",
  component: Input,
};
export default InputMeta;

const Template: ComponentStory<typeof Input> = (args) => (
  <Input {...args}></Input>
);
export const Default = Template.bind({});

export const Small = Template.bind({});
Small.args = {
  size: "sm",
};
export const Large = Template.bind({});
Large.args = {
  size: "lg",
};
export const inputWithIcon = Template.bind({});
inputWithIcon.args = {
  icon: "coffee",
};
inputWithIcon.storyName = "带图标的input";
export const inputWithDisabled = Template.bind({});
inputWithDisabled.args = {
  disabled: true,
};
inputWithDisabled.storyName = "被禁用的input";

export const inputWithAddonBefore = Template.bind({});
inputWithAddonBefore.args = {
  addonBefore: "https://",
};
inputWithAddonBefore.storyName = "带前缀的input";

export const inputWithAddonAfter = Template.bind({});
inputWithAddonAfter.args = {
  addonAfter: ".com",
};
inputWithAddonAfter.storyName = "带后缀的input";
