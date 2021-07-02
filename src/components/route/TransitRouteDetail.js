import React, { useContext, useEffect, useState } from "react"
import { TransitRouteContext } from "./TransitRouteProvider"
import "./TransitRoute.css"
import { useParams, useHistory } from "react-router-dom"

export const TransitRouteDetail = () => {
    const { transitRoutes, getTransitRoutes, deleteTransitRoute } = useContext(TransitRouteContext)
    const [ transitRoute, setTransitRoute ] = useState({})

    /*
        Given the example URL above, this will store the value
        of 5 in the transitRouteId variable
    */
    const { transitRouteId } = useParams();

    const history = useHistory()

const handleDelete = () => {
    deleteTransitRoute(transitRoute.id)
      .then(() => {
        history.push("/routes")
      })
  }

    useEffect(() => {
        console.log("getTransitRoutes")
        getTransitRoutes()
    },[])
    useEffect(() => {
        console.log("inside useEffect", transitRoutes)
        const thisTransitRoute = transitRoutes.find(a => a.id === parseInt(transitRouteId)) || {} 

        setTransitRoute(thisTransitRoute)
    }, [transitRoutes])
    console.log("component loaded", transitRoutes)
    return (
    <section className="transitRoute">
        <h3 className="transitRoute__name">name: { transitRoute.name }</h3>
        <div className="transitRoute__startLocation">startLocation: { transitRoute.startLocation }</div>
        <div className="transitRoute__endLocation">endLocation: { transitRoute.endLocation }</div>
        <div className="transitRoute__isDelayed">isDelayed: { transitRoute.isDelayed }</div>
        <div className="transitRoute__timeTaken">timeTaken: { transitRoute.timeTaken }</div>
        <button onClick={handleDelete}>Delete Route</button>
        <button onClick={() => {
            history.push(`/routes/edit/${transitRouteId}`)
        }}>Edit Route</button>
    </section>
    )
}