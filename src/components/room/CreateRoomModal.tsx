import { useState } from 'react';
import { X, Users, Video, Mic, Share, SwordIcon as Record } from 'lucide-react';

interface CreateRoomModalProps {
  onClose: () => void;
  onSubmit: (data: { topic: string; type: 'audio' | 'video' }) => void;
}

const CreateRoomModal = ({ onClose, onSubmit }: CreateRoomModalProps) => {
  const [topic, setTopic] = useState('');
  const [type, setType] = useState<'audio' | 'video'>('audio');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;
    onSubmit({ topic, type });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-lg mx-4">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-semibold">Create New Room</h3>
          <button onClick={onClose} className="text-neutral-500 hover:text-neutral-700">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Room Topic
              </label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="input"
                placeholder="Write topic"
                maxLength={50}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Room Type
              </label>
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setType('audio')}
                  className={`flex-1 p-3 rounded-lg border ${
                    type === 'audio'
                      ? 'border-primary-500 bg-primary-50 text-primary-700'
                      : 'border-neutral-300 hover:bg-neutral-50'
                  }`}
                >
                  <Mic className="mx-auto mb-2" size={24} />
                  <span className="block text-sm font-medium">Audio Room</span>
                </button>
                <button
                  type="button"
                  onClick={() => setType('video')}
                  className={`flex-1 p-3 rounded-lg border ${
                    type === 'video'
                      ? 'border-primary-500 bg-primary-50 text-primary-700'
                      : 'border-neutral-300 hover:bg-neutral-50'
                  }`}
                >
                  <Video className="mx-auto mb-2" size={24} />
                  <span className="block text-sm font-medium">Video Room</span>
                </button>
              </div>
            </div>

            <div className="border-t pt-4 mt-6">
              <h4 className="text-sm font-medium text-neutral-700 mb-2">Available Features</h4>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center p-2 bg-neutral-50 rounded">
                  <Users size={18} className="text-neutral-600 mr-2" />
                  <span className="text-sm">Invite Members</span>
                </div>
                <div className="flex items-center p-2 bg-neutral-50 rounded">
                  <Share size={18} className="text-neutral-600 mr-2" />
                  <span className="text-sm">Screen Share</span>
                </div>
                <div className="flex items-center p-2 bg-neutral-50 rounded">
                  <Record size={18} className="text-neutral-600 mr-2" />
                  <span className="text-sm">Record Session</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="btn-outline"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
              disabled={!topic.trim()}
            >
              Create Room
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateRoomModal;