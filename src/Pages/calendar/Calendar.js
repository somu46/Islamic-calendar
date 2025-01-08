import React, { useState, useEffect } from 'react';
import axios from 'axios';

const IslamicCalendar = () => {
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [daysInMonth, setDaysInMonth] = useState([]);
  const [calendarData, setCalendarData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDay, setSelectedDay] = useState(null);

  const today = new Date(); // Get today's date
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'
  ];

  useEffect(() => {
    generateDaysInMonth(month, year);
    fetchCalendarData();
  }, [month, year]);

  const generateDaysInMonth = (month, year) => {
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
  };

  const fetchCalendarData = async () => {
    setLoading(true);
    try {
      const formattedMonth = String(month + 1).padStart(2, '0');
      const response = await axios.get(
        `http://api.aladhan.com/v1/gToHCalendar/${formattedMonth}/${year}`
      );
      setCalendarData(response.data.data || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching calendar data:', error);
      setLoading(false);
    }
  };

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

  const isToday = (day) => {
    return (
      day &&
      today.getDate() === day &&
      today.getMonth() === month &&
      today.getFullYear() === year
    );
  };

  return (
    <>
    <div className="container mx-auto p-4">
      <div className="text-left text-3xl text-orange my-5">Gregorian To  Hijri Calendar</div>
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={handlePreviousMonth}
          className="px-4 py-2 bg-gray-200 rounded-lg shadow-md hover:bg-gray-300"
        >
          Previous
        </button>
        <h2 className="text-xl font-bold">
          {monthNames[month]} - {year}
        </h2>
        <h2 className="text-xl font-bold"></h2>
        <button
          onClick={handleNextMonth}
          className="px-4 py-2 bg-gray-200 rounded-lg shadow-md hover:bg-gray-300"
        >
          Next
        </button>
      </div>

      <div className="grid grid-cols-7 text-center font-semibold mb-2">
        {daysOfWeek.map((day, index) => (
          <div key={index} className="text-gray-700">
            {day}
          </div>
        ))}
      </div>

      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div className="grid grid-cols-7 gap-2">
          {daysInMonth.map((day, index) => {
            const details = getDayDetails(day);
            const isHoliday = details?.hijri?.holidays?.length > 0;
            const isFirstDay = details?.hijri?.day === '1';

            return (
          
              <div
                key={index}
                onClick={() => details && setSelectedDay(details)}
                className={`size-[5rem] flex flex-col  items-center justify-center border rounded-md 
                  ${day ? 'bg-white' : 'bg-gray-100'}
                  ${isHoliday ? 'bg-red-100 border-red-400' : ''}
                  ${isFirstDay ? 'bg-green-100 border-green-400' : ''}
                  ${isToday(day) ? 'bg-green-300 border-blue-900 font-bold text-blue-700' : ''}
                  cursor-pointer`}
              >
                {day ? (
                  <>
                    <span className="text-gray-800 font-medium">{day}</span>
                    <span className="text-sm text-gray-500">
                      {details?.hijri?.date || ''}
                    </span>
                  </>
                ) : null}
              </div>
            );
          })}
        </div>
      )}

      {selectedDay && (
        <div className="mt-4 p-4 border rounded-lg bg-gray-50 shadow-md">
          <h3 className="text-lg font-bold">Day Details</h3>
          <p>
            <strong>Gregorian:</strong> {selectedDay.gregorian?.date || 'N/A'}
          </p>
          <p>
            <strong>Islamic:</strong> {selectedDay.hijri?.date || 'N/A'}
          </p>
          <p>
            <strong>Day (English):</strong>{' '}
            {selectedDay.hijri?.weekday?.en || 'N/A'}
          </p>
          <p>
            <strong>Holidays:</strong>{' '}
            {selectedDay.hijri?.holidays.length
              ? selectedDay.hijri.holidays.join(', ')
              : 'None'}
          </p>
        </div>
      )}
    </div>
    </>
  );
};

export default IslamicCalendar;
