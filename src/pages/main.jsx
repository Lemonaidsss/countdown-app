import React, { useState, useEffect } from 'react';
import '../App.css';

const holidays = [
  { name: 'New Year', date: '2024-01-01T12:00:00' },
  { name: 'Maundy Thursday', date: '2024-03-28T12:00:00' },
  { name: 'Good Friday', date: '2024-03-29T18:30:00' },
  { name: 'Araw ng Kagitingan ', date: '2024-04-09T08:45:00' },
  { name: 'Labor Day ', date: '2024-05-01T08:45:00' },
  { name: 'Independence Day', date: '2024-06-12T08:45:00' },
  { name: 'National Heroes Day ', date: '2024-08-26T08:45:00' },
  { name: 'Bonifacio Day', date: '2024-11-30T08:45:00' },
  { name: 'Christmas Day', date: '2024-12-25T08:45:00' },
  { name: 'Rizal Day', date: '2024-12-30T08:45:00' },
  { name: 'Ninoy Aquino Day', date: '2024-08-21T08:45:00' },
  { name: 'All Saints’ Day', date: '2024-11-01T08:45:00' },
  { name: 'Christmas Eve', date: '2024-12-24T08:45:00' },
  { name: 'Last day of the Year', date: '2024-12-31T08:45:00' },
  { name: 'Feast of the Immaculate Conception of Mary', date: '2024-12-08T08:45:00' },
  { name: 'Chinese New Year', date: '2024-02-10T08:45:00' },
  { name: 'Black Saturday ', date: '2024-03-30T08:45:00' },
  { name: 'Eid al-Fitr', date: '2024-04-10T08:45:00'}
];

const Countdown = () => {
  const [countdowns, setCountdowns] = useState([]);

  useEffect(() => {
    const calculateCountdowns = () => {
      const now = new Date();

      const filteredCountdowns = holidays
        .map(holiday => {
          const holidayDate = new Date(holiday.date);
          const timeDifference = holidayDate - now;

          return {
            name: holiday.name,
            date: holidayDate,
            timeRemaining: timeDifference,
          };
        })
        .filter(countdown => countdown.timeRemaining > 0) // Exclude items with negative time difference
        .sort((a, b) => a.timeRemaining - b.timeRemaining);

      setCountdowns(filteredCountdowns);
    };

    calculateCountdowns();

    const intervalId = setInterval(calculateCountdowns, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const formatTimeRemaining = (timeRemaining) => {
    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const seconds = Math.floor((timeRemaining / 1000) % 60);
    const minutes = Math.floor((timeRemaining / (1000 * 60)) % 60);
    const hours = Math.floor((timeRemaining / (1000 * 60 * 60)) % 24);
    return { days, hours, minutes, seconds };
  };

  return (
    <div className="App">
    <div className="flex justify-center items-center h-full">
      <div className="max-w-screen-md w-full p-4 border rounded-lg">
        <table className="table w-full"> {/* Apply 'table' class here */}
          <thead>
            <tr>
              <th>Event</th>
              <th>Date</th>
              <th>Time Remaining</th>
            </tr>
          </thead>
          <tbody>
            {countdowns.map((countdown, index) => (
              <tr key={index} className={`countdown ${index === 0 ? 'highlighted' : ''}`}>
                <td>{countdown.name}</td>
                <td>{countdown.timeRemaining > 0 && countdown.date.toDateString()}</td>
                <td>
                  {countdown.timeRemaining > 0 && (
                    <>
                      {formatTimeRemaining(countdown.timeRemaining).days}d{' '}
                      {formatTimeRemaining(countdown.timeRemaining).hours}h{' '}
                      {formatTimeRemaining(countdown.timeRemaining).minutes}m{' '}
                      {formatTimeRemaining(countdown.timeRemaining).seconds}s
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
  );
};

export default Countdown;
