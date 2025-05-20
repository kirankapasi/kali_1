import { useState, useRef } from 'react';
import { X, Image, Play, Pause } from 'lucide-react';

interface CreateStoryProps {
  onClose: () => void;
  onSubmit: (data: { text: string; media?: File }) => void;
}

const CreateStory = ({ onClose, onSubmit }: CreateStoryProps) => {
  const [text, setText] = useState('');
  const [media, setMedia] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setMedia(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSubmit({ text, media: media || undefined });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-lg mx-4">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-semibold">Create Story</h3>
          <button onClick={onClose} className="text-neutral-500 hover:text-neutral-700">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Story Text
              </label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="input h-24 resize-none"
                placeholder="Write your story (max 3 lines)"
                maxLength={280}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Add Media (optional)
              </label>
              <div
                className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-neutral-300 border-dashed rounded-md cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="space-y-1 text-center">
                  <Image size={24} className="mx-auto text-neutral-400" />
                  <div className="flex text-sm text-neutral-600">
                    <label className="relative cursor-pointer rounded-md font-medium text-primary-600 hover:text-primary-500">
                      <span>Upload media</span>
                      <input
                        ref={fileInputRef}
                        type="file"
                        className="sr-only"
                        accept="image/*,video/*"
                        onChange={handleMediaChange}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-neutral-500">
                    PNG, JPG, GIF, MP4 up to 10MB
                  </p>
                </div>
              </div>
              {preview && (
                <div className="mt-2 relative">
                  {media?.type.startsWith('image/') ? (
                    <img
                      src={preview}
                      alt="Preview"
                      className="w-full h-48 object-cover rounded"
                    />
                  ) : (
                    <video
                      src={preview}
                      className="w-full h-48 object-cover rounded"
                      controls
                    />
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      setMedia(null);
                      setPreview(null);
                    }}
                    className="absolute top-2 right-2 p-1 bg-black bg-opacity-50 rounded-full text-white"
                  >
                    <X size={16} />
                  </button>
                </div>
              )}
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
              disabled={!text.trim()}
            >
              Share Story
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateStory;