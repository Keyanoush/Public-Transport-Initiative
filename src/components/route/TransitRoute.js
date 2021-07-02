import React, { useContext, useEffect } from "react"
import { TransitRouteContext } from "./TransitRouteProvider"
import "./TransitRoute.css"
import { useHistory, Link } from "react-router-dom"

export const TransitRoute = () => {
  // This state changes when `getTransitRoutes()` is invoked below
  const { transitRoutes, getTransitRoutes } = useContext(TransitRouteContext)

  //useEffect - reach out to the world for something
  useEffect(() => {
    console.log("TransitRoute: useEffect - getTransitRoutes")
    getTransitRoutes()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const history = useHistory()

  return (
    <>
      <h2>Transit Routes</h2>
      <button onClick={
        () => history.push("/routes/create")
      }>
        Add Transit Route
      </button>
    <div className="transitRoutes">
      {
        transitRoutes.map(transitRoute => <Link to={`/routes/detail/${transitRoute.id}`}>
            <div className="transitRoute" id={`transitRoute--${transitRoute.id}`} key={transitRoute.id}>
              <div className="transitRoute__name">
                Name: { transitRoute.name }
              </div>
            </div>
            </Link>
          )
        }
      
    </div>
    </>
  )
}