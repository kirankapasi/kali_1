import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, Video, Calendar, Users, BellRing } from 'lucide-react';
import { useCommunityStore } from '../store/communityStore';
import { useAuth } from '../hooks/useAuth';

const HomePage = () => {
  const { communities, joinedCommunities, fetchCommunities } = useCommunityStore();
  const { user } = useAuth();
  
  useEffect(() => {
    fetchCommunities();
  }, [fetchCommunities]);
  
  const userCommunities = communities.filter(community => 
    joinedCommunities.includes(community.id)
  );
  
  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-neutral-900">Welcome, {user?.displayName || 'User'}</h1>
        <p className="text-neutral-600">Your communities and activity</p>
      </div>
      
      {userCommunities.length === 0 ? (
        <div className="card text-center py-8">
          <h3 className="text-xl font-semibold mb-4">You haven't joined any communities yet</h3>
          <p className="text-neutral-600 mb-6">
            Discover and join communities that match your interests
          </p>
          <Link to="/explore" className="btn-primary inline-flex items-center">
            <Users size={18} className="mr-2" />
            <span>Explore Communities</span>
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {userCommunities.map(community => (
            <Link 
              key={community.id} 
              to={`/community/${community.id}`}
              className="card block hover:bg-neutral-50"
            >
              <div className="flex items-center">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-neutral-200 overflow-hidden">
                  <img 
                    src={community.imageUrl} 
                    alt={community.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="ml-4 flex-grow">
                  <h3 className="font-semibold text-neutral-900">{community.name}</h3>
                  <p className="text-sm text-neutral-600">
                    {community.memberCount.toLocaleString()} members • 
                    {community.isPrivate ? ' Private group' : ' Public group'}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <div className="flex items-center text-secondary-600 bg-secondary-50 p-1 rounded-md">
                    <MessageSquare size={16} />
                  </div>
                  <div className="flex items-center text-accent-600 bg-accent-50 p-1 rounded-md">
                    <BellRing size={16} />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
      
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Upcoming Events</h2>
        <div className="card">
          <div className="flex items-center p-2">
            <Calendar size={48} className="text-primary-600 p-2 bg-primary-50 rounded-lg" />
            <div className="ml-4">
              <h3 className="font-semibold">No upcoming events</h3>
              <p className="text-sm text-neutral-600">
                Your upcoming events from communities will appear here
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Active Rooms</h2>
        <div className="card">
          <div className="flex items-center p-2">
            <Video size={48} className="text-secondary-600 p-2 bg-secondary-50 rounded-lg" />
            <div className="ml-4">
              <h3 className="font-semibold">No active rooms</h3>
              <p className="text-sm text-neutral-600">
                Join audio or video rooms from your communities
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;