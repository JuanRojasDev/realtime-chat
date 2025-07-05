import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Sparkles } from 'lucide-react';
import { AvatarSelector } from './AvatarSelector';

interface UsernameFormProps {
  onSubmit: (username: string, avatar: string) => void;
}

export const UsernameForm = ({ onSubmit }: UsernameFormProps) => {
  const [username, setUsername] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState('default');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      onSubmit(username.trim(), selectedAvatar);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-2 sm:p-4" style={{ backgroundImage: "url('https://static.wixstatic.com/media/11062b_56e63a6ce4984220a38ca44529456c72f000.jpg/v1/fill/w_980,h_721,al_c,q_85,usm_0.33_1.00_0.00,enc_avif,quality_auto/11062b_56e63a6ce4984220a38ca44529456c72f000.jpg')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
      <Card className="w-full max-w-md sm:max-w-2xl shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="text-center pb-2">
          <div className="mx-auto mb-4 p-3 bg-gradient-to-r from-gray-600 to-gray-500 rounded-full w-16 h-16 flex items-center justify-center">
            <img src="https://static.wixstatic.com/media/200df0_d5fe0a6affa84e829f3aeb0cde572f6b%7Emv2.png/v1/fill/w_32%2Ch_32%2Clg_1%2Cusm_0.66_1.00_0.01/200df0_d5fe0a6affa84e829f3aeb0cde572f6b%7Emv2.png" alt="Logo" className="w-8 h-8" />
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
            Chat en Vivo
          </CardTitle>
          <CardDescription className="text-gray-600 mt-2">
            Únete a la conversación global en tiempo real
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-sm font-medium text-gray-700">
                Nombre de usuario
              </Label>
              <Input
                id="username"
                type="text"
                placeholder="Ej: JuanPerez"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                minLength={2}
                maxLength={20}
                className="h-12 text-center text-lg font-medium border-2 border-gray-200 focus:border-blue-500 transition-colors"
              />
              <p className="text-xs text-gray-500 text-center">
                Mínimo 2 caracteres, máximo 20
              </p>
            </div>

            {username.length >= 2 && (
              <AvatarSelector
                selectedAvatar={selectedAvatar}
                onAvatarSelect={setSelectedAvatar}
                username={username}
              />
            )}

            <Button 
              type="submit" 
              className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-gray-700 transition-all duration-200 shadow-lg" 
              disabled={!username.trim() || username.length < 2}
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Ingresar al Chat
            </Button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              Al ingresar, podrás chatear con todos los usuarios conectados en el mismo puerto.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
