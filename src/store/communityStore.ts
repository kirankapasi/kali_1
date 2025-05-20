import { create } from 'zustand';
import { Community, CommunityPreview, AnnouncementFormData } from '../types';

interface CommunityState {
  communities: CommunityPreview[];
  joinedCommunities: string[];
  currentCommunity: Community | null;
  loading: boolean;
  error: string | null;
  fetchCommunities: () => Promise<void>;
  fetchCommunity: (id: string) => Promise<void>;
  joinCommunity: (id: string) => Promise<void>;
  leaveCommunity: (id: string) => Promise<void>;
  createAnnouncement: (communityId: string, data: AnnouncementFormData) => Promise<void>;
  markAnnouncementAsSeen: (communityId: string, announcementId: string) => Promise<void>;
}

// This is a mock implementation - in a real app you'd use Firebase
export const useCommunityStore = create<CommunityState>((set, get) => ({
  communities: [],
  joinedCommunities: [],
  currentCommunity: null,
  loading: false,
  error: null,

  fetchCommunities: async () => {
    set({ loading: true, error: null });
    try {
      // Mock data - replace with actual API call
      const mockCommunities: CommunityPreview[] = [
        {
          id: '1',
          name: 'ISCON India',
          memberCount: 15230,
          isPrivate: false,
          imageUrl: 'https://images.pexels.com/photos/2832048/pexels-photo-2832048.jpeg'
        },
        {
          id: '2',
          name: 'Manchester United',
          memberCount: 24560,
          isPrivate: false,
          imageUrl: 'https://images.pexels.com/photos/47343/the-ball-stadion-horn-corner-47343.jpeg'
        },
        {
          id: '3',
          name: 'Global Climate Change Activists',
          memberCount: 8740,
          isPrivate: false,
          imageUrl: 'https://images.pexels.com/photos/2990650/pexels-photo-2990650.jpeg'
        },
        {
          id: '4',
          name: 'Karnataka Cultural Society',
          memberCount: 1250,
          isPrivate: true,
          imageUrl: 'https://images.pexels.com/photos/2417726/pexels-photo-2417726.jpeg'
        },
        {
          id: '5',
          name: 'X School 25',
          memberCount: 875,
          isPrivate: true,
          imageUrl: 'https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg'
        },
        {
          id: '6',
          name: 'Margherita Town (Official)',
          memberCount: 3570,
          isPrivate: false,
          imageUrl: 'https://images.pexels.com/photos/2044434/pexels-photo-2044434.jpeg'
        }
      ];
      
      set({ communities: mockCommunities, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch communities', loading: false });
    }
  },

  fetchCommunity: async (id: string) => {
    set({ loading: true, error: null });
    try {
      // Mock data - replace with actual API call
      const mockCommunity: Community = {
        id,
        name: `Community ${id}`,
        memberCount: 1000 + parseInt(id) * 500,
        isPrivate: id === '4' || id === '5',
        imageUrl: 'https://images.pexels.com/photos/2832048/pexels-photo-2832048.jpeg',
        description: 'This is a community for people who are interested in this topic.',
        announcements: [
          { 
            id: '1',
            content: 'Welcome to our community!',
            authorName: 'Admin',
            timestamp: new Date().toISOString(),
            validFrom: new Date().toISOString(),
            validTo: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
            seenBy: [],
            isActive: true
          }
        ],
        rooms: [
          {
            id: '1',
            name: 'General',
            type: 'text',
            memberCount: 100,
            messages: [
              {
                id: '1',
                content: 'Hello everyone!',
                authorName: 'User1',
                timestamp: new Date().toISOString()
              }
            ]
          }
        ]
      };
      
      set({ currentCommunity: mockCommunity, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch community details', loading: false });
    }
  },

  joinCommunity: async (id: string) => {
    set({ loading: true, error: null });
    try {
      const { joinedCommunities } = get();
      if (!joinedCommunities.includes(id)) {
        set({ joinedCommunities: [...joinedCommunities, id], loading: false });
      }
    } catch (error) {
      set({ error: 'Failed to join community', loading: false });
    }
  },

  leaveCommunity: async (id: string) => {
    set({ loading: true, error: null });
    try {
      const { joinedCommunities } = get();
      set({ 
        joinedCommunities: joinedCommunities.filter(communityId => communityId !== id),
        loading: false
      });
    } catch (error) {
      set({ error: 'Failed to leave community', loading: false });
    }
  },

  createAnnouncement: async (communityId: string, data: AnnouncementFormData) => {
    set({ loading: true, error: null });
    try {
      const { currentCommunity } = get();
      if (!currentCommunity) return;

      // In a real app, you'd upload the audio file to storage and get its URL
      const audioUrl = data.audioFile ? URL.createObjectURL(data.audioFile) : undefined;

      const newAnnouncement = {
        id: Date.now().toString(),
        content: data.content,
        authorName: 'Current User', // Replace with actual user name
        timestamp: new Date().toISOString(),
        audioUrl,
        validFrom: data.validFrom,
        validTo: data.validTo,
        seenBy: [],
        isActive: true
      };

      const updatedCommunity = {
        ...currentCommunity,
        announcements: [newAnnouncement, ...currentCommunity.announcements]
      };

      set({ currentCommunity: updatedCommunity, loading: false });
    } catch (error) {
      set({ error: 'Failed to create announcement', loading: false });
    }
  },

  markAnnouncementAsSeen: async (communityId: string, announcementId: string) => {
    set({ loading: true, error: null });
    try {
      const { currentCommunity } = get();
      if (!currentCommunity) return;

      const updatedAnnouncements = currentCommunity.announcements.map(announcement => {
        if (announcement.id === announcementId) {
          return {
            ...announcement,
            seenBy: [...announcement.seenBy, 'current-user-id'] // Replace with actual user ID
          };
        }
        return announcement;
      });

      const updatedCommunity = {
        ...currentCommunity,
        announcements: updatedAnnouncements
      };

      set({ currentCommunity: updatedCommunity, loading: false });
    } catch (error) {
      set({ error: 'Failed to mark announcement as seen', loading: false });
    }
  }
}));