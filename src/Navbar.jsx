import React from "react"
import { NavLink } from "react-router-dom"
const Navbar = () => {
    return (
        <ul>
            <li>
                <NavLink to="/">Lista de objetivos</NavLink>
            </li>
            <li>
                <NavLink to="/new-objective">Añadir objetivo</NavLink>
            </li>
            <li>
                <NavLink to="/show-estadistics">Ver estadisticas</NavLink>
            </li>
        </ul>
    )
}

export default Navbar;