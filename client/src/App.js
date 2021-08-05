import React, { Fragment, useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";

import Alert from "./components/layout/Alert";
import PrivateRoute from "./components/routing/PrivateRoute";
import CreateProfile from "./components/profile-forms/CreateProfile";

import EditProfile from "./components/profile-forms/EditProfile";
import Profiles from "./components/profiles/Profiles";

//import NotFound from "./components/layout/NotFound";
import Dashboard from "./components/dashboard/Dashboard";
import Myprofile from "./components/dashboard/Myprofile";
import Orders from "./components/orders/Orders";
import Menu from "./components/menu/Menu";
import CreateMenuitem from "./components/menu/CreateMenuitem";
//Redux
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";

import Login from "./components/login/Login";
import Feedback from "./components/feedback/Feedback";
import FeedbcakAdmin from "./components/feedback/FeedbcakAdmin";
import ProfileItem from "./components/profiles/ProfileItem";
import ApplyLeave from "./components/leave/ApplyLeave";
import AdminLeave from "./components/leave/AdminLeave";
import Register from "./components/auth/Register";
if (localStorage.token) {
  setAuthToken(localStorage.token);
}
function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path="/" component={Login} />
          <section className="container">
            <Alert />
            <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute exact path="/orders" component={Orders} />
              <PrivateRoute exact path="/menu" component={Menu} />
              <PrivateRoute exact path="/feedback" component={Feedback} />
              <PrivateRoute exact path="/profiles" component={Profiles} />
              <PrivateRoute exact path="/myprofile" component={Myprofile} />
              <PrivateRoute exact path="/leave" component={ApplyLeave} />
              <PrivateRoute exact path="/adminleave" component={AdminLeave} />
              <PrivateRoute exact path="/adduser" component={Register} />
              <PrivateRoute
                exact
                path="/profileitem/:id"
                component={ProfileItem}
              />
              <PrivateRoute
                exact
                path="/feedbackadmin"
                component={FeedbcakAdmin}
              />
              <PrivateRoute
                exact
                path="/createmenu"
                component={CreateMenuitem}
              />
              <PrivateRoute
                exact
                path="/create-profile"
                component={CreateProfile}
              />
              <PrivateRoute
                exact
                path="/edit-profile"
                component={EditProfile}
              />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
}
export default App;
