import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, Lock, X } from 'lucide-react';
import { CommunityPreview } from '../../types';
import { useCommunityStore } from '../../store/communityStore';

interface CommunityCardProps {
  community: CommunityPreview;
}

const CommunityCard = ({ community }: CommunityCardProps) => {
  const { joinCommunity, joinedCommunities } = useCommunityStore();
  const [isHovering, setIsHovering] = useState(false);
  const isJoined = joinedCommunities.includes(community.id);
  
  const handleJoin = (e: React.MouseEvent) => {
    e.preventDefault();
    joinCommunity(community.id);
  };
  
  const handleNotInterested = (e: React.MouseEvent) => {
    e.preventDefault();
    // This would normally remove the community from recommendations
    console.log('Not interested in', community.name);
  };
  
  return (
    <Link
      to={isJoined ? `/community/${community.id}` : '#'}
      className="card hover:shadow-lg transition-all duration-300 block h-full"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={isJoined ? undefined : (e) => e.preventDefault()}
    >
      <div className="flex flex-col h-full">
        <div className="relative h-40 bg-neutral-200 rounded-t-lg overflow-hidden">
          <img
            src={community.imageUrl}
            alt={community.name}
            className="w-full h-full object-cover"
          />
          {community.isPrivate && (
            <div className="absolute top-2 right-2 bg-neutral-800 bg-opacity-75 text-white px-2 py-1 rounded-full text-xs flex items-center">
              <Lock size={12} className="mr-1" />
              Private
            </div>
          )}
        </div>
        
        <div className="p-4 flex-grow">
          <h3 className="font-semibold text-lg mb-1">{community.name}</h3>
          <div className="flex items-center text-neutral-600 text-sm mb-4">
            <Users size={14} className="mr-1" />
            <span>{community.memberCount.toLocaleString()} members</span>
          </div>
          
          {isJoined ? (
            <div className="text-success-600 text-sm font-medium">
              Already joined
            </div>
          ) : (
            <div className={`flex ${isHovering ? 'opacity-100' : 'opacity-0'} transition-opacity`}>
              <button
                onClick={handleJoin}
                className="btn-primary py-1 text-sm flex-grow mr-2"
              >
                Join Group
              </button>
              <button
                onClick={handleNotInterested}
                className="btn-text py-1 px-2 text-sm"
                title="Not interested"
              >
                <X size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default CommunityCard;