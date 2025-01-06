import axios from "axios"


const Calendar_BaseUrl = `http://api.aladhan.com/v1/gToHCalendar/`;
const PrayerTime_BaseUrl = `http://api.aladhan.com/v1/calendarByCity/`;
const quran_edition_BaseUrl = `http://api.alquran.cloud/v1/edition`;
const quran_edition_with_audio_BaseUrl=`http://api.alquran.cloud/v1/quran/`

 const getCalendar = async (year, month) => {
    try {
        const response = await axios.get(`${Calendar_BaseUrl}${year}/${month}`)
        return response.data.data;
    } catch (error) {
        console.error(error)
    }
};

const getPrayerTime = async (city, country, method, year, month) => {
    try {
        const response = await axios.get(`${PrayerTime_BaseUrl}${year}/${month}?city=${city}&country=${country}&method=${method}`)
        return response.data.data;
    } catch (error) {
        console.error(error)
    }
};

const getQuranAudio = async (edition) => {
    try {
        const response = await axios.get(`${quran_edition_with_audio_BaseUrl}${edition}`)
        return response.data.data;
    } catch (error) {
        console.error(error)
    }
};




const getQuranEditionOnlyName= async () => {
    try {
        const response = await axios.get(`${quran_edition_BaseUrl}`)
        return response.data.data;
    } catch (error) {
        console.error(error)
    }
};


export { getCalendar,getPrayerTime,getQuranEditionOnlyName,getQuranAudio };