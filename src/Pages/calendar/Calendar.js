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
    generateDaysInMonth(month, year);
    fetchCalendarData();
  }, [month, year, generateDaysInMonth, fetchCalendarData]);

  const handlePreviousMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  };

  const handleNextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
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
      <div>
        <div className='flex justify-center items-center gap-x-4'>
          <lebal className="text-xl font-semibold text-teal-700 hover:text-blue-600">You can Know any date of any Year:</lebal>
          <input 
          type='number'
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className='p-1 border-2 border-blue-500 rounded-lg shadow-lg'
          />
        </div>
      </div>
      <div className="flex space-x-2 sm:space-x-4 mt-2 sm:mt-0 mb-3 justify-end">
        <button
          onClick={() => setView("monthly")}
          className={`px-4 py-2 rounded-md ${
            view === "monthly"
              ? "bg-gray-800 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Monthly
        </button>
        <button
          onClick={() => setView("yearly")}
          className={`px-4 py-2 rounded-md ${
            view === "yearly"
              ? "bg-gray-800 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Yearly
        </button>
      </div>
      {view === "monthly" ? (
        <div className="container mx-auto mt-5">
          <Indicator />
          <div className="flex justify-between items-center mb-4">
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
