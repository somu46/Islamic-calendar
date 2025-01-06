import { getCalendar, getPrayerTime, getQuranAudio, getQuranEditionOnlyName } from "../apiServices/apiServices";
 


const ApiTest = async () => {

    console.log("ApiTest");
    
    (async () => {
        const data = await getCalendar(2021, 1);
        console.log("data", data);
      }
      )();
      
      (
        async () => {
          const data = await getPrayerTime("Karachi", "Pakistan", 1, 2021, 1);
          console.log("getPrayerTime data:", data);
        }
      )();
      (
        async () => {
          const data=await getQuranEditionOnlyName();
          console.log("getQuranEdition data:", data);
        }
      )();
      (
          async () => {
            console.log("getQuranAudio");
            
            const data=await getQuranAudio("ar.alafasy");
            console.log("getQuranAudio data:", data);
            
          }
        )();
}
export default ApiTest;