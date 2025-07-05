import { useEffect, useRef } from 'react';
import { ScrollArea } from '../ui/scroll-area';
import { Message } from '../../types/chat';
import { formatTime } from '../../utils/dateUtils';
import { UserAvatar } from './UserAvatar';

interface MessageListProps {
  messages: Message[];
  currentUsername: string;
  currentUserAvatar: string;
}

export const MessageList = ({ messages, currentUsername, currentUserAvatar }: MessageListProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  if (messages.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center text-muted-foreground p-8">
        <div className="text-center">
          <div className="mx-auto mb-4 p-4 bg-gradient-to-r from-blue-100 to-gray-100 rounded-full w-20 h-20 flex items-center justify-center">
            <span className="text-2xl">💬</span>
          </div>
          <p className="text-lg mb-2 font-semibold">¡Bienvenido al chat!</p>
          <p className="text-sm text-gray-500">Sé el primero en enviar un mensaje y comenzar la conversación.</p>
        </div>
      </div>
    );
  }

  return (
    <ScrollArea className="flex-1 p-4">
      <div ref={scrollRef} className="space-y-4">
        {messages.map((message, index) => {
          const isCurrentUser = message.username === currentUsername;
          const showAvatar = !isCurrentUser && (index === 0 || messages[index - 1].username !== message.username);
          
          return (
            <div
              key={message.id}
              className={`flex items-end gap-3 ${
                isCurrentUser ? 'justify-end' : 'justify-start'
              }`}
            >
              {!isCurrentUser && (
                <div className="flex-shrink-0">
                  {showAvatar ? (
                    <UserAvatar username={message.username} size="sm" avatarSeed={message.avatarSeed} />
                  ) : (
                    <div className="w-8 h-8" />
                  )}
                </div>
              )}
              
              <div
                className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl shadow-sm ${
                  isCurrentUser
                    ? 'bg-gradient-to-r from-orange-600 to-orange-500 text-white rounded-br-sm'
                    : 'bg-white border border-gray-200 rounded-bl-sm'
                }`}
              >
                {!isCurrentUser && showAvatar && (
                  <p className="text-xs font-semibold mb-1 text-gray-600">
                    {message.username}
                  </p>
                )}
                <p className="text-sm break-words leading-relaxed">{message.content}</p>
                <p className={`text-xs mt-1 ${
                  isCurrentUser ? 'text-blue-100' : 'text-gray-500'
                }`}>
                  {formatTime(message.timestamp)}
                </p>
              </div>

              {isCurrentUser && (
                <div className="flex-shrink-0">
                  <UserAvatar username={message.username} size="sm" avatarSeed={currentUserAvatar} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </ScrollArea>
  );
};
