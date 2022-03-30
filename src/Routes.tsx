import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { LandingPage } from "./GettingStarted";
function Rout() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<LandingPage />} />
          {/* <Route index element={<Home />} />
          <Route path="teams" element={<Teams />}>
            <Route path=":teamId" element={<Team />} />
            <Route path="new" element={<NewTeamForm />} />
            <Route index element={<LeagueStandings />} />
          </Route> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default Rout;

function App() {
  return <Outlet />;
}
function GettingStarted() {
  return <>getting started</>;
}
function Home() {
  return <>Home</>;
}
