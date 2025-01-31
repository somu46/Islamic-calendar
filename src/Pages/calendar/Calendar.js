import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { MdOutlineArrowBackIos, MdOutlineArrowForwardIos } from 'react-icons/md';
import FullYearHijriCalendar from './FullYear/FullYearHijriCalendar';
import Indicator from './Indicator';
import Breadcrumb from '../../Components/Breadcrumb/Breadcrumb';
import Modal from '../../Components/Modal/Modal';
import bgimage from "../../Assets/bg1.png";

const IslamicCalendar = () => {
  const [view, setView] = useState("monthly");
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [daysInMonth, setDaysInMonth] = useState([]);
  const [calendarData, setCalendarData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDay, setSelectedDay] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [inputYear, setInputYear] = useState(new Date().getFullYear()); // State for the input year
  const [inputMonth, setInputMonth] = useState(new Date().getMonth() + 1); // State for the input month (1-12)
  const [shouldFetchData, setShouldFetchData] = useState(true); // State to control API call (set to true initially)

  const today = new Date();
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December',
  ];

  const generateDaysInMonth = useCallback((month, year) => {
    const days = [];
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();

    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }

    for (let i = 1; i <= totalDays; i++) {
      days.push(i);
    }

    setDaysInMonth(days);
  }, []);

  const fetchCalendarData = useCallback(async () => {
    setLoading(true);
    try {
      const formattedMonth = String(month + 1).padStart(2, '0');
      const response = await axios.get(
        `https://api.aladhan.com/v1/gToHCalendar/${formattedMonth}/${year}`
      );
      setCalendarData(response.data.data || []);
    } catch (error) {
      console.error('Error fetching calendar data:', error);
    } finally {
      setLoading(false);
    }
  }, [month, year]);

  useEffect(() => {
    if (shouldFetchData) {
      generateDaysInMonth(month, year);
      fetchCalendarData();
      setShouldFetchData(false); // Reset the flag after fetching data
    }
  }, [month, year, generateDaysInMonth, fetchCalendarData, shouldFetchData]);

  const handlePreviousMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
    setShouldFetchData(true); // Trigger API call for the new month
  };

  const handleNextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
    setShouldFetchData(true); // Trigger API call for the new month
  };

  const handleTodayButtonClick = () => {
    const currentDate = new Date();
    setMonth(currentDate.getMonth()); // Set to current month
    setYear(currentDate.getFullYear()); // Set to current year
    setShouldFetchData(true); // Trigger API call to fetch current month data
  };

  const getDayDetails = (day) => {
    if (!day) return null;
    return calendarData.find(
      (d) => d && parseInt(d.gregorian.day) === day
    ) || null;
  };

  const getHijriYear = () => {
    return calendarData[0]?.hijri?.year || '';
  };

  const getHijriMonth = () => {
    return calendarData[0]?.hijri?.month?.en || '';
  };

  const isToday = (day) => {
    return (
      day &&
      today.getDate() === day &&
      today.getMonth() === month &&
      today.getFullYear() === year
    );
  };

  const isHoliday = (details) => {
    return details?.hijri?.holidays?.length > 0;
  };

  const isFirstDay = (details) => {
    return details?.hijri?.day === '1';
  };

  const handleClick = (details) => {
    if (details) {
      setSelectedDay(details);
      setModalOpen(true);
    }
  };

  const handleGoButtonClick = () => {
    if (inputYear >= 1 && inputYear <= 9665 && inputMonth >= 1 && inputMonth <= 12) {
      setYear(inputYear); // Update the year state
      setMonth(inputMonth - 1); // Update the month state (subtract 1 because months are 0-indexed)
      setShouldFetchData(true); // Trigger the API call
    } else {
      alert("Please enter a valid year (1000-9665).");
    }
  };

  return (
    <div className=' min-h-screen sm:p-5 mb-1'
    style={{
      backgroundImage: `url(${bgimage})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundColor: "#FEFBF1",
      
    }}
    >
      <Breadcrumb pageName='Islamic Calendar' />
      <div className='mb-6'>
  <div className='flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4 mb-5 p-2'>
    <h4 className="text-lg font-semibold">
      Select Month and Year:
    </h4>
    <div className='flex justify-center items-center gap-2 sm:gap-4'>
    <select
      value={inputMonth}
      onChange={(e) => setInputMonth(Number(e.target.value))}
      className='p-1 border-2 border-blue-500 rounded-lg shadow-lg w-28 sm:w-auto'
    >
      {monthNames.map((monthName, index) => (
        <option key={index} value={index + 1}>
          {monthName}
        </option>
      ))}
    </select>
    <input
      type='number'
      value={inputYear}
      min={1000}
      max={9665}
      onChange={(e) => {
        const value = e.target.value;
        if (value.length <= 4 && !isNaN(value)) {
          setInputYear(Math.min(Number(value), 9999));
        }
      }}
      onBlur={(e) => {
        if (e.target.value.length !== 4) {
          alert("Please enter a valid 4-digit year.");
          setInputYear(new Date().getFullYear());
        }
      }}
      className='p-1 border-2 border-blue-500 rounded-lg shadow-lg w-20 sm:w-24'
      placeholder='Year'
      pattern='\d{4}'
      required
    />
    <button
      onClick={handleGoButtonClick}
      className="px-3 py-1 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 whitespace-nowrap"
    >
      Go
    </button>
    </div>
  </div>
      </div>
      <div className='flex flex-row justify-between items-center mt-2 sm:mt-0 mb-3 px-4'>
  {/* Today Button */}
  <div className="flex">
    <button
      onClick={handleTodayButtonClick}
      className="px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600"
    >
      Today
    </button>
  </div>

  {/* Monthly/Yearly Buttons */}
  <div className="flex space-x-2 sm:space-x-4">
    <button
      onClick={() => setView("monthly")}
      className={`px-4 py-2 rounded-md ${
        view === "monthly" ? "bg-gray-800 text-white" : "bg-white text-black"
      }`}
    >
      Monthly
    </button>
    <button
      onClick={() => setView("yearly")}
      className={`px-4 py-2 rounded-md ${
        view === "yearly" ? "bg-gray-800 text-white" : "bg-white text-black"
      }`}
    >
      Yearly
    </button>
  </div>
</div>
      {view === "monthly" ? (
        <div className="container mx-auto mt-5">
          <Indicator />
          <div className="flex justify-between items-center mb-4 p-4">
            <button
              onClick={handlePreviousMonth}
              className="px-4 py-2 bg-gray-200 rounded-lg shadow-md hover:bg-gray-300"
            >
              <MdOutlineArrowBackIos className="text-[25px]" />
            </button>
            <div className="text-center">
              <h2 className="text-xl text-green-600 font-bold">
                {getHijriMonth()}, {getHijriYear()}
              </h2>
              <h3 className="text-lg font-bold">{monthNames[month]} - {year}</h3>
            </div>
            <button
              onClick={handleNextMonth}
              className="px-4 py-2 bg-gray-200 rounded-lg shadow-md hover:bg-gray-300"
            >
              <MdOutlineArrowForwardIos className="text-[25px]" />
            </button>
          </div>
          
          <div className="grid grid-cols-7 text-center font-semibold mb-2">
            {daysOfWeek.map((day, index) => (
              <div key={index} className="text-gray-700">{day}</div>
            ))}
          </div>
          {loading ? (
            <div className="text-center">Loading...</div>
          ) : (
            <div className="grid grid-cols-7 gap-2">
              {daysInMonth.map((day, index) => {
                const details = getDayDetails(day);
                const holiday = isHoliday(details);
                const firstDay = isFirstDay(details);

                return (
                  <div className='flex justify-center' key={index}>
                    <div
                      onClick={() => details && handleClick(details)}
                      className={`flex flex-col items-center justify-center
                        ${day ? '' : ''} 
                        ${holiday ? 'bg-red-200 ' : ''} 
                        ${firstDay ? 'bg-green-300 border-2 border-green-400' : ''} 
                        ${isToday(day) ? 'bg-blue-300 border-2 border-blue-800 font-bold text-blue-700' : ''} 
                        ${day && !holiday && !firstDay && !isToday(day) ? '' : ''} 
                        cursor-pointer w-12 h-12 rounded-md`}
                    >
                      {day ? (
                        <>
                          <span className="text-[18px] text-green-600">
                            {details?.hijri?.day || ''}
                          </span>
                          <span className="text-gray-800 text-[12px]">{day}</span>
                        </>
                      ) : null}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          {selectedDay && (
            <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
            <div className="mt-4 p-4 rounded-lg bg-transparent">
              <h3 className="text-lg text-center font-bold mb-4">Day Details</h3>
              <table className="w-full border border-gray-200">
                <tbody>
                  <tr>
                    <td className="border px-4 py-2 font-semibold">Gregorian</td>
                    <td className="border px-4 py-2">
                      {selectedDay?.gregorian?.date || "N/A"}
                    </td>
                  </tr>
                  <tr>
                    <td className="border px-4 py-2 font-semibold">Islamic (Hijri)</td>
                    <td className="border px-4 py-2">
                      {selectedDay?.hijri?.date || "N/A"}
                    </td>
                  </tr>
                  <tr>
                    <td className="border px-4 py-2 font-semibold">Day (English)</td>
                    <td className="border px-4 py-2">
                      {selectedDay?.hijri?.weekday?.en || "N/A"}
                    </td>
                  </tr>
                  <tr>
                    <td className="border px-4 py-2 font-semibold">Day (Arabic)</td>
                    <td className="border px-4 py-2">
                      {selectedDay?.hijri?.weekday?.ar || "N/A"}
                    </td>
                  </tr>
                  <tr>
                    <td className="border px-4 py-2 font-semibold">Holidays</td>
                    <td className="border px-4 py-2">
                      {selectedDay?.hijri?.holidays?.join(", ") || "None"}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Modal>
          
          )}
        </div>
      ) : (
        <div className="">
          <Indicator />
          <FullYearHijriCalendar year={year} /> 
            
        
        </div>
      )}
    </div>
  );
};

export default IslamicCalendar;