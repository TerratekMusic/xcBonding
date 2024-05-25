import { Route, Routes } from "react-router-dom";
import { Home } from "./home";
import { Main } from "./main";
import { ProductOwner } from "./productOwner/productOwner";

const routes = [
  { path: "/", Page: Home },
  { path: "/main", Page: Main },
  { path: "/productOwner", Page: ProductOwner },
];

function Routing() {
  const getRoutes = () =>
    routes.map(({ path, Page }) => (
      <Route key={path} path={path} element={<Page />} />
    ));

  return <Routes>{getRoutes()}</Routes>;
}

export { Routing };
