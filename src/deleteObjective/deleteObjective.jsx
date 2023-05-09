import { Navigate, useParams } from "react-router-dom"
import localStorageFunctions from "../localStorage/localStorage";
const DeleteObjective = () => {
    const {id} = useParams();
    
    const {deleteObjective} = localStorageFunctions();
    deleteObjective(id);
    return (
        <Navigate to="/"/>
    )
}
export default DeleteObjective;