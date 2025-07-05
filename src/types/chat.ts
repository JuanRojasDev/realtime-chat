export interface Message {
  id: string;
  username: string;
  content: string;
  timestamp: Date;
  avatarSeed?: string;
}

export interface ChatState {
  messages: Message[];
  isConnected: boolean;
}
