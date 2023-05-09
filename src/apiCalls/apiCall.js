import axios from 'axios';

const API_URL = (year) => `https://date.nager.at/api/v3/PublicHolidays/${year}/ES`;

const apiCAll = () => {
    const getAllHoliday = (year) => {
        const request = axios.get(API_URL(year))
        .then(res => res.data)
        .catch(err => console.error(err));
        return request;
    }

    return {
        getAllHoliday,
    }
}

export default apiCAll;