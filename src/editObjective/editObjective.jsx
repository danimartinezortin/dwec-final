import { useEffect, useState } from "react"
import localStorageFunctions from "../localStorage/localStorage";
import { useParams } from "react-router-dom";
const EditObjective = () => {
    const todayDate = new Date().toISOString().substring(0, 10);
    const {id} = useParams()
    const [hours, setHours] = useState(0)
    const [date, setDate] = useState(todayDate);
    const [name, setName] = useState("");
    const [dailyWork, setDailyWork] = useState({monday: 0, tuesday: 0, wednesday: 0, thursday: 0, friday: 0, saturday: 0, sunday: 0});
    const [expectedMisses, setExpectedMisses] = useState([]);
    const [missDay, setMissDay] = useState("");
    const [missReason, setMissReason] = useState("");
    const {getObjectiveById} = localStorageFunctions();

    useEffect(
        () => {
            const objective = getObjectiveById(id);
            setDate(objective.date);
            setName(objective.name);
            setHours(objective.hours)
            setDailyWork(objective.dailyWork);
            setExpectedMisses(objective.expectedMisses);
      }, [id])

    const {updateObjective, getAllObjectives} = localStorageFunctions();

    const handleDateChange = (ev) => {
        setDate(ev.target.value);
    }

    const handleNameChange = (ev) => {
        setName(ev.target.value);
    }

    const handleDailyWorkChange = (ev) => {
        setDailyWork({...dailyWork, [ev.target.name]: ev.target.value})
    }

    const handleExpectedMissesChange = (ev) => {
        console.log(missDay, missReason)
        setExpectedMisses([...expectedMisses, {missDay: missDay, missReason: missReason}]);
    }

    const removeExpectedMissesChange = (item) => {
        setExpectedMisses(expectedMisses.filter(el => el.missDay !== item.missDay));
    }

    const handleFormSubmit = (ev) => {
        ev.preventDefault();
        ev.stopPropagation();
        console.log({name: name, date: date, dailyWork: dailyWork, expectedMisses: expectedMisses});

        updateObjective({id: id, name: name, hours: hours, date: date, dailyWork: dailyWork, expectedMisses: expectedMisses})
        console.log(getAllObjectives());
    }

    return (
        <form onSubmit={handleFormSubmit}>
            <div>
                <label htmlFor="start-date">Fecha inicio</label>
                <input type="date" id="start-date" name="startDate" value={date} onChange={handleDateChange}></input>
            </div>
            <div>
                <label htmlFor="name">name</label>
                <input type="text" id="name" name="name" value={name} onChange={handleNameChange}></input>
            </div>
            <div>
                <label htmlFor="hours">horas</label>
                <input type="number" id="hours" name="hours" value={hours} onChange={(ev) => setHours(ev.target.value)}></input>
            </div>
            <div>
                <ul>
                    <li>
                        <label htmlFor="monday">Monday</label>
                        <input type="number" min="0" id="monday" value={dailyWork.monday} name="monday" onChange={handleDailyWorkChange}></input>
                    </li>
                    <li>
                        <label htmlFor="tuesday">Tuesday</label>
                        <input type="number" min="0" id="tuesday" value={dailyWork.tuesday} name="tuesday" onChange={handleDailyWorkChange}></input>
                    </li>
                    <li>
                        <label htmlFor="wednesday">Wednesday</label>
                        <input type="number" min="0" id="wednesday" value={dailyWork.wednesday} name="wednesday" onChange={handleDailyWorkChange}></input>
                    </li>
                    <li>
                        <label htmlFor="thursday">Thursday</label>
                        <input type="number" min="0" id="thursday" value={dailyWork.thursday} name="thursday" onChange={handleDailyWorkChange}></input>
                    </li>
                    <li>
                        <label htmlFor="friday">Friday</label>
                        <input type="number" min="0" id="friday" value={dailyWork.friday} name="friday" onChange={handleDailyWorkChange}></input>
                    </li>
                    <li>
                        <label htmlFor="saturday">Saturday</label>
                        <input type="number" min="0" id="saturday" value={dailyWork.saturday} name="saturday" onChange={handleDailyWorkChange}></input>
                    </li>
                    <li>
                        <label htmlFor="sunday">Sunday</label>
                        <input type="number" min="0" id="sunday" value={dailyWork.sunday} name="sunday" onChange={handleDailyWorkChange}></input>
                    </li>
                </ul>
            </div>
            <div>
                <label htmlFor="expected-misses">Expected misses on objective</label>
                <input type="date" id="expected-misses" name="expectedMisses" onChange={(ev) => setMissDay(ev.target.value)}></input>
                <label htmlFor="miss-reason">Reason</label>
                <input type="text" name="missReason" id="miss-reason" onChange={(ev) => setMissReason(ev.target.value)}></input>
                <button type="button" onClick={handleExpectedMissesChange}>Add miss</button>
            </div>
            <div>
                Expected misses:
                <ul>
                {expectedMisses.map(i => <li key={i.missDay + i.missReason}>{i.missDay} - {i.missReason} | <button type="button" onClick={() => removeExpectedMissesChange(i)}>remove day</button></li>)}
                </ul>
            </div>
            <button type="submit">Save</button>
        </form>
    )
}

export default EditObjective