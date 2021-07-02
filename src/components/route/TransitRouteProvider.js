import React, { useState, createContext } from "react"

const transitRoutesURL = "http://localhost:8088/transitRoutes"; 
// The context is imported and used by individual components that need data
export const TransitRouteContext = createContext()

// This component establishes what data can be used.
export const TransitRouteProvider = (props) => {
    const [transitRoutes, setTransitRoutes] = useState([])

    const getTransitRoutes = () => {
        return fetch(transitRoutesURL)
        .then(res => res.json())
        .then(setTransitRoutes)
    }

    const getTransitRouteById = (id) => {
        return fetch(`${transitRoutesURL}/${id}`)
        .then(res => res.json())
    }

    const addTransitRoute = transitRouteObj => {
        return fetch(transitRoutesURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(transitRouteObj)
        })
        .then(response => response.json())
    }

    const updateTransitRoute = transitRouteObj => {
        return fetch(`${transitRoutesURL}/${transitRouteObj.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(transitRouteObj)
        })
        .then(getTransitRoutes)
    }

    const deleteTransitRoute = transitRouteId => {
        return fetch(`${transitRoutesURL}/${transitRouteId}`, {
            method: "DELETE",
        })
        .then(getTransitRoutes)
    }
        
    /*
        You return a context provider which has the
        `transitRoutes` state, `getTransitRoutes` function,
        and the `addTransitRoute` function as keys. This
        allows any child elements to access them.
    */
    return (
        <TransitRouteContext.Provider value={{
            transitRoutes, getTransitRoutes, addTransitRoute, updateTransitRoute, deleteTransitRoute, getTransitRouteById
        }}>
            {props.children}
        </TransitRouteContext.Provider>
    )
}