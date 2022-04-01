import { useLocation, useNavigationType } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import React from "react";
import "./PageAnimation.css";

export function PageAnimation({ children }: React.PropsWithChildren<{}>) {
  const location = useLocation();
  const navType = useNavigationType();

  const getClassName = React.useMemo(() => {
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
    }
  }, [navType]);
  return (
    <>
      <TransitionGroup component={null}>
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
