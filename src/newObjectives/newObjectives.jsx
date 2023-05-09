import { useEffect, useState } from "react"
import localStorageFunctions from "../localStorage/localStorage";
import apiCAll from "../apiCalls/apiCall";
const NewObjective = () => {
    const todayDate = new Date().toISOString().substring(0, 10);
    const [id, setId] = useState(0);
    const [hours, setHours] = useState(0);
    const [date, setDate] = useState(todayDate);
    const [name, setName] = useState("");
    const [dailyWork, setDailyWork] = useState({monday: 0, tuesday: 0, wednesday: 0, thursday: 0, friday: 0, saturday: 0, sunday: 0});
    const [expectedMisses, setExpectedMisses] = useState([]);
    const [missDay, setMissDay] = useState("");
    const [missReason, setMissReason] = useState("");
    const {saveObjective, getAllObjectives} = localStorageFunctions();

    const {getAllHoliday} = apiCAll();

    useEffect(() => {
        let holidayArr = [];
        getAllHoliday(todayDate.split("-").at(0)).then(res => {
            if(res !== undefined){
                res.forEach(el => {
                    holidayArr.push({missDay: el.date, missReason: el.localName});
                    setExpectedMisses(holidayArr);
                })
            }
        })
    }, [date]);

    const handleDateChange = (ev) => {
        setDate(ev.target.value);
    }

    const handleNameChange = (ev) => {
        setName(ev.target.value);
    }

    const handleDailyWorkChange = (ev) => {
        setDailyWork({...dailyWork, [ev.target.name]: parseInt(ev.target.value)})
    }

    const handleExpectedMissesChange = (ev) => {
        console.log(missDay, missReason)
        setExpectedMisses([...expectedMisses, {missDay: missDay, missReason: missReason}]);
    }

    const removeExpectedMissesChange = (item) => {
        console.log(expectedMisses)
        setExpectedMisses(expectedMisses.filter(el => el.missDay !== item.missDay && el.missReason !== item.missReason));
    }

    const handleFormSubmit = (ev) => {
        ev.preventDefault();
        ev.stopPropagation();
        console.log({name: name, date: date, dailyWork: dailyWork, expectedMisses: expectedMisses});

        saveObjective({id: new Date().getTime(),hours: hours, name: name, date: date, dailyWork: dailyWork, expectedMisses: expectedMisses})
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
                <input type="text" id="name" name="name" onChange={handleNameChange}></input>
            </div>
            <div>
                <label htmlFor="hours">horas</label>
                <input type="number" id="hours" name="hours" onChange={(ev) => setHours(ev.target.value)}></input>
            </div>
            <div>
                <ul>
                    <li>
                        <label htmlFor="monday">Monday</label>
                        <input type="number" min="0" id="monday" name="monday" onChange={handleDailyWorkChange}></input>
                    </li>
                    <li>
                        <label htmlFor="tuesday">Tuesday</label>
                        <input type="number" min="0" id="tuesday" name="tuesday" onChange={handleDailyWorkChange}></input>
                    </li>
                    <li>
                        <label htmlFor="wednesday">Wednesday</label>
                        <input type="number" min="0" id="wednesday" name="wednesday" onChange={handleDailyWorkChange}></input>
                    </li>
                    <li>
                        <label htmlFor="thursday">Thursday</label>
                        <input type="number" min="0" id="thursday" name="thursday" onChange={handleDailyWorkChange}></input>
                    </li>
                    <li>
                        <label htmlFor="friday">Friday</label>
                        <input type="number" min="0" id="friday" name="friday" onChange={handleDailyWorkChange}></input>
                    </li>
                    <li>
                        <label htmlFor="saturday">Saturday</label>
                        <input type="number" min="0" id="saturday" name="saturday" onChange={handleDailyWorkChange}></input>
                    </li>
                    <li>
                        <label htmlFor="sunday">Sunday</label>
                        <input type="number" min="0" id="sunday" name="sunday" onChange={handleDailyWorkChange}></input>
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

export default NewObjective