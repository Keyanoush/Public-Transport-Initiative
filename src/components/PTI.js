import React from "react";
import "./PTI.css";
import { Route, Redirect } from "react-router-dom";
import { Login } from "./auth/Login";
import { Register } from "./auth/Register";

export const PTI = () => (
<>
<Route
      render={() => {
        if (localStorage.getItem("pti_user")) {
          return (
            <>
              <main>
                <h1>Public Transport Initiative</h1>
                <h3>About Us</h3>
                <div>This site is for anyone who wants to use public transport but has difficulty finding all the information for public transportation routes. We provide you with all the information you need to get to your destination all you have to do is put in where you want to go! Don't worry if you make any mistakes or need to make changes becasue you will be able to delete and edit your routes as well! </div>
              </main>
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

