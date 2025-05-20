import { create } from 'zustand';
import { Room, RoomFormData } from '../types';

interface RoomState {
  activeRoom: Room | null;
  loading: boolean;
  error: string | null;
  createRoom: (data: RoomFormData) => Promise<void>;
  joinRoom: (roomId: string) => Promise<void>;
  leaveRoom: () => Promise<void>;
}

export const useRoomStore = create<RoomState>((set) => ({
  activeRoom: null,
  loading: false,
  error: null,

  createRoom: async (data: RoomFormData) => {
    set({ loading: true, error: null });
    try {
      // Mock creating a room - in a real app, this would call an API
      const newRoom: Room = {
        id: Date.now().toString(),
        name: data.topic,
        type: data.type,
        memberCount: 1,
        messages: [],
        participants: [
          {
            id: 'current-user',
            name: 'You',
            isAudioEnabled: true,
            isVideoEnabled: data.type === 'video',
            isScreenSharing: false,
          }
        ]
      };
      
      set({ activeRoom: newRoom, loading: false });
    } catch (error) {
      set({ error: 'Failed to create room', loading: false });
    }
  },

  joinRoom: async (roomId: string) => {
    set({ loading: true, error: null });
    try {
      // Mock joining a room - in a real app, this would call an API
      const room: Room = {
        id: roomId,
        name: 'Sample Room',
        type: 'audio',
        memberCount: 5,
        messages: [],
        participants: [
          {
            id: 'current-user',
            name: 'You',
            isAudioEnabled: true,
            isVideoEnabled: false,
            isScreenSharing: false,
          }
        ]
      };
      
      set({ activeRoom: room, loading: false });
    } catch (error) {
      set({ error: 'Failed to join room', loading: false });
    }
  },

  leaveRoom: async () => {
    set({ loading: true, error: null });
    try {
      // Mock leaving a room - in a real app, this would call an API
      set({ activeRoom: null, loading: false });
    } catch (error) {
      set({ error: 'Failed to leave room', loading: false });
    }
  }
}));