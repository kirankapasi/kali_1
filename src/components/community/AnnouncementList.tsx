import { useState } from 'react';
import { BellRing, Volume2, Check, Plus } from 'lucide-react';
import { Announcement } from '../../types';
import { useAuth } from '../../hooks/useAuth';

interface AnnouncementListProps {
  announcements: Announcement[];
  onCreateAnnouncement: () => void;
}

const AnnouncementList = ({ announcements, onCreateAnnouncement }: AnnouncementListProps) => {
  const { user } = useAuth();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const isAnnounementActive = (announcement: Announcement) => {
    const now = new Date();
    const from = new Date(announcement.validFrom);
    const to = new Date(announcement.validTo);
    return now >= from && now <= to;
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold flex items-center">
          <BellRing size={20} className="mr-2 text-primary-600" />
          Announcements
        </h2>
        <button
          onClick={onCreateAnnouncement}
          className="btn-outline py-1 px-2 text-sm flex items-center"
        >
          <Plus size={16} className="mr-1" />
          Add Announcement
        </button>
      </div>

      <div className="space-y-3">
        {announcements.map((announcement) => (
          <div
            key={announcement.id}
            className={`bg-white rounded-lg shadow-sm border ${
              isAnnounementActive(announcement) 
                ? 'border-primary-200' 
                : 'border-neutral-200'
            }`}
          >
            <div className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-neutral-200 mr-3" />
                  <div>
                    <p className="font-medium">{announcement.authorName}</p>
                    <p className="text-sm text-neutral-500">
                      {new Date(announcement.timestamp).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {announcement.audioUrl && (
                    <Volume2 size={16} className="text-primary-600" />
                  )}
                  {announcement.seenBy.includes(user?.uid || '') && (
                    <Check size={16} className="text-success-600" />
                  )}
                  {isAnnounementActive(announcement) && (
                    <span className="px-2 py-1 text-xs bg-success-50 text-success-600 rounded-full">
                      Active
                    </span>
                  )}
                </div>
              </div>
              
              <div className="mt-3">
                <p className="text-neutral-800">{announcement.content}</p>
                {announcement.audioUrl && (
                  <div className="mt-2">
                    <audio controls className="w-full">
                      <source src={announcement.audioUrl} type="audio/mpeg" />
                      Your browser does not support the audio element.
                    </audio>
                  </div>
                )}
              </div>
              
              <div className="mt-2 text-sm text-neutral-500">
                Valid from {new Date(announcement.validFrom).toLocaleDateString()} to{' '}
                {new Date(announcement.validTo).toLocaleDateString()}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnnouncementList;