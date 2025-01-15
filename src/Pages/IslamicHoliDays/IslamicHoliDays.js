import React, { useEffect, useState } from "react";
import { getIslamicHoliDays } from "../../apiServices/apiServices";




const IslamicHolidayPage = () => {

  const [holidays, setholidays] = useState([]);
    const [hijriYear, sethijriYear] = useState(null)
useEffect(()=>{
   const fetchHoliday=async()=>{
        try {
            const response = await getIslamicHoliDays(hijriYear);
            setholidays(response);
        } catch (error) {
            console.log(error);
            
        }
    }
    fetchHoliday();
},[hijriYear])

console.log("holidays: ", holidays);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 mt-[4.7rem]">
      {/* Header */}
      <header className=" text-gray-700 py-6 shadow-sm">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl font-bold">Islamic Holidays 2025</h1>
          <p className="mt-2">Explore important Islamic holidays and their dates in the Gregorian calendar.</p>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row justify-center items-center space-x-3 space-y-2 bg-gray-100 p-4 rounded-lg shadow-md w-full ">
  {/* Label */}
  <label 
    htmlFor="hijriYear" 
    className="text-blue-700 text-xl font-semibold"
  >
    Enter a Hijri Year:
  </label>

  {/* Input */}
  <input
    type="number"
    id="hijriYear"
    name="hijriYear"
    onChange={(e) => sethijriYear(e.target.value)}
    className="w-full max-w-sm px-4 py-2 border border-teal-400 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none"
    placeholder="e.g., 1445"
  />
</div>



      {hijriYear!=null && holidays.length > 0 ? (
      <div>
      {/* Holidays Table */}
      <main className="container mx-auto py-8 px-4">
        <h2 className="text-2xl font-semibold mb-6">List of Islamic Holidays</h2>
        <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-teal-600 text-white">
            <tr>
              <th className="py-3 px-6 text-left">Holiday</th>
              <th className="py-3 px-6 text-left">Description</th>
              <th className="py-3 px-6 text-left">Gregorian Date</th>
            </tr>
          </thead>
          <tbody>
            {holidays.map((holiday, index) => (
              <tr key={index} className={`border-b ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}>
                <td className="py-3 px-6">{holiday.hijri.date}</td>
                <td className="py-3 px-6">{holiday.hijri.holidays[0]}</td>
                <td className="py-3 px-6">{holiday.gregorian.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
      </div> 
      ) :(
        <p className="text-xl text-red-700 font-semibold text-center py-36">Please Enter a Hijri Year</p>
      )
      }


      {/* Additional Section */}


      <section className="bg-gray-200 py-8">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-semibold mb-4">About Islamic Holidays</h2>
          <p className="leading-relaxed">
            Islamic holidays follow the lunar calendar and hold great significance in the Islamic faith. 
            These holidays are observed worldwide with prayers, fasting, charity, and communal celebrations. 
            They serve as moments of reflection, gratitude, and connection with the divine.
          </p>
        </div>
      </section>


    </div>
    
  );
};

export default IslamicHolidayPage;
