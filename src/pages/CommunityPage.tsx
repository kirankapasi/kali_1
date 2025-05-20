import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MessageSquare, Video, Users, Bell, CalendarDays, Triangle, Pen } from 'lucide-react';
import { useCommunityStore } from '../store/communityStore';
import ChatMessage from '../components/community/ChatMessage';
import { useAuth } from '../hooks/useAuth';

const CommunityPage = () => {
  const { id } = useParams<{ id: string }>();
  const { currentCommunity, fetchCommunity, loading } = useCommunityStore();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('chat');
  const [message, setMessage] = useState('');
  
  useEffect(() => {
    if (id) {
      fetchCommunity(id);
    }
  }, [id, fetchCommunity]);
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() === '') return;
    
    // In a real app, you would send this message to Firebase
    console.log('Sending message:', message);
    setMessage('');
  };
  
  if (loading || !currentCommunity) {
    return (
      <div className="flex justify-center items-center h-64">
        <Triangle className="text-primary-600 animate-pulse-slow" size={48} />
      </div>
    );
  }
  
  return (
    <div className="animate-fade-in">
      {/* Community header */}
      <div className="bg-primary-600 -mx-4 px-4 py-6 mb-6 text-white rounded-b-xl">
        <div className="flex items-center">
          <div className="w-12 h-12 rounded-full bg-white overflow-hidden">
            <img 
              src={currentCommunity.imageUrl} 
              alt={currentCommunity.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="ml-4">
            <h1 className="text-2xl font-bold">{currentCommunity.name}</h1>
            <p className="text-primary-100">
              {currentCommunity.memberCount.toLocaleString()} members • 
              {currentCommunity.isPrivate ? ' Private group' : ' Public group'}
            </p>
          </div>
        </div>
      </div>
      
      {/* Announcements */}
      {currentCommunity.announcements.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3 flex items-center">
            <Bell size={18} className="mr-2 text-accent-500" />
            Announcements
          </h2>
          <div className="space-y-3">
            {currentCommunity.announcements.map(announcement => (
              <div key={announcement.id} className="card border-l-4 border-accent-500">
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 rounded-full bg-neutral-200"></div>
                  <div className="ml-2">
                    <p className="font-medium">{announcement.authorName}</p>
                    <p className="text-xs text-neutral-500">
                      {new Date(announcement.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
                <p>{announcement.content}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Community tabs */}
      <div className="border-b border-neutral-200 mb-6">
        <div className="flex space-x-1 overflow-x-auto scrollbar-hide">
          <button
            className={`px-4 py-2 flex items-center whitespace-nowrap ${
              activeTab === 'chat'
                ? 'border-b-2 border-primary-600 text-primary-600 font-medium'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
            onClick={() => setActiveTab('chat')}
          >
            <MessageSquare size={18} className="mr-2" />
            Chat
          </button>
          <button
            className={`px-4 py-2 flex items-center whitespace-nowrap ${
              activeTab === 'rooms'
                ? 'border-b-2 border-primary-600 text-primary-600 font-medium'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
            onClick={() => setActiveTab('rooms')}
          >
            <Video size={18} className="mr-2" />
            Rooms
          </button>
          <button
            className={`px-4 py-2 flex items-center whitespace-nowrap ${
              activeTab === 'events'
                ? 'border-b-2 border-primary-600 text-primary-600 font-medium'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
            onClick={() => setActiveTab('events')}
          >
            <CalendarDays size={18} className="mr-2" />
            Events
          </button>
          <button
            className={`px-4 py-2 flex items-center whitespace-nowrap ${
              activeTab === 'members'
                ? 'border-b-2 border-primary-600 text-primary-600 font-medium'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
            onClick={() => setActiveTab('members')}
          >
            <Users size={18} className="mr-2" />
            Members
          </button>
        </div>
      </div>
      
      {/* Content based on active tab */}
      <div>
        {activeTab === 'chat' && (
          <div>
            <div className="bg-white rounded-lg shadow-md mb-4 p-4 max-h-[50vh] overflow-y-auto">
              {currentCommunity.rooms[0]?.messages.map(message => (
                <ChatMessage key={message.id} message={message} />
              ))}
              {currentCommunity.rooms[0]?.messages.length === 0 && (
                <div className="text-center py-8 text-neutral-500">
                  <MessageSquare size={32} className="mx-auto mb-2 opacity-50" />
                  <p>No messages yet. Start the conversation!</p>
                </div>
              )}
            </div>
            
            <form onSubmit={handleSendMessage} className="relative">
              <input
                type="text"
                placeholder="Type a message..."
                className="input pr-12"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-primary-600 hover:text-primary-800 p-2"
                disabled={message.trim() === ''}
              >
                <Pen size={18} />
              </button>
            </form>
          </div>
        )}
        
        {activeTab === 'rooms' && (
          <div className="space-y-4">
            <div className="card p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-lg">Rooms</h3>
                <button className="btn-outline py-1 text-sm">Create Room</button>
              </div>
              
              {currentCommunity.rooms.map(room => (
                <div key={room.id} className="border border-neutral-200 rounded-lg p-4 mb-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">{room.name}</h4>
                      <p className="text-sm text-neutral-600">
                        {room.memberCount} members • {room.type} room
                      </p>
                    </div>
                    <button className="btn-text py-1 text-sm">Join</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {activeTab === 'events' && (
          <div className="text-center py-12">
            <CalendarDays size={48} className="mx-auto mb-4 text-neutral-400" />
            <h3 className="text-xl font-semibold mb-2">No Upcoming Events</h3>
            <p className="text-neutral-600 mb-6">
              There are no events scheduled for this community
            </p>
            <button className="btn-primary">Create an Event</button>
          </div>
        )}
        
        {activeTab === 'members' && (
          <div className="card p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-lg">Members</h3>
              <p className="text-neutral-600">
                {currentCommunity.memberCount.toLocaleString()} total members
              </p>
            </div>
            <div className="space-y-4">
              {/* This would be a list of members in a real app */}
              <div className="flex items-center p-2 hover:bg-neutral-50 rounded-lg">
                <div className="w-10 h-10 rounded-full bg-neutral-200"></div>
                <div className="ml-3">
                  <p className="font-medium">Community Admin</p>
                  <p className="text-xs text-neutral-500">Admin • Active now</p>
                </div>
              </div>
              <div className="flex items-center p-2 hover:bg-neutral-50 rounded-lg">
                <div className="w-10 h-10 rounded-full bg-neutral-200"></div>
                <div className="ml-3">
                  <p className="font-medium">{user?.displayName || 'You'}</p>
                  <p className="text-xs text-neutral-500">Member • Active now</p>
                </div>
              </div>
              {/* More members would be listed here */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommunityPage;