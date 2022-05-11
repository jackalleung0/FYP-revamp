import { useLocation, useNavigationType } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import React from "react";
import "./PageAnimation.css";

export function PageAnimation({
  children,
  style,
}: React.PropsWithChildren<{ style?: any }>) {
  const location = useLocation();
  const navType = useNavigationType();

  const getClassName = React.useMemo(() => {
    console.log(navType);
    switch (navType) {
      // next
      case "PUSH":
        // slide in, from rhs to lhs
        return "right-to-left";
      // previous
      case "POP":
        // slide in, from rhs to lhs
        return "left-to-right";
      // set root
      case "REPLACE":
        return "fade";
      default:
        return "fade";
    }
  }, [navType]);
  return (
    <>
      <TransitionGroup
        style={{
          overflowX: "hidden",
          ...style,
        }}
      >
        <CSSTransition
          key={location.key}
          classNames={getClassName}
          timeout={300}
        >
          {children}
        </CSSTransition>
      </TransitionGroup>
    </>
  );
}
