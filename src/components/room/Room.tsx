import { useState, useEffect } from 'react';
import { Users } from 'lucide-react';
import { Room as RoomType, Participant } from '../../types';
import RoomControls from './RoomControls';

interface RoomProps {
  room: RoomType;
  currentUser: Participant;
  onLeave: () => void;
}

const Room = ({ room, currentUser, onLeave }: RoomProps) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  const toggleAudio = () => {
    // In a real app, this would toggle the audio stream
    console.log('Toggle audio');
  };

  const toggleVideo = () => {
    // In a real app, this would toggle the video stream
    console.log('Toggle video');
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const toggleScreenShare = () => {
    // In a real app, this would handle screen sharing
    setIsScreenSharing(!isScreenSharing);
  };

  const toggleRecording = () => {
    // In a real app, this would handle recording
    setIsRecording(!isRecording);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="bg-primary-600 -mx-4 px-4 py-4 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">{room.name}</h2>
            <div className="flex items-center text-primary-100">
              <Users size={16} className="mr-1" />
              <span>{room.participants?.length || 0} members live</span>
            </div>
          </div>
          <button onClick={onLeave} className="btn-outline text-white border-white">
            Leave Room
          </button>
        </div>
      </div>

      <div className="flex-grow grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
        {/* Main video/audio area */}
        <div className="md:col-span-2 bg-neutral-900 rounded-lg overflow-hidden">
          {room.type === 'video' && (
            <div className="aspect-video bg-neutral-800 relative">
              {/* Video streams would be rendered here */}
              <div className="absolute inset-0 flex items-center justify-center text-white">
                <p>Video stream placeholder</p>
              </div>
            </div>
          )}
        </div>

        {/* Participants list / chat */}
        <div className={`bg-white rounded-lg shadow-sm border border-neutral-200 ${isChatOpen ? '' : 'hidden md:block'}`}>
          <div className="p-4">
            <h3 className="font-medium mb-4">Participants</h3>
            <div className="space-y-3">
              {room.participants?.map((participant) => (
                <div key={participant.id} className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-neutral-200" />
                  <span className="ml-2">{participant.name}</span>
                  <div className="ml-auto flex space-x-2">
                    {!participant.isAudioEnabled && (
                      <span className="text-error-600 text-sm">Muted</span>
                    )}
                    {participant.isScreenSharing && (
                      <span className="text-primary-600 text-sm">Sharing</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <RoomControls
        onToggleAudio={toggleAudio}
        onToggleVideo={toggleVideo}
        onToggleChat={toggleChat}
        onShareScreen={toggleScreenShare}
        onStartRecording={toggleRecording}
        isAudioEnabled={currentUser.isAudioEnabled}
        isVideoEnabled={currentUser.isVideoEnabled}
        isChatOpen={isChatOpen}
        isScreenSharing={isScreenSharing}
        isRecording={isRecording}
      />
    </div>
  );
};

export default Room;