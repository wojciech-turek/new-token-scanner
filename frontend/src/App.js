import { Redirect, Route, Switch } from "react-router-dom";
import Pancakeswap from "./tables/pages/Pancakeswap";
import Navigation from "./shared/components/Navigation/Navigation";
import Footer from "./shared/components/Footer/Footer";
import React, { Suspense } from "react";
const Login = React.lazy(() => import("./user/pages/Login"));

function App() {
  return (
    <div className="App">
      <Suspense>
        <Navigation />
        <div id="back-to-top-anchor"></div>
        <Switch>
          <Route path="/login" exact>
            <Login />
          </Route>
          <Route path="/signup" exact>
            Users signup
          </Route>
          <Route path="/" exact>
            <Pancakeswap />
          </Route>
          <Redirect to="/" />
        </Switch>
        <Footer />
      </Suspense>
    </div>
  );
}

export default App;
