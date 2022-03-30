import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import your route components too

function Rout() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<p>root</p>}>
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
