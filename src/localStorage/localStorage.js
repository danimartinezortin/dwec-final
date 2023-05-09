const localStorageFunctions = () => {
    const LOCAL_STORAGE_NAME = "objectiveList";
    const saveObjective = (obj) => {
        localStorage.setItem(LOCAL_STORAGE_NAME, JSON.stringify([...getAllObjectives(), obj]))  
    }

    const getAllObjectives = () => {
        if(localStorage.getItem(LOCAL_STORAGE_NAME) != null){
            const data = JSON.parse(localStorage.getItem(LOCAL_STORAGE_NAME));
            return data;
        } else {
            return [];
        }

    }

    const getObjectiveById = (id) => {
        return getAllObjectives().find(el => el.id == id);
    }

    const updateObjective = (obj) => {
        const newList = getAllObjectives();
        localStorage.setItem(LOCAL_STORAGE_NAME, 
            JSON.stringify(
                newList.map(u => {return u.id == obj.id ? obj : u})
            )
        )

    }

    const deleteObjective = (id) => {
        const newList = getAllObjectives();
        localStorage.setItem(LOCAL_STORAGE_NAME, 
            JSON.stringify(
                newList.filter(u => u.id != id)
            )
        )
    }
    return {
        saveObjective,
        getAllObjectives,
        getObjectiveById,
        updateObjective,
        deleteObjective
    }

}

export default localStorageFunctions;