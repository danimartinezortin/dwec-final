import localStorageFunctions from "../localStorage/localStorage";
import { useEffect, useState, useRef } from "react"

const ObjectiveStadistics = () => {
    const todayDate = new Date().toISOString().substring(0, 10);
    const [objectives, setObjectives] = useState([])
    const {getAllObjectives} = localStorageFunctions();
    const [stadistics, setStadistics] = useState({sumOfDays:0, totalObjectives: 0})
    const getAllData = () => {
        setObjectives(getAllObjectives())
    }
    const ref = useRef();

    
    
    useEffect(() => {
        getAllData();
      }, [ref]);

    useEffect(() => {
        const simulationResult = simulate();
    }, [objectives])

    const simulate = () => {
        let sumOfDays = 0;
        let sum = 0;
        const dayMap = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
        objectives.forEach(o => {
            console.log(o)
            let remaining = o.hours;
            let expectedEnding = new Date(Date.parse(o.date));
            let hoursLeft = 0;
            while(remaining > 0){
                if(expectedEnding.toISOString().substring(0, 10) == todayDate){
                    hoursLeft = remaining;
                }
                expectedEnding = new Date(Date.parse(expectedEnding));
                expectedEnding.setDate(expectedEnding.getDate() + 1)
                const formatDate = expectedEnding.toISOString().substring(0, 10);
                if(!o.expectedMisses.filter(d => d.missDay == formatDate).length > 0){
                    console.log(formatDate)
                    remaining = remaining - o.dailyWork[dayMap[expectedEnding.getDay()]];
                }    
            }
            const startDate = new Date(Date.parse(o.date));;
            let result = expectedEnding - startDate;
            sumOfDays += Math.ceil(result / (1000 * 3600 * 24));
            sum++;
        })
        setStadistics({sumOfDays: sumOfDays, totalObjectives: sum})

      }

    return (
        <div>
            <p>
                Media de duración de objetivos en tiempo absoluto: {stadistics.sumOfDays/stadistics.totalObjectives}
            </p>
            <p>
                Total de objetivos: {stadistics.totalObjectives}
            </p>
        </div>
    );
}

export default ObjectiveStadistics