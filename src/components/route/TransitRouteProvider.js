import React, { useState, createContext } from "react"

// The context is imported and used by individual components that need data
export const TransitRouteContext = createContext()

// This component establishes what data can be used.
export const TransitRouteProvider = (props) => {
    const [transitRoutes, setTransitRoutes] = useState([])

    const getTransitRoutes = () => {
        return fetch("http://localhost:8088/transitRoutes")
        .then(res => res.json())
        .then(setTransitRoutes)
    }

    const addTransitRoute = transitRoute => {
        return fetch("http://localhost:8088/transitRoutes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(transitRoute)
        })
        .then(response => response.json())
    }

    /*
        You return a context provider which has the
        `transitRoutes` state, `getTransitRoutes` function,
        and the `addTransitRoute` function as keys. This
        allows any child elements to access them.
    */
    return (
        <TransitRouteContext.Provider value={{
            transitRoutes, getTransitRoutes, addTransitRoute
        }}>
            {props.children}
        </TransitRouteContext.Provider>
    )
}