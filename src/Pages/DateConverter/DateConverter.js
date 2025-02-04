import React, { useState } from "react";
import { getDateChanger } from "../../apiServices/apiServices";
import { CiCalendar } from "react-icons/ci";
import Breadcrumb from "../../Components/Breadcrumb/Breadcrumb";

export const DateConverter = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [convertedDate, setConvertedDate] = useState("");
  const [error, setError] = useState("");

  const formatDateToDDMMYYYY = (date) => {
    const [year, month, day] = date.split("-");
    return `${day}-${month}-${year}`;
  };

  const handleConvert = async () => {
    if (!selectedDate) {
      setError("Please select a date first.");
      setConvertedDate("");
      return;
    }

    const formattedDate = formatDateToDDMMYYYY(selectedDate);

    try {
      const result = await getDateChanger(formattedDate);
      setConvertedDate(result);
      setError("");
    } catch (err) {
      console.error("Conversion Error:", err);
      setError("Failed to convert the date. Please try again.");
      setConvertedDate("");
    }
  };

  return (
    <>
      <div className="relative flex flex-col items-center min-h-screen bg-gradient-to-br from-blue-100 via-white to-gray-100">
        <div className="absolute top-[1px] left-0 hidden sm:block">
          <Breadcrumb pageName="Date Converter: Gregorian to Hijri" />
        </div>
        <div className="absolute top-[1px] left-0 sm:hidden">
          <Breadcrumb pageName="Date Converter: Greg to Hijri" />
        </div>

        {/* SEO-rich content section */}
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg mt-[6.5rem]">
          <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
            Hijri Date Converter: Convert Gregorian to Islamic Dates
          </h1>


          <div className="mb-6">
            <label
              htmlFor="date"
              className="block text-lg font-medium text-gray-700 mb-2"
            >
              Select a Gregorian Date
            </label>
            <div className="relative">
              <CiCalendar
                className="absolute left-3 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400"
                aria-hidden="true"
              />
              <input
                type="date"
                id="date"
                name="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="block w-full pl-12 pr-4 py-3 rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>

          <button
            onClick={handleConvert}
            className="w-full py-3 px-6 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
          >
            Convert to Hijri Date
          </button>

          {convertedDate && typeof convertedDate === "object" && (
            <div className="mt-8 text-green-600">
              <h2 className="text-2xl font-bold text-center mb-4">
                Converted Hijri Date Details
              </h2>
              <table className="table-auto mx-auto border-collapse border border-green-600">
                <thead>
                  <tr>
                    <th className="border border-green-600 px-4 py-2 bg-green-100">
                      Attribute
                    </th>
                    <th className="border border-green-600 px-4 py-2 bg-green-100">
                      Value
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-green-600 px-4 py-2">Hijri Date</td>
                    <td className="border border-green-600 px-4 py-2">
                      {convertedDate.hijri.date}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-green-600 px-4 py-2">Day (EN)</td>
                    <td className="border border-green-600 px-4 py-2">
                      {convertedDate.hijri.weekday.en}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-green-600 px-4 py-2">Day (AR)</td>
                    <td className="border border-green-600 px-4 py-2">
                      {convertedDate.hijri.weekday.ar}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-green-600 px-4 py-2">Month (EN)</td>
                    <td className="border border-green-600 px-4 py-2">
                      {convertedDate.hijri.month.en}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-green-600 px-4 py-2">Month (AR)</td>
                    <td className="border border-green-600 px-4 py-2">
                      {convertedDate.hijri.month.ar}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-green-600 px-4 py-2">Days in Month</td>
                    <td className="border border-green-600 px-4 py-2">
                      {convertedDate.hijri.month.days}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-green-600 px-4 py-2">Year</td>
                    <td className="border border-green-600 px-4 py-2">
                      {convertedDate.hijri.year}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-green-600 px-4 py-2">
                      Year (Designation)
                    </td>
                    <td className="border border-green-600 px-4 py-2">
                      {convertedDate.hijri.designation.expanded}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {error && (
            <p className="mt-4 text-red-600 text-center font-semibold">{error}</p>
          )}
        </div>

        
        <div className="mb-6 bg-blue-50 p-4 rounded-lg">
            <p className="mb-3 text-gray-700">
              <strong>Accurate and reliable Hijri date conversion</strong> for all your Islamic needs. 
              Our Gregorian to Hijri date converter is designed to help Muslims worldwide determine 
              important Islamic dates, plan religious events, and stay connected to the Islamic calendar. 
              Whether you're preparing for Ramadan, Eid, or Hajj, our tool ensures precise date conversion 
              based on the Umm al-Qura calendar.
            </p>

            <h2 className="text-xl font-semibold mt-4 mb-2">
              Why Use Our Hijri Date Converter?
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Convert Gregorian dates to Hijri dates instantly</li>
              <li>Accurate Umm al-Qura calculations</li>
              <li>Supports all Islamic events (Ramadan, Eid, Hajj, etc.)</li>
              <li>Displays Arabic and English month and day names</li>
              <li>Free and easy-to-use interface</li>
            </ul>
          </div>

        {/* Additional SEO content section */}
        <div className="px-4 sm:px-10 pb-8 mt-8">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">
              Importance of the Hijri Calendar in Islam
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>
                The Hijri calendar, also known as the Islamic calendar, is a lunar calendar used by 
                Muslims worldwide to determine the dates of religious events and observances. It is 
                based on the lunar cycle, with each month beginning with the sighting of the new moon. 
                Key Islamic events such as Ramadan, Eid al-Fitr, Eid al-Adha, and Hajj are determined 
                using the Hijri calendar.
              </p>
              <h3 className="text-lg font-semibold mt-4">
                Key Features of the Hijri Calendar
              </h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>12 lunar months in a year</li>
                <li>Approximately 354 or 355 days per year</li>
                <li>Used for Islamic religious observances</li>
                <li>Based on the Umm al-Qura system in Saudi Arabia</li>
              </ul>
            </div>
          </div>

         
        </div>
      </div>
    </>
  );
};

export default DateConverter;