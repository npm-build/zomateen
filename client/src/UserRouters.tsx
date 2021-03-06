import UserHeader from "./components/UserHeader";
import UserNavbar from "./components/UserNavBar";
import UserHome from "./pages/User/Home.pages";
import UserIndividualItem from "./pages/User/IndividualItem.pages";
import UserFavoritesPage from "./pages/User/Favorites.pages";
import UserCartPage from "./pages/User/ShoppingCart.pages";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Route, Redirect, Switch, useLocation } from "react-router-dom";
// import { AnimatePresence } from "framer-motion";
import "./styles/Home.styles.scss";

function App() {
  const location = useLocation();

  return (
    <div id="home-grid">
      <UserNavbar />
      <UserHeader />
      <div id="content">
        {/* <AnimatePresence exitBeforeEnter> */}
        <Switch location={location} key={location.pathname}>
          <Route
            path="/"
            exact
            render={() => <Redirect to="/user/login"></Redirect>}
          />
          <ProtectedRoute
            path="/user/home"
            isExact={true}
            Component={UserHome}
          />
          <Route
            path="/user/food/:foodId"
            exact={true}
            render={(props) => {
              return <UserIndividualItem {...props} />;
            }}
            // Component={UserIndividualItem}
          />
          <ProtectedRoute
            path="/user/favorites"
            isExact={true}
            Component={UserFavoritesPage}
          />
          <ProtectedRoute
            path="/user/cart"
            isExact={true}
            Component={UserCartPage}
          />
        </Switch>
        {/* </AnimatePresence> */}
      </div>
    </div>
  );
}

export default App;
