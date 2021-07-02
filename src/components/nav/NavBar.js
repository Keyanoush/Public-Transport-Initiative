import React from "react"
import { Link } from "react-router-dom"
import "./NavBar.css"

export const NavBar = (props) => {
    return (
        <ul className="navbar">
            <li className="navbar__item active">
                <Link className="navbar__link" to="/">PTI</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/routes">Routes</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link"
                    onClick={
                        (event) => {
                            localStorage.removeItem("pti_user")
                        }
                    }
                >Logout</Link>
            </li>
        </ul>
    )
}