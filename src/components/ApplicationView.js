import React from "react"
import { Route } from "react-router-dom"
import { TransitRouteProvider } from "./route/TransitRouteProvider"
import { TransitRoute } from "./route/TransitRoute"
import { TransitRouteForm } from "./route/TransitRouteForm"
import { TransitRouteDetail } from "./route/TransitRouteDetail"


export const ApplicationViews = () => {
    return (
        <>
            <TransitRouteProvider>
                <Route exact path="/">
                <main>
                <h1>Public Transport Initiative</h1>
                <h3>About Us</h3>
                <div>This site is for anyone who wants to use public transport but has difficulty finding all the information for public transportation routes. We provide you with all the information you need to get to your destination all you have to do is put in where you want to go! Don't worry if you make any mistakes or need to make changes becasue you will be able to delete and edit your routes as well! </div>
              </main>
                </Route>
                <Route exact path="/routes">
                    <TransitRoute />
                </Route>
                <Route exact path="/routes/create">
                    <TransitRouteForm />
                </Route>
                <Route exact path="/routes/detail/:transitRouteId(\d+)">
                    <TransitRouteDetail />
                </Route>
                <Route path="/routes/edit/:transitRouteId(\d+)">
                    <TransitRouteForm />
                </Route>
            </TransitRouteProvider>
        </>
    )
}