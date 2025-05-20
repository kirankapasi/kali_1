import { useState } from 'react';
import { Mic, MicOff, Video, VideoOff, Share, SwordIcon as Record, MessageSquare } from 'lucide-react';

interface RoomControlsProps {
  onToggleAudio: () => void;
  onToggleVideo: () => void;
  onToggleChat: () => void;
  onShareScreen: () => void;
  onStartRecording: () => void;
  isAudioEnabled: boolean;
  isVideoEnabled: boolean;
  isChatOpen: boolean;
  isScreenSharing: boolean;
  isRecording: boolean;
}

const RoomControls = ({
  onToggleAudio,
  onToggleVideo,
  onToggleChat,
  onShareScreen,
  onStartRecording,
  isAudioEnabled,
  isVideoEnabled,
  isChatOpen,
  isScreenSharing,
  isRecording,
}: RoomControlsProps) => {
  return (
    <div className="flex items-center justify-center space-x-4 bg-white p-4 border-t">
      <button
        onClick={onToggleAudio}
        className={`p-3 rounded-full ${
          isAudioEnabled ? 'bg-primary-100 text-primary-600' : 'bg-error-100 text-error-600'
        }`}
      >
        {isAudioEnabled ? <Mic size={20} /> : <MicOff size={20} />}
      </button>

      <button
        onClick={onToggleVideo}
        className={`p-3 rounded-full ${
          isVideoEnabled ? 'bg-primary-100 text-primary-600' : 'bg-error-100 text-error-600'
        }`}
      >
        {isVideoEnabled ? <Video size={20} /> : <VideoOff size={20} />}
      </button>

      <button
        onClick={onShareScreen}
        className={`p-3 rounded-full ${
          isScreenSharing ? 'bg-primary-100 text-primary-600' : 'bg-neutral-100 text-neutral-600'
        }`}
      >
        <Share size={20} />
      </button>

      <button
        onClick={onStartRecording}
        className={`p-3 rounded-full ${
          isRecording ? 'bg-error-100 text-error-600' : 'bg-neutral-100 text-neutral-600'
        }`}
      >
        <Record size={20} />
      </button>

      <button
        onClick={onToggleChat}
        className={`p-3 rounded-full ${
          isChatOpen ? 'bg-primary-100 text-primary-600' : 'bg-neutral-100 text-neutral-600'
        }`}
      >
        <MessageSquare size={20} />
      </button>
    </div>
  );
};

export default RoomControls;