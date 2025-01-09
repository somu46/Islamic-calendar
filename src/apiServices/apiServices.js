import axios from "axios"


const Calendar_BaseUrl = `http://api.aladhan.com/v1/gToHCalendar/`;
const PrayerTime_BaseUrl = `http://api.aladhan.com/v1/calendarByCity/`;
const quran_edition_BaseUrl = `http://api.alquran.cloud/v1/edition`;
const quran_edition_with_audio_BaseUrl=`http://api.alquran.cloud/v1/quran/`;
const Date_Changer_BaseUrl=`https://api.aladhan.com/v1/gToH/`;
const PrayerTimeByAddress_BaseUrl = `https://api.aladhan.com/v1/timingsByAddress/`;

 const getCalendar = async (year, month) => {
    try {
        const response = await axios.get(`${Calendar_BaseUrl}${year}/${month}`)
        return response.data.data;
    } catch (error) {
        console.error(error)
    }
};

const getDateChanger=async(date)=>{
    try{
        const response=await axios.get(`${Date_Changer_BaseUrl}${date}`)
        return response.data.data;
        }catch(error){
            console.error(error)
            }
}


const getPrayerTimeOfDayByAddress = async (date = "09-01-2025", address = "Kolkata,India") => {
  try {
    const response = await axios.get(`${PrayerTimeByAddress_BaseUrl}${date}?address=${address}`, {
      maxRedirects: 5,
    });
    return response.data.data; // Return the prayer data
  } catch (error) {
    console.error("Error fetching prayer times from API:", error.message);
    throw error; // Re-throw to handle in the component
  }
};



const getPrayerTime = async (city, country, method=1, year, month) => {
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


export { getCalendar,getPrayerTime,getQuranEditionOnlyName,getQuranAudio,getDateChanger,getPrayerTimeOfDayByAddress};