import React from "react";
import { CSSTransition } from "react-transition-group";
import { CSSTransitionProps } from "react-transition-group/CSSTransition";

type animation =
  | "zoom-in-top"
  | "zoom-in-left"
  | "zoom-in-right"
  | "zoom-in-bottom";

type TransitionProps = CSSTransitionProps & {
  animation?: animation;
  // add a empty node , avoid transition props is covered
  wrapper?: boolean;
  children?: React.ReactNode;
};

const Transition: React.FC<TransitionProps> = (props) => {
  const { wrapper, classNames, animation, children, ...restProps } = props;
  return (
    <CSSTransition
      classNames={classNames ? classNames : animation}
      {...restProps}
    >
      {wrapper ? <div>{children}</div> : children}
    </CSSTransition>
  );
};

Transition.defaultProps = {
  appear: true,
  unmountOnExit: true,
};

export default Transition;
