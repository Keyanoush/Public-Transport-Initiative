import React from "react";
import "./PTI.css";
import { Route, Redirect } from "react-router-dom";
import { Login } from "./auth/Login";
import { Register } from "./auth/Register";
import { NavBar } from "./nav/NavBar";
import { ApplicationViews } from "./ApplicationView";

export const PTI = () => (
<>
<Route
      render={() => {
        if (localStorage.getItem("pti_user")) {
          return (
            <>
                <NavBar />

              <ApplicationViews />
            </>
          );
        } else {
          return <Redirect to="/login" />;
        }
      }}
    />

    <Route path="/login">
      <Login />
    </Route>
    <Route path="/register">
      <Register />
    </Route>
</>
)

