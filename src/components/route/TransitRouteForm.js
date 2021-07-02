import React, { useContext, useState } from "react"
import { TransitRouteContext } from "../route/TransitRouteProvider"
import "./TransitRoute.css"
import { useHistory } from 'react-router-dom';

export const TransitRouteForm = () => {
  const { addTransitRoute } = useContext(TransitRouteContext)

  /*
  With React, we do not target the DOM with `document.querySelector()`. Instead, our return (render) reacts to state or props.
  Define the intial state of the form inputs with useState()
  */

  const [transitRoute, setTransitRoute] = useState({
    name: "",
    startLocation: "",
    endLocation: ""
  });

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
    event.preventDefault() //Prevents the browser from submitting the form

    if (transitRoute.startLocation === "" || transitRoute.endLocation === "") {
      window.alert("Please select a start and end location")
    } else {
      //Invoke addTransitRoute passing the new transitRoute object as an argument
      //Once complete, change the url and display the transitRoute list

      const newTransitRoute = {
        name: transitRoute.name,
        startLocation: transitRoute.startLocation,
        endLocation: transitRoute.endLocation
      }
      addTransitRoute(newTransitRoute)
        .then(() => history.push("/routes"))
    }
  }

  return (
    <form className="transitRouteForm">
      <h2 className="transitRouteForm__title">New TransitRoute</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="name">TransitRoute name:</label>
          <input type="text" id="name" required autoFocus className="form-control" placeholder="TransitRoute name" value={transitRoute.name} onChange={handleControlledInputChange} />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="startLocation">TransitRoute startLocation:</label>
          <input type="text" id="startLocation" required autoFocus className="form-control" placeholder="TransitRoute startLocation" value={transitRoute.startLocation} onChange={handleControlledInputChange} />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="endLocation">TransitRoute endLocation:</label>
          <input type="text" id="endLocation" required autoFocus className="form-control" placeholder="TransitRoute endLocation" value={transitRoute.endLocation} onChange={handleControlledInputChange} />
        </div>
      </fieldset>
      <button className="btn btn-primary" onClick={handleClickSaveTransitRoute}>
        Save TransitRoute
          </button>
    </form>
  )
}