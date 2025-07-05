import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

interface UserAvatarProps {
  username: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  avatarSeed?: string;
}

export const UserAvatar = ({ username, size = 'md', className = '', avatarSeed }: UserAvatarProps) => {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getAvatarUrl = (name: string, seed?: string) => {
    // Using DiceBear API for consistent avatars
    const actualSeed = seed && seed !== 'default' ? seed : name;
    return `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(actualSeed)}&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf`;
  };

  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12'
  };

  return (
    <Avatar className={`${sizeClasses[size]} ${className} border-2 border-white shadow-sm`}>
      <AvatarImage 
        src={getAvatarUrl(username, avatarSeed)} 
        alt={`${username} avatar`}
      />
      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-gray-500 text-white font-semibold text-sm">
        {getInitials(username)}
      </AvatarFallback>
    </Avatar>
  );
};
