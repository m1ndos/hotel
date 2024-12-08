import React from 'react';
import RoomCard from "../RoomCard/RoomCard";

const BookingRooms = ({ rooms, selectedRoom, onSelectRoom }) => {

  const handleRoomClick = (room) => {
    if (selectedRoom && selectedRoom.id === room.id) {
      onSelectRoom(null);
    } else {
      onSelectRoom(room);
    }
  };

  return (
    <div style={styles.roomsStyle}>
      {rooms.length > 0 ? (
        rooms.map(room => (
          <div
            key={room.id}
            onClick={() => handleRoomClick(room)}
            style={selectedRoom && selectedRoom.id === room.id ? styles.selectedRoomStyle : {}}
          >
            <RoomCard room={room} />
          </div>
        ))
      ) : (
        <p style={styles.noRoomsTextStyle}>Нет доступных номеров для выбранных фильтров.</p>
      )}
    </div>
  );
};

const styles = {
  roomsStyle: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    cursor: 'pointer'
  },
  noRoomsTextStyle: {
    fontSize: '18px',
    color: '#555',
    textAlign: 'center',
  },
  selectedRoomStyle: {
    border: '2px solid #FA8653',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(250, 134, 83, 0.5)',
  },
};

export default BookingRooms;
