import React, { useState, useRef, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MemberLayout } from '@/components/layouts/MemberLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Send,
  Paperclip,
  Image as ImageIcon,
  File,
  Smile,
  MoreVertical,
  Users,
  Bell,
  Archive,
  Blocks,
  Flag,
  ArrowLeft,
  UserCircle,
} from 'lucide-react';

// Mock data for the current chat
const mockChat = {
  id: '1',
  type: 'direct',
  participants: [
    {
      id: '2',
      name: 'John Doe',
      avatar: null,
      status: 'online',
      lastSeen: new Date(),
      role: 'Student',
      department: 'Computer Science',
    },
  ],
  messages: [
    {
      id: '1',
      sender: {
        id: '2',
        name: 'John Doe',
        avatar: null,
      },
      content: 'Hey, when is the next club meeting?',
      timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
      status: 'read',
    },
    {
      id: '2',
      sender: {
        id: '1',
        name: 'You',
        avatar: null,
      },
      content: "Hi! It's scheduled for next Friday at 3 PM in the main auditorium.",
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 mins ago
      status: 'sent',
    },
    {
      id: '3',
      sender: {
        id: '2',
        name: 'John Doe',
        avatar: null,
      },
      content: 'Perfect, thanks! Will there be a presentation?',
      timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 mins ago
      status: 'delivered',
    },
    // Add more messages...
  ],
};

const ChatPage: React.FC = () => {
  const { id } = useParams();
  const [message, setMessage] = useState('');
  
  // In a real app, we would fetch the chat data using the id
  console.log('Chat ID:', id);
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [mockChat.messages]);

  const handleSendMessage = () => {
    if (!message.trim()) return;
    // Add message sending logic here
    setMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <MemberLayout>
      <div className="h-[calc(100vh-4rem)] flex flex-col">
        {/* Chat Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-4">
            <Link to="/member/messages" className="lg:hidden">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div className="flex items-center gap-3">
              <div className="relative">
                {mockChat.type === 'direct' ? (
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="font-medium">
                      {mockChat.participants[0].name.charAt(0)}
                    </span>
                  </div>
                ) : (
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Users className="h-5 w-5" />
                  </div>
                )}
                {mockChat.type === 'direct' && mockChat.participants[0].status === 'online' && (
                  <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background" />
                )}
              </div>
              <div>
                <h2 className="font-semibold">
                  {mockChat.type === 'direct'
                    ? mockChat.participants[0].name
                    : 'Group Name'}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {mockChat.type === 'direct'
                    ? mockChat.participants[0].status === 'online'
                      ? 'Online'
                      : 'Last seen recently'
                    : '3 participants'}
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Sheet open={isInfoOpen} onOpenChange={setIsInfoOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <UserCircle className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Chat Info</SheetTitle>
                  <SheetDescription>View chat details and settings</SheetDescription>
                </SheetHeader>
                <div className="py-6">
                  <div className="flex flex-col items-center mb-6">
                    <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <span className="text-2xl font-medium">
                        {mockChat.participants[0].name.charAt(0)}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold">
                      {mockChat.participants[0].name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {mockChat.participants[0].role} • {mockChat.participants[0].department}
                    </p>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-sm font-medium mb-2">Shared Files</h4>
                      <div className="bg-muted rounded-lg p-4 text-center text-sm text-muted-foreground">
                        No files shared yet
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium mb-2">Shared Images</h4>
                      <div className="bg-muted rounded-lg p-4 text-center text-sm text-muted-foreground">
                        No images shared yet
                      </div>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Chat Options</DropdownMenuLabel>
                <DropdownMenuItem>
                  <Bell className="h-4 w-4 mr-2" />
                  Mute notifications
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Archive className="h-4 w-4 mr-2" />
                  Archive chat
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive">
                  <Blocks className="h-4 w-4 mr-2" />
                  Block user
                </DropdownMenuItem>
                <DropdownMenuItem className="text-destructive">
                  <Flag className="h-4 w-4 mr-2" />
                  Report
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Messages Area */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {mockChat.messages.map((msg) => {
              const isOwn = msg.sender.name === 'You';
              return (
                <div
                  key={msg.id}
                  className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex gap-3 max-w-[70%] ${isOwn ? 'flex-row-reverse' : ''}`}>
                    {!isOwn && (
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-medium">
                          {msg.sender.name.charAt(0)}
                        </span>
                      </div>
                    )}
                    <div>
                      <div
                        className={`rounded-lg p-3 ${
                          isOwn
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted'
                        }`}
                      >
                        <p className="text-sm">{msg.content}</p>
                      </div>
                      <div
                        className={`flex items-center gap-2 mt-1 text-xs text-muted-foreground ${
                          isOwn ? 'justify-end' : ''
                        }`}
                      >
                        {msg.timestamp.toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                        {isOwn && (
                          <span className="text-xs">
                            {msg.status === 'sent' && '✓'}
                            {msg.status === 'delivered' && '✓✓'}
                            {msg.status === 'read' && '✓✓'}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Message Input */}
        <div className="p-4 border-t">
          <div className="flex items-end gap-2">
            <div className="flex-1">
              <Input
                placeholder="Type a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyPress}
                className="min-h-[2.5rem]"
              />
            </div>
            <div className="flex gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Paperclip className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <ImageIcon className="h-4 w-4 mr-2" />
                    Image
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <File className="h-4 w-4 mr-2" />
                    Document
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button variant="outline" size="icon">
                <Smile className="h-5 w-5" />
              </Button>
              <Button onClick={handleSendMessage}>
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </MemberLayout>
  );
};

export default ChatPage;