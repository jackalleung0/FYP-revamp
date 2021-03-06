import {
  BrowserRouter,
  Outlet,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { LandingPage } from "./GettingStarted";
import { Login } from "./Login";
import { SelectArtwork } from "./SelectArtwork";

import React from "react";
import { PageAnimation } from "./components/PageAnimation";
import { Home } from "./Home";
import { RecentlyViewed } from "./RecentlyViewed";
import { SearchByTag } from "./SearchResult";
import { Search } from "./Search";
import { ArtworkDetail } from "./ArtworkDetail";
import { AboutArtwork } from "./AboutArtwork";
import { AboutArtist } from "./AboutArtist";
import { UserProfile } from "./UserProfile";
import { ArtworkComment } from "./ArtworkComment";

function Rout() {
  // scroll to top when there are page routing event
  const location = useLocation();
  React.useEffect(() => {
    if (location) window.scrollTo(0, 0);
  }, [location]);

  return (
    <PageAnimation>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/select-artwork" element={<SelectArtwork />} />
          <Route path="/home" element={<Home />} />
          <Route path="/user-profile" element={<UserProfile />} />
          <Route path="/recently-viewed" element={<RecentlyViewed />} />
          <Route path="/search-result" element={<SearchByTag />} />
          <Route path="/search" element={<Search />} />
          <Route path="/artwork/:id" element={<ArtworkDetail />} />
          <Route path="/artwork/:id/about" element={<AboutArtwork />} />
          <Route path="/artwork/:id/comment" element={<ArtworkComment />} />
          <Route path="/artwork/:id/about-artist" element={<AboutArtist />} />
        </Route>
      </Routes>
    </PageAnimation>
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
