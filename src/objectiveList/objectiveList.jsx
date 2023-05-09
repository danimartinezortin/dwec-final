import { NavLink } from 'react-router-dom';
import localStorageFunctions from '../localStorage/localStorage';
import { useState } from 'react';
function ObjectiveList() {
    const {getAllObjectives} = localStorageFunctions();
    const [objectives, setObjectives] = useState(getAllObjectives());
    return (
        <div>
            <ul>
                {objectives.map(i => 
                <li key={i.id}>{i.name} - {i.date} 
                <NavLink to={`/edit-objective/${i.id}`}>Edit</NavLink>
                <NavLink to={`/delete-objective/${i.id}`}>Delete</NavLink>
                <NavLink to={`/show-objective/${i.id}`}>Detail</NavLink>
                </li>)}
            </ul>
        </div>
    );
}

export default ObjectiveList;
