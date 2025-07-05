import { useState, useEffect, useRef } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { MessageList } from './MessageList';
import { LogoutConfirmDialog } from './LogoutConfirmDialog';
import { UserAvatar } from './UserAvatar';
import { useChat } from '../../hooks/useChat';
import { LogOut, Send, Users, Wifi, WifiOff } from 'lucide-react';

interface ChatRoomProps {
  username: string;
  userAvatar: string;
  onLogout: () => void;
}

export const ChatRoom = ({ username, userAvatar, onLogout }: ChatRoomProps) => {
  const [message, setMessage] = useState('');
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const { messages, sendMessage, isConnected } = useChat(username, userAvatar);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      sendMessage(message.trim());
      setMessage('');
      inputRef.current?.focus();
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('chatUsername');
    localStorage.removeItem('chatUserAvatar');
    onLogout();
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br p-1 sm:p-4">
      <div className="max-w-full sm:max-w-6xl mx-auto h-screen flex flex-col">
        {/* Header */}
        <Card className="mb-2 sm:mb-4 shadow-lg border-0 bg-white/90 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <div className="flex items-center gap-4">
              <UserAvatar username={username} size="lg" avatarSeed={userAvatar} />
              <div>
                <CardTitle className="text-xl font-bold text-gray-800">
                  Chat General
                </CardTitle>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span className="font-medium">
                    Conectado como: <span className="text-blue-600">{username}</span>
                  </span>
                  <div className="flex items-center gap-1">
                    {isConnected ? (
                      <>
                        <Wifi className="w-4 h-4 text-green-500" />
                        <span className="text-green-600 font-medium">En línea</span>
                      </>
                    ) : (
                      <>
                        <WifiOff className="w-4 h-4 text-red-500" />
                        <span className="text-red-600 font-medium">Desconectado</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-full">
                <Users className="w-4 h-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">
                  {messages.length > 0 ? new Set(messages.map(m => m.username)).size : 1} usuarios
                </span>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setShowLogoutDialog(true)}
                className="hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Salir
              </Button>
            </div>
          </CardHeader>
        </Card>

        {/* Messages */}
        <Card className="flex-1 flex flex-col min-h-0 shadow-lg border-0 bg-white/90 backdrop-blur-sm">
          <CardContent className="flex-1 flex flex-col min-h-0 p-0">
            <MessageList messages={messages} currentUsername={username} currentUserAvatar={userAvatar} />
          </CardContent>
        </Card>

        {/* Message Input */}
        <Card className="mt-2 sm:mt-4 shadow-lg border-0 bg-white/90 backdrop-blur-sm">
          <CardContent className="p-4">
            <form onSubmit={handleSubmit} className="flex gap-3">
              <Input
                ref={inputRef}
                type="text"
                placeholder="Escribe tu mensaje aquí..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                disabled={!isConnected}
                className="flex-1 h-12 text-base border-2 border-gray-200 focus:border-blue-500 transition-colors"
                maxLength={500}
              />
              <Button 
                type="submit" 
                disabled={!message.trim() || !isConnected}
                className="h-12 px-6 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-gray-700 transition-all duration-200 shadow-lg"
              >
                <Send className="w-5 h-5" />
              </Button>
            </form>
            <div className="mt-2 flex justify-between items-center text-xs text-gray-500">
              <span>Presiona Enter para enviar</span>
              <span>{message.length}/500</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <LogoutConfirmDialog
        open={showLogoutDialog}
        onOpenChange={setShowLogoutDialog}
        onConfirm={handleLogout}
        username={username}
      />
    </div>
  );
};
