import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { MdOutlineArrowBackIos, MdOutlineArrowForwardIos } from 'react-icons/md';

const IslamicCalendar = () => {
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [daysInMonth, setDaysInMonth] = useState([]);
  const [calendarData, setCalendarData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDay, setSelectedDay] = useState(null);

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
    const dayData = calendarData.find(
      (d) => d && parseInt(d.gregorian.day) === day
    );
    return dayData || {};
  };

  const getHijriYear = () => {
    if (calendarData.length > 0) {
      return calendarData[0]?.hijri?.year || '';
    }
    return '';
  };

  const getHijriMonth = () => {
    if (calendarData.length > 0) {
      return calendarData[0]?.hijri?.month?.en || '';
    }
    return '';
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

  return (
    <div className="container mx-auto ">
      {/* Color Indicator Section */}
      <div className="flex justify-between mb-4">
        <div className="flex items-center">
          <span className="w-4 h-4 bg-red-300 rounded-full mr-2"></span>
          <span className="text-sm">Holiday</span>
        </div>
        <div className="flex items-center">
          <span className="w-4 h-4 bg-green-400 rounded-full mr-2"></span>
          <span className="text-sm">First Day</span>
        </div>
        <div className="flex items-center">
          <span className="w-4 h-4 bg-blue-300 rounded-full mr-2"></span>
          <span className="text-sm">Today</span>
        </div>
      </div>

      {/* Calendar Section */}
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={handlePreviousMonth}
          className="px-4 py-2 bg-gray-200 rounded-lg shadow-md hover:bg-gray-300"
        >
          <MdOutlineArrowBackIos className="text-[25px]" />
        </button>
        <div className="text-center">
          <h2 className="text-xl text-green-600 font-bold">
            {getHijriMonth()},{getHijriYear()}
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

      {/* Days of the week */}
      <div className="grid grid-cols-7 text-center font-semibold mb-2">
        {daysOfWeek.map((day, index) => (
          <div key={index} className="text-gray-700">{day}</div>
        ))}
      </div>

      {/* Calendar Days */}
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div className="grid grid-cols-7 gap-2">
          {daysInMonth.map((day, index) => {
            const details = getDayDetails(day);
            const holiday = isHoliday(details);
            const firstDay = isFirstDay(details);

            return (
              <div
                key={index}
                onClick={() => details && setSelectedDay(details)}
                className={`flex flex-col items-center justify-center 
                  ${day ? '' : ''} 
                  ${holiday ? 'bg-red-200 ' : ''} 
                  ${firstDay ? 'bg-green-300 border-2 border-green-400' : ''} 
                  ${isToday(day) ? 'bg-blue-300 border-2 border-blue-900 font-bold text-blue-700' : ''} 
                  ${day && !holiday && !firstDay && !isToday(day) ? 'bg-gray-100' : ''} 
                  cursor-pointer w-12 h-12 rounded-full`}
              >
                {day ? (
                  <>
                    <span className="text-[16px] text-green-600">
                      {details?.hijri?.day || day}
                    </span>
                    <span className="text-gray-800 text-[10px]">{day}</span>
                  </>
                ) : null}
              </div>
            );
          })}
        </div>
      )}

      {/* Selected Day Details Section */}
      {selectedDay && (
        <div className="mt-4 p-4 border rounded-lg bg-gray-50 shadow-md">
          <h3 className="text-lg text-center font-bold">Day Details</h3>
          <p><strong>Gregorian:</strong> {selectedDay.gregorian?.date || 'N/A'}</p>
          <p><strong>Islamic(Hijri):</strong> {selectedDay.hijri?.date || 'N/A'}</p>
          <p><strong>Day (English):</strong> {selectedDay.hijri?.weekday?.en || 'N/A'}</p>
          <p><strong>Day (Arabic):</strong> {selectedDay.hijri?.weekday?.ar || 'N/A'}</p>
          <p><strong>Holidays:</strong> {selectedDay.hijri?.holidays?.join(', ') || 'None'}</p>
        </div>
      )}
    </div>
  );
};

export default IslamicCalendar;
