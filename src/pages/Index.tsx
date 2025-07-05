import { useState, useEffect } from 'react';
import { UsernameForm } from '../components/chat/UsernameForm';
import { ChatRoom } from '../components/chat/ChatRoom';

const Index = () => {
  const [username, setUsername] = useState<string>('');
  const [userAvatar, setUserAvatar] = useState<string>('default');

  useEffect(() => {
    // Verificar si ya hay un username y avatar guardados en localStorage
    const savedUsername = localStorage.getItem('chatUsername');
    const savedAvatar = localStorage.getItem('chatUserAvatar');
    if (savedUsername) {
      setUsername(savedUsername);
      setUserAvatar(savedAvatar || 'default');
    }
  }, []);

  const handleUsernameSubmit = (name: string, avatar: string) => {
    localStorage.setItem('chatUsername', name);
    localStorage.setItem('chatUserAvatar', avatar);
    setUsername(name);
    setUserAvatar(avatar);
  };

  const handleLogout = () => {
    localStorage.removeItem('chatUsername');
    localStorage.removeItem('chatUserAvatar');
    setUsername('');
    setUserAvatar('default');
  };

  if (!username) {
    return <UsernameForm onSubmit={handleUsernameSubmit} />;
  }

  return <ChatRoom username={username} userAvatar={userAvatar} onLogout={handleLogout} />;
};

export default Index;