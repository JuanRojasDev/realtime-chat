import { UserAvatar } from './UserAvatar';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Check } from 'lucide-react';

interface AvatarSelectorProps {
  selectedAvatar: string;
  onAvatarSelect: (avatar: string) => void;
  username: string;
}

export const AvatarSelector = ({ selectedAvatar, onAvatarSelect, username }: AvatarSelectorProps) => {
  const avatarOptions = [
    'default',
    'avatar1',
    'avatar2', 
    'avatar3',
    'avatar4',
    'avatar5',
    'avatar6',
    'avatar7',
    'avatar8',
    'avatar9'
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-700 text-center">
        Elige tu avatar
      </h3>
      <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
        {avatarOptions.map((avatar) => (
          <Card
            key={avatar}
            className={`relative p-3 cursor-pointer transition-all duration-200 hover:shadow-md ${
              selectedAvatar === avatar 
                ? 'ring-2 ring-blue-500 bg-blue-50' 
                : 'hover:bg-gray-50'
            }`}
            onClick={() => onAvatarSelect(avatar)}
          >
            <div className="flex flex-col items-center space-y-2">
              <UserAvatar 
                username={username} 
                size="md" 
                avatarSeed={avatar}
              />
              {selectedAvatar === avatar && (
                <div className="absolute -top-1 -right-1 bg-blue-500 rounded-full p-1">
                  <Check className="w-3 h-3 text-white" />
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};