import React, { useContext, useEffect, useState } from "react"
import { TransitRouteContext } from "../route/TransitRouteProvider"
import "./TransitRoute.css"
import { useHistory, useParams } from 'react-router-dom';

export const TransitRouteForm = () => {
  const { addTransitRoute, updateTransitRoute, getTransitRouteById } = useContext(TransitRouteContext)

  /*
  With React, we do not target the DOM with `document.querySelector()`. Instead, our return (render) reacts to state or props.
  Define the intial state of the form inputs with useState()
  */

  const [transitRoute, setTransitRoute] = useState({});

  const [isLoading, setIsLoading] = useState(true);
  
  const {transitRouteId} = useParams();
  const history = useHistory();

  /*
  Reach out to the world and get customers state
  and locations state on initialization.
  */

  //when a field changes, update state. The return will re-render and display based on the values in state
  //Controlled component
  const handleControlledInputChange = (event) => {
    /* When changing a state object or array,
    always create a copy, make changes, and then set state.*/
    const newTransitRoute = { ...transitRoute }
    /* TransitRoute is an object with properties.
    Set the property to the new value
    using object bracket notation. */
    newTransitRoute[event.target.id] = event.target.value
    // update state
    setTransitRoute(newTransitRoute)
  }

  const handleClickSaveTransitRoute = (event) => {
    //Prevents the browser from submitting the form

    if (transitRoute.startLocation === "" || transitRoute.endLocation === "") {
      window.alert("Please select a start and end location")
    } else {
      setIsLoading(true);
      //Invoke addTransitRoute passing the new transitRoute object as an argument
      //Once complete, change the url and display the transitRoute list
      if (transitRouteId){
        updateTransitRoute({
          id: transitRoute.id,
          name: transitRoute.name,
          startLocation: transitRoute.startLocation,
          endLocation: transitRoute.endLocation,
          isDelayed: transitRoute.isDelayed,
          timeTaken: transitRoute.timeTaken
        })
        .then(() => history.push(`/routes/detail/${transitRoute.id}`))
      }else {
        addTransitRoute({
          name: transitRoute.name,
          startLocation: transitRoute.startLocation,
          endLocation: transitRoute.endLocation,
          isDelayed: transitRoute.isDelayed,
          timeTaken: transitRoute.timeTaken
        })
        .then(() => history.push("/routes"))
      }      
    }
  }

  useEffect(() => {
    if (transitRouteId){
      getTransitRouteById(transitRouteId)
      .then(transitRoute => {
        setTransitRoute(transitRoute)
        setIsLoading(false)
      })
    } else {
      setIsLoading(false)
    }
  }, [])


  return (
    <form className="transitRouteForm">
      <h2 className="transitRouteForm__title">New TransitRoute</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="name">Transit Route Name:</label>
          <input type="text" id="name" required autoFocus className="form-control" placeholder="Transit Route Name" value={transitRoute.name} onChange={handleControlledInputChange} />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="startLocation">Transit Route Start Location:</label>
          <input type="text" id="startLocation" required autoFocus className="form-control" placeholder="Transit Route Start Location" value={transitRoute.startLocation} onChange={handleControlledInputChange} />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="endLocation">Transit Route End Location:</label>
          <input type="text" id="endLocation" required autoFocus className="form-control" placeholder="Transit Route End Location" value={transitRoute.endLocation} onChange={handleControlledInputChange} />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="isDelayed">Transit Route Time Delayed:</label>
          <input type="text" id="isDelayed" required autoFocus className="form-control" placeholder="Transit Route Time Delayed" value={transitRoute.isDelayed} onChange={handleControlledInputChange} />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="timeTaken">Transit Route Time Taken:</label>
          <input type="text" id="timeTaken" required autoFocus className="form-control" placeholder="Transit Route Time Taken" value={transitRoute.timeTaken} onChange={handleControlledInputChange} />
        </div>
      </fieldset>
      <button className="btn btn-primary" disabled={isLoading} onClick={event => {
        event.preventDefault()
        handleClickSaveTransitRoute()
      }}>
        {transitRouteId ? <>Save Route</> : <>Add Route</>}</button>
    </form>
  )
}