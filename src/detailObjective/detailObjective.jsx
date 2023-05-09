import localStorageFunctions from "../localStorage/localStorage";
import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react"
import ProgressBar from "@ramonak/react-progress-bar";

const DetailObjective = () => {
    const todayDate = new Date().toISOString().substring(0, 10);
    const {id} = useParams();
    const [hours, setHours] = useState(0)
    const [date, setDate] = useState(todayDate);
    const [name, setName] = useState("");
    const [dailyWork, setDailyWork] = useState({monday: 0, tuesday: 0, wednesday: 0, thursday: 0, friday: 0, saturday: 0, sunday: 0});
    const [expectedMisses, setExpectedMisses] = useState([]);
    const {getObjectiveById} = localStorageFunctions();
    const [expectedEnding, setExpectedEnding] = useState("");
    const [progressBar, setProgressBar] = useState(0);
    const ref = useRef();

    const getAllData = () => {
        const objective = getObjectiveById(id);

        setDate(objective.date);
        setName(objective.name);
        setHours(objective.hours)
        setDailyWork(objective.dailyWork);
        setExpectedMisses(objective.expectedMisses);

        

    }
    
    useEffect(() => {
        getAllData();
      }, [ref]);

    useEffect(() => {
        const simulationResult = simulate();
        setExpectedEnding(simulationResult.end);
        const process = ((hours-simulationResult.hoursLeft)/hours)*100;
        setProgressBar(<ProgressBar completed={process} bgColor="green" animateOnRender={true} />);
    }, [expectedMisses])

      const simulate = () => {

        const dayMap = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
        let remaining = hours;
        let expectedEnding = new Date(Date.parse(date));
        let hoursLeft = 0;
        while(remaining > 0){
            if(expectedEnding.toISOString().substring(0, 10) == todayDate){
                hoursLeft = remaining;
            }
            expectedEnding = new Date(Date.parse(expectedEnding));
            expectedEnding.setDate(expectedEnding.getDate() + 1)
            const formatDate = expectedEnding.toISOString().substring(0, 10);
            if(!expectedMisses.filter(d => d.missDay == formatDate).length > 0){
                console.log(formatDate)
                remaining = remaining - dailyWork[dayMap[expectedEnding.getDay()]];
            }

        }
        return {end: expectedEnding.toISOString().substring(0, 10), hoursLeft: hoursLeft}
      }
    


      return (
        <div>
            <ul>
                <li>
                    Nombre: {name}
                </li>
                <li>
                    Comienzo: {date}
                </li>
                <li>
                    Duración: {hours}
                </li>
            </ul>
            <table>
                <thead>
                    <tr>
                        <th>Calendario</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            Lunes
                        </td>
                        <td>
                            Martes
                        </td>
                        <td>
                            Miercoles
                        </td>
                        <td>
                            Jueves
                        </td>
                        <td>
                            Viernes
                        </td>
                        <td>
                            Sabado
                        </td>
                        <td>
                            Domingo
                        </td>
                    </tr>
                    <tr>
                        <td>
                            {dailyWork.monday}
                        </td>
                        <td>
                            {dailyWork.tuesday}
                        </td>
                        <td>
                            {dailyWork.wednesday}
                        </td>
                        <td>
                            {dailyWork.thursday}
                        </td>
                        <td>
                            {dailyWork.friday}
                        </td>
                        <td>
                            {dailyWork.saturday}
                        </td>
                        <td>
                            {dailyWork.sunday}
                        </td>
                    </tr>
                </tbody>

            </table>
            <p>
                Expected ending: {expectedEnding}
            </p>
            <div>
                {progressBar}
            </div>
        </div>
      )
}

export default DetailObjective;