import { User } from 'firebase/auth';

// User types
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  photoURL?: string;
  phone?: string;
}

// Community types
export interface CommunityPreview {
  id: string;
  name: string;
  memberCount: number;
  isPrivate: boolean;
  imageUrl: string;
}

export interface Community extends CommunityPreview {
  description: string;
  announcements: Announcement[];
  rooms: Room[];
  stories: Story[];
}

export interface Announcement {
  id: string;
  content: string;
  authorName: string;
  timestamp: string;
  audioUrl?: string;
  validFrom: string;
  validTo: string;
  seenBy: string[];
  isActive: boolean;
}

export interface Room {
  id: string;
  name: string;
  type: 'text' | 'audio' | 'video' | 'discussion';
  memberCount: number;
  messages: Message[];
  participants?: Participant[];
}

export interface Participant {
  id: string;
  name: string;
  isAudioEnabled: boolean;
  isVideoEnabled: boolean;
  isScreenSharing: boolean;
  stream?: MediaStream;
}

export interface Message {
  id: string;
  content: string;
  authorName: string;
  timestamp: string;
}

export interface Story {
  id: string;
  text: string;
  mediaUrl?: string;
  mediaType?: 'image' | 'video';
  authorName: string;
  timestamp: string;
  likes: number;
  comments: number;
}

// Form types
export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  name: string;
  email: string;
  phone?: string;
  password: string;
  confirmPassword: string;
}

export interface AnnouncementFormData {
  content: string;
  audioFile?: File;
  validFrom: string;
  validTo: string;
}

export interface RoomFormData {
  topic: string;
  type: 'audio' | 'video';
}

export interface StoryFormData {
  text: string;
  media?: File;
}