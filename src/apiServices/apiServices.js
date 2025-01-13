import axios from "axios"

//this all are aladhan and alquran cloud api url
const Calendar_BaseUrl = `https://api.aladhan.com/v1/gToHCalendar/`;
const PrayerTime_BaseUrl = `https://api.aladhan.com/v1/calendarByCity/`; 
const quran_edition_BaseUrl = `https://api.alquran.cloud/v1/edition`; 
const quran_edition_with_audio_BaseUrl = `https://api.alquran.cloud/v1/quran/`;
const Date_Changer_BaseUrl = `https://api.aladhan.com/v1/gToH/`; 
const PrayerTimeByAddress_BaseUrl = `https://api.aladhan.com/v1/timingsByAddress/`;
const Quran_Juz_url = `https://api.alquran.cloud/v1/juz/1/quran-uthmani?offset=3&limit=10`; 

//this all are country state and city api url
const Country_BaseUrl = `https://restcountries.com/v3.1/region/`;
const Country_City_BaseUrl = `https://countriesnow.space/api/v0.1/countries/cities`;

//This are all the api services of aladhan and alquran cloud api

 const getCalendar = async (year, month) => {
    try {
        const response = await axios.get(`${Calendar_BaseUrl}${year}/${month}`)
        return response.data.data;
    } catch (error) {
        console.error(error)
    }
};


const getFullHijriCalendar = async (year) => {
  const hijriCalendar = [];
  for (let month = 1; month <= 12; month++) {
    try {
      const data = await getCalendar(year, month);
      data.forEach((entry) => {
        hijriCalendar.push({
          gregorian: entry.gregorian.date,
          hijri: entry.hijri.date,
          hijri_month: entry.hijri.month.en,
          hijri_year: entry.hijri.year,
        });
      });
    } catch (error) {
      console.error(`Error fetching data for year ${year}, month ${month}:`, error.message);
    }
  }
  return hijriCalendar;
};

const getDateChanger=async(date)=>{
    try{
        const response=await axios.get(`${Date_Changer_BaseUrl}${date}`)
        return response.data.data;
        }catch(error){
            console.error(error)
            }
}

const getQuran_Juz=async()=>{
    try{
        const response=await axios.get(Quran_Juz_url);
        return response.data.data;
    }catch(error){
        console.log(error);
        
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

//This are all the api services for country state and city


const getCountry = async (region) => {
  try {
      const response = await axios.get(`${Country_BaseUrl}${region}`)
      return response;
  } catch (error) {
      console.error(error)
  }
}

const getCountryCity = async (country) => {
  try {
      const response = await axios.get(`${Country_City_BaseUrl}`,
        {
          "country": country,
        }
      )
      return response;
  } catch (error) {
      console.error(error)
  }
}

export {
     getCalendar,
     getPrayerTime,
     getQuranEditionOnlyName,
     getQuranAudio,
     getDateChanger,
     getPrayerTimeOfDayByAddress,
     getQuran_Juz,
     getFullHijriCalendar,
     getCountry
    };