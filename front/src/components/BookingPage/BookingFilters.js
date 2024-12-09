import React from 'react';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';

const BookingFilters = ({ startDate, endDate, peopleCount, setDateRange, setPeopleCount, onSearchRooms }) => {
  return (
    <div style={styles.filterStyle}>
      <div style={styles.filterRowStyle}>
        <div style={styles.filterItemStyle}>
          <label style={styles.labelStyle}>Выберите диапазон дат:</label>
          <DatePicker
            selected={startDate}
            onChange={(dates) => {
              const [start, end] = dates;
              if (start && (!end || end > start)) {
                setDateRange([start, end]);
              }
            }}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            minDate={new Date()} // Запрет выбора дат ранее сегодняшней
            maxDate={endDate ? new Date(endDate) : undefined}
            placeholderText="Выберите даты"
            popperPlacement="bottom-start"
            className="custom-datepicker-input"
            calendarClassName="custom-calendar"
          />
        </div>

        <div style={styles.filterItemStyle}>
          <label style={styles.labelStyle}>Количество проживающих:</label>
          <div style={styles.counterStyle}>
            <button
              style={styles.counterButtonStyle}
              onClick={() => {
                setPeopleCount(Math.max(1, peopleCount - 1));
                // onSearchRooms();
              }}
            >
              -
            </button>
            <span style={styles.countStyle}>{peopleCount}</span>
            <button
              style={styles.counterButtonStyle}
              onClick={() => {
                setPeopleCount(peopleCount + 1);
                // onSearchRooms();
              }}
            >
              +
            </button>
          </div>
        </div>
        {/* <button style={styles.searchButtonStyle} onClick={onSearchRooms}>Подобрать номера</button> */}
      </div>
    </div>
  );
};

const styles = {
  filterStyle: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    backgroundColor: '#f8f9fa',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  },
  filterRowStyle: {
    display: 'flex',
    gap: '20px',
    alignItems: 'center',
  },
  filterItemStyle: {
    flex: 1,
  },
  labelStyle: {
    fontSize: '18px',
    marginBottom: '10px',
    marginRight: "10px",
  },
  counterStyle: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  counterButtonStyle: {
    width: '50px',
    height: '50px',
    backgroundColor: '#FA8653',
    color: '#fff',
    border: 'none',
    borderRadius: '10px',
    fontSize: '20px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background-color 0.3s',
  },
  countStyle: {
    fontSize: '20px',
    padding: '0 20px',
  },
  searchButtonStyle: {
    padding: '15px 30px',
    backgroundColor: '#FA8653',
    color: '#fff',
    border: 'none',
    borderRadius: '10px',
    fontSize: '18px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
};

export default BookingFilters;
