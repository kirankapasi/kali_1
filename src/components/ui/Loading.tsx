import { Triangle } from 'lucide-react';

const Loading = () => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white bg-opacity-90 z-50">
      <Triangle className="text-primary-600 animate-pulse-slow" size={48} />
      <p className="mt-4 text-primary-800 font-medium">Loading Komune...</p>
    </div>
  );
};

export default Loading;