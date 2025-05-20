import { useState } from 'react';
import { X, Upload } from 'lucide-react';
import { AnnouncementFormData } from '../../types';

interface CreateAnnouncementProps {
  onSubmit: (data: AnnouncementFormData) => Promise<void>;
  onCancel: () => void;
}

const CreateAnnouncement = ({ onSubmit, onCancel }: CreateAnnouncementProps) => {
  const [formData, setFormData] = useState<AnnouncementFormData>({
    content: '',
    validFrom: new Date().toISOString().split('T')[0],
    validTo: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  });
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.content) return;

    try {
      setLoading(true);
      await onSubmit({ ...formData, audioFile: audioFile || undefined });
      onCancel();
    } catch (error) {
      console.error('Failed to create announcement:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAudioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && (file.type === 'audio/mpeg' || file.type === 'audio/wav')) {
      setAudioFile(file);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-lg mx-4">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-semibold">Create Announcement</h3>
          <button onClick={onCancel} className="text-neutral-500 hover:text-neutral-700">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Announcement Text
              </label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="input h-24 resize-none"
                placeholder="Write your announcement (max 30 characters)"
                maxLength={30}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Audio Message (optional)
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-neutral-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <Upload size={24} className="mx-auto text-neutral-400" />
                  <div className="flex text-sm text-neutral-600">
                    <label className="relative cursor-pointer rounded-md font-medium text-primary-600 hover:text-primary-500">
                      <span>Upload a file</span>
                      <input
                        type="file"
                        className="sr-only"
                        accept="audio/mpeg,audio/wav"
                        onChange={handleAudioChange}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-neutral-500">MP3 or WAV up to 10MB</p>
                </div>
              </div>
              {audioFile && (
                <p className="mt-2 text-sm text-neutral-600">{audioFile.name}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Valid From
                </label>
                <input
                  type="date"
                  value={formData.validFrom}
                  onChange={(e) => setFormData({ ...formData, validFrom: e.target.value })}
                  className="input"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Valid To
                </label>
                <input
                  type="date"
                  value={formData.validTo}
                  onChange={(e) => setFormData({ ...formData, validTo: e.target.value })}
                  className="input"
                  min={formData.validFrom}
                />
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onCancel}
              className="btn-outline"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
              disabled={loading || !formData.content}
            >
              {loading ? 'Creating...' : 'Announce'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAnnouncement;