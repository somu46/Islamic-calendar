import React, { useState, useEffect } from 'react';
import moment from 'moment';
import 'moment-hijri';

// Mocked Suhoor and Iftar Times for demonstration
const ramadanTimings = {
  "1446/9/1": { suhoor: "04:30 AM", iftar: "06:15 PM" },
  "1446/9/2": { suhoor: "04:29 AM", iftar: "06:16 PM" },
  "1446/9/3": { suhoor: "04:28 AM", iftar: "06:17 PM" },
  // Add more dates or fetch from an API
};

const IslamicCalendar = () => {
  const [currentDate, setCurrentDate] = useState(moment().format('iYYYY/iM/iD'));
  const [timings, setTimings] = useState(ramadanTimings);

  // Islamic festivals data
  const festivals = [
    { name: 'Eid al-Fitr', date: '1446/10/1' },
    { name: 'Eid al-Adha', date: '1446/12/10' },
    { name: 'Ramadan Start', date: '1446/9/1' },
    { name: 'Ramadan End', date: '1446/9/30' },
    { name: 'Mawlid al-Nabi', date: '1446/12/12' },
    { name: 'Islamic New Year', date: '1447/1/1' },
    { name: 'Lailat al-Miraj', date: '1446/7/27' },
    { name: 'Lailat al-Qadr', date: '1446/9/27' }
  ];

  const handleNextMonth = () => {
    setCurrentDate((prevDate) =>
      moment(prevDate, 'iYYYY/iM/iD').add(1, 'iMonth').format('iYYYY/iM/iD')
    );
  };

  const handlePreviousMonth = () => {
    setCurrentDate((prevDate) =>
      moment(prevDate, 'iYYYY/iM/iD').subtract(1, 'iMonth').format('iYYYY/iM/iD')
    );
  };

  // Get number of days in the current month
  const daysInMonth = moment(currentDate, 'iYYYY/iM/iD').iDaysInMonth();
  const startOfMonth = moment(currentDate, 'iYYYY/iM/iD').startOf('iMonth');
  const days = [...Array(daysInMonth)].map((_, i) =>
    startOfMonth.clone().add(i, 'days')
  );

  // Get the festival for a given day
  const getFestivalForDay = (day) => {
    const formattedDay = day.format('iYYYY/iM/iD');
    const festival = festivals.find((festival) => festival.date === formattedDay);
    return festival ? festival.name : '';
  };

  // Get Suhoor and Iftar timings for Ramadan days
  const getRamadanTiming = (day) => {
    const formattedDay = day.format('iYYYY/iM/iD');
    return timings[formattedDay] || null;
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <button style={styles.button} onClick={handlePreviousMonth}>
          {'<'}
        </button>
        <h2 style={styles.title}>
          {moment(currentDate, 'iYYYY/iM/iD').format('iMMMM iYYYY')}
        </h2>
        <button style={styles.button} onClick={handleNextMonth}>
          {'>'}
        </button>
      </header>
      <table style={styles.table}>
        <thead>
          <tr>
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <th key={day} style={styles.th}>
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 6 }).map((_, week) => (
            <tr key={week}>
              {Array.from({ length: 7 }).map((_, dayIndex) => {
                const day = days.find(
                  (d) =>
                    d.weekday() === dayIndex &&
                    d.isoWeek() === week + days[0].isoWeek()
                );
                const festival = day ? getFestivalForDay(day) : '';
                const ramadanTime = day ? getRamadanTiming(day) : null;
                return (
                  <td key={dayIndex} style={styles.td}>
                    {day ? (
                      <>
                        <span>{day.format('iD')}</span>
                        {festival && (
                          <div style={styles.festival}>
                            <span>{festival}</span>
                          </div>
                        )}
                        {ramadanTime && (
                          <div style={styles.ramadanTiming}>
                            <div>Suhoor: {ramadanTime.suhoor}</div>
                            <div>Iftar: {ramadanTime.iftar}</div>
                          </div>
                        )}
                      </>
                    ) : (
                      ''
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center',
    maxWidth: '600px',
    margin: '20px auto',
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '20px',
    backgroundColor: '#f9f9f9',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  title: {
    margin: 0,
  },
  button: {
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    padding: '5px 10px',
    cursor: 'pointer',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  th: {
    border: '1px solid #ddd',
    padding: '8px',
    backgroundColor: '#f1f1f1',
  },
  td: {
    border: '1px solid #ddd',
    padding: '8px',
    textAlign: 'center',
    position: 'relative',
  },
  festival: {
    position: 'absolute',
    bottom: '5px',
    left: '5px',
    fontSize: '10px',
    color: '#D9534F',
  },
  ramadanTiming: {
    fontSize: '10px',
    marginTop: '5px',
    color: '#007BFF',
  },
};

export default IslamicCalendar;
