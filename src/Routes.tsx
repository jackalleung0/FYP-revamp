import {
  BrowserRouter,
  Outlet,
  Route,
  Routes,
  useLocation,
  useNavigationType,
} from "react-router-dom";
import { LandingPage } from "./GettingStarted";
import { Login } from "./Login";
import { SelectArtwork } from "./SelectArtwork";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import "./route.css";
import React from "react";

function Rout() {
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
    <TransitionGroup component={null}>
      <CSSTransition key={location.key} classNames={getClassName} timeout={300}>
        <Routes location={location}>
          <Route path="/" element={<App />}>
            <Route index element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/select-artwork" element={<SelectArtwork />} />
            <Route path="/home" element={<Home />} />
          </Route>
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  );
}
export default () => (
  <BrowserRouter>
    <Rout />
  </BrowserRouter>
);

function App() {
  return <Outlet />;
}
function GettingStarted() {
  return <>getting started</>;
}
function Home() {
  return <>Home</>;
}
