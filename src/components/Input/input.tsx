import React, { ReactElement, InputHTMLAttributes, ChangeEvent } from "react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import classNames from "classnames";
import Icon from "../Icon/icon";
type InputSize = "lg" | "sm";
export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLElement>, "size"> {
  /**是否禁用 Input */
  disabled?: boolean;
  /**设置 input 大小，支持 lg 或者是 sm */
  size?: InputSize;
  /**添加图标，在右侧悬浮添加一个图标，用于提示 */
  icon?: IconProp;
  /**添加前缀 用于配置一些固定组合 */
  addonBefore?: string | ReactElement;
  /**添加后缀 用于配置一些固定组合 */
  addonAfter?: string | ReactElement;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => {};
}

/**
 * Input 输入框 通过鼠标或键盘输入内容，是最基础的表单域的包装。
 *
 * 支持 HTMLInput 的所有基本属性
 */
export const Input: React.FC<InputProps> = (props) => {
  const { disabled, size, icon, addonBefore, addonAfter, style, ...restProps } =
    props;
  const classes = classNames("deep-input-wrapper", {
    [`input-${size}`]: size,
    "input-group": addonBefore || addonAfter,
    "input-group-addonBefore": addonBefore,
    "input-group-addonAfter": addonAfter,
    disabled: disabled,
  });
  if ("value" in restProps) {
    delete restProps.defaultValue;
    if (typeof restProps.value === "undefined" || restProps.value === null) {
      restProps.value = "";
    }
  }
  return (
    <div className={classes} style={style} data-testid={"test-input"}>
      {addonBefore && (
        <div className="deep-input-group-addonBefore">{addonBefore}</div>
      )}
      {icon && (
        <div className="icon-wrapper">
          <Icon icon={icon} className="input-icon"></Icon>
        </div>
      )}
      <input className="deep-input-inner" disabled={disabled} {...restProps} />

      {addonAfter && (
        <div className="deep-input-group-addonAfter">{addonAfter}</div>
      )}
    </div>
  );
};

export default Input;
