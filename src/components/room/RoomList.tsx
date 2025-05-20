import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Room } from '../../types';
import CreateRoomModal from './CreateRoomModal';

interface RoomListProps {
  rooms: Room[];
  onJoinRoom: (roomId: string) => void;
  onCreateRoom: (data: { topic: string; type: 'audio' | 'video' }) => void;
}

const RoomList = ({ rooms, onJoinRoom, onCreateRoom }: RoomListProps) => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Rooms</h2>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="btn-outline text-primary-600 border-primary-600 py-2 px-4 text-sm flex items-center"
        >
          Create Room
        </button>
      </div>

      <div className="space-y-3">
        {rooms.map((room) => (
          <div
            key={room.id}
            className="bg-white rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium text-lg">{room.name}</h3>
                <p className="text-sm text-neutral-600">
                  {room.memberCount} members • {room.type} room
                </p>
              </div>
              <button
                onClick={() => onJoinRoom(room.id)}
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                Join
              </button>
            </div>
          </div>
        ))}

        {rooms.length === 0 && (
          <div className="text-center py-8">
            <p className="text-neutral-600">No rooms available</p>
          </div>
        )}
      </div>

      {isCreateModalOpen && (
        <CreateRoomModal
          onClose={() => setIsCreateModalOpen(false)}
          onSubmit={(data) => {
            onCreateRoom(data);
            setIsCreateModalOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default RoomList;