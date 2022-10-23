import React from "react";
import classNames from "classnames";

type ButtonSize = "lg" | "sm";

type ButtonType = "primary" | "default" | "danger" | "link";

interface BaseButtonProps {
  className?: string;
  /**设置 Button 的禁用 */
  disabled?: boolean;
  /**设置 Button 的类型 */
  btnType?: ButtonType;
  /**设置 Button 的尺寸 */
  size?: ButtonSize;
  href?: string;
  children?: React.ReactNode;
}

type NativeButtonProps = BaseButtonProps &
  React.ButtonHTMLAttributes<HTMLElement>;
type NativeAnchorProps = BaseButtonProps &
  React.AnchorHTMLAttributes<HTMLElement>;

export type ButtonProps = Partial<NativeButtonProps & NativeAnchorProps>;

/**
 * 最常用的按钮元素，支持Html button 和 a 链接的所有属性
 * ### 引用方法
 * ```
 * import Button from "deepDesign";
 * ```
 * @param {*} props
 * @return {*}
 */
export const Button: React.FC<ButtonProps> = (props) => {
  const { className, disabled, btnType, size, href, children, ...restProps } =
    props;
  const classes = classNames("btn", className, {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    disabled: btnType === "link" && disabled,
  });
  if (btnType === "link" && href) {
    return (
      <a href={href} className={classes} {...restProps}>
        {children}
      </a>
    );
  }
  return (
    <button className={classes} disabled={disabled}>
      {children}
    </button>
  );
};

Button.defaultProps = {
  disabled: false,
  btnType: "default",
};

export default Button;
