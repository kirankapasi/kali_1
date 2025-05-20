import { Message } from '../../types';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage = ({ message }: ChatMessageProps) => {
  // Format timestamp to a readable format
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  return (
    <div className="mb-4">
      <div className="flex items-start">
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-neutral-200 mr-2"></div>
        <div className="flex-grow">
          <div className="flex items-baseline">
            <span className="font-medium mr-2">{message.authorName}</span>
            <span className="text-xs text-neutral-500">{formatTime(message.timestamp)}</span>
          </div>
          <div className="mt-1 text-neutral-800">
            {message.content}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;