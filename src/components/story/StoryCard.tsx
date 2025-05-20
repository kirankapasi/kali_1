import { useState } from 'react';
import { Heart, MessageSquare, Share2, MoreVertical } from 'lucide-react';

interface StoryCardProps {
  story: {
    id: string;
    text: string;
    mediaUrl?: string;
    mediaType?: 'image' | 'video';
    authorName: string;
    timestamp: string;
    likes: number;
    comments: number;
  };
}

const StoryCard = ({ story }: StoryCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const toggleLike = () => {
    setIsLiked(!isLiked);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-neutral-200 overflow-hidden">
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-neutral-200"></div>
            <div className="ml-3">
              <p className="font-medium">{story.authorName}</p>
              <p className="text-xs text-neutral-500">
                {new Date(story.timestamp).toLocaleDateString()}
              </p>
            </div>
          </div>
          <button className="text-neutral-600 hover:text-neutral-800">
            <MoreVertical size={20} />
          </button>
        </div>

        <div className="space-y-3">
          <p className={`text-neutral-800 ${!isExpanded && 'line-clamp-3'}`}>
            {story.text}
          </p>
          {story.text.length > 150 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-primary-600 text-sm font-medium"
            >
              {isExpanded ? 'Show less' : 'See more'}
            </button>
          )}
        </div>

        {story.mediaUrl && (
          <div className="mt-3">
            {story.mediaType === 'image' ? (
              <img
                src={story.mediaUrl}
                alt="Story media"
                className="w-full rounded-lg"
              />
            ) : (
              <video
                src={story.mediaUrl}
                controls
                className="w-full rounded-lg"
              />
            )}
          </div>
        )}

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleLike}
              className={`flex items-center space-x-1 ${
                isLiked ? 'text-primary-600' : 'text-neutral-600'
              }`}
            >
              <Heart size={20} fill={isLiked ? 'currentColor' : 'none'} />
              <span>{story.likes + (isLiked ? 1 : 0)}</span>
            </button>
            <button className="flex items-center space-x-1 text-neutral-600">
              <MessageSquare size={20} />
              <span>{story.comments}</span>
            </button>
          </div>
          <button className="text-neutral-600">
            <Share2 size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default StoryCard;